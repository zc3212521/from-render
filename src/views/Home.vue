<template>
  <div class="home">
    <form-render :meta-data="formData" @click-btn="getClick" />
  </div>
</template>

<script>
import FormRender from '@/components/FormRender'

const exampleData = {
  formDesc: {
    // showType: 'inline', // vertical, inline, horizontal todo 此属性与 grid组件不兼容
    rows: [
      {
        divide: '分组1'
      },
      {
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
            grid: {
              span: 12,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
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
            grid: {
              span: 12,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          }
        }
      },
      {
        divide: '分组2'
      },
      {
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
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
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
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          },
          score: {
            type: 'inputNumber',
            label: '分数',
            placeholder: null,
            disabled: false,
            initialValue: 6,
            exclusive: {
              min: 0,
              max: 10
            },
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          }
        }
      }
    ],
    footer: {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14, offset: 4 }
      },
      buttons: [
        {
          text: '确定',
          type: 'primary',
          size: 'default',
          disabled: false,
          ifValidateForm: true
        },
        {
          text: '取消',
          type: 'default',
          size: 'default',
          disabled: false,
          ifValidateForm: false
        }
      ]
    },
    errors: [],
    ui: {
      style: {},
      gutter: 24
    },
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
