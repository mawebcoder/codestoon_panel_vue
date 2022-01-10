<template>
  <div>
    <DataTable :show-edit="false" server-search-route="sms/search-items" :items="rows" :editUrlName="edit_url_name"
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
      edit_url_name: 'factor-course-edit',
      delete_uri: 'sms',
      rows: ['ref_id',
        'id',
        'user_name',
        'email',
        'sending_status',
        'message_type',
        'message_content',
        'message_reason',
        'web_service_name',
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
          field: 'message_content',
          label: 'متن'
        }, {
          field: 'message_reason',
          label: 'علت ارسال'
        }, {
          field: 'web_service_name',
          label: 'سرویس'
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