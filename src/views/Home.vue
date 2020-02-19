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
        formDesc: {
          layout: 'horizontal', // vertical, inline, horizontal
          rows: [
            {
              divide: '456'
            },
            {
              rowLayout: {
                span: 8,
                gutter: 24
              },
              formItem: {
                name: {
                  type: 'input',
                  label: '姓名',
                  rules: [
                    // { min: 2, max: 6, message: '长度在2-3之间' },
                    { len: 3, message: '长度需为3' }
                  ],
                  initialValue: '',
                  placeholder: 'input something',
                  required: true,
                  customClass: [],
                  customStyle: {},
                  fieldLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                  }
                },
                sex: {
                  type: 'radio',
                  label: '性别',
                  // initialValue: 0,
                  options: [
                    { label: '男', value: 0 },
                    { label: '女', value: 1 }
                  ],
                  required: true,
                  fieldLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                  }
                }
              }
            },
            {
              divide: '123'
            },
            {
              span: 8,
              gutter: 24,
              formItem: {
                hobby: {
                  type: 'checkbox',
                  label: '爱好',
                  initialValue: [],
                  options: [
                    { label: '篮球', value: '0' },
                    { label: '游泳', value: '1' },
                    { label: '电动', value: '2', disabled: true }
                  ],
                  rules: [
                    { min: 2, message: '必填2项' }
                  ],
                  required: true,
                  fieldLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                  }
                },
                book: {
                  type: 'select',
                  label: '书籍类型',
                  placeholder: null,
                  initialValue: '0',
                  options: [
                    { label: '古典', value: '0' },
                    { label: '言情', value: '1' },
                    { label: '科幻', value: '2', disabled: true }
                  ],
                  required: true,
                  fieldLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                  }
                },
                score: {
                  type: 'inputNumber',
                  label: '分数',
                  // placeholder: null,
                  // disabled: true,
                  initialValue: 6,
                  exclusive: {
                    min: 0,
                    max: 10
                  },
                  fieldLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                  }
                }
              }
            }
            // {
            //   span: 8,
            //   gutter: 24,
            //   formItem: {
            //     submit: {
            //       type: 'primaryButton'
            //     }
            //   }
            // }
          ],
          associate: { // 关联属性 todo 如何在ui层添加逻辑
            login: {
              value: true,
              properties: ['PW'],
              type: 'show' // 'disable'
            }
          }
        },
        api: {
          url: 'xxx',
          token: 'xxx',
          fieldName: 'data'
        }
      }
    }
  }
}
</script>
