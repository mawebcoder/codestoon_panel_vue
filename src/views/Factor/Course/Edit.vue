<template>
  <div>

    <label>
      نام و نام خانوادگی :
    </label>
    <md-field>
      <md-input :disabled="true" placeholder="نام و نام خانوادگی..." v-model="username"></md-input>
    </md-field>

    <label>
      شماره سفارش :
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="شماره سفارش..." v-model="transactionId"></md-input>
    </md-field>

    <label>
      وضعیت بررسی :
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="وضعیت بررسی..." v-model="checkedConditionText"></md-input>
    </md-field>
    <label>
      وضعیت سفارش :
    </label>
    <md-field>
      <md-input :disabled="true" placeholder="وضعیت سفارش..." v-model="orderConditionText"></md-input>
    </md-field>

    <label>
      مبلغ پرداختی:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="مبلغ پرداختی..." v-model="paidPrice"></md-input>
    </md-field>

    <label>
      کد تخفبف:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="کد تخفیف..." v-model="discountCode"></md-input>
    </md-field>

    <label>
      درصد تخفبف:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="درصد تخفیف..." v-model="discountPercent"></md-input>
    </md-field>

    <label>
      مبلغ تخفبف:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="مبلغ تخفیف..." v-model="discountPrice"></md-input>
    </md-field>

    <label>
      شماره تراکنش بانک:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="شماره تراکنش بانک..." v-model="refId"></md-input>
    </md-field>

    <label>
      استاتوس کد بازگشتی بانک:
    </label>
    <md-field>

      <md-input :disabled="true" placeholder="کد بازگشتی از بانک..." v-model="bankStatusCode"></md-input>
    </md-field>

    <label>
      تاریخ سفارش:
    </label>

    <md-field>
      <md-input :disabled="true" placeholder="تاریخ سفارش..." v-model="orderDate"></md-input>
    </md-field>

    <label>
      تغییر وضعیت بررسی :
    </label>
    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="isChecked"
                   :options="checkedOptions" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="وضعیت بررسی این سفارش را اینجا انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>

    <label>
      تغییر وضعیت سفارش :
    </label>
    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="orderCondition"
                   :options="orderConditionOptions" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="وضعیت این سفارش را اینجا تغییر دهید..." label="name"
                   track-by="name">
      </multiselect>
    </div>
    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>


    <md-divider></md-divider>

    <!--    table-->
    <label style="    display: block;font-weight: bold;margin: 20px 0;font-style: italic;">
      لیست دوره های خریداری شده
    </label>
    <DataTable :show-delete="false" :show-select="false" :show-edit="false" :show-search="false" :items="rows"
               :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
    </DataTable>


  </div>
</template>

<script>

import HelperClass from "../../../services/HelperClass";
import HttpVerbs from "../../../services/HttpVerbs";

const Multiselect = () => import('vue-multiselect')
const DataTable = () => import('../../../components/DataTable')
export default {
  name: "Create",
  created() {
    this.getOrderInfo()
  },
  data() {
    return {
      username: '',
      transactionId: '',
      checkedConditionText: '',
      orderConditionText: '',
      paidPrice: '',
      discountCode: '',
      discountPercent: '',
      discountPrice: '',
      refId: '',
      orderDate: '',
      bankStatusCode: '',
      checkedOptions: [
        {name: 'بررسی نشده', value: 0},
        {name: 'بررسی شده', value: 1}
      ],
      isChecked: null,
      orderConditionOptions: [
        {name: 'باز', value: 'open'},
        {name: 'پرداخت نشده', value: 'not_paid'},
        {name: 'پرداخت شده', value: 'paid'}
      ],
      orderCondition: null,

      /**
       * table information(factorItems)
       */
      rows: ['ref_id',
        'id',
        'courseTitle',
        'course_price',
        'course_discount_price',
        'paid_price',
        'courseDiscountValue'
      ],
      edit_url_name: 'factor-course-edit',
      delete_uri: 'factors',
      uri: `factors/items/${this.$route.params.id}`,

      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'courseTitle',
          label: 'عنوان دوره'
        },
        {
          field: 'course_price',
          label: 'مبلغ دوره بدون تخفیف(تومان)'
        },
        {
          field: 'course_discount_price',
          label: 'مبلغ دوره با تخفیف(تومان)'
        },
        {
          field: 'paid_price',
          label: 'مبلغ پرداختی(تومان)'
        },
        {
          field: 'courseDiscountValue',
          label: 'مقدار تخفیف(تومان)'
        },
      ]
    }
  },
  methods: {
    getOrderInfo() {
      HttpVerbs.getRequest(`factors/course/${this.$route.params.id}`)
          .then(res => {
            let result = res.data.data;
            let factor = result.factor;
            let userInfo = result.user_info
            this.bankStatusCode = factor.bank_status_code ? factor.bank_status_code : 'پرداخت نشده';
            this.transactionId = factor.transaction_id ? factor.transaction_id : 'پرداخت نشده';
            this.checkedConditionText = factor.is_checked ? 'بررسی شده' : 'بررسی نشده';
            this.getOrderConditionText(factor.payment_status)
            this.paidPrice = factor.paid_price ? parseInt(factor.paid_price).toLocaleString() : 'پرداخت نشده'
            this.discountCode = factor.discount_code ? factor.discount_code : 'فاقد کد تخفیف';
            this.discountPercent = factor.discount_percent ? factor.discount_percent : 'فاقد کد تخفیف';
            this.discountPrice = factor.discount_price ? parseInt(factor.discount_price).toLocaleString() : 'فاقد کد تخفیف';
            this.refId = factor.ref_id ? factor.ref_id : 'پرداخت نشده'
            this.orderDate = new Date(factor.created_at).toLocaleDateString('fa-IR');
            this.getCheckedOptionValue(factor.is_checked)
            this.username = userInfo.name ? userInfo.name : userInfo.email;
          }).catch((error) => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getCheckedOptionValue(factorIsChecked) {
      factorIsChecked ?
          this.isChecked = {name: 'بررسی شده', value: 1} :
          this.isChecked = {name: 'بررسی نشده', value: 0}
    },
    getOrderConditionText(paymentStatus) {
      switch (paymentStatus) {
        case 'open':
          this.orderConditionText = 'باز';
          this.orderCondition = {name: 'باز', value: 'open'}
          break;
        case 'paid':
          this.orderConditionText = 'پرداخت شده';
          this.orderCondition = {name: 'پرداخت شده', value: 'paid'};
          break;
        case 'not_paid':
          this.orderConditionText = 'پرداخت نشده';
          this.orderCondition = {name: 'پرداخت نشده', value: 'not_paid'};
          break;
      }
    },
    getData() {
      let data = new FormData();
      data.append('is_checked', this.isChecked.value === 1 ? 1 : 0);
      data.append('payment_status', this.orderCondition.value)
      return data;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest(`factors/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            close();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  components: {
    Multiselect,
    DataTable
  }
}
</script>

<style scoped>

</style>