<template>
  <div class="home">
    <form-render :meta-data="formData" />
  </div>
</template>

<script>
import FormRender from '@/components/FormRender'
export default {
  name: 'Home',
  components: {
    FormRender
  },
  data () {
    return {
      formData: {
        schema: {
          name: {
            type: 'input',
            label: '姓名',
            rules: [
              // { min: 2, max: 6, message: '长度在2-3之间' },
              { len: 3, message: '长度需为3' }
            ],
            initialValue: 'nihao',
            required: true,
            properties: {
              disabled: false
              // ...
            },
            customClass: [],
            customStyle: {}
          },
          sex: {
            type: 'radio',
            label: '性别',
            // initialValue: 0,
            options: [
              { label: '男', value: 0 },
              { label: '女', value: 1 }
            ],
            required: true
          }
        },
        api: {
          url: 'xxx',
          token: 'xxx',
          fieldName: 'data'
        },
        layout: {
          // ...
        },
        customFooter: [
          {
            text: 'myConfirm',
            type: 'submit'
          },
          {
            text: 'myCancel',
            type: 'cancel'
          }
        ], // false | [] 表示使用默认footer
        associate: { // 关联属性 todo 如何在ui层添加逻辑
          login: {
            value: true,
            properties: ['PW'],
            type: 'show' // 'disable'
          }
        }
      }
    }
  }
}
</script>
