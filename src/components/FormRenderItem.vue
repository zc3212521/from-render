<template>
  <span>
    <template v-if="formItem.type === 'input'">
      <input-com :form-item="formItem" />
    </template>
    <template v-if="formItem.type === 'radio'">
      <radio-com :form-item="formItem" />
    </template>
    <template v-if="formItem.type === 'checkbox'">
      <checkbox-com :form-item="formItem" />
    </template>
    <template v-if="formItem.type === 'select'">
      <select-com :form-item="formItem" />
    </template>
  </span>
</template>

<script>
import InputCom from './fromItem/InputCom'
import RadioCom from './fromItem/RadioCom'
import CheckboxCom from './fromItem/CheckboxCom'
import SelectCom from './fromItem/SelectCom'

export default {
  name: 'FormRenderItem',
  components: {
    InputCom,
    RadioCom,
    CheckboxCom,
    SelectCom
  },
  props: {
    formItem: {
      type: Object,
      required: true
    }
  },
  watch: {
    formItem: {
      handler: function (val, oldVal) {
        // console.log('watch', val, oldVal)
      },
      deep: true
    }
  },
  created () {
    console.log(123, this.formItem)
    this.options = this.formItem.options
  }
}
</script>

<style scoped>

</style>
