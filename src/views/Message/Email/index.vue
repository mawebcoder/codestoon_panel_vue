<template>
  <div>
    <DataTable :show-edit="false" server-search-route="emails/search-items" :items="rows"

               :delete-url="delete_uri" :columns="columns">
    </DataTable>
  </div>
</template>

<script>
import DataTable from "../../../components/DataTable";

export default {
  name: "index",

  data() {
    return {

      delete_uri: 'emails',

      rows: ['ref_id',
        'id',
        'user_name',
        'email',
        'sending_status',
        'message_type',
        'mail_reason',
        'created_at'
      ],
      uri: 'factors/vips',
      columns: [
        {
          field: 'id',
          label: 'شناسه',
        },
        {
          field: 'user_name',
          label: 'نام کاربری'
        },
        {
          field: 'email',
          label: 'ایمیل کاربر'
        },
        {
          field: 'message_type',
          label: 'نوع پیام'
        }, {
          field: 'message_reason',
          label: 'علت ارسال'
        },
        {
          label: 'وضعیت ارسال',
          field: 'sending_status'
        },
        {
          label: 'تاریخ ارسال',
          field: 'created_at'
        }
      ],
    }
  },

  components: {
    DataTable
  }
}
</script>

<style scoped>

</style>