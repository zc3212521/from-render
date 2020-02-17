<template>
  <a-form-item
    :label="formItem.label"
    :has-feedback="formItem.validateOption.icon"
    :validate-status="formItem.validateOption.status"
    :help="formItem.validateOption.message"
  >
    <a-radio-group v-decorator="[formItem.id, {
        initialValue: formItem.initialValue
      }]" :options="options"/>
  </a-form-item>
</template>

<script>
export default {
  name: 'RadioCom',
  props: {
    formItem: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    this.options = this.formItem.options
  }
}
</script>

<style scoped>

</style>
