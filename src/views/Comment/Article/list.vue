<template>
  <div>

    <DataTable  server-search-route="comments/search-items?type=article" :items="rows"  :editUrlName="edit_url_name"
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
      rows: ['id', 'name', 'status', 'is_checked', 'created_at','articleTitle','userEmail'],
      edit_url_name: 'comment-articles-edit',
      delete_uri: 'comments/articles',
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
          field: 'articleTitle',
          html:true,
          label: 'عنوان مقاله'
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
