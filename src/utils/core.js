import Schema from 'async-validator'
import { deepClone } from '@/utils/index'
import defaultConfig, { defaultMsg, validateUI } from '@/utils/config'

export function metaData2ViewData (MetaData, defaultConfig) {
  return serialize(MetaData)
}

/**
 * 将元数据转换成可用于视图展示的结构
 * @param metaData
 * @returns {Array}
 */
function serialize (metaData) {
  const _metaData = deepClone(metaData)
  if ('schema' in _metaData) {
    const { schema } = metaData
    if ('rows' in schema) {
      const { rows } = schema
      for (let i = 0; i < rows.length; i++) {
        rows[i].key = uuid()
        if (rows[i].formItem) { // 序列化 formItem
          const { formItem } = rows[i]
          let formItemArr = transformItem2Array(formItem)
          formItemArr = addDefaultConfig(formItemArr)
          formItemArr = addValidateOption(formItemArr)
          rows[i].formItem = formItemArr
        }
      }
      schema.rows = rows
      _metaData.schema = schema
    }
  } else {
    throw new Error('formData must has a property: schema')
  }
  console.log(10011, _metaData)
  return _metaData
}

function transformItem2Array (formItem) {
  const result = []
  for (const [key, value] of Object.entries(formItem)) {
    const item = {
      id: key,
      ...value
    }
    result.push(item)
  }
  return result
}

function addDefaultConfig (formItemArr) {
  formItemArr.forEach(item => {
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
  return formItemArr
}

function findDefaultCfgByType (type) {
  const result = defaultConfig[type]
  if (result === undefined) throw new Error(`check if this type exist:${type}`)
  return result
}

function ifRulesHasRequired (rules) {
  return rules.some(item => Object.keys(item).includes('required'))
}

function addValidateOption (formItemArr) {
  for (let i = 0; i < formItemArr.length; i++) {
    formItemArr[i].validateOption = {
      status: null,
      icon: validateUI.icon,
      message: null
    }
  }
  return formItemArr
}

// ----
/**
 * 根据表单名，校验视图数据，传入第二个参数表示校验名为fieldName的表单项，不传校验所有表单项
 * @param viewData
 * @param fieldName
 * @returns {*}
 */
export function validateForm (viewData, fieldName) {
  const { schema } = viewData
  if (schema.rows && schema.rows.length) {
    const { rows } = schema
    rows.forEach(item => {
      if (item.formItem) {
        const { formItem } = item
        item.formItem = validateFormItem(formItem, fieldName)
      }
    })
    schema.rows = rows
  }
  viewData.schema = schema
  return viewData
}

function validateFormItem (formItem, fieldName) {
  for (let i = 0; i < formItem.length; i++) {
    if (!formItem[i].rules || !formItem[i].rules.length) continue
    if (fieldName) { // 校验单个field
      if (formItem[i].id === fieldName) {
        formItem[i] = validateField(formItem[i])
      }
    } else { // 校验所有field
      formItem[i] = validateField(formItem[i])
    }
  }
  return formItem
}

function validateField (field) {
  const descriptor = generateValidateDescriptor(field)
  const validator = new Schema(descriptor)
  validator.validate({ [field.id]: field.value }, (error, fields) => {
    if (error) {
      // console.log('error', error)
      field.validateOption.status = 'error'
      field.validateOption.message = error[0].message
    } else {
      field.validateOption.status = 'success'
      field.validateOption.message = null
    }
  })
  return field
}

export function updateViewDataByField (newFieldValue, viewData) { // todo 检查单field表单项，适合onChange，不适合全局表单更新
  const newViewData = deepClone(viewData)
  const { schema } = newViewData
  schema.rows = schema.rows.map(item => {
    if (item.formItem) {
      const { formItem } = item
      for (let i = 0; i < formItem.length; i++) {
        if (formItem[i].id === Object.keys(newFieldValue)[0]) {
          formItem[i].value = newFieldValue[Object.keys(newFieldValue)[0]]
        }
      }
      item.formItem = formItem
    }
    return item
  })
  newViewData.schema = schema
  console.log('add new value:', newViewData)
  return newViewData
}

export function viewData2MetaData (ViewData) {
  // return MetaData
}

function generateValidateDescriptor (fieldData) {
  if ('rules' in fieldData) {
    return {
      [fieldData.id]: fieldData.rules
    }
  }
  return {}
}

function uuid () {
  return Math.random().toString(36).substr(2)
}
