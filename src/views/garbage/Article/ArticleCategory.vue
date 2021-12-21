<template>
  <div>

    <DataTable :force-delete="true" restore-url="articles/categories/restore" force-delete-url="articles/categories/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="articles/categories/search-items?trash=true" :items="rows"
               :show-edit="false" :columns="columns">
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
        'id',
        'fa_name'
      ],
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'fa_name',
          label: 'عنوان دسته بندی'
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