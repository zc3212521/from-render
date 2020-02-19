<template>
  <a-form :form="form" :layout="metaData.formDesc.layout">
    <a-row v-for="row in rows"  :key="row.key">
      <a-col v-if="row.formItem === undefined && row.divide">
        <divide-com :title="row.divide" />
      </a-col>
      <template v-else>
        <a-col v-for="item in row.formItem"  :key="item.id" >
          <field-com :field="item" />
        </a-col>
      </template>
    </a-row>
    <a-button @click="submit">submit</a-button>
  </a-form>
</template>

<script>
import FieldCom from '@/components/FieldCom'
import DivideCom from '@/components/fromItem/DivideCom'
import * as core from '@/utils/core'

export default {
  name: 'FormRender',
  components: {
    FieldCom,
    DivideCom
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
        console.log('validate', currentViewData)
        this.viewData = core.validateForm(currentViewData, fieldName)
      }
    })
  },
  data () {
    return {
      viewData: null
    }
  },
  computed: {
    rows: function () {
      return this.viewData.formDesc.rows
    }
  },
  created () {
    this.viewData = core.metaData2ViewData(this.metaData)
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
