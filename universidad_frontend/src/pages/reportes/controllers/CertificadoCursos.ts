import { defineComponent } from 'vue';
import { reporteApi } from '@/services/reporteApi';
import type { CertificadoCursosResponse } from '@/types/reporte.types';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'CertificadoCursos',
  data() {
    return {
      loading: true,
      descargando: false,
      error: '',
      datos: null as CertificadoCursosResponse | null,
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
        this.datos = await reporteApi.obtenerCertificadoCursos(this.idEstudiante);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Error al cargar los datos';
        ElMessage.error('No se pudo cargar el certificado');
      } finally {
        this.loading = false;
      }
    },
    
    async descargarPDF() {
      try {
        this.descargando = true;
        await reporteApi.descargarCertificadoCursosPDF(this.idEstudiante);
        ElMessage.success('PDF descargado correctamente');
      } catch (err) {
        ElMessage.error('Error al descargar el PDF');
      } finally {
        this.descargando = false;
      }
    },
    
    getNotaColor(nota: number): string {
      if (nota >= 90) return 'success';
      if (nota >= 80) return 'primary';
      if (nota >= 70) return 'warning';
      if (nota >= 61) return 'info';
      return 'danger';
    },
    
    volverAtras() {
      this.$router.push('/general/reportes');
    }
  }
});