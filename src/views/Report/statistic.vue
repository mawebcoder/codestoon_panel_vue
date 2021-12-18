<template>
  <div>
    <div style="margin-bottom: 20px" class="row  justify-content-center align-items-center">
      <md-button class="md-icon-button md-raised">
        <md-icon>refresh</md-icon>
      </md-button>
    </div>

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
                سفارشات بررسی نشده موفق vip
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
                سفارشات بررسی نشده لغو شده vip
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

      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                سفارشات بررسی نشده لغو شده دوره ها
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
                سفارشات بررسی نشده موفق دوره ها
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


    <!--    dialog-->

    <md-dialog :md-active.sync="showDialog">

      <div style="background: orange;margin: 5px 0" v-for="(value,index) in seenGuys" :key="index">
        {{ value }}
        <br>
      </div>

      <md-dialog-actions>
        <md-button @click="showDialog = false" class="md-raised md-primary">باشه</md-button>
      </md-dialog-actions>

    </md-dialog>
    <!--    notifications-->

    <md-card-content v-for="(value,index) in alerts" :key="index">
      <div class="row notifs">

        <!--      course orders success-->
        <div class="col-12 row">
          <div class="col-12">
            <md-card class="md-primary" md-theme="orange-card" md-with-hover>

              <md-card-content>

                {{ value.alert_message }}

                <md-button @click="showSeenGuys(value)" class="md-raised md-primary">چه افرادی این پیام را مشاهده کرده
                  اند؟
                </md-button>

              </md-card-content>

              <md-card-actions>
              </md-card-actions>

            </md-card>
          </div>
        </div>


      </div>
    </md-card-content>


  </div>
</template>

<script>
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";

export default {
  name: "statistic",
  created() {
    this.getAlerts();
  },
  data() {
    return {
      alerts: [],
      seenGuys: [],
      showDialog: false
    }
  },
  methods: {
    getAlerts() {
      HttpVerbs.getRequest('alerts')
          .then(res => {
            this.alerts = res.data.data.data;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    showSeenGuys(value) {


      if (!value.seen_users) {
        this.seenGuys = [];
      } else {
        let values = [];
        value.seen_users.forEach(item => {
          values.push(item)
        })
        this.seenGuys = values;
      }
      this.showDialog = true;


    }


  }
}
</script>

<style scoped lang="scss">
.md-title {
  font-size: 1em !important;
  text-align: center !important;
}

.statistic-box {
  padding: 0 10px;
  margin-bottom: 10px;
}
</style>