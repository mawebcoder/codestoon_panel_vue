<template>
  <div>

    <DataTable  server-search-route="managers/search-items?managers=1" :items="rows"  :editUrlName="edit_url_name"
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
      rows: ['id', 'name', 'cell', 'email'],
      edit_url_name: 'edit-managers',
      delete_uri: 'users/admins',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'name',
          label: 'نام و نام خانوادگی '
        },
        {
          field: 'cell',
          label: 'شماره تماس'
        },
        {
          field: 'role',
          label: 'نقش'
        },
        {
          field: 'email',
          label: 'ایمیل'
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