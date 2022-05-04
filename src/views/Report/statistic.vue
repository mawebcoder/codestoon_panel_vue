<template>
  <div>
    <div
      style="margin-bottom: 20px"
      class="row  justify-content-center align-items-center"
    >
      <md-button @click="getReports()" class="md-icon-button md-raised">
        <md-icon>refresh</md-icon>
      </md-button>
    </div>

    <div class="row">
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                کامنت های بررسی نشده دوره ها
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_course_comments }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link
                  style="color:white"
                  :to="{ name: 'comment-course-list' }"
                >
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!-- video_un_seen_comments -->
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                کامنت های بررسی نشده ویدیو ها
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_video_comments }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link
                  style="color:white"
                  :to="{ name: 'comment-video-list' }"
                >
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!-- un_checked_article_comments -->
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                کامنت های بررسی نشده مقالات
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_article_commments }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link
                  style="color:white"
                  :to="{ name: 'comment-article-list' }"
                >
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!-- un_seen_paid_vip -->
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                سفارشات بررسی نشده موفق vip
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_paid_vip }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link
                  style="color:white"
                  :to="{ name: 'factor-course-list' }"
                >
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!-- un_paid course -->
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                سفارشات بررسی نشده موفق دوره ها
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_paid_course }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link
                  style="color:white"
                  :to="{ name: 'factor-course-list' }"
                >
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

      <!-- un_seen_contacts -->
      <div class="col-4">
        <div class="statistic-box">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">
                ارتباط با ما بررسی نشده
              </div>
            </md-card-header>

            <md-card-content>
              <div class="number">
                {{ un_seen_contacts }}
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button class="md-raised md-accent">
                <router-link style="color:white" :to="{ name: 'offer-list' }">
                  مشاهده
                </router-link>
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";

export default {
  name: "statistic",
  created() {
    this.getReports();
  },
  data() {
    return {
      un_seen_article_commments: 0,
      un_seen_video_comments: 0,
      un_seen_course_comments: 0,
      un_seen_contacts: 0,
      un_seen_paid_vip: 0,
      un_seen_paid_course: 0,
    };
  },
  methods: {
    getReports() {
      this.getPaidCourseUnChecked();
      this.getPaidVipUnChecked();
      this.getUnseenVideoComments();
      this.getUnSeenArticleComments();
      this.getUnSeenCourseComments();
      this.getUnSeenConatacts();
    },

    getPaidCourseUnChecked() {
      HttpVerbs.getRequest("reports/course")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_paid_course = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
    getPaidVipUnChecked() {
      HttpVerbs.getRequest("reports/video_comment")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_video_comments = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
    getUnSeenArticleComments() {
      HttpVerbs.getRequest("reports/vip")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_article_commments = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
    getUnSeenCourseComments() {
      HttpVerbs.getRequest("reports/course_comment")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_course_comments = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
    getUnseenVideoComments() {
      HttpVerbs.getRequest("reports/contact_us")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_contacts = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
    getUnSeenConatacts() {
      HttpVerbs.getRequest("reports/article_comment")
        .then((res) => {
          let response = res.data.data;
          this.un_seen_article_commments = response;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$notify);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.md-title {
  font-size: 1em !important;
  text-align: center !important;
}

.statistic-box {
  padding: 0 10px;
  margin-bottom: 10px;
}
</style>
