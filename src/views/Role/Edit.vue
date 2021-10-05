<template>
  <div>
    <md-card>

      <md-card-content>
        <md-field>

          <md-input placeholder="نام نقش به فارسی..." v-model="fa_name"></md-input>
        </md-field>

        <md-field>

          <md-input placeholder="نام نقش به انگلیسی..." v-model="en_name"></md-input>
        </md-field>
        <label>
          مجوز ها :
        </label>
        <multiselect multiple selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="permissionsValues"
                     :options="permissions" :close-on-select="true"
                     :clear-on-select="false"
                     :preserve-search="true" placeholder="مجوزهای مورد نظر را انتخاب کنید..." label="name"
                     track-by="name"
        >
        </multiselect>

        <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
      </md-card-content>

    </md-card>


  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import PermissionService from "../../services/Permissions/PermissionService";
import HelperClass from "../../services/HelperClass";
import HttpVerbs from "../../services/HttpVerbs";

export default {
  name: "Create",
  created() {
    this.getPermissions();
    this.getRoleInfo(this.$route.params.id);
  },
  data() {
    return {
      fa_name: '',
      en_name: '',
      sort: 0,
      permissionsValues: [],

      permissions: [],
    }
  },
  methods: {
    getRoleInfo(roleId) {
      HttpVerbs.getRequest(`roles/${roleId}/edit`)
          .then(res => {
            let result = res.data.data;
            let permissions = result.permissions;
            let roleInfo = result.role;
            this.en_name = roleInfo.name;
            this.fa_name = roleInfo.fa_name;
            if (permissions.length) {
              permissions.forEach(item => {
                this.permissionsValues.push({
                  name: item.fa_name,
                  value: item.id
                })
              })
            }
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let permissionsIds = this.permissionsValues.map(item => {
        return item.value
      })
      return {
        name: this.en_name,
        fa_name: this.fa_name,
        ids: permissionsIds
      }
    },
    getPermissions() {
      PermissionService.getPermissions()
          .then(res => {
            let permissions = res.data.data;
            permissions.forEach(item => {
              this.permissions.push({name: item.fa_name, value: item.id})
            })

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      let roleId = this.$route.params.id
      HttpVerbs.putRequest(`roles/${roleId}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            close();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  components: {
    Multiselect
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>