import Schema from 'async-validator'
import { deepClone } from '@/utils/index'
import defaultConfig, { defaultMsg, patterns, validateUI } from '@/utils/config'
// ----------
console.log('111', patterns)
const descriptor = {
  name: [
    { required: true, message: '必填' },
    { type: 'array', min: 2, message: '至少2' }
    // { type: 'array', min: 2, message: '长度需为3' }
    // {
    //   validator: (rule, value, callback, source, options) => {
    //     console.log('rule', rule)
    //     return value !== '123'
    //   },
    //   message: '不能等于123'
    // },
    // {
    //   pattern: patterns.lowercase.regexp, message: patterns.lowercase.message
    // }
  ]
}

const validator = new Schema(descriptor)

validator.validate({ name: [] }, (error, fields) => {
  console.log('示例：', error, fields)
  if (error) {
    console.log('eg:error', error)
  }
})
// ------------
export function metaData2ViewData (MetaData, defaultConfig) {
  let serializeData = transform2Array(MetaData)
  serializeData = serialize(serializeData)
  return addValidateOption(serializeData)
}

export function validateFormItem (viewData, fieldName) {
  for (let i = 0; i < viewData.length; i++) {
    if (!viewData[i].rules || !viewData[i].rules.length) continue
    if (viewData[i].id === fieldName) {
      const descriptor = generateValidateDescriptor(viewData[i])
      console.log('descriptor:', descriptor)
      const validator = new Schema(descriptor)
      console.log('source:', viewData[i])
      validator.validate({ [fieldName]: viewData[i].value }, (error, fields) => {
        if (error) {
          // console.log('error', error)
          viewData[i].validateOption.status = 'error'
          viewData[i].validateOption.message = error[0].message
        } else {
          viewData[i].validateOption.status = 'success'
          viewData[i].validateOption.message = null
        }
      })
    }
  }
  return viewData
}

export function validateForm (viewData) {
  let result = []
  for (let i = 0; i < viewData.length; i++) {
    result = validateFormItem(viewData, viewData[i].id)
  }
  return result
}

export function updateViewDataByField (newFieldValue, viewData) { // todo 检查单field表单项，适合onChange，不适合全局表单更新
  const newViewData = deepClone(viewData)
  for (let i = 0; i < newViewData.length; i++) {
    if (newViewData[i].id === Object.keys(newFieldValue)[0]) {
      newViewData[i].value = newFieldValue[Object.keys(newFieldValue)[0]]
    }
  }
  return newViewData
}

export function viewData2MetaData (ViewData) {
  // return MetaData
}

/**
 * 将元数据转换成数组结构
 * @param metaData
 * @returns {Array}
 */
function transform2Array (metaData) {
  const arrData = []
  if ('schema' in metaData) {
    for (const [key, value] of Object.entries(metaData.schema)) {
      const item = {
        id: key,
        ...value
      }
      arrData.push(item)
    }
  }
  return arrData
}

function serialize (arrData) {
  const _arrData = deepClone(arrData)
  _arrData.forEach(item => {
    const cfg = findDefaultCfgByType(item.type)
    // init placeholder
    if (cfg.placeholder) {
      if (item.placeholder === undefined) {
        item.placeholder = cfg.placeholder
      }
    }
    // init rules
    if (!item.rules) item.rules = []

    if (item.rules.length) {
      item.rules.forEach(it => {
        it.type = cfg.type
      })
    }
    item.value = item.initialValue === undefined ? cfg.value : item.initialValue
    if (item.value === undefined) item.value = cfg.value // add initialValue
    if (item.required) { // combine validator
      if (!ifRulesHasRequired(item.rules)) {
        item.rules.push({
          type: cfg.type,
          required: item.required,
          message: defaultMsg.required
        })
      }
      delete item.required
    }
  })
  return _arrData
}

function ifRulesHasRequired (rules) {
  return rules.some(item => Object.keys(item).includes('required'))
}

function addValidateOption (viewData) {
  for (let i = 0; i < viewData.length; i++) {
    viewData[i].validateOption = {
      status: null,
      icon: validateUI.icon,
      message: null
    }
  }
  return viewData
}

function generateValidateDescriptor (fieldData) {
  if ('rules' in fieldData) {
    return {
      [fieldData.id]: fieldData.rules
    }
  }
  return {}
}

function findDefaultCfgByType (type) {
  const result = defaultConfig[type]
  if (result === undefined) throw new Error(`check if this type exist:${type}`)
  return result
}
