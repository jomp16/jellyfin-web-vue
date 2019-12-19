<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Index extends Vue {
  // noinspection JSUnusedGlobalSymbols
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/server-url");
    } else {
      this.$router.push("/home");
    }
  }
}
</script>
