<template>
  <div>
    <div v-for="(value,index) in items" :key="index" class="form-group">

      <template v-if="value.input_type==='text'">
        <md-field>
          <md-input :placeholder="value.title" v-model="vModels[index]"></md-input>
        </md-field>
      </template>
      <template v-else-if="value.input_type==='number'">
        <md-field>
          <md-input type="number" :placeholder="value.title" v-model="vModels[index]"></md-input>
        </md-field>
      </template>
      <template v-else-if="value.input_type==='select'">
        <template v-if="typeof(value.multiple)!='undefined' && value.multiple">
          <label>
            {{ value.title }}:
          </label>
          <multiselect @search-change="getUpdatedValueFromServer(index)" multiple style="margin-bottom: 20px"
                       selectedLabel=" "
                       selectLabel="انتخاب " deselectLabel="حذف"
                       v-model="vModels[index]"
                       :options="values[index]" :close-on-select="true"
                       :clear-on-select="false"
                       :preserve-search="true" placeholder=" " label="name"
                       track-by="name">
          </multiselect>
        </template>
        <template v-else>
          <label>
            {{ value.title }}:
          </label>
          <multiselect @@search-change="getUpdatedValueFromServer(index)" style="margin-bottom: 20px" selectedLabel=" "
                       selectLabel="انتخاب " deselectLabel="حذف"
                       v-model="vModels[index]"
                       :options="values[index]" :close-on-select="true"
                       :clear-on-select="false"
                       :preserve-search="true" placeholder=" " label="name"
                       track-by="name">
          </multiselect>
        </template>

      </template>
      <template v-else-if="value.input_type==='check'">
        <label>
          {{ value.title }}:
        </label>
        <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف"
                     v-model="vModels[index]"
                     :options="values[index]" :close-on-select="true"
                     :clear-on-select="false"
                     :preserve-search="true" placeholder=" " label="name"
                     track-by="name">
        </multiselect>
      </template>
      <template v-else-if="value.input_type==='sort'">
        <label>
          {{ value.title }}:
        </label>
        <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف"
                     v-model="vModels[index]"
                     :options="values[index]" :close-on-select="true"
                     :clear-on-select="false"
                     :preserve-search="true" placeholder=" " label="name"
                     track-by="name">
        </multiselect>
      </template>


    </div>
  </div>
</template>

<script>
import HttpVerbs from "../services/HttpVerbs";
import HelperClass from "../services/HelperClass";
import Multiselect from "vue-multiselect";

export default {
  name: "SearchComponent",
  created() {
    this.getSearchItems();
  },
  data() {
    return {
      items: [],
      vModels: [],
      values: [],
    }
  },
  methods: {
    getUpdatedValueFromServer(index) {

      this.values[index] = [{name: 'ali', value: 'ahmadi'}]

      this.$forceUpdate();
    },

    getSearchItems() {
      HttpVerbs.getRequest('articles/search-items')
          .then(res => {
            this.items = res.data.data;
            this.items.forEach((value, index) => {
              switch (value.input_type) {
                case 'text':
                  this.vModels[index] = '';
                  break;
                case "select":
                  this.vModels[index] = {};
                  this.values[index] = [{name: 'mohamamd', value: 'amiri'}]
                  break;
                case 'check':
                  this.vModels[index] = {}
                  this.values[index] = [{name: 'mohamamd', value: 'amiri'}]
                  break;
                case 'sort':
                  this.vModels[index] = {};
                  this.values[index] = [{name: 'mohamamd', value: 'amiri'}]
                  break;
                case 'number':
                  this.vModels[index] = ''
                  break;
              }
            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  components: {
    Multiselect
  }
}
</script>

<style scoped>

</style>