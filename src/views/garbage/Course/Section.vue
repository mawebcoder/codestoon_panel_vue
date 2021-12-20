<template>
  <div>

    <DataTable :force-delete="true" restore-url="courses/sections/restore" force-delete-url="courses/sections/force/delete"
               :showRestore="true" :isTrash="true"
               server-search-route="courses/sections/search-items?trash=true" :items="rows"
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
        'title'
      ],
      edit_url_name: 'factor-course-edit',
      delete_uri: 'factors',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'title',
          label: 'عنوان فصل'
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