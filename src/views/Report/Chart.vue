<template>
  <div>
    <div
      style="margin-bottom: 20px"
      class="row  justify-content-center align-items-center"
    >
      <md-button class="md-icon-button md-raised">
        <md-icon>refresh</md-icon>
      </md-button>
    </div>
    <label>
      نوع گزارش خود را انتخاب کنید :
    </label>
    <multiselect
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="reportType"
      :options="reportTypes"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      label="name"
      track-by="name"
    >
    </multiselect>

    <label>
      تاریخ شروع گزارش گیری :
    </label>

    <custom-date-picker v-model="start_date"></custom-date-picker>

    <label>
      تاریخ اتمام گزارش گیری :
    </label>

    <custom-date-picker v-model="end_date"></custom-date-picker>

    <label>
      واحد زمانی گزارش گیری :
    </label>
    <multiselect
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="timestamp"
      :options="timestampOptions"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      label="name"
      track-by="name"
    >
    </multiselect>

    <div class="row">
      <!--    register user chart-->
      <div class="col-4 col-768-6 col-480-12" v-if="reportType == 'userChart'">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">ثبت نام کاربران</div>
            </md-card-header>
            <RegisterUserChart />
          </md-card>
        </div>
      </div>

      <!--    order-chart-->
      <div class="col-4 col-768-6 col-480-12" v-if="reportType == 'orderChart'">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">تعداد سفارشات</div>
            </md-card-header>

            <OrderChart />
          </md-card>
        </div>
      </div>
      <!--    order-chart-->
      <div
        class="col-4 col-768-6 col-480-12"
        v-if="reportType == 'courseOrderChart'"
      >
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">فروش دوره</div>
            </md-card-header>

            <SellChart />
          </md-card>
        </div>
      </div>

      <!--  vip-sell-chart-->
      <div
        class="col-4 col-768-6 col-480-12"
        v-if="reportType == 'vipOrderChart'"
      >
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">فروش vip</div>
            </md-card-header>

            <VipSellChart />
          </md-card>
        </div>
      </div>
    </div>

    <md-button @click="submit" class="md-raised md-primary">اعمال</md-button>

    <div style="height: 300px"></div>
  </div>
</template>

<script>
const RegisterUserChart = () => import("../../components/RegisterUserChart");
const OrderChart = () => import("../../components/OrderChart");
const SellChart = () => import("../../components/SellChart");
const VipSellChart = () => import("../../components/VipSellChart");
import Multiselect from "vue-multiselect";
export default {
  name: "dashboard",
  data() {
    return {
      start_date: "",

      end_date: "",

      // report types
      reportType: null,
      reportTypes: [
        {
          name: "چارت ثبت نام کاربران",
          value: "userChart",
        },
        {
          name: "چارت تعداد سفارشات",
          value: "orderChart",
        },
        {
          name: "چارت تعداد سفارشات دوره ها",
          value: "courseOrderChart",
        },
        {
          name: "چارت تعداد سفارشات VIP",
          value: "vipOrderChart",
        },
      ],

      //time units
      timestamp: null,
      timestampOptions: [
        {
          name: "ماهیانه",
          value: "perMonth",
        },
        {
          name: "سالیانه",
          value: "perYears",
        },
        {
          name: "روزانه",
          value: "perDays",
        },
      ],
    };
  },
  methods: {
    submit() {
      let data = this.getData();

      console.log(data);
    },

    getData() {
      let reportType = this.getReportType();

      if (!reportType) {
        this.$noty.warning("لطفا نوع گزارش را مشخص کنید");
        return;
      }

    

      let startDate = this.getStartDate();

      if (!startDate) {
        this.$noty.warning("لطفا تاریخ شروع گزارش گیری را مشخص کنید");
        return;
      }

      let endDate = this.getEndDate();

      if (!endDate) {
        this.$noty.warning("لطفا تاریخ اتمام گزارش گیری را مشخص کنید");
        return;
      }

        let timestamp = this.getUnitTime();

      if (!timestamp) {
        this.$noty.warning("لطفا نوع واحد زمانی را مشخص کنید");
        return;
      }

      return {
        reportType,
        timestamp,
        endDate,
        startDate,
      };
    },
    getReportType() {
      return this.reportType ? this.reportType.value : null;
    },
    getUnitTime() {
      return this.timestamp ? this.timestamp.value : null;
    },
    getStartDate() {
      return this.start_date && this.start_date.trim().length
        ? this.start_date
        : null;
    },
    getEndDate() {
      return this.end_date && this.end_date.trim().length
        ? this.start_date
        : null;
    },
  },
  components: {
    RegisterUserChart,
    OrderChart,
    SellChart,
    VipSellChart,
    Multiselect,
  },
};
</script>

<style scoped></style>
