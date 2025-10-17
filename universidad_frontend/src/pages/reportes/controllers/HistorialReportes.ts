import { defineComponent } from 'vue';
import { reporteApi } from '@/services/reporteApi';
import type { HistorialReporte } from '@/types/reporte.types';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'HistorialReportes',
  data() {
    return {
      loading: true,
      error: '',
      historial: [] as HistorialReporte[],
      idEstudiante: 1 // TODO: Obtener del store/auth
    };
  },
  mounted() {
    this.cargarHistorial();
  },
  methods: {
    async cargarHistorial() {
      try {
        this.loading = true;
        this.error = '';
        this.historial = await reporteApi.obtenerHistorial(this.idEstudiante);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Error al cargar el historial';
        ElMessage.error('No se pudo cargar el historial');
      } finally {
        this.loading = false;
      }
    },
    
    formatTipoReporte(tipo: string): string {
      const tipos: Record<string, string> = {
        'CERTIFICADO_CURSOS': '📜 Certificado de Cursos Aprobados',
        'REPORTE_NOTAS': '📊 Reporte de Calificaciones',
        'REPORTE_PAGOS': '💰 Reporte de Pagos'
      };
      return tipos[tipo] || tipo;
    },
    
    formatFecha(fecha: string): string {
      const date = new Date(fecha);
      return date.toLocaleString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    formatParametros(parametrosStr: string): string {
      try {
        const params = JSON.parse(parametrosStr);
        const parts: string[] = [];
        
        if (params.semestre) parts.push(`Semestre: ${params.semestre}`);
        if (params.totalCursos) parts.push(`${params.totalCursos} cursos`);
        if (params.totalPagos) parts.push(`${params.totalPagos} pagos`);
        
        return parts.join(' | ') || 'N/A';
      } catch {
        return 'N/A';
      }
    },
    
    regenerarReporte(reporte: HistorialReporte) {
      // Redirigir según el tipo de reporte
      const rutas: Record<string, string> = {
        'CERTIFICADO_CURSOS': '/general/reportes/certificado-cursos',
        'REPORTE_NOTAS': '/general/reportes/reporte-notas',
        'REPORTE_PAGOS': '/general/reportes/reporte-pagos'
      };
      
      const ruta = rutas[reporte.tipo_reporte];
      if (ruta) {
        this.$router.push(ruta);
      } else {
        ElMessage.warning('Tipo de reporte no soportado');
      }
    },
    
    volverAtras() {
      this.$router.push('/general/reportes');
    }
  }
});