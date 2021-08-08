<template>
  <div>
    <div class="row">

      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card  md-with-hover>
            <md-card-header>
              <div class="md-title">چارت بازدید از سایت</div>
            </md-card-header>


            <VisitChart/>
          </md-card>
        </div>
      </div>


      <!--    register user chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">چارت ثبت نام کاربران</div>
            </md-card-header>
            <RegisterUserChart/>
          </md-card>
        </div>
      </div>


      <!--    order-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">چارت تعداد سفارشات</div>
            </md-card-header>

            <OrderChart/>
          </md-card>
        </div>
      </div>
      <!--    order-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">چارت فروش</div>
            </md-card-header>

            <SellChart/>
          </md-card>
        </div>
      </div>

      <!--  vip-sell-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">چارت فروش vip</div>
            </md-card-header>

            <VipSellChart/>
          </md-card>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>

            <ChartComponent/>

          </md-card>
        </div>

      </div>
      <div class="col-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>

            <LineChart/>

          </md-card>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
const ChartComponent=()=>import("../../components/ChartComponent");
const LineChart=()=>import("../../components/LineChart");
const VisitChart=()=>import("../../components/VisitChart");
const RegisterUserChart=()=>import("../../components/RegisterUserChart");
const OrderChart=()=>import("../../components/OrderChart");
const SellChart=()=>import('../../components/SellChart')
const VipSellChart=()=>import('../../components/VipSellChart')
export default {
  name: "dashboard",
  components:{
    ChartComponent,
    LineChart,
    VisitChart,
    RegisterUserChart,
    OrderChart,
    SellChart,
    VipSellChart
  }
}
</script>

<style scoped>

</style>