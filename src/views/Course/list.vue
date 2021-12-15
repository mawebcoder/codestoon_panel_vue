<template>
  <div>

    <DataTable  server-search-route="courses/search-items" :items="rows"  :editUrlName="edit_url_name"
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
      rows: ['id', 'title','category','is_vip','record_status','price' ,'percent','price_after_discount','en_title', 'status','level'],
      edit_url_name: 'course-edit',
      delete_uri: 'courses',
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
          field: 'category',
          label: 'عنوان دسته بندی'
        },
        {
          field: 'record_status',
          label: 'وضعیت ضبط'
        },
        {
          field: 'price',
          label: 'قیمت'
        },
        {
          field: 'percent',
          label: 'درصد تخفیف'
        },
        {
          field: 'price_after_discount',
          label: 'قیمت بعد از تخفیف'
        },
        {
          field: 'level',
          label: 'سطح دوره'
        },
        {
          field: 'is_vip',
          label: 'آیا اشتراک ویژه است؟'
        },
        {
          field: 'status',
          label: 'وضعیت'
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