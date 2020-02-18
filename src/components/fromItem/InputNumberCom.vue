<template>
  <a-form-item
    :label="field.label"
    :has-feedback="field.validateOption.icon"
    :validate-status="field.validateOption.status"
    :help="field.validateOption.message"
    :label-col="field.fieldLayout.labelCol"
    :wrapper-col="field.fieldLayout.wrapperCol"
  >
    <a-input-number
      :disabled="field.disabled"
      :placeholder="field.placeholder"
      :min="field.exclusive.min"
      :max="field.exclusive.max"
      v-decorator="[field.id, {
        initialValue: field.initialValue
      }]" />
  </a-form-item>
</template>

<script>
export default {
  name: 'InputCom',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  // watch: {
  //   field: {
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
