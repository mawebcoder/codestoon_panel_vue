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
      rows: ['id', 'name', 'status', 'is_checked', 'created_at','courseTitle','userEmail'],
      edit_url_name: 'comment-course-edit',
      delete_uri: 'comments',
      uri: 'comments/courses',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'name',
          label: 'نام کاربر '
        },
         {
          field: 'userEmail',
          label: 'ایمیل کاربر '
        },
        {
          field: 'status',
          label: ' وضعیت تایید'
        },
        {
          field: 'is_checked',
          label: 'وضعیت بررسی'
        },
        {
          field: 'created_at',
          label: ' تاریخ ایجاد '
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

}
</script>

<style scoped>

</style>س