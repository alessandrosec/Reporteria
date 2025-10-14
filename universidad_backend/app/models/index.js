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

try {
  db.historialReporte = require("./historial_reporte.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'historialReporte' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'historialReporte':", err.message);
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

if (db.estudiante && db.historialReporte) {
  db.estudiante.hasMany(db.historialReporte, {
    foreignKey: "id_estudiante",
    as: "historial_reportes"
  });

  db.historialReporte.belongsTo(db.estudiante, {
    foreignKey: "id_estudiante",
    as: "estudiante"
  });
  console.log("✅ Relación Estudiante-HistorialReporte definida.");
}

console.log("\n✅ Todos los modelos y relaciones cargados.\n");

module.exports = db;