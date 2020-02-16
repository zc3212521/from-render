<template>
  <a-form-item
    :label="formItem.label"
    :has-feedback="formItem.validateOption.icon"
    :validate-status="formItem.validateOption.status"
    :help="formItem.validateOption.message"
  >
      <a-input v-decorator="[formItem.id, {
        initialValue: formItem.value
      }]"></a-input>
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
  watch: {
    formItem: {
      handler: function (val, oldVal) {
        // console.log('watch', val, oldVal)
      },
      deep: true
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
