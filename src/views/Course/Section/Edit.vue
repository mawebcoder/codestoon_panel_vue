<template>
  <div>

    <md-field>
      <md-input placeholder="عنوان فصل به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="عنوان فصل به لاتین..." v-model="en_name"></md-input>
    </md-field>

    <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف"
                 v-model="courseSelected"
                 :options="courseArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="دسته بندی را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <label>
      وضعیت :
    </label>

    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

    <div style="margin: 20px 0;text-align: center;font-weight: bold">
      لیست ویدیوهای این فصل :
    </div>
    <DataTable :show-delete="false" :show-select="false" :show-search="false" :items="rows" :uri="uri"
               :editUrlName="edit_url_name" :delete-url="delete_uri" :columns="columns">
    </DataTable>

  </div>
</template>

<script>
import HttpVerbs from "../../../services/HttpVerbs";
import HelperClass from "../../../services/HelperClass";

const DataTable = () => import('../../../components/DataTable')
const multiselect = () => import('vue-multiselect');
export default {
  name: "Create",
  created() {
    this.getInfo();
    this.getSectionInfo()
  },
  data() {
    return {

      rows: ['id', 'title', 'en_title', 'course_title', 'status', 'section_title', 'is_free', 'time_in_minute', 'created_at'],
      edit_url_name: 'video-edit',
      delete_uri: 'videos',
      uri: `courses/sections/${this.$route.params.id}/videos`,
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
          field: 'status',
          label: 'وضعیت'
        },
        {
          field: 'is_free',
          label: 'آیا رایگان است؟'
        },
        {
          field: 'course_title',
          label: 'عنوان دوره'
        },
        {
          field: 'section_title',
          label: 'عنوان فصل'
        },
        {
          field: 'time_in_minute',
          label: 'زمان ویدیو(دقیقه)',
        },
        {
          field: 'created_at',
          label: 'تاریخ ایجاد'
        }
      ],
      en_name: '',
      courseSelected: null,
      courseArray: [],
      status: false,
      fa_name: '',
    }
  },
  methods: {
    getSectionInfo() {
      HttpVerbs.getRequest(`courses/sections/${this.$route.params.id}/edit`)
          .then(res => {
            let result = res.data.data;
            let courseSection = result.section;
            this.fa_name = courseSection.title;
            this.en_name = courseSection.en_title;
            this.status = courseSection.status === 1;
            let course = result.course;
            if (course) {
              this.courseSelected = {name: course.title, value: course.id}
            } else {
              this.courseSelected = null;
            }
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getInfo() {
      HttpVerbs.getRequest('courses/select/box')
          .then(res => {
            let result = res.data.data;

            /**
             * refresh selectBox
             *
             * @type {null}
             */
            this.courseSelected = null;
            this.courseArray = [];

            this.setUpCategories(result);
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    setUpCategories(result) {
      result.forEach(item => {
        this.courseArray.push({name: item.title, value: item.id})
      })
      if (this.courseArray.length) {
        this.courseSelected = this.courseArray[0]
      }
    },
    getData() {
      let formData = new FormData();

      formData.append('title', this.fa_name);

      formData.append('status', this.status ? 1 : 0);

      this.en_name.trim().length ?
          formData.append('en_title', this.en_name) :
          '';

      if (this.courseSelected) {
        formData.append('course_id', this.courseSelected.value)
      }

      return formData;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest(`courses/sections/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
           close()
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  components: {
    multiselect,
    DataTable
  }
}
</script>

<style scoped>

</style>