<template>
  <div>
    <div style="margin-bottom: 20px" class="row  justify-content-center align-items-center">
      <md-button class="md-icon-button md-raised">
        <md-icon>refresh</md-icon>
      </md-button>
    </div>
    <div class="row">

      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card  md-with-hover>
            <md-card-header>
              <div class="md-title"> بازدید از سایت</div>
            </md-card-header>
            <VisitChart/>
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </md-card>
        </div>
      </div>


      <!--    register user chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title"> ثبت نام کاربران</div>
            </md-card-header>
            <RegisterUserChart/>
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </md-card>
        </div>
      </div>


      <!--    order-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title"> تعداد سفارشات</div>
            </md-card-header>

            <OrderChart/>
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </md-card>
        </div>
      </div>
      <!--    order-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title"> فروش دوره </div>
            </md-card-header>

            <SellChart/>
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </md-card>
        </div>
      </div>

      <!--  vip-sell-chart-->
      <div class="col-4 col-768-6 col-480-12">
        <div style="padding: 10px">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title"> فروش vip</div>
            </md-card-header>

            <VipSellChart/>
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </md-card>
        </div>
      </div>
    </div>
    <div style="height: 300px"></div>
  </div>
</template>

<script>


const VisitChart=()=>import("../../components/VisitChart");
const RegisterUserChart=()=>import("../../components/RegisterUserChart");
const OrderChart =()=>import("../../components/OrderChart");
const SellChart =()=>import( '../../components/SellChart')
const  VipSellChart=()=>import('../../components/VipSellChart')
import Multiselect from 'vue-multiselect'
export default {
  name: "dashboard",
  data(){
    return {
      sort: 0,
      status: {name: 'هفته گذشته', value: 1},
      sortOptions: [
        {name: 'هفته گذشته', value: 1},
        {name: 'ماه گذشته', value: 0},
        {name: 'سال گذشته', value: 0},
      ],
      statusOptions: [
        {name: 'هفته گذشته', value: 1},
        {name: 'ماه گذشته', value: 0},
        {name: 'سال گذشته', value: 0},
      ],
    }
  },
  components:{
    VisitChart,
    RegisterUserChart,
    OrderChart,
    SellChart,
    VipSellChart,
    Multiselect
  }
}
</script>

<style scoped>

</style>