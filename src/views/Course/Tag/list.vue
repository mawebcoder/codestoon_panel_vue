<template>
  <div>

    <DataTable server-search-route="courses/tags/search-items" :items="rows" :editUrlName="edit_url_name"
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
      rows: ['id', 'fa_title', 'en_title', 'status', 'show_in_filter'],
      edit_url_name: 'course-tag-edit',
      delete_uri: 'courses/tags',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'fa_title',
          label: 'عنوان فارسی'
        },
        {
          field: 'en_title',
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