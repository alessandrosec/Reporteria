import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReportesIndex',
  data() {
    return {
      // TODO: Obtener desde store o autenticación
      idEstudiante: 1,
      nombreEstudiante: 'Juan Pérez García',
      carnetEstudiante: '2021-0001'
    };
  },
  methods: {
    navegarA(ruta: string) {
      this.$router.push(`/general/reportes/${ruta}`);
    },
    volverAtras() {
      this.$router.push('/general/home');
    }
  }
});