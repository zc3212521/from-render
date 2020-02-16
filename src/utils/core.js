import Schema from 'async-validator'
import { deepClone } from '@/utils/index'
import { defaultMsg, validateUI } from '@/utils/config'

export function metaData2ViewData (MetaData, defaultConfig) {
  let serializeData = transform2Array(MetaData)
  serializeData = combineValidator(serializeData)
  return addVadatorOptions(serializeData)
}

export function validateFormItem (viewData, fieldName) {
  for (let i = 0; i < viewData.length; i++) {
    if (!viewData[i].rules || !viewData[i].rules.length) continue
    if (viewData[i].id === fieldName) {
      const descriptor = generateValidateDescriptor(viewData[i])
      const validator = new Schema(descriptor)
      validator.validate({ [fieldName]: viewData[i].value }, (error, fields) => {
        if (error) {
          console.log('error', error)
          viewData[i].validateOption.status = 'error'
          viewData[i].validateOption.message = error[0].message
        } else {
          viewData[i].validateOption.status = 'success'
        }
      })
    }
  }
  return viewData
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

function combineValidator (arrData) {
  const _arrData = deepClone(arrData)
  _arrData.forEach(item => {
    if (item.required) {
      // 检查rules配置中有无required
      if (!ifRulesHasRequired(item.rules)) {
        item.rules.push({
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

function addVadatorOptions (viewData) {
  for (let i = 0; i < viewData.length; i++) {
    if (viewData[i].rules && viewData[i].rules.length) {
      viewData[i].validateOption = {
        status: null,
        icon: validateUI.icon,
        message: null
      }
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
