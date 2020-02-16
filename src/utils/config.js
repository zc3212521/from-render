const defaultConfig = {
  input: {
    value: '',
    type: 'string'
  },
  radio: {
    value: '',
    type: 'any'
  },
  checkbox: {
    value: [],
    type: 'array'
  },
  selector: {
    value: [],
    type: 'any'
  }
}

export const defaultMsg = {
  required: '此项为必选项！',
  range: '此项需大于{min}小于{max}',
  len: '此项长度为{len}',
  whitespace: '不能是空格'
}

export const patterns = {
  lowercase: { // todo 添加模式邮箱，url...
    regexp: /^[a-z]+$/,
    message: '填入内容非小写字母！'
  }
}

export const validateUI = {
  icon: true
}

export function getAllTypes () {
  return Object.keys(defaultConfig)
}

export default defaultConfig
