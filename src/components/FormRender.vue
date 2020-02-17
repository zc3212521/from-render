<template>
  <a-form :form="form">
    <template v-for="item in viewData">
      <FormRenderItem :form-item="item" :key="item._id"/>
    </template>
    <a-button @click="submit">submit</a-button>
  </a-form>
</template>

<script>
import FormRenderItem from '@/components/FormRenderItem'
import defaultConfig from '@/utils/config'
import * as core from '@/utils/core'

export default {
  name: 'FormRender',
  components: {
    FormRenderItem
  },
  props: {
    metaData: {
      type: Object,
      required: true
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      // onFieldsChange: function (props, fields) {
      //   console.log('onFieldsChange', props, fields)
      // },
      onValuesChange: (props, values) => {
        console.log('onValuesChange', props, values)
        const currentViewData = core.updateViewDataByField(values, this.viewData)
        const fieldName = Object.keys(values)[0]
        this.viewData = core.validateFormItem(currentViewData, fieldName)
      }
    })
  },
  data () {
    return {
      viewData: [],
      options: []
    }
  },
  created () {
    this.viewData = core.metaData2ViewData(this.metaData, defaultConfig)
  },
  methods: {
    submit () {
      this.viewData = core.validateForm(this.viewData)
    }
  }
}
</script>

<style scoped>

</style>
