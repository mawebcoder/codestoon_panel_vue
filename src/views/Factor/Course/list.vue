<template>
  <div>


    <DataTable server-search-route="factors/search-items" :items="rows" :editUrlName="edit_url_name"
               :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['ref_id',
        'id',
        'user_name',
        'user_email',
        'paid_price',
        'is_checked',
        'discount_code',
        'transaction_id',
        'discount_percent',
        'price',
        'discount',
        'bank_status_code',
        'created_at',
        'payment_status',
      ],
      edit_url_name: 'factor-course-edit',
      delete_uri: 'factors',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'user_name',
          label: 'نام و نام خانوادگی کاربر '
        },
        {
          field: 'user_email',
          label: 'ایمیل کاربر',
        },
        {
          field: 'paid_price',
          label: 'مبلغ پرداخت شده '
        },
        {
          field: 'is_checked',
          label: 'وضعیت بررسی'
        }, {
          field: 'discount_code',
          label: 'کد تخفیف'
        }, {
          field: 'transaction_id',
          label: 'شماره سفارش'
        },
        {
          field: 'discount_percent',
          label: 'درصد تخفیف'
        }, {
          field: 'price',
          label: 'قیمت بدون تخفیف(تومان)'
        }, {
          field: 'discount',
          label: 'مقدار تخفیف(تومان)'
        }, {
          field: 'payment_status',
          label: 'وضعیت سفارش'
        }, {
          field: 'bank_status_code',
          label: 'کد بانک'
        }, {
          field: 'created_at',
          label: 'تاریخ ایجاد سفارش'
        },
      ]
    }
  },
  components: {
    DataTable
  },
  mounted() {
  }

}
</script>

<style scoped>

</style>