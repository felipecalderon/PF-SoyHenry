// hacer conexion con database (sequelize)
const Sequelize = require('sequelize');
const {
    DBHOST,
    DBNAME,
    DBUSER,
    DBPASS,
    DB_DEPLOY,
    PORTDB
    } = process.env

// PONER SSL en dialectOptions en deploy
const ssl = {
    require: true,
    rejectUnauthorized: false // << IMPORTANTE
}
const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBHOST,
  dialect: 'postgres',
  port: PORTDB,
  dialectOptions: {
    pool: {
        acquire: 30000, // tiempo de espera para adquirir una conexión
        idle: 10000 // tiempo de espera para liberar una conexión
    },
  ssl
  },
  logging: false, // para evitar logueos de SQL en la consola
});

// const sequelize = new Sequelize( DB_DEPLOY, {
//   dialect: 'postgres',
//   dialectOptions: {
//     pool: {
//         acquire: 30000, // tiempo de espera para adquirir una conexión
//         idle: 10000 // tiempo de espera para liberar una conexión
//     },
//   },
//   logging: false, // para evitar logueos de SQL en la consola
// });

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida exitosamente con la db PostgreSQL');
  })
  .catch(err => {
    console.error('No se pudo establecer la conexión con la base de datos PostgreSQL:', err);
  });
  
module.exports = sequelize