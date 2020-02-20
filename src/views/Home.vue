<template>
  <div class="home">
    <form-render :meta-data="formData" @click-btn="getClick" />
  </div>
</template>

<script>
import FormRender from '@/components/FormRender/index'
import { exampleData } from '@/components/FormRender/core/example'

export default {
  name: 'Home',
  components: {
    FormRender
  },
  data () {
    return {
      formData: exampleData
    }
  },
  methods: {
    getClick (error, values, index) {
      if (error) {
        console.log('校验失败，查看错误：', error)
        return
      }
      console.log(`第${index}个按钮被点击了, values:`, values)
    }
  }
}
</script>
