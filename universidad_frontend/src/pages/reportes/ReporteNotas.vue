<script lang="ts" src="./controllers/ReporteNotas"></script>

<template>
  <div class="reporte-notas-container">
    <el-page-header @back="volverAtras">
      <template #content>
        <h1>📊 Reporte de Calificaciones</h1>
      </template>
    </el-page-header>

    <!-- Selector de semestre -->
    <el-card class="selector-card" shadow="hover">
      <h2>Selecciona el semestre:</h2>
      <el-select v-model="semestreSeleccionado" placeholder="Elige un semestre" size="large" @change="cargarDatos">
        <el-option label="2024-1" value="2024-1" />
        <el-option label="2024-2" value="2024-2" />
        <el-option label="2023-1" value="2023-1" />
        <el-option label="2023-2" value="2023-2" />
      </el-select>
    </el-card>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="8" animated />
    </div>

    <!-- Error -->
    <el-alert
      v-if="error"
      title="Error al cargar datos"
      type="error"
      :description="error"
      show-icon
      :closable="false"
    />

    <!-- Contenido -->
    <div v-if="!loading && !error && datos">
      <!-- Información del estudiante -->
      <el-card class="info-card" shadow="hover">
        <h2>👤 Información del Estudiante</h2>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="Nombre">
            {{ datos.estudiante.nombre }} {{ datos.estudiante.apellido }}
          </el-descriptions-item>
          <el-descriptions-item label="Carnet">
            {{ datos.estudiante.carnet }}
          </el-descriptions-item>
          <el-descriptions-item label="Semestre" :span="2">
            {{ datos.semestre }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- Tabla de notas -->
      <el-card class="notas-card" shadow="hover">
        <template #header>
          <h2>📝 Calificaciones del Semestre</h2>
        </template>

        <el-table :data="datos.notas" stripe border style="width: 100%">
          <el-table-column prop="codigo" label="Código" width="100" />
          <el-table-column prop="nombre" label="Materia" min-width="180" />
          <el-table-column prop="primer_parcial" label="1er Parcial" width="110" align="center" />
          <el-table-column prop="segundo_parcial" label="2do Parcial" width="110" align="center" />
          <el-table-column prop="parcial_final" label="Final" width="90" align="center" />
          <el-table-column prop="actividades" label="Actividades" width="120" align="center" />
          <el-table-column prop="nota_final" label="Nota Final" width="110" align="center">
            <template #default="scope">
              <el-tag :type="getNotaColor(scope.row.nota_final)" size="large">
                {{ scope.row.nota_final }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="estado" label="Estado" width="120" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.estado === 'APROBADO' ? 'success' : 'danger'">
                {{ scope.row.estado }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- Resumen -->
      <el-card class="resumen-card" shadow="hover">
        <template #header>
          <h2>📊 Resumen del Semestre</h2>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="6">
            <div class="stat-box">
              <div class="stat-icon">📚</div>
              <div class="stat-label">Total Cursos</div>
              <div class="stat-value">{{ datos.resumen.totalCursos }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6">
            <div class="stat-box stat-success">
              <div class="stat-icon">✅</div>
              <div class="stat-label">Aprobados</div>
              <div class="stat-value">{{ datos.resumen.aprobados }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6">
            <div class="stat-box stat-danger">
              <div class="stat-icon">❌</div>
              <div class="stat-label">Reprobados</div>
              <div class="stat-value">{{ datos.resumen.reprobados }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6">
            <div class="stat-box">
              <div class="stat-icon">⭐</div>
              <div class="stat-label">Promedio</div>
              <div class="stat-value">{{ datos.resumen.promedio }}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <!-- Botones -->
      <div class="actions">
        <el-button @click="volverAtras" size="large">
          🔙 Volver
        </el-button>
        <el-button type="primary" @click="descargarPDF" size="large" :loading="descargando">
          📄 Descargar PDF
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reporte-notas-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  color: #303133;
}

h2 {
  font-size: 20px;
  color: #303133;
  margin: 0;
}

.selector-card {
  margin-top: 20px;
}

.selector-card h2 {
  margin-bottom: 15px;
}

.loading-container {
  margin-top: 20px;
}

.info-card,
.notas-card,
.resumen-card {
  margin-top: 20px;
}

.stat-box {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  margin-bottom: 10px;
}

.stat-box.stat-success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.stat-box.stat-danger {
  background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
}

.actions {
  margin-top: 30px;
  text-align: center;
  display: flex;
  gap: 15px;
  justify-content: center;
}
</style>