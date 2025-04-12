const socket = io();
const videoElement = document.getElementById("screenVideo");
const shareLinkContainer = document.getElementById("shareLinkContainer");
const shareLinkInput = document.getElementById("shareLink");
const startShareBtn = document.getElementById("startShareBtn");
const sharerUI = document.getElementById("sharerUI");
const viewerUI = document.getElementById("viewerUI");

const urlParams = new URLSearchParams(window.location.search);
let currentRoomId = urlParams.get("room");
let peerConnection;
let stream;

function createPeerConnection() {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });

  pc.ontrack = (event) => {
    console.log("[Viewer] Received track");
    videoElement.srcObject = event.streams[0];
  };

  pc.onicecandidate = (event) => {
    if (event.candidate && currentRoomId) {
      socket.emit("ice-candidate", { roomId: currentRoomId, candidate: event.candidate });
    }
  };

  pc.onconnectionstatechange = () => {
    console.log("[WebRTC] Connection state:", pc.connectionState);
  };

  return pc;
}

async function sendOffer() {
  peerConnection = createPeerConnection();
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", { roomId: currentRoomId, offer });
}

if (currentRoomId) {
  // Viewer flow
  sharerUI.style.display = "none";
  viewerUI.style.display = "block";

  socket.emit("join-room", currentRoomId);

  socket.on("offer", async (offer) => {
    peerConnection = createPeerConnection();
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { roomId: currentRoomId, answer });
  });

  socket.on("ice-candidate", ({ candidate }) => {
    if (candidate) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
    }
  });

} else {
  // Sharer flow
  sharerUI.style.display = "block";
  viewerUI.style.display = "none";

  startShareBtn.addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoElement.srcObject = stream;

      const newRoomId = Math.random().toString(36).substr(2, 8);
      currentRoomId = newRoomId;

      const fullLink = `${window.location.origin}?room=${newRoomId}`;
      shareLinkInput.value = fullLink;
      shareLinkContainer.style.display = "block";

      socket.emit("create-room", newRoomId);

      socket.on("user-joined", () => {
        sendOffer();
      });

      socket.on("answer", async ({ answer }) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on("ice-candidate", ({ candidate }) => {
        if (candidate) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
        }
      });

    } catch (err) {
      console.error("Error accessing screen:", err);
    }
  });
}
