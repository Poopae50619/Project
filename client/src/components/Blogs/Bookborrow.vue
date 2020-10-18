<template>
  <div>
    <main-header navsel="back"></main-header>
    <center><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กรอกข้อมูลสมาชิก</h1><br>
    <form v-on:submit.prevent="createUser">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name: <input type="text" v-model="Bookborrow.name" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lastname: <input type="text" v-model="Bookborrow.lastname" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: <input type="text" v-model="Bookborrow.email" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Booktitle: <input type="text" v-model="Bookborrow.Booktitle" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Borrow day: <input type="text" v-model="Bookborrow.Borrowday" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Day night: <input type="text" v-model="Bookborrow.Daynight" /></p>
       <p>&nbsp;&nbsp;&nbsp;&nbsp;
           <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button
                class="btn btn-sm btn-danger"
                v-on:click="deleteBlog(blog)"
              >
              ยืมหนังสือ
              </button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button
                class="btn btn-sm btn-info"
                v-on:click="navigateTo('/blog/' + blog.id)"
              >
                คืนหนังสือ
              </button>
              </p>
          
             
     
     
    </form>
    <hr />
     </center>
    
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      Bookborrow: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push({
          name: "users",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
</style>