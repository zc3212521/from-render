<template>
  <a-form-item
    :label-col="data.layout.labelCol"
    :wrapper-col="data.layout.wrapperCol"
  >
    <a-button
      v-for="btn in buttons"
      :key="btn.text"
      :disabled="btn.disabled"
      :type="btn.type"
    >{{btn.text}}</a-button>
  </a-form-item>
</template>

<script>
export default {
  name: 'FooterCom',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttons: function () {
      return this.data.buttons
    }
  }
}
</script>

<style scoped>

</style>
