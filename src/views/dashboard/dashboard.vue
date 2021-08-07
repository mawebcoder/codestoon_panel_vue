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
import ChartComponent from "../../components/ChartComponent";
import LineChart from "../../components/LineChart";
import VisitChart from "../../components/VisitChart";
import RegisterUserChart from "../../components/RegisterUserChart";
import OrderChart from "../../components/OrderChart";
export default {
  name: "dashboard",
  components:{
    ChartComponent,
    LineChart,
    VisitChart,
    RegisterUserChart,
    OrderChart
  }
}
</script>

<style scoped>

</style>