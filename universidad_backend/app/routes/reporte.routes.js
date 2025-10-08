module.exports = app => {
    const reporte = require("../controllers/reporte.controller.js");
    const Verificador = require("../middlewares/autorizacion.middleware.js");
    const soloEstudiantes = Verificador(["estudiante", "admin"]);
    
    var router = require("express").Router();

    // CERTIFICADO DE CURSOS APROBADOS
    router.get("/certificado-cursos/:id/preview", soloEstudiantes, reporte.previewCertificadoCursos);
    router.get("/certificado-cursos/:id/pdf", soloEstudiantes, reporte.descargarCertificadoCursos);
    
    // REPORTE DE NOTAS POR SEMESTRE
    router.get("/reporte-notas/:id/preview", soloEstudiantes, reporte.previewReporteNotas);
    router.get("/reporte-notas/:id/pdf", soloEstudiantes, reporte.descargarReporteNotas);
    
    // REPORTE DE PAGOS
    router.get("/reporte-pagos/:id/preview", soloEstudiantes, reporte.previewReportePagos);
    router.get("/reporte-pagos/:id/pdf", soloEstudiantes, reporte.descargarReportePagos);
    
    // HISTORIAL
    router.get("/historial/:id", soloEstudiantes, reporte.obtenerHistorial);

    app.use("/api/reporte", router);
};