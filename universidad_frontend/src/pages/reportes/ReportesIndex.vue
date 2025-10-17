<script lang="ts" src="./controllers/ReportesIndex"></script>

<template>
  <div class="reportes-container">
    <el-page-header @back="volverAtras">
      <template #content>
        <h1>📄 Reportería y Documentos</h1>
      </template>
    </el-page-header>

    <el-card class="info-estudiante" shadow="hover">
      <h3>👤 Información del Estudiante</h3>
      <p><strong>Nombre:</strong> {{ nombreEstudiante }}</p>
      <p><strong>Carnet:</strong> {{ carnetEstudiante }}</p>
      <p><strong>Carrera:</strong> Ingeniería en Sistemas</p>
    </el-card>

    <h2>Selecciona el documento que deseas generar:</h2>

    <el-row :gutter="20" class="reportes-grid">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="reporte-card" @click="navegarA('certificado-cursos')">
          <div class="card-icon">📜</div>
          <h3>Certificado de Cursos</h3>
          <p>Consulta todos los cursos que has aprobado</p>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="reporte-card" @click="navegarA('reporte-notas')">
          <div class="card-icon">📊</div>
          <h3>Reporte de Calificaciones</h3>
          <p>Consulta tus notas por semestre</p>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="reporte-card" @click="navegarA('reporte-pagos')">
          <div class="card-icon">💰</div>
          <h3>Reporte de Pagos</h3>
          <p>Consulta tu historial de pagos</p>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="reporte-card" @click="navegarA('historial')">
          <div class="card-icon">📚</div>
          <h3>Historial de Reportes</h3>
          <p>Reportes que has generado</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.reportes-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  color: #303133;
}

h2 {
  font-size: 20px;
  color: #606266;
  margin: 30px 0 20px;
}

.info-estudiante {
  margin: 20px 0;
  background: linear-gradient(135deg, #00bfff 0%, #1e90ff 100%);
  color: white;
}

.info-estudiante h3 {
  margin-top: 0;
  font-size: 20px;
}

.info-estudiante p {
  margin: 8px 0;
  font-size: 16px;
}

.reportes-grid {
  margin-top: 20px;
}

.reporte-card {
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  padding: 20px;
  min-height: 200px;
}

.reporte-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.reporte-card h3 {
  font-size: 18px;
  color: #303133;
  margin: 10px 0;
}

.reporte-card p {
  font-size: 14px;
  color: #909399;
}
</style>