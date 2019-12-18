<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Index extends Vue {
  mounted() {
    if (!this.$store.getters["jellyfin/isLoggedIn"]) {
      this.$router.push("/server-url");
    } else {
      this.$router.push("/home");
    }
  }
}
</script>
