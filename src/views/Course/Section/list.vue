<template>
  <div>

    <DataTable  server-search-route="courses/sections/search-items" :items="rows"  :editUrlName="edit_url_name"
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
      rows: ['id', 'title', 'en_title', 'status', 'courseTitle'],
      edit_url_name: 'course-section-edit',
      delete_uri: 'courses/sections',
      uri: 'courses/sections',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'title',
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
          field: 'courseTitle',
          label: 'عنوان دوره'
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