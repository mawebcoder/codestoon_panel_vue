<template>
  <div>

    <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: ['id', 'title', 'en_title', 'course_title', 'status', 'section_title', 'is_free', 'time_in_minute', 'created_at'],
      edit_url_name: 'video-edit',
      delete_uri: 'videos',
      uri: 'videos',
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
          field: 'is_free',
          label: 'آیا رایگان است؟'
        },
        {
          field: 'course_title',
          label: 'عنوان دوره'
        },
        {
          field: 'section_title',
          label: 'عنوان فصل'
        },
        {
          field: 'time_in_minute',
          label: 'زمان ویدیو(دقیقه)',
        },
        {
          field: 'created_at',
          label: 'تاریخ ایجاد'
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