<template>
  <div>

    <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['id', 'en_name', 'fa_name', 'parent', 'status','show_in_filter','slug'],
      edit_url_name: 'category-article-edit',
      delete_uri: 'articles/categories/delete/items',
      uri: 'articles/categories',
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
        },
        {
          field: 'parent',
          label: 'دسته والد'
        },
        {
          field: 'slug',
          label: 'نامک'
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