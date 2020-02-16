<template>
  <a-form-item :label="formItem.label">
      <a-radio-group v-decorator="[formItem.id, {
        initialValue: formItem.value
      }]" :options="options"></a-radio-group>
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
