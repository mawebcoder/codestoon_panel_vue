<template>
  <div>

    <DataTable  server-search-route="faqs/search-items" :items="rows"  :editUrlName="edit_url_name"
                :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
import DataTable from "../../components/DataTable";

export default {
  name: "list",
  data() {
    return {
      edit_url_name: 'faq-edit',
      delete_uri: 'faqs',
      rows: ['id', 'title', 'content', 'status', 'course_title'],
      columns: [
        {
          label: 'شناسه',
          field: 'id',
        },
        {
          label: 'عنوان',
          field: 'title',
        },
        {
          label: 'پاسخ',
          field: 'content',
        },
        {
          label: 'وضعیت',
          field: 'status',
        },
        {
          label: 'دوره مورد نظر',
          field: 'course_title',
        }
      ],
    }
  },
  components: {
    DataTable
  },

}
</script>