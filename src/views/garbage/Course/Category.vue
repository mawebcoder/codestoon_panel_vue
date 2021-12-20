<template>
  <div>

    <DataTable :force-delete="true" restore-url="courses/categories/restore" force-delete-url="courses/categories/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="courses/categories/search-items?trash=true" :items="rows"
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
        'id',
        'name'
      ],
      edit_url_name: 'factor-course-edit',
      delete_uri: 'factors',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'name',
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