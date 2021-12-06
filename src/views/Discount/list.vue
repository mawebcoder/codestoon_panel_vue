<template>
  <div>

    <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['id', 'code', 'percent','status','valid_time_use', 'expire_date', 'used_time'],
      edit_url_name: 'discount-edit',
      delete_uri: 'discounts',
      uri: 'discounts',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'code',
          label: 'کد'
        },
        {
          field: 'percent',
          label: 'درصد تخفیف'
        },
        {
          field: 'status',
          label: 'وضعیت'
        },
        {
          field: 'valid_time_use',
          label: 'دفعات مجاز استفاده'
        },
        {
          field: 'expire_date',
          label: 'تاریخ انقضا'
        },
        {
          field: 'used_time',
          label: 'دفعات استفاده شده'
        },

      ],
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