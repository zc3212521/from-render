<template>
  <a-form :form="form" layout="horizontal" :style="formDesc.ui.style">
    <a-row
      v-for="row in rows"
      :gutter="formDesc.ui.gutter"
      :key="row.key"
    >
      <template v-if="row.formItem === undefined && row.divide">
        <a-col :span="24">
          <divide-com :title="row.divide"/>
        </a-col>
      </template>
      <template v-else>
        <a-col
          v-for="item in row.formItem"
          :key="item.id"
          :span="item.grid.span"
          :offset="item.grid.offset"
        >
          <field-com :field="item" />
        </a-col>
      </template>
    </a-row>
    <footer-com
      :data="formDesc.footer"
      :callback-group="cbs"
      @click-btn="clickBtn"
    />
  </a-form>
</template>

<script>
import FieldCom from '@/components/FieldCom'
import DivideCom from '@/components/other/DivideCom'
import FooterCom from '@/components/other/FooterCom'
import * as core from '@/utils/core'

export default {
  name: 'FormRender',
  components: {
    FieldCom,
    DivideCom,
    FooterCom
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
      viewData: null,
      cbs: [this.cb]
    }
  },
  computed: {
    rows: function () {
      return this.viewData.formDesc.rows
    },
    formDesc: function () {
      return this.viewData.formDesc
    }
  },
  created () {
    this.viewData = core.metaData2ViewData(this.metaData)
    console.log(this.formDesc)
  },
  methods: {
    cb (values) {
      console.log('cb', values)
    },
    clickBtn (index, ifValidateForm) {
      let error
      if (ifValidateForm) {
        this.viewData = core.validateForm(this.viewData)
        const errors = this.viewData.formDesc.errors
        error = errors.length ? errors : null
      } else {
        error = null
      }
      const values = this.form.getFieldsValue()
      this.$emit('click-btn', error, values, index)
    }
  }
}
</script>

<style scoped>

</style>
