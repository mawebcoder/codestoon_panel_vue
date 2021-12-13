<template>
  <div>

    <DataTable  server-search-route="articles/search-items" :items="rows"  :editUrlName="edit_url_name"
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
      rows: ['id', 'title', 'article_category', 'status', 'writer'],
      edit_url_name: 'article-edit',
      delete_uri: 'articles/delete',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'title',
          label: 'عنوان '
        },
        {
          field: 'writer',
          label: 'نویسنده'
        },
        {
          field: 'status',
          label: 'وضعیت'
        },
        {
          field: 'article_category',
          label: 'دسته بندی'
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