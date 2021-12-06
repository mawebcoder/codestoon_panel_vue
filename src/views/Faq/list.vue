<template>
  <div>
    <md-card>
      <md-card-content>

        <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :delete-url="delete_uri"
                   :columns="columns">
        </DataTable>

      </md-card-content>
    </md-card>

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
      rows: ['id', 'title', 'content', 'status', 'course_id'],
      uri: 'faqs',
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
          field: 'course_id',
        }
      ],
    }
  },
  components: {
    DataTable
  },

}
</script>