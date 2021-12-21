<template>
  <div>

    <DataTable :force-delete="true" restore-url="videos/restore" force-delete-url="videos/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="videos/search-items?trash=true" :items="rows"
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
          label: 'عنوان  ویدیو'
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