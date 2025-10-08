/**
 * Servicio de datos MOCK (temporales)
 * Proporciona datos de prueba mientras los otros módulos no están listos
 */

class DataMockService {
    
    // ========================================
    // ESTUDIANTE
    // ========================================
    async obtenerInfoEstudiante(idEstudiante) {
        return {
            id: idEstudiante,
            carnet: '2021-0001',
            nombre: 'Juan',
            apellido: 'Pérez García',
            fechaNacimiento: '2003-05-15',
            genero: true,
            carrera: 'Ingeniería en Sistemas'
        };
    }
    
    // ========================================
    // CURSOS APROBADOS (nota >= 61)
    // ========================================
    async obtenerCursosAprobados(idEstudiante) {
        // Simula consulta:
        // SELECT c.id, m.nombre, m.creditos, n.* 
        // FROM notas n
        // JOIN cursos c ON n.id_curso = c.id
        // JOIN materias m ON c.id_materia = m.id
        // WHERE n.id_estudiante = ? AND (n.primer_parcial + n.segundo_parcial + n.parcial_final + n.actividades) >= 61
        
        return [
            {
                id_curso: 1,
                codigo: 'MAT101',
                nombre: 'Matemática I',
                creditos: 4,
                primer_parcial: 20,
                segundo_parcial: 22,
                parcial_final: 25,
                actividades: 18,
                nota_final: 85, // suma de los 4
                periodo: '2024-1',
                estado: 'APROBADO'
            },
            {
                id_curso: 2,
                codigo: 'PRO101',
                nombre: 'Programación I',
                creditos: 5,
                primer_parcial: 23,
                segundo_parcial: 24,
                parcial_final: 28,
                actividades: 17,
                nota_final: 92,
                periodo: '2024-1',
                estado: 'APROBADO'
            },
            {
                id_curso: 3,
                codigo: 'BDD201',
                nombre: 'Base de Datos',
                creditos: 4,
                primer_parcial: 18,
                segundo_parcial: 20,
                parcial_final: 23,
                actividades: 17,
                nota_final: 78,
                periodo: '2024-2',
                estado: 'APROBADO'
            },
            {
                id_curso: 4,
                codigo: 'WEB301',
                nombre: 'Desarrollo Web',
                creditos: 5,
                primer_parcial: 22,
                segundo_parcial: 23,
                parcial_final: 26,
                actividades: 17,
                nota_final: 88,
                periodo: '2024-2',
                estado: 'APROBADO'
            }
        ];
    }
    
    // ========================================
    // NOTAS POR SEMESTRE
    // ========================================
    async obtenerNotasPorSemestre(idEstudiante, semestre) {
        const todosCursos = {
            '2024-1': [
                {
                    codigo: 'MAT101',
                    nombre: 'Matemática I',
                    creditos: 4,
                    primer_parcial: 20,
                    segundo_parcial: 22,
                    parcial_final: 25,
                    actividades: 18,
                    nota_final: 85,
                    estado: 'APROBADO'
                },
                {
                    codigo: 'PRO101',
                    nombre: 'Programación I',
                    creditos: 5,
                    primer_parcial: 23,
                    segundo_parcial: 24,
                    parcial_final: 28,
                    actividades: 17,
                    nota_final: 92,
                    estado: 'APROBADO'
                },
                {
                    codigo: 'FIS101',
                    nombre: 'Física I',
                    creditos: 4,
                    primer_parcial: 12,
                    segundo_parcial: 15,
                    parcial_final: 18,
                    actividades: 10,
                    nota_final: 55,
                    estado: 'REPROBADO'
                },
                {
                    codigo: 'ING101',
                    nombre: 'Inglés I',
                    creditos: 3,
                    primer_parcial: 18,
                    segundo_parcial: 20,
                    parcial_final: 22,
                    actividades: 15,
                    nota_final: 75,
                    estado: 'APROBADO'
                }
            ],
            '2024-2': [
                {
                    codigo: 'BDD201',
                    nombre: 'Base de Datos',
                    creditos: 4,
                    primer_parcial: 18,
                    segundo_parcial: 20,
                    parcial_final: 23,
                    actividades: 17,
                    nota_final: 78,
                    estado: 'APROBADO'
                },
                {
                    codigo: 'WEB301',
                    nombre: 'Desarrollo Web',
                    creditos: 5,
                    primer_parcial: 22,
                    segundo_parcial: 23,
                    parcial_final: 26,
                    actividades: 17,
                    nota_final: 88,
                    estado: 'APROBADO'
                },
                {
                    codigo: 'MAT201',
                    nombre: 'Matemática II',
                    creditos: 4,
                    primer_parcial: 20,
                    segundo_parcial: 21,
                    parcial_final: 24,
                    actividades: 17,
                    nota_final: 82,
                    estado: 'APROBADO'
                },
                {
                    codigo: 'EST201',
                    nombre: 'Estadística',
                    creditos: 4,
                    primer_parcial: 17,
                    segundo_parcial: 18,
                    parcial_final: 20,
                    actividades: 15,
                    nota_final: 70,
                    estado: 'APROBADO'
                }
            ]
        };
        
        return todosCursos[semestre] || [];
    }
    
    // ========================================
    // PAGOS (usa tus tablas existentes)
    // ========================================
    async obtenerPagosEstudiante(idEstudiante) {
        // Simula consulta: SELECT * FROM boletas WHERE id_estudiante = ?
        return [
            {
                id_boleta: 1,
                monto: 1500.00,
                fecha_pago: '2024-01-15',
                banco: 'BAM',
                transaccion: 'TRANSFERENCIA',
                estado: 'CONFIRMADO',
                concepto: 'Colegiatura Enero 2024'
            },
            {
                id_boleta: 2,
                monto: 1500.00,
                fecha_pago: '2024-02-15',
                banco: 'BANRURAL',
                transaccion: 'TARJETA',
                estado: 'CONFIRMADO',
                concepto: 'Colegiatura Febrero 2024'
            },
            {
                id_boleta: 3,
                monto: 1500.00,
                fecha_pago: '2024-03-15',
                banco: 'BANTRAB',
                transaccion: 'EFECTIVO',
                estado: 'VALIDADO',
                concepto: 'Colegiatura Marzo 2024'
            },
            {
                id_boleta: 4,
                monto: 250.00,
                fecha_pago: '2024-04-10',
                banco: 'BAM',
                transaccion: 'TRANSFERENCIA',
                estado: 'PENDIENTE',
                concepto: 'Examen Extraordinario'
            },
            {
                id_boleta: 5,
                monto: 1500.00,
                fecha_pago: '2024-05-15',
                banco: 'BAM',
                transaccion: 'TARJETA',
                estado: 'CONFIRMADO',
                concepto: 'Colegiatura Mayo 2024'
            }
        ];
    }
}

module.exports = new DataMockService();