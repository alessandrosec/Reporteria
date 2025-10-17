<script lang="ts" src="./controllers/HistorialReportes"></script>

<template>
  <div class="historial-container">
    <el-page-header @back="volverAtras">
      <template #content>
        <h1>📚 Historial de Reportes Generados</h1>
      </template>
    </el-page-header>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="6" animated />
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
    <div v-if="!loading && !error">
      <el-card class="historial-card" shadow="hover">
        <template #header>
          <h2>📋 Reportes que has generado</h2>
        </template>

        <!-- Sin datos -->
        <el-empty
          v-if="historial.length === 0"
          description="No has generado reportes aún"
        />

        <!-- Tabla de historial -->
        <el-table v-else :data="historial" stripe border style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" align="center" />
          <el-table-column prop="tipo_reporte" label="Tipo de Reporte" min-width="200">
            <template #default="scope">
              {{ formatTipoReporte(scope.row.tipo_reporte) }}
            </template>
          </el-table-column>
          <el-table-column prop="fecha_generacion" label="Fecha de Generación" width="200" align="center">
            <template #default="scope">
              {{ formatFecha(scope.row.fecha_generacion) }}
            </template>
          </el-table-column>
          <el-table-column prop="parametros" label="Parámetros" min-width="150">
            <template #default="scope">
              {{ formatParametros(scope.row.parametros) }}
            </template>
          </el-table-column>
          <el-table-column label="Acciones" width="120" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="regenerarReporte(scope.row)"
              >
                🔄 Regenerar
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- Botón volver -->
      <div class="actions">
        <el-button @click="volverAtras" size="large">
          🔙 Volver
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.historial-container {
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
  color: #303133;
  margin: 0;
}

.loading-container {
  margin-top: 20px;
}

.historial-card {
  margin-top: 20px;
}

.actions {
  margin-top: 30px;
  text-align: center;
}
</style>