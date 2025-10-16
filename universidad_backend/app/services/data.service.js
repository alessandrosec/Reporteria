const db = require("../models");
const Estudiante = db.estudiante;
const Boleta = db.boleta;
const Usuario = db.usuarios;

class DataService {
    
    // ESTUDIANTE - Consulta a la BD
    async obtenerInfoEstudiante(idEstudiante) {
        try {
            // Buscar estudiante con su usuario relacionado
            const estudiante = await Estudiante.findByPk(idEstudiante, {
                include: [{
                    model: Usuario,
                    attributes: ['correo']
                }]
            });
            
            if (!estudiante) {
                throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
            }
            
            // Formatear respuesta según lo que espera el PDF generator
            return {
                id: estudiante.id,
                carnet: estudiante.carnet || 'N/A',
                nombre: estudiante.nombre || 'Sin nombre',
                apellido: '', // El modelo actual no tiene apellido separado
                fechaNacimiento: estudiante.fechaNacimiento,
                genero: estudiante.genero,
                carrera: 'N/A' // El modelo actual no tiene carrera
            };
            
        } catch (error) {
            console.error('Error al obtener info de estudiante:', error);
            throw error;
        }
    }
    
    // PAGOS - Consulta a tabla boletas
    async obtenerPagosEstudiante(idEstudiante) {
        try {
            // Consultar todas las boletas del estudiante
            const boletas = await Boleta.findAll({
                where: { 
                    id_estudiante: idEstudiante 
                },
                order: [['fecha_pago', 'DESC']] // Ordenar por fecha descendente
            });
            
            if (!boletas || boletas.length === 0) {
                console.warn(`No se encontraron pagos para estudiante ${idEstudiante}`);
                return []; // Retornar array vacío si no hay pagos
            }
            
            // Transformar datos al formato que espera el PDF generator
            return boletas.map(boleta => ({
                id_boleta: boleta.id_boleta,
                concepto: this._generarConcepto(boleta.transaccion), // Generar concepto dinámico
                monto: parseFloat(boleta.monto), // Asegurar que sea número
                fecha_pago: boleta.fecha_pago,
                banco: boleta.banco || 'N/A',
                transaccion: boleta.transaccion,
                estado: boleta.estado || 'PENDIENTE'
            }));
            
        } catch (error) {
            console.error('Error al obtener pagos de estudiante:', error);
            throw error;
        }
    }
    
    // MÉTODO AUXILIAR: Generar concepto dinámico
    _generarConcepto(tipoTransaccion) {
        const conceptos = {
            'TARJETA': 'Pago con tarjeta de crédito/débito',
            'EFECTIVO': 'Pago en efectivo',
            'TRANSFERENCIA': 'Pago por transferencia bancaria',
            'DEPOSITO': 'Depósito bancario',
            'CHEQUE': 'Pago con cheque'
        };
        
        const tipo = tipoTransaccion ? tipoTransaccion.toUpperCase() : '';
        
        // Buscar coincidencia parcial
        for (const [key, value] of Object.entries(conceptos)) {
            if (tipo.includes(key)) {
                return value;
            }
        }
        
        // Si no coincide con ninguno, retornar genérico
        return `Pago vía ${tipoTransaccion || 'No especificado'}`;
    }
    
    // ------------------------------------
    //-------------------------------------
    // CURSOS APROBADOS (nota >= 61)
    // TEMPORAL

    async obtenerCursosAprobados(idEstudiante) {
            
        // TODO: Implementar consulta real cuando existan la tabla curso
        // Query esperado:
        // SELECT c.id, m.nombre, m.creditos, n.* 
        // FROM notas n
        // JOIN cursos c ON n.id_curso = c.id
        // JOIN materias m ON c.id_materia = m.id
        // WHERE n.id_estudiante = ? AND (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) >= 61
        

        /* IMPLEMENTACIÓN DE ÇODIGO CUANDO SE OBTENGA EL MODEL CURSO:
        
        try {
            const cursos = await db.sequelize.query(`
                SELECT 
                    c.id as id_curso,
                    m.codigo,
                    m.nombre,
                    m.creditos,
                    n.primer_parcial,
                    n.segundo_parcial,
                    n.parcial_final,
                    n.actividades,
                    (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) as nota_final,
                    c.periodo,
                    'APROBADO' as estado
                FROM notas n
                JOIN cursos c ON n.id_curso = c.id
                JOIN materias m ON c.id_materia = m.id
                WHERE n.id_estudiante = :idEstudiante
                AND (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) >= 61
                ORDER BY c.periodo, m.nombre
            `, {
                replacements: { idEstudiante },
                type: db.Sequelize.QueryTypes.SELECT
            });
            
            return cursos;
            
        } catch (error) {
            console.error('Error al obtener cursos aprobados:', error);
            throw error;
        }
        */
    }

    //-------------------------------
    // NOTAS POR SEMESTRE
    // TEMPORAR
    async obtenerNotasPorSemestre(idEstudiante, semestre) {
        // TODO: Implementar consulta cuando exista las tabla
        
        /* IMPLEMENTACIÓN OF (esperando tabla):
        
        try {
            const notas = await db.sequelize.query(`
                SELECT 
                    m.codigo,
                    m.nombre,
                    m.creditos,
                    n.primer_parcial,
                    n.segundo_parcial,
                    n.parcial_final,
                    n.actividades,
                    (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) as nota_final,
                    CASE 
                        WHEN (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) >= 61 
                        THEN 'APROBADO' 
                        ELSE 'REPROBADO' 
                    END as estado
                FROM notas n
                JOIN cursos c ON n.id_curso = c.id
                JOIN materias m ON c.id_materia = m.id
                WHERE n.id_estudiante = :idEstudiante
                AND c.periodo = :semestre
                ORDER BY m.nombre
            `, {
                replacements: { idEstudiante, semestre },
                type: db.Sequelize.QueryTypes.SELECT
            });
            
            return notas;
            
        } catch (error) {
            console.error('Error al obtener notas por semestre:', error);
            throw error;
        }
        */
    }
}

module.exports = new DataService();