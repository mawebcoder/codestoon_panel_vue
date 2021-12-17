<template>
  <div>

    <DataTable  server-search-route="vip/search-items" :items="rows"  :editUrlName="edit_url_name"
                :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['id', 'title', 'length', 'price', 'status'],
      edit_url_name: 'vip-edit',
      delete_uri: 'vip',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'title',
          label: 'عنوان پلن'
        },
        {
          field: 'length',
          label: 'مدت اعتبار(ماه)'
        },
        {
          field: 'price',
          label: 'قیمت(تومان)'
        },
        {
          field: 'status',
          label: 'وضعیت'
        }
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