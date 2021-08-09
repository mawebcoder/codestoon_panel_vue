<template>
  <div>
    <div class="row">
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                 کامنت های تایید نشده دوره ها
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                56
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">مشاهده</md-button>
            </md-card-actions>
          </md-card>
        </div>

      </div>
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                 کاربران آنلاین
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                56
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">مشاهده</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
               سفارشات جدید
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                56
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">مشاهده</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                کاربران جدید
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                56
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">مشاهده</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "statistic",
  created() {
    this.$store.state.page_title='آمار و اعلانات'
  }
}
</script>

<style scoped lang="scss">
.md-title {
  font-size: 1em !important;
  text-align: center !important;
}
.statistic-box{
  padding: 0 10px;
  margin-bottom: 10px;
}
</style>