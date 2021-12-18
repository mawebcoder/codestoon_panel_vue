<template>
  <div>
    <div @click="closeAside" class="aside-closer d-none">

    </div>
    <aside>
      <ul class="origin-ul">

        <!--  dashboard-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
           bar_chart
            </md-icon>
    نمودار

          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>

              <small></small>

              <router-link :to="{name:'chart'}">
                چارت ها

              </router-link>
            </li>
          </ul>


        </li>


        <!--  notifications-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
           notifications
            </md-icon>
    اعلانات

          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link :to="{name:'statistic'}">
               اعلانات 
              </router-link>
            </li>

          </ul>


        </li>


        <!--  roles-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              verified_user
            </md-icon>
         نقش ها
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'role-create'}">
                ایجاد نقش جدید
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'role-list'}">
                لیست نقش ها
              </router-link>
            </li>
          </ul>


        </li>


        <!--      users-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              people
            </md-icon>
         کاربران
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'user-create'}">
                ایجاد کاربر جدید
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'user-list'}">
                لیست کاربران
              </router-link>
            </li>
          </ul>


        </li>


        <!--  factors-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              shopping_cart
            </md-icon>
         سفارشات
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'factor-course-list'}">
                لیست سفارشات
              </router-link>
            </li>
          </ul>


        </li>

        <!--    discount code-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              emoji_symbols
            </md-icon>
         کدهای تخفیف
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'discount-create'}">
                ایجاد کد تخفیف
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'discount-list'}">
                لیست کدهای تخفیف
              </router-link>
            </li>
          </ul>


        </li>

        <!--      comments-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              comment
            </md-icon>
         نظرات کاربران
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'comment-article-list'}">
                لیست نظرات مقالات
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'comment-course-list'}">
                لیست نظرات دوره ها
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'comment-video-list'}">
                لیست نظرات ویدیوها
              </router-link>
            </li>
          </ul>


        </li>

        <!--      offers-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              local_offer
            </md-icon>
         انتقادات و پیشنهادات
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'offer-list'}">
                لیست انتقادات و پیشنهادات
              </router-link>
            </li>
          </ul>


        </li>


        <!--      contact us-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              cable
            </md-icon>
       ارتباط با ما
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'offer-list'}">
                لیست ارتباط با ما
              </router-link>
            </li>
          </ul>


        </li>

        <!--      settings-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              settings
            </md-icon>
         تنظیمات
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'setting'}">
                تنظیمات سایت
              </router-link>
            </li>
          </ul>


        </li>

        <!--      send messages-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              email
            </md-icon>
     ارسال پیام
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'email'}">
                ارسال ایمیل
              </router-link>
            </li>

            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'sms'}">
                ارسال sms
              </router-link>
            </li>

          </ul>


        </li>

        <!--      vip-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              map
            </md-icon>
       پلن های VIP
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'vip-create'}">
                ایجاد پلن
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'vip-list'}">
                لیست پلن ها
              </router-link>
            </li>
          </ul>


        </li>

        <!--      courses-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              missed_video_call
            </md-icon>
          دوره ها
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-tag-create'}">
                ایجاد تگ دوره
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'course-tag-list'}">
                لیست تگ دوره ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-category-create'}">
                ایجاد دسته بندی دوره ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-category-list'}">
                لیست دسته بندی دوره ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-section-create'}">
                ایجاد فصل
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-section-list'}">
                لیست فصل ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-create'}">
                ایجاد دوره جدید
              </router-link>
            </li>

            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-list'}">
                لیست دوره ها
              </router-link>
            </li>

          </ul>


        </li>

        <!--      videos-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              play_circle_filled
            </md-icon>
          ویدیو ها
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'video-create'}">
                آپلود ویدیو جدید
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'video-list'}">
                لیست ویدیو ها
              </router-link>
            </li>
          </ul>


        </li>

        <!--      articles-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              article
            </md-icon>
          مقالات
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>
              <router-link :to="{name:'create-article-tag'}">
                ایجاد تگ مقاله
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'list-article-tag'}">
                لیست تگ مقالات
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'category-article-create'}">
                ایجاد دسته بندی مقاله
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'category-article-list'}">
                لیست دسته بندی مقالات
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'article-create'}">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <small></small>
              <router-link @click.native="closeAside" :to="{name:'article-list'}">
                لیست مقالات
              </router-link>
            </li>
          </ul>


        </li>
        <!--  personal info-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              account_box
            </md-icon>
         اطلاعات شخصی
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'personal-info'}">
                ویرایش اطلاعات فردی
              </router-link>
            </li>
          </ul>


        </li>

        <!--      faq-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              contact_support
            </md-icon>
       سوالات متداول
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>

              <small></small>

              <router-link @click.native="closeAside" :to="{name:'faq-create'}">
                ایجاد سوال جدید
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'faq-list'}">
                لیست سوالات
              </router-link>
            </li>
          </ul>


        </li>

        <!--      recycle bin-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              recycling
            </md-icon>
     بازیافت اطلاعات
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'users-garbage'}">
                کاربران
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'factors-garbage'}">
                فاکتورها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-garbage'}">
                دوره ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-category-garbage'}">
                دسته بندی دوره ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-section-garbage'}">
                فصل ها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'course-videos-garbage'}">
                ویدیوها
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'article-garbage'}">
                مقالات
              </router-link>
            </li>
            <li>
              <small></small>

              <router-link @click.native="closeAside" :to="{name:'article-category-garbage'}">
                دسته بندی مقالات
              </router-link>
            </li>


          </ul>


        </li>

        <!--    monitoring tools-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
             developer_board
            </md-icon>
     توسعه دهندگان
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <small></small>
              <a target="_blank" href="https://digikala.com">
                horizon
              </a>
            </li>

            <li>
              <small></small>
              <a target="_blank" href="https://digikala.com">
                sentry
              </a>
            </li>

            <li>
              <small></small>
              <router-link to="/">
                model_logs
              </router-link>

            </li>


          </ul>


        </li>


      </ul>
    </aside>
  </div>

