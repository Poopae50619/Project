<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="../assets/logo2.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          <span class="font1">E-Books</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active" role="presentation">
              <router-link :to="{ name: 'front' }"><i class="fas fa-home"></i> หน้าหลัก</router-link>
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="showLogin = true">&nbsp;&nbsp;เข้าสู่ระบบ</a>
            </li>

            <li class="nav-item" v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="showRegister = true">&nbsp;&nbsp;สมัครสมาชิก</a>
            </li>
            <transition name="fade">
              <li v-if="isUserLoggedIn" role="presentation">
                <router-link v-bind:to="{ name: 'login' }">{{
                  user.name
                }}</router-link>
              </li>
            </transition>
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="logout">&nbsp;&nbsp;Logout</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>

    <div class="modal" v-if="showLogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Client Login</h3>
          <form v-on:submit.prevent="clientLogin" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-3">Email:</label>
              <div class="col-md-9">
                <input
                  placeholder="email"
                  type="email"
                  v-model="email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Password:</label>
              <div class="col-md-9">
                <input
                  type="password"
                  placeholder="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                  <i class="fas fa-key"></i> Login
                </button>
                <button
                  v-on:click.prevent="showLogin = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="fas fa-timescircle"></i> Close
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <div class="modal" v-if="showRegister">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Client Register</h3>
          <form v-on:submit.prevent="clientRegister" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-3">Email:</label>
              <div class="col-md-9">
                <input
                  required
                  placeholder="email"
                  type="email"
                  v-model="user.email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Password:</label>
              <div class="col-md-9">
                <input
                  required
                  type="password"
                  placeholder="password"
                  v-model="user.password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Name:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="name"
                  v-model="user.name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Lastname:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="lastname"
                  v-model="user.lastname"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                  <i class="fas fa-key"></i> Register
                </button>
                <button
                  v-on:click.prevent="showRegister = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="fas fa-timescircle"></i> Close
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <p>{{ resultUpdated }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showLogin: false,
      showRegister: false,
      resultUpdated: "",
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
        type: "user",
      },
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // this.$router.push({
      // name: 'login'
      // })
      this.resultUpdated = "Logout successful.";
      setTimeout(() => (this.resultUpdated = ""), 3000);
    },
    async clientLogin() {
      console.log(`acc: ${this.email} -${this.password}`);
      try {
        const response = await AuthenService.clientLogin({
          email: this.email,
          password: this.password,
        });
        this.error = "";
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        // this.$router.push({
        // name: 'blogs'
        // })
        // console.log(response.data)
        (this.email = ""), (this.password = ""), (this.showLogin = false);
        this.resultUpdated = "Login successful.";
        setTimeout(() => (this.resultUpdated = ""), 3000);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
        setTimeout(() => (this.error = ""), 3000);
      }
    },
    async clientRegister() {
      try {
        await UsersService.post(this.user);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
}
.popup-msg {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  max-width: 200px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.bg-light {
    background-color:orange!important;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.login-wrapper {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #ddd;
  width: 320px;
  padding: 10px 30px 20px 30px;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  /* padding: 20px; */
}
.login-wrapper h3 {
  text-align: center;
  padding-bottom: 10px;
}
</style>