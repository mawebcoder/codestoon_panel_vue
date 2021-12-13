<template>
  <div>

    <DataTable  server-search-route="articles/tags/search-items" :items="rows"  :editUrlName="edit_url_name"
                :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['id', 'title', 'fa_name', 'en_name', 'status','show_in_filter'],
      edit_url_name: 'edit-article-tag',
      delete_uri: 'articles/tags',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'fa_name',
          label: 'عنوان فارسی'
        },
        {
          field: 'en_name',
          label: 'عنوان لاتین'
        },
        {
          field: 'status',
          label: 'وضعیت'
        },
        {
          field: 'show_in_filter',
          label: 'نمایش در فیلتر'
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