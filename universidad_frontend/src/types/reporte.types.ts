// INTERFACES DE DATOS
export interface Estudiante {
    id: number;
    carnet: string;
    nombre: string;
    apellido: string;
    carrera: string;
}

export interface Curso {
    codigo: string;
    nombre: string;
    nota_final: number;
    creditos: number;
    periodo: string;
}

export interface Nota {
    codigo: string;
    nombre: string;
    primer_parcial: number;
    segundo_parcial: number;
    parcial_final: number;
    actividades: number;
    nota_final: number;
    creditos: number;
    estado: 'APROBADO' | 'REPROBADO';
}

export interface Pago {
    id_boleta: number;
    monto: number;
    fecha_pago: string;
    banco: string;
    transaccion: string;
    estado: string;
    concepto: string;
}

export interface HistorialReporte {
    id: number;
    id_estudiante: number;
    tipo_reporte: string;
    fecha_generacion: string;
    parametros: string;
}

// RESPUESTAS DE API
export interface CertificadoCursosResponse {
    estudiante: Estudiante;
    cursos: Curso[];
    resumen: {
    totalCursos: number;
    totalCreditos: number;
    promedioGeneral: string;
    };
}

export interface ReporteNotasResponse {
    estudiante: Estudiante;
    semestre: string;
    notas: Nota[];
    resumen: {
    totalCursos: number;
    aprobados: number;
    reprobados: number;
    promedio: string;
    };
}

export interface ReportePagosResponse {
    estudiante: Estudiante;
    pagos: Pago[];
    resumen: {
    totalPagos: number;
    montoTotal: string;
    };
}