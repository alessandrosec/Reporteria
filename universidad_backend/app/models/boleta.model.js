module.exports = (sequelize, Sequelize) => {
  const Boleta = sequelize.define("Boleta", {
    id_boleta: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_estudiante: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    monto: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    fecha_pago: {
      type: Sequelize.DATE,
      allowNull: false
    },
    banco: {
      type: Sequelize.STRING,
      allowNull: false
    },
    transaccion: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "PENDIENTE"
    }
  }, {
    tableName: "boletas_transferencia",
    timestamps: false
  });

  // RELACIONES Geovanny
  Boleta.belongsTo(Estudiante, {
        foreignKey: "id_estudiante",
        as: "estudiante"
    });
    
    Estudiante.hasMany(Boleta, {
        foreignKey: "id_estudiante",
        as: "boletas"
    });

  return Boleta;
};
