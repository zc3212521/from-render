<template>
  <span>
    <template v-if="formItem.type === 'input'">
      <input-com :form-item="formItem" />
    </template>
    <template v-if="formItem.type === 'radio'">
      <radio-com :form-item="formItem" />
    </template>
  </span>
</template>

<script>
import InputCom from './InputCom'
import RadioCom from './RadioCom'

export default {
  name: 'FormRenderItem',
  components: {
    InputCom,
    RadioCom
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
