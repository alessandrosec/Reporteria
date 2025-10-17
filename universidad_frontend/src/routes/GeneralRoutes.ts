import Home from "@/pages/Home.vue";
//vistas de reportes
import ReportesIndex from "@/pages/reportes/ReportesIndex.vue";
import CertificadoCursos from "@/pages/reportes/CertificadoCursos.vue";
import ReporteNotas from "@/pages/reportes/ReporteNotas.vue";
import ReportePagos from "@/pages/reportes/ReportePagos.vue";
import HistorialReportes from "@/pages/reportes/HistorialReportes.vue";

export const generalRoutes = [

    {
        path: "home", 
        component: Home 
    },
    

  // MÓDULO DE REPORTERÍA
    {
        path: "reportes",
        component: ReportesIndex,
    },
    {
        path: "reportes/certificado-cursos",
        component: CertificadoCursos,
    },
    {
        path: "reportes/reporte-notas",
        component: ReporteNotas,
    },
    {
        path: "reportes/reporte-pagos",
        component: ReportePagos,
    },
    {
        path: "reportes/historial",
        component: HistorialReportes,
    }
];