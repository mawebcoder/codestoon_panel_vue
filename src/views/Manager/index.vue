<template>
  <div>

    <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :deleteUri="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../components/DataTable')

export default {
  name: "list",
  data() {
    return {
      rows: [],
      edit_url_name: '',
      delete_uri: '',
      uri: 'users/admins',
      columns: [],
    }
  },
  components: {
    DataTable
  },

}
</script>

<style scoped>

</style>