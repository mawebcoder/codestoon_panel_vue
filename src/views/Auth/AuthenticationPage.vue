<template>
  <div>
    <main dir="rtl">
      <div class="card-container">
        <md-card>
          <md-card-header>
            <div class="md-title">ورود به پنل مدیریت</div>
          </md-card-header>

          <md-card-content>
            <md-field>
              <md-input placeholder="شماره تلفن خود را وارد کنید..." v-model="mobile"></md-input>
              <md-icon>phone</md-icon>
            </md-field>

            <md-field style="direction: ltr">
              <md-input type="password" placeholder="رمز عبور خود را وارد کنید..." v-model="password"></md-input>

            </md-field>

          </md-card-content>
          <md-card-actions>
            <md-button @click="login" class="md-raised md-primary">

              ورود

              <md-icon style="margin-right: 10px">login</md-icon>
            </md-button>
          </md-card-actions>

        </md-card>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from "../../services/Auth/Auth";
import HelperClass from "../../services/HelperClass";

export default {
  name: "AuthenticationPage",
  data() {
    return {
      mobile: '',
      password: ''
    }
  },
  methods: {
    getData() {
      let data = new FormData();

      data.append('username', this.mobile);
      data.append('password', this.password);
      return data;
    },
    login() {
      this.$store.state.loader = true;
      let data = this.getData();
      Auth.login(data)
          .then(res => {

            localStorage.setItem('temp_password', res.data.data.security_temporary_password)

            this.$router.push({name: 'verify-code'})

          }).catch(error => {
        this.$store.state.loader = false
        HelperClass.showErrors(error, this.$noty)
      });

    }
  }
}
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;

  > div {
    width: 350px;
    margin-top: 50px;
  }
}
</style>