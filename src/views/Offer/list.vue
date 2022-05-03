<template>
  <div>
    <DataTable
      server-search-route="contacts/search-items"
      :items="rows"
      :editUrlName="edit_url_name"
      :delete-url="delete_uri"
      :columns="columns"
    >
    </DataTable>
  </div>
</template>

<script>
const DataTable = () => import("../../components/DataTable");

export default {
  name: "list",
  data() {
    return {
      rows: [
        "id",
        "email",
        "cell",
        "status",
        "name",
        "last_name",
        "content",
        "title",
      ],
      edit_url_name: "course-category-edit",
      delete_uri: "contacts",
      columns: [
        {
          field: "id",
          label: "شناسه",
        },
        {
          field: "title",
          label: "عنوان",
        },
        {
          field: "content",
          label: "متن",
        },
        {
          field: "email",
          label: "ایمیل",
        },
        {
          field: "cell",
          label: "شماره تلفن",
        },
        {
          field: "status",
          label: "وضعیت",
        },
        {
          field: "name",
          label: "نام",
        },
        {
          field: "last_name",
          label: "نام خانوادگی",
        },
      ],
    };
  },
  components: {
    DataTable,
  },
  mounted() {},
};
</script>

<style scoped></style>
