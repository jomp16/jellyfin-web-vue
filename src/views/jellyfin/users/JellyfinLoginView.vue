<template>
  <section class="hero is-black is-fullheight">
    <b-loading :is-full-page="true" :active.sync="showLoading" />

    <div class="hero-body">
      <div class="container">
        <b-notification
          aria-close-label="Close notification"
          type="is-danger"
          v-if="errorMessage !== null"
        >
          {{ errorMessage }}
        </b-notification>
        <div v-if="selectedUser === null">
          <div class="columns is-centered">
            <div
              v-for="(user, index) in paginatedItems"
              :key="index"
              class="column is-2"
            >
              <UserCard
                :user="user"
                @click="clickUserLogin(user)"
                :key="user.Id"
              />
            </div>
          </div>

          <b-pagination
            :total="users.length"
            :current.sync="currentPage"
            :per-page="numberOfUsersPerPage"
          >
          </b-pagination>
        </div>
        <div v-else>
          <div class="columns is-centered">
            <div class="column is-3">
              <b-field
                label="Username"
                type="is-white"
                custom-class="has-text-white"
                label-for="userName"
                expanded
              >
                <b-input
                  placeholder="Username"
                  v-model="selectedUser"
                  id="userName"
                  required
                  expanded
                />
              </b-field>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-3">
              <b-field
                label="Password"
                type="is-white"
                custom-class="has-text-white"
                label-for="userPassword"
                expanded
              >
                <b-input
                  placeholder="Password"
                  v-model="userPassword"
                  id="userPassword"
                  type="password"
                  required
                  expanded
                />
              </b-field>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-3">
              <b-field grouped>
                <b-field position="is-right" class="has-text-right" expanded>
                  <a
                    class="has-text-white login-link-back"
                    @click="removeSelectedUser"
                  >
                    Back
                  </a>
                  <b-button type="is-primary" @click="tryLoginWithUsername">
                    Login
                  </b-button>
                </b-field>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { User } from "@/axios/jellyfin/objects/User";
import UserCard from "@/components/UserCard.vue";

@Component({
  components: { UserCard }
})
export default class JellyfinUsersView extends Vue {
  private currentPage: number = 1;
  private numberOfUsersPerPage: number = 6;
  private selectedUser: string | null = null;
  private userPassword: string | null = null;
  private showLoading: boolean = true;
  private errorMessage: string | null = null;

  // noinspection JSUnusedGlobalSymbols
  async mounted() {
    this.showLoading = false;
  }

  clickUserLogin(user: User) {
    this.selectedUser = user.Name;
  }

  removeSelectedUser() {
    this.selectedUser = null;
  }

  async tryLoginWithUsername() {
    try {
      this.showLoading = true;

      await this.$store.dispatch("loginWithUsername", {
        username: this.selectedUser,
        password: this.userPassword
      });

      this.showLoading = false;

      await this.$router.push("/home");
    } catch (e) {
      this.errorMessage = e;
    }
  }

  get users(): User[] {
    return this.$store.state.jellyfin.users.users;
  }

  get paginatedItems(): User[] {
    let pageNumber = this.currentPage - 1;

    return this.users.slice(
      pageNumber * this.numberOfUsersPerPage,
      (pageNumber + 1) * this.numberOfUsersPerPage
    );
  }
}
</script>

<style lang="sass">
.login-link-back
  margin-right: 0.75em
  margin-top: 5px
</style>
