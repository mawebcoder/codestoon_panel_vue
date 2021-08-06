<template>
  <div>
    <main dir="rtl">
      <div class="card-container">
        <md-card>
          <md-card-header>
            <div class="md-title">کد تایید</div>
          </md-card-header>

          <md-card-content>
            <md-field>
              <md-input placeholder="کد ارسالی را وارد کنید..." v-model="code"></md-input>
              <md-icon>phone_locked</md-icon>
            </md-field>
            <CountDown/>
            <div v-if="$store.state.show_resend_code_button" @click="resendCode" class="resend-code-button">
              ارسال مجدد کد تایید
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button @click="verify" class="md-raised md-primary">

              تایید

              <md-icon style="margin-right: 10px">thumb_up</md-icon>
            </md-button>
          </md-card-actions>

        </md-card>
      </div>


    </main>

  </div>
</template>

<script>
import CountDown from "../../components/CountDown";
import Auth from "../../services/Auth/Auth";
import HelperClass from "../../services/HelperClass";

export default {
  name: "AuthenticationPage",
  data() {
    return {
      code: '',
    }
  },
  components: {
    CountDown,
  },
  methods: {
    getData() {
      let data = new FormData();

      data.append('code', this.code)
      return data;
    },
    verify() {

      Auth.verifyCode(this.getData())
          .then(res => {
            this.$cookies.set('token', res.data.data.token, '30d')

            this.$router.push({name: "dashboard"})

          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })
    },
    resendCode() {
      Auth.resendCode()
          .then((res) => {
            if (res.status === 204) {
              this.$noty.warning('کد قبلا برای شما ارسال شده است')
            } else {
              this.$noty.success('کد مجددا برای شما ارسال شد')
              setTimeout(function () {
                location.reload();
              }, 2000)

            }

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
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

.resend-code-button {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
}
</style>