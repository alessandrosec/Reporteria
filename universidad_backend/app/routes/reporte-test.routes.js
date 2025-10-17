
// RUTAS DE PRUEBA - MÓDULO REPORTERÍA

// ESTAS RUTAS NO REQUIEREN AUTENTICACIÓN
// SOLO PARA DESARROLLO Y TESTING

module.exports = app => {
    const reporte = require("../controllers/reporte.controller.js");
    
    var router = require("express").Router();

    // CERTIFICADO DE CURSOS APROBADOS
    
    /**
     * @swagger
     * /api/reporte-test/certificado-cursos/{id}/preview:
     *   get:
     *     summary: [TEST] Vista previa del certificado de cursos aprobados (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Datos del certificado en formato JSON
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/certificado-cursos/:id/preview", reporte.previewCertificadoCursos);
    
    /**
     * @swagger
     * /api/reporte-test/certificado-cursos/{id}/pdf:
     *   get:
     *     summary: [TEST] Descargar certificado de cursos aprobados en PDF (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Archivo PDF del certificado
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/certificado-cursos/:id/pdf", reporte.descargarCertificadoCursos);
    
    // REPORTE DE NOTAS POR SEMESTRE
    
    /**
     * @swagger
     * /api/reporte-test/reporte-notas/{id}/preview:
     *   get:
     *     summary: [TEST] Vista previa del reporte de notas (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *       - in: query
     *         name: semestre
     *         required: false
     *         schema:
     *           type: string
     *           example: "2024-2"
     *         description: Período académico
     *     responses:
     *       200:
     *         description: Datos de las calificaciones en formato JSON
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-notas/:id/preview", reporte.previewReporteNotas);
    
    /**
     * @swagger
     * /api/reporte-test/reporte-notas/{id}/pdf:
     *   get:
     *     summary: [TEST] Descargar reporte de notas en PDF (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *       - in: query
     *         name: semestre
     *         required: false
     *         schema:
     *           type: string
     *           example: "2024-2"
     *         description: Período académico
     *     responses:
     *       200:
     *         description: Archivo PDF del reporte de notas
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-notas/:id/pdf", reporte.descargarReporteNotas);
    
    // REPORTE DE PAGOS
    
    /**
     * @swagger
     * /api/reporte-test/reporte-pagos/{id}/preview:
     *   get:
     *     summary: [TEST] Vista previa del historial de pagos (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Datos del historial de pagos en formato JSON
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-pagos/:id/preview", reporte.previewReportePagos);
    
    /**
     * @swagger
     * /api/reporte-test/reporte-pagos/{id}/pdf:
     *   get:
     *     summary: [TEST] Descargar reporte de pagos en PDF (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Archivo PDF del reporte de pagos
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-pagos/:id/pdf", reporte.descargarReportePagos);
    
    // HISTORIAL
    
    /**
     * @swagger
     * /api/reporte-test/historial/{id}:
     *   get:
     *     summary: [TEST] Obtener historial de reportes (SIN AUTH)
     *     tags: [Reportería - TEST]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Lista del historial de reportes
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/historial/:id", reporte.obtenerHistorial);

    app.use("/api/reporte-test", router);
};