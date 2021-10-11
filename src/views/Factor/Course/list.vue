<template>
  <div>

    <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
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
        'user',
        'paid_price',
        'is_checked',
        'discount_code',
        'transaction_id',
        'discount_percent',
        'price',
        'discount',
        'payment_status',
        'bank_status_code',
        'created_at'
      ],
      edit_url_name: 'edit-managers',
      delete_uri: 'users/admins',
      uri: 'factors/courses',

      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'user',
          label: 'نام و نام خانوادگی کاربر '
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
        }, {
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
      ],

      // 'id',
      // 'user',
      // 'paid_price',
      // 'is_checked',
      // 'discount_code',
      // 'transaction_id',
      // 'discount_percent',
      // 'price',
      // 'discount',
      // 'payment_status',
      // 'bank_status_code',
      // 'created_at'
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