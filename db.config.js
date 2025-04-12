var Sequelize = require("sequelize");
var dbName = ''; //database name
var dbUser = 'root';
var dbPassword = '';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* MODELS */



/*
db.student = require('./models/Student')(sequelize, Sequelize);
db.course = require('./models/Course')(sequelize, Sequelize);
db.student_course = require('./models/StudentCourse')(sequelize, Sequelize);
db.user = require('./models/User')(sequelize, Sequelize);
db.user_contact = require('./models/UserContacts')(sequelize, Sequelize);

// user association
db.user.hasMany(db.user_contact, {foreignKey: 'userId'});
db.user_contact.belongsTo(db.user);

// student association
db.student.hasMany(db.student_course, {foreignKey: 'studentId'});
db.student_course.belongsTo(db.student);

// course association
db.course.hasMany(db.student_course, {foreignKey: 'courseId'});
db.student_course.belongsTo(db.course);
*/
module.exports = db;