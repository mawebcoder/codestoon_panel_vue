<template>
  <div>
    <div @click="closeAside" class="aside-closer d-none">

    </div>
    <aside>
      <ul class="origin-ul">
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
              <router-link :to="{name:'create-article-tag'}">
                ایجاد تگ مقاله
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'list-article-tag'}">
                لیست تگ مقالات
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'list-article-tag'}">
                ایجاد دسته بندی مقاله
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'list-article-tag'}">
                لیست دسته بندی مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
              </router-link>
            </li>
          </ul>


        </li>


        <!--  factors-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              shop_2
            </md-icon>
         فاکتورها
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
              </router-link>
            </li>
          </ul>


        </li>


        <!--  admins-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
              manage_accounts
            </md-icon>
         مدیران
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
              </router-link>
            </li>
          </ul>


        </li>

        <!--  dashboard-->
        <li>
        <span @click="toggle($event)" class="drop-down-button">
            <md-icon>
           bar_chart
            </md-icon>
   گزارشگیری
          <md-icon>
            expand_more
          </md-icon>
        </span>

          <ul class="links-ul hidden">
            <li>
              <router-link :to="{name:'dashboard'}">
                داشبورد
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
              </router-link>
            </li>
          </ul>


        </li>

        <!--      send messages-->
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
              <router-link to="/panel">
                ایجاد مقاله
              </router-link>
            </li>
            <li>
              <router-link to="/panel">
                ویرایش مقالات
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

      let aside = document.querySelector('aside');
      let asideCloser = document.querySelector('.aside-closer');
      aside.style.transform = 'translateX(100%)';
      asideCloser.classList.add('d-none')

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
  li {
    padding-right: 47px;
    position: relative;
    height: 35px;

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