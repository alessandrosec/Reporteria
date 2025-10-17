import { Loading } from "@/components/Loading";
import { DArrowRight, Menu, User, Document} from "@element-plus/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GeneralLayout",
  data() {
    return {};
  },
  methods: {
    logout() {
      let loading = Loading.loading("Cerrando Sesión");
      setTimeout(() => {
        loading.close();
        this.$router.push("/");
      }, 3000);
    },

    // NUEVO: Método para ir a Reportería
    irAReportes() {
      this.$router.push("/general/reportes");
    }
    
  },
  components: {
    Menu,
    User,
    DArrowRight,
  },
});
