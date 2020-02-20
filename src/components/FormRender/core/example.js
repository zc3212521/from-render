import Schema from 'async-validator'
import { patterns } from './config'

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

const exampleData = {
  schema: {
    name: {
      type: 'input',
      label: '姓名',
      rules: [
        { min: 2, max: 6, message: '长度在2-3之间' },
        { len: 3, message: '长度需为3' },
        { whitespace: true, message: 'no whitespace' }
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

console.log('---', types, exampleData)
