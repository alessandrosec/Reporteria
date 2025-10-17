import { defineComponent } from 'vue';
import { reporteApi } from '@/services/reporteApi';
import type { ReportePagosResponse } from '@/types/reporte.types';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'ReportePagos',
  data() {
    return {
      loading: true,
      descargando: false,
      error: '',
      datos: null as ReportePagosResponse | null,
      idEstudiante: 1 // TODO: Obtener del store/auth
    };
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        this.loading = true;
        this.error = '';
        this.datos = await reporteApi.obtenerReportePagos(this.idEstudiante);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Error al cargar los datos';
        ElMessage.error('No se pudo cargar el reporte de pagos');
      } finally {
        this.loading = false;
      }
    },
    
    async descargarPDF() {
      try {
        this.descargando = true;
        await reporteApi.descargarReportePagosPDF(this.idEstudiante);
        ElMessage.success('PDF descargado correctamente');
      } catch (err) {
        ElMessage.error('Error al descargar el PDF');
      } finally {
        this.descargando = false;
      }
    },
    
    getEstadoColor(estado: string): string {
      const colores: Record<string, string> = {
        'CONFIRMADO': 'success',
        'VALIDADO': 'success',
        'PENDIENTE': 'warning',
        'RECHAZADO': 'danger'
      };
      return colores[estado] || 'info';
    },
    
    volverAtras() {
      this.$router.push('/general/reportes');
    }
  }
});