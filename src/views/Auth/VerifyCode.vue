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
              <md-input placeholder="کد ارسالی را وارد کنید..." v-model="mobile"></md-input>
              <md-icon>phone_locked</md-icon>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary">

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
export default {
  name: "AuthenticationPage",
  data() {
    return {
      mobile: ''
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