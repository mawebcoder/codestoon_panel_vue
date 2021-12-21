<template>
  <div>

    <DataTable :force-delete="true" restore-url="articles/restore/items" force-delete-url="articles/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="articles/search-items?trash=true" :items="rows"
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
        'title'
      ],
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'title',
          label: 'عنوان  مقاله'
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