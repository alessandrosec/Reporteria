const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
  db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'usuario' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'usuario':", err.message);
}

try {
  db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'estudiante' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'estudiante':", err.message);
}

db.boleta = require("./boleta.model.js")(sequelize, Sequelize);
db.factura = require("./factura.model.js")(sequelize, Sequelize);

// Rutas de Reportería
try{
  require("./app/routes/reporte.routes")(app);
  console.log("reporte.routes.js cargado correctamente");
}catch(err){
  console.error("Error al cargar reporte.routes.js:", err.message);
}

//Definir relaciones entre modelos
db.estudiante.hasMany(db.boleta, {
  foreignKey: "id_estudiante",
  as: "boletas"
});

db.boleta.belongsTo(db.estudiante, {
  foreignKey: "id_estudiante",
  as: "estudiante"
});

/*
// Modelos base
db.docente = require("./docente.model.js")(sequelize, Sequelize);
db.carrera = require("./carrera.model.js")(sequelize, Sequelize);
db.estudianteCarrera = require("./estudianteCarrera.model.js")(sequelize, Sequelize);
// Relaciones muchos a muchos
db.estudiante.belongsToMany(db.carrera, {
  through: db.estudianteCarrera,
  foreignKey: 'estudianteId',
  otherKey: 'carreraId'
});

db.carrera.belongsToMany(db.estudiante, {
  through: db.estudianteCarrera,
  foreignKey: 'carreraId',
  otherKey: 'estudianteId'
});

// Relación carrera → docente (coordinador)
db.carrera.belongsTo(db.docente, {
  foreignKey: 'docenteId',
  as: 'coordinador'
});
*/

module.exports = db;
