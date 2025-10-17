<script lang="ts" src="./controllers/ReportePagos"></script>

<template>
  <div class="reporte-pagos-container">
    <el-page-header @back="volverAtras">
      <template #content>
        <h1>💰 Reporte de Pagos</h1>
      </template>
    </el-page-header>

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
        </el-descriptions>
      </el-card>

      <!-- Tabla de pagos -->
      <el-card class="pagos-card" shadow="hover">
        <template #header>
          <h2>📋 Historial de Pagos</h2>
        </template>

        <el-table :data="datos.pagos" stripe border style="width: 100%">
          <el-table-column prop="id_boleta" label="N° Boleta" width="100" align="center" />
          <el-table-column prop="concepto" label="Concepto" min-width="200" />
          <el-table-column prop="monto" label="Monto" width="120" align="right">
            <template #default="scope">
              Q{{ scope.row.monto.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="fecha_pago" label="Fecha de Pago" width="150" align="center" />
          <el-table-column prop="banco" label="Banco" width="120" />
          <el-table-column prop="transaccion" label="Tipo" width="150" />
          <el-table-column prop="estado" label="Estado" width="130" align="center">
            <template #default="scope">
              <el-tag :type="getEstadoColor(scope.row.estado)">
                {{ scope.row.estado }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- Resumen -->
      <el-card class="resumen-card" shadow="hover">
        <template #header>
          <h2>📊 Resumen de Pagos</h2>
        </template>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <div class="stat-box">
              <div class="stat-icon">📝</div>
              <div class="stat-label">Total de Pagos</div>
              <div class="stat-value">{{ datos.resumen.totalPagos }}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="stat-box stat-success">
              <div class="stat-icon">💵</div>
              <div class="stat-label">Monto Total</div>
              <div class="stat-value">Q{{ datos.resumen.montoTotal }}</div>
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
.reporte-pagos-container {
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

.loading-container {
  margin-top: 20px;
}

.info-card,
.pagos-card,
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