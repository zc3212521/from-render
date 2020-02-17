<template>
  <a-form-item
    :label="formItem.label"
    :has-feedback="formItem.validateOption.icon"
    :validate-status="formItem.validateOption.status"
    :help="formItem.validateOption.message"
  >
    <a-input-number
      :disabled="formItem.disabled"
      :placeholder="formItem.placeholder"
      :min="formItem.exclusive.min"
      :max="formItem.exclusive.max"
      v-decorator="[formItem.id, {
        initialValue: formItem.initialValue
      }]" />
  </a-form-item>
</template>

<script>
export default {
  name: 'InputCom',
  props: {
    formItem: {
      type: Object,
      required: true
    }
  },
  // watch: {
  //   formItem: {
  //     handler: function (val, oldVal) {
  //       // console.log('watch', val, oldVal)
  //     },
  //     deep: true
  //   }
  // },
  created () {
  }
}
</script>

<style scoped>

</style>
