/**
 * =========================================
 * SERVICE: data-real (DATOS REALES)
 * =========================================
 * Obtiene datos reales de la base de datos Oracle
 * Versión ajustada para model Estudiante de Pablo
 */

const db = require("../models");
const { Sequelize, Op } = require('sequelize');

class DataRealService {
    
    /**
     * ========================================
     * MÉTODO: obtenerInfoEstudiante
     * ========================================
     */
    async obtenerInfoEstudiante(idEstudiante) {
        try {
            console.log(`🔍 Buscando estudiante con ID: ${idEstudiante}`);
            
            const Estudiante = db.estudiantes;
            
            const estudiante = await Estudiante.findByPk(idEstudiante);
            
            if (!estudiante) {
                throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
            }
            
            console.log(`✅ Estudiante encontrado: ${estudiante.nombre} ${estudiante.apellido}`);
            
            return {
                id: estudiante.id,
                carnet: estudiante.carnet,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                fechaNacimiento: estudiante.fechaNacimiento,
                genero: estudiante.genero,
                carrera: 'Ingeniería en Sistemas' // TODO: Obtener desde relación
            };
            
        } catch (error) {
            console.error("❌ Error al obtener estudiante:", error.message);
            throw error;
        }
    }
    
    /**
     * ========================================
     * MÉTODO: obtenerCursosAprobados
     * ========================================
     */
    async obtenerCursosAprobados(idEstudiante) {
        try {
            console.log(`🔍 Buscando cursos aprobados del estudiante ${idEstudiante}`);
            
            const Nota = db.notas;
            const Curso = db.cursos;
            const Materia = db.materias;
            
            // Consulta con JOINs
            const notas = await Nota.findAll({
                where: {
                    id_estudiante: idEstudiante
                },
                include: [{
                    model: Curso,
                    as: 'curso',
                    required: true,
                    include: [{
                        model: Materia,
                        as: 'materia',
                        required: true
                    }]
                }],
                raw: false
            });
            
            console.log(`✅ Se encontraron ${notas.length} notas`);
            
            // Filtrar solo aprobados y transformar
            const cursosAprobados = notas
                .map(nota => {
                    const notaFinal = 
                        (nota.primer_parcial || 0) + 
                        (nota.segundo_parcial || 0) + 
                        (nota.parcial_final || 0) + 
                        (nota.actividades || 0);
                    
                    // Solo cursos aprobados (>= 61)
                    if (notaFinal < 61) return null;
                    
                    return {
                        id_curso: nota.curso.id,
                        codigo: `${nota.curso.materia.nombre.substring(0, 3).toUpperCase()}${nota.curso.id}`,
                        nombre: nota.curso.materia.nombre,
                        creditos: nota.curso.materia.creditos,
                        primer_parcial: nota.primer_parcial || 0,
                        segundo_parcial: nota.segundo_parcial || 0,
                        parcial_final: nota.parcial_final || 0,
                        actividades: nota.actividades || 0,
                        nota_final: notaFinal,
                        periodo: nota.curso.periodo,
                        estado: 'APROBADO'
                    };
                })
                .filter(item => item !== null);
            
            console.log(`✅ Cursos aprobados: ${cursosAprobados.length}`);
            
            return cursosAprobados;
            
        } catch (error) {
            console.error("❌ Error al obtener cursos aprobados:", error.message);
            
            // Ayuda para debugging
            if (error.name === 'SequelizeEagerLoadingError') {
                console.error(`
┌──────────────────────────────────────────────────────┐
│ ERROR: Las relaciones no están configuradas         │
├──────────────────────────────────────────────────────┤
│ Verifica en los models:                              │
│ • nota.model.js tiene: belongsTo(Curso, {as:'curso'})│
│ • curso.model.js tiene: belongsTo(Materia, {as:'materia'})│
└──────────────────────────────────────────────────────┘
                `);
            }
            
            throw error;
        }
    }
    
    /**
     * ========================================
     * MÉTODO: obtenerNotasPorSemestre
     * ========================================
     */
    async obtenerNotasPorSemestre(idEstudiante, semestre) {
        try {
            console.log(`🔍 Buscando notas del estudiante ${idEstudiante} en semestre ${semestre}`);
            
            const Nota = db.notas;
            const Curso = db.cursos;
            const Materia = db.materias;
            
            const notas = await Nota.findAll({
                where: {
                    id_estudiante: idEstudiante
                },
                include: [{
                    model: Curso,
                    as: 'curso',
                    required: true,
                    where: {
                        periodo: semestre
                    },
                    include: [{
                        model: Materia,
                        as: 'materia',
                        required: true
                    }]
                }],
                raw: false
            });
            
            console.log(`✅ Se encontraron ${notas.length} notas en el semestre`);
            
            return notas.map(nota => {
                const notaFinal = 
                    (nota.primer_parcial || 0) + 
                    (nota.segundo_parcial || 0) + 
                    (nota.parcial_final || 0) + 
                    (nota.actividades || 0);
                
                return {
                    codigo: `${nota.curso.materia.nombre.substring(0, 3).toUpperCase()}${nota.curso.id}`,
                    nombre: nota.curso.materia.nombre,
                    creditos: nota.curso.materia.creditos,
                    primer_parcial: nota.primer_parcial || 0,
                    segundo_parcial: nota.segundo_parcial || 0,
                    parcial_final: nota.parcial_final || 0,
                    actividades: nota.actividades || 0,
                    nota_final: notaFinal,
                    estado: notaFinal >= 61 ? 'APROBADO' : 'REPROBADO'
                };
            });
            
        } catch (error) {
            console.error("❌ Error al obtener notas por semestre:", error.message);
            throw error;
        }
    }
    
    /**
     * ========================================
     * MÉTODO: obtenerPagosEstudiante
     * ========================================
     */
    async obtenerPagosEstudiante(idEstudiante) {
        try {
            console.log(`🔍 Buscando pagos del estudiante ${idEstudiante}`);
            
            const Boleta = db.boletas;
            
            const pagos = await Boleta.findAll({
                where: {
                    id_estudiante: idEstudiante
                },
                order: [['fecha_pago', 'DESC']],
                limit: 50
            });
            
            console.log(`✅ Se encontraron ${pagos.length} pagos`);
            
            return pagos.map(pago => ({
                id_boleta: pago.id_boleta,
                monto: parseFloat(pago.monto),
                fecha_pago: pago.fecha_pago,
                banco: pago.banco,
                transaccion: pago.transaccion,
                estado: pago.estado,
                concepto: pago.concepto || 'Pago de colegiatura'
            }));
            
        } catch (error) {
            console.error("❌ Error al obtener pagos:", error.message);
            throw error;
        }
    }
}

module.exports = new DataRealService();