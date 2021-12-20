<template>
  <div>

    <DataTable :force-delete="true"  restore-url="factors/restore" force-delete-url="factors/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="factors/search-items?trash=true" :items="rows"
               :editUrlName="edit_url_name"
               :delete-url="delete_uri" :show-edit="false" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: [
        'ref_id',
        'id',
        'transaction_id',
        'payment_status',
        'created_at'
      ],
      edit_url_name: 'factor-course-edit',
      delete_uri: 'factors',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'transaction_id',
          label: 'شماره سفارش'
        },
        {
          field: 'payment_status',
          label: 'وضعیت سفارش'
        },
        {
          field: 'ref_id',
          label: 'کد پیگیری بانک'
        },
        {
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