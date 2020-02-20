import Schema from 'async-validator'
import { patterns } from './config'

export const exampleData = {
  formDesc: {
    rows: [
      {
        type: 'group',
        content: '分组1'
      },
      {
        type: 'formItem',
        content: {
          name: {
            type: 'input',
            label: '姓名',
            rules: [
              // { min: 2, max: 6, message: '长度在2-3之间' },
              { len: 3, message: '长度需为3' }
            ],
            initialValue: '',
            placeholder: 'placeholder',
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
        type: 'group',
        content: '分组2'
      },
      {
        type: 'formItem',
        content: {
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
        wrapperCol: { span: 14, offset: 2 }
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
      style: { padding: '20px' },
      gutter: 16
      // showType: 'inline', // vertical, inline, horizontal todo 此属性与 grid组件不兼容
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

console.log('schema.pattern', Schema.pattern)
const descriptor = {
  name: [
    // { type: 'any'  },
    { type: 'any', required: true, message: '不能为空' },
    // {
    //   validator: (rule, value, callback, source, options) => {
    //     console.log('rule', rule)
    //     return value !== '123'
    //   },
    //   message: '不能等于123'
    // },
    {
      pattern: patterns.lowercase.regexp, message: patterns.lowercase.message
    }
  ]
}
const validator = new Schema(descriptor)
validator.validate({ name: null }, (error, fields) => {
  console.log('eg:', error, fields)
  if (error) {
    console.log('eg:error', error)
  }
})
const types = ['input', 'radio', 'selector', 'checkbox']
const exampleData1 = {
  schema: {
    name: {
      type: 'input',
      label: '姓名',
      rules: [
        { min: 2, max: 6, message: '长度在2-3之间' },
        { len: 3, message: '长度需为3' },
        { whitespace: true, message: 'placeholder' }
      ],
      required: true,
      initialValue: '666',
      properties: {
        disabled: false
        // ...
      },
      layout: {},
      customClass: [],
      customStyle: {}
    },
    sex: {
      type: 'radio',
      label: '性别',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
      ],
      initialValue: 0
    },
    hobby: {
      type: 'checkbox',
      label: '爱好',
      options: [
        { label: '看书', value: 0 },
        { label: '健身', value: 1 },
        { label: '打篮球', value: 2 }
      ],
      initialValue: [0, 1]
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
console.log('---', types, exampleData1)