</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    closeAside() {
      let windowWidth = window.innerWidth;

      if (windowWidth <= 768) {
        let aside = document.querySelector('aside');
        let asideCloser = document.querySelector('.aside-closer');
        aside.style.transform = 'translateX(100%)';
        asideCloser.classList.add('d-none')
      }


    },
    toggle(event) {

      let element = event.target;
      let ul = element.parentElement.querySelector('ul');
      ul.classList.toggle('hidden');
      ul.classList.toggle('visible')

    }
  },
  mounted() {
    // get size of the device
    let size = window.innerWidth;

    if (size <= 768) {

      let aside = document.querySelector('aside');

      let asideCloser = document.querySelector('.aside-closer');

      let side_bar_links = document.querySelectorAll('aside a');

      side_bar_links.forEach(item => {

        item.addEventListener('click', () => {

          aside.style.transform = 'translateX(100%)';
          asideCloser.classList.add('d-none')

        })

      })

    }

    let li_links = document.querySelectorAll('.links-ul li');

    li_links.forEach(item => {

      item.addEventListener('click', function (e) {

        li_links.forEach(item2 => {
          console.log(item2)
          item2.querySelector('small').style.backgroundColor = 'transparent';
        })

        e.target.closest('li').querySelector('small').style.backgroundColor = 'orange'
      })


    })

  }
}
</script>

<style scoped lang="scss">
@import "../assets/variables";

aside {
  background-color: #fff;
  min-height: 100px;
  border-top: 1px solid rgba(118, 122, 115, 0.3);


}

.origin-ul {

  > li {
    min-height: 50px;

    .drop-down-button {
      height: 50px;
      display: block;
      width: 100%;
      padding-right: 47px;
      line-height: 47px;
      position: relative;
      cursor: pointer;

      &:hover {
        color: $sideBarFontColor;
      }

      &:hover i:nth-child(1) {
        color: $sideBarFontColor;
      }

      i:first-child {
        position: absolute;
        right: 10px;
        top: 10px;
      }

      i:nth-child(2) {
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
  }
}

.links-ul {
  //background-color: rgba(191, 190, 180, 0.2);
  background: #d8e3e3;
  box-shadow: 0 0 15px 6px #d8e3e3;

  li {
    padding-right: 47px;

    position: relative;
    line-height: 34px;
    height: 35px;

    a {
      line-height: 34px;
    }

    small {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      border: 1px solid rgba(136, 135, 128, 0.38);
      top: 13px;
      position: absolute;
      z-index: 2;
      right: 22px;
    }

    &:hover small {
      background-color: orange;
    }

    i {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}


.links-ul li a {
  text-decoration: none;
  color: rgba(74, 76, 72, 0.85);
  font-size: .9em;

  &:hover {
    display: block;
    width: 100%;
    color: rgba(248, 22, 12, 0.77);
    height: 100%;
    transition: .2s;
  }

}

.hidden {
  max-height: 0;
  overflow: hidden;
}

.visible {
  max-height: 1000px;
}

.aside-closer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(97, 96, 90, 0.44);
  z-index: 899;

}
</style>
