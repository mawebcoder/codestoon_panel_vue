<template>
  <div>

    <md-card style = "background: rgba(197,197,197,0.41)">
      <md-card-header>
        <div class = "row">
          <div class = "col-6 row ">
            نام کاربری: {{ parent.user.username }}
          </div>
          <div class = "col-6 row ">
            ایمیل کاربر : {{ parent.user.email }}
          </div>
        </div>
        <div class = "row" style = "margin:20px 0">
          <div class = "col-6 row ">

            عنوان ویدیو : {{ parent.videoTitle }}

          </div>
          <div class = "col-6 row ">
            تاریخ : {{ parent.created_at }}
          </div>
        </div>
      </md-card-header>

      <md-card-content v-html = "parent.text"></md-card-content>

      <md-card-content>
        <div class = "row">
          وضعیت : {{ parent.status }}
        </div>
      </md-card-content>

      <md-card-content>
        <div class = "row">
          وضعیت بررسی : {{ parent.is_checked }}
        </div>
      </md-card-content>

      <div class = "row">
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div></div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button class = "md-raised md-primary">
              <a v-if = "!parent.isAdmin" style = "color: #FFFFFF" href = "#answerBox">
                پاسخ
              </a>
              <small v-else>
                پاسخ مدیر
              </small>
            </md-button>
          </div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button @click = "switchChecked(parent.id)" v-if = "!parent.intChecked" class = "md-raised" :md-ripple = "false">تغییر به بررسی شده</md-button>
          </div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button @click = "approve(parent.id)" class = "md-raised">{{ parent.intStatus ? '  عدم تایید' : ' تایید' }}</md-button>
          </div>

        </div>
      </div>
    </md-card>

    <!--    children-->
    <md-card md-with-hover v-for = "(value,index) in children" :key = "index" style = "margin: 10px 0">
      <md-card-header>
        <div class = "row">
          <div class = "col-6">
            نام کاربری : {{ value.user.username }}
          </div>
          <div class = "col-6">
            تاریخ : {{ value.created_at }}
          </div>
        </div>
        <div class = "row" style = "margin:20px 0">
          <div class = "col-6">
            عنوان ویدیو : {{ value.videoTitle }}
          </div>
        </div>
      </md-card-header>

      <md-card-content v-html = "value.text"></md-card-content>

      <md-card-content>
        <div class = "row">
          وضعیت : {{ value.status }}
        </div>
      </md-card-content>

      <md-card-content>
        <div class = "row">
          وضعیت بررسی : {{ value.is_checked }}
        </div>
      </md-card-content>
      <div class = "row">
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>

          </div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button class = "md-raised md-primary">

              <a v-if = "!value.isAdmin" style = "color: #FFFFFF" href = "#answerBox">
                پاسخ
              </a>
              <small v-else>
                پاسخ مدیر
              </small>
            </md-button>
          </div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button @click = "switchChecked(value.id)" v-if = "!value.intChecked" class = "md-raised" :md-ripple = "false">تغییر به بررسی شده</md-button>
          </div>
        </div>
        <div style = "padding: 5px" class = "col-3 col-576-6 row justify-content-center">
          <div>
            <md-button @click = "approve(value.id)" class = "md-raised">{{ value.intStatus ? '   عدم تایید' : ' تایید' }}</md-button>
          </div>
        </div>
      </div>
    </md-card>
    <label>
      متن پاسخ :
    </label>
    <div id = "answerBox"></div>
    <editor v-model = "answerText" api-key = "214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l" :init = "{
                menubar: true,
                language:'fa',
                direction:'ltr',
                plugins: [
                'advlist directionality codesample autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'table emoticons template paste help'
                 ],
                width: 1000,
                height: 300,
                images_upload_url:$store.state.baseUrl+'editor/upload',
                // image_upload_base_path:$store.state.baseUrl,
                toolbar: 'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                'forecolor backcolor emoticons | help | rtl ltr',
                 }" />

    <md-button @click = "submit" class = "md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HttpVerbs from "../../../services/HttpVerbs";
import HelperClass from "../../../services/HelperClass";

const Editor = () => import('@tinymce/tinymce-vue')

export default {

  name: 'Edit',
  created()
  {
    this.getInfo();
  },
  data()
  {
    return {
      answerText: '',
      children: [],
      show_dialog: false,
      video_id: null,
      parent: null,
      type: null,
      commentId: null,
    }
  },
  methods: {
    getInfo()
    {
      HttpVerbs.getRequest(`comments/video/${this.$route.params.id}/edit`)
               .then(res =>
                     {
                       let result = res.data;
                       this.parent = result.parent;
                       this.children = result.children;
                       this.type = result.type;
                       this.video_id = result.video_id;
                     }).catch(error =>
                              {
                                HelperClass.showErrors(error, this.$noty)
                              })
    },
    submit()
    {

      let ApiRoutes = `comments/videos/${this.$route.params.id}/${this.video_id}`;

      let data = new FormData();

      data.append('text', this.answerText);

      HttpVerbs.postRequest(ApiRoutes, data)
               .then(() =>
                     {
                       HelperClass.showSuccess(this.$noty);
                       this.answerText = '';
                       this.getInfo();
                     }).catch(error =>
                              {
                                HelperClass.showErrors(error, this.$noty)
                              })

    },
    approve(commentId)
    {
      let data = new FormData();

      data.append('ids', JSON.stringify([commentId]))

      HttpVerbs.putRequest(`comments/video/switch/status`, data)
               .then(() =>
                     {
                       HelperClass.showSuccess(this.$noty, false)
                       this.getInfo()
                     }).catch(error =>
                              {
                                HelperClass.showErrors(error, this.$noty)
                              })
    },
    switchChecked(commentId)
    {
      let data = new FormData();

      data.append('ids', JSON.stringify([commentId]))

      HttpVerbs.putRequest(`comments/video/switch/check`, data)
               .then(() =>
                     {
                       HelperClass.showSuccess(this.$noty, false)
                       this.getInfo()
                     }).catch(error =>
                              {
                                HelperClass.showErrors(error, this.$noty)
                              })
    }
  },
  components: {
    Editor,
  }
}
</script>
