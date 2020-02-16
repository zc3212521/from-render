import * as Auth from './auth'
import moment from 'moment'
// import baseConfig from '@/baseConfig'
// import XLSX from 'xlsx'
// import { getSelectList } from '@/http/population'

String.prototype.gblen = function () { // eslint-disable-line
  var len = 0
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}

String.prototype.endWith = function (endStr) { // eslint-disable-line
  const d = this.length - endStr.length
  return (d >= 0 && this.lastIndexOf(endStr) === d)
}

const session = {
  get (key) {
    return sessionStorage.getItem(key)
  },
  set (key, value) {
    return sessionStorage.setItem(key, value)
  }
}

const local = {
  get (key) {
    return localStorage.getItem(key)
  },
  set (key, value) {
    return localStorage.setItem(key, value)
  }
}

/**
 * 获取obj的类型
 * @param obj
 * @returns {string|*}
 */
function getType (obj) {
  const str = Object.prototype.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    // 判断是否是dom元素，如div等
    return 'element'
  }
  return map[str]
}

/**
 * 深拷贝对象
 * @param ori
 * @returns {Array|any}
 */
function deepClone (ori) {
  const type = getType(ori)
  let copy
  switch (type) {
    case 'array':
      return copyArray(ori, type, copy)
    case 'object':
      return copyObject(ori, type, copy)
    default:
      return ori
  }
}

/**
 * 拷贝数组
 * @param ori
 * @param type
 * @param copy
 * @returns {Array}
 */
function copyArray (ori, type, copy = []) {
  for (const [index, value] of Object.entries(ori)) {
    copy[index] = deepClone(value)
  }
  return copy
}

/**
 * 拷贝对象
 * @param ori
 * @param type
 * @param copy
 */
function copyObject (ori, type, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    if (getType(value) === 'function') {
      copy[key] = ori[key]
    } else {
      copy[key] = deepClone(value)
    }
  }
  return copy
}

/**
 * 删除对象属性值为空或者为undefined的属性值
 * @param obj
 * @param keepEmptyString undefined/false ： 删除空字符串的字段；true: 保留空字符串的字段
 * @returns {*}
 */
const deleteEmpty = function (obj, keepEmptyString) {
  if (obj === undefined || obj === null) {
    return {}
  }
  Object.keys(obj).forEach(item => {
    if (item === 'filters') {
      Object.keys(obj[item]).forEach(it => {
        if (obj[item][it] === 'undefined' || obj[item][it] === undefined ||
          obj[item][it] === null) {
          delete obj[item][it]
        } else if (obj[item][it] === '') {
          if (!keepEmptyString) {
            delete obj[item][it]
          }
        }
      })
    } else {
      if (obj[item] === 'undefined' || obj[item] === undefined || obj[item] ===
        null) {
        // if (obj[item] === 'undefined' || obj[item] === undefined || obj[item].length <= 0) {
        delete obj[item]
      } else if (obj[item] === '') {
        if (!keepEmptyString) {
          delete obj[item]
        }
      }
    }
  })
  return obj
}
/**
 * 并列的列表转换成层级结构
 * @param obj
 * @return {*}
 */
const listConvertObj = function (list) {
  let root = null
  if (list && list.length) {
    root = {
      tagId: 0,
      parentId: null,
      draw: 0,
      pageCount: 1,
      pageNumber: 1,
      pageSize: 30,
      children: []
    }
    const group = {}
    for (let index = 0; index < list.length; index += 1) {
      if (list[index].parentId !== null && list[index].parentId !== undefined) {
        if (!group[list[index].parentId]) {
          group[list[index].parentId] = []
        }
        group[list[index].parentId].push(list[index])
      }
    }
    const queue = []
    queue.push(root)
    while (queue.length) {
      const node = queue.shift()
      node.children = group[node.tagId] && group[node.tagId].length
        ? group[node.tagId]
        : null
      if (node.children) {
        queue.push(...node.children)
      }
    }
  }
  return root
}

const log = console.log

/**
 *
 * @param title eg:['姓名', '年龄']; excel表头
 * @param obj eg: [{name: 'zhangsan', age: '20'},{name: 'lisi',age: '18'}]; 需要转换的json数组
 * @param columns eg: ['name', 'age']; json数组中对应表头的key值
 * @param showSerial: boolean ; true表示自动添加序号， 默认false
 * @returns {*[]}
 */
const json2ExcelData = (title, obj, columns, showSerial = false) => {
  if (!(title instanceof Array) || !(columns instanceof Array) ||
    !(obj instanceof Array)) {
    console.error('传入数据格式有误')
    return
  }
  if (title.length !== columns.length) {
    console.error('转换的表头数据与对应数据长度不一致')
    return
  }
  if (showSerial) {
    title.unshift('序号')
    obj.forEach((item, index) => {
      item._serial = index + 1
    })
    columns.unshift('_serial')
  }
  const aoa = [title]
  for (let i = 0; i < obj.length; i++) {
    const item = []
    for (let n = 0; n < title.length; n++) {
      item.push(obj[i][columns[n]])
    }
    aoa.push(item)
  }
  return aoa
}

/**
 * 颠倒字符串
 * @param str
 * @returns {string}
 */
const reverseString = (str) => {
  return str.split('').reverse().join('')
}

// /**
//  * 查找下拉数据字典数据
//  * @param str
//  * @return []
//  */
// const selectList = (str) => {
//   let params = {
//     'subGroupCode': str // 详情参照yapi 数据字典code
//   }
//   getSelectList(params).then((res) => {
//     // console.log(333, res)
//   })
// }
// /**
//  *
//  * 导出导入模板
//  * @param title
//  * @param fileName
//  */
// const exportMould = (title, fileName, columns, data) => {
//   let aoa = json2ExcelData(title, data, columns, false)
//   var worksheet = XLSX.utils.aoa_to_sheet(aoa)
//   var newWorkbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'sheet')
//   /* 生成文件 */
//   XLSX.writeFile(newWorkbook, fileName)
// }

/**
 * 面包屑数据生成，递归调用
 * @param routes
 * @param i
 * @param pathArr
 * @param newArr
 * @returns {Array}
 */
const formatbreadcrumb = (routes, i = 0, pathArr, newArr = []) => {
  if (i < pathArr.length && routes) {
    routes.forEach(item => {
      let pathName = item.path
      if (item.path.indexOf('/') >= 0) {
        pathName = item.path.split('/')[0]
      }
      if (pathName === pathArr[i] &&
        (pathName !== 'main' && pathName !== 'list')) {
        newArr.push({
          name: item.name
        })
        if (item.children) {
          i += 1
          formatbreadcrumb(item.children, i, pathArr, newArr)
        }
      }
    })
  }
  return newArr
}

/**
 * 根据路由名称返回面包屑数据数组
 * @param name
 * @returns {Array}
 */
const formatBreadcrumbTitle = (name) => {
  const menu = window.vm.$store.getters.getUserAuth
  let titleArr = []
  getMenuTitleByName('', name, menu, titleArr)
  titleArr = titleArr.filter(item => item.authType === 1 || (item.authType === 2 && item.actionType !== 1))
  return titleArr
}

/**
 * 根据路由名称返回面包屑数据数组辅助方法
 * @param pre
 * @param name
 * @param menu
 * @param result
 */
const getMenuTitleByName = (pre, name, menu = [], result) => {
  const formatNameArr = name.split('_')
  const currentName = pre ? pre + '_' + formatNameArr[0] : pre + formatNameArr[0]
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].name === currentName) {
      result.push({
        title: menu[i].meta.title,
        name: menu[i].name,
        authType: menu[i].meta.authType,
        actionType: menu[i].meta.actionType
      })
      if (formatNameArr.length > 1) {
        formatNameArr.shift()
        getMenuTitleByName(currentName, formatNameArr.join('_'),
          menu[i].children, result)
      }
      if (formatNameArr.length === 1) {
        return
      }
    }
  }
}

/**
 * 过滤带有权限的一级路由
 * @param permission
 * @returns {*}
 */
const filterTopRouterAuth = (permission) => {
  permission.forEach(item => {
    if (item.children && item.children.length) {
      item.children.forEach((it, n) => {
        if (it.auth) {
          item.children.splice(n, 1)
        }
      })
    }
  })
  return permission
}

/**
 * 判断arr[]:str中的某一项中存在字符串str
 * @param arr
 * @param str
 * @returns {boolean}
 */
const sliceInArr = (arr, str) => {
  if (arr instanceof Array && arr.length > 0) {
    const resultArr = arr.filter((item) => {
      return str.indexOf(item) >= 0
    })
    return resultArr.length > 0
  }
  return false
}

/**
 * 本地时间转UTC时间
 * @param local
 * @returns {string}
 */
const localDate2utc = (local) => {
  return moment(local).utc().format()
}

/**
 * UTC时间转本地时间
 * @param utc
 * @param format
 * @returns {string}
 */
const utc2localDate = (utc, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (utc == null) {
    return ''
  } else {
    return moment(utc).format(format)
  }
}

/**
 * 获取当前页面的字典项配置数组
 * @param types
 * @returns {getters.getCurrentPageDicts}
 */
const getCurrentDicts = (types = []) => {
  return window.vm.$store.getters.getCurrentPageDicts
}

/**
 * 根据字典组编码查询字典数据，并转换格式为数组
 * [{
 *       label: dictName,
 *        value: dictValue
 *      }]
 * @param itemKey 字典组编码
 * @param dicts 字典组数据，需要页面传入  this.$dict
 * @returns itemArray
 */
const formatDictsToArray = (itemKey, dicts) => {
  let dict = []
  // 根据 字典组编码 获得对应的字典项数组
  for (var key in dicts) {
    // 当前字典值拼接数据 ，1个字组为一个对象，属性只有1个 为字典组编码（dicts[key])[0]）
    if (Object.keys(dicts[key])[0] === itemKey) {
      dict = dicts[key][itemKey]
    }
  }
  // 转换字典项格式
  const dictArray = []
  dict.forEach((item) => {
    const dictItem = {}
    dictItem.label = item.itemName
    dictItem.value = item.itemValue
    dictArray.push(dictItem)
  })
  return dictArray
}

/**
 * @description: 针对查询，新增，编辑表单 转换select字典数据
 * @param obj 需要替换form的数组对象
 * @param dicts 当前页面字段对象 this.$dict
 * @param propKey 对象属性名
 * @param dictKey 字典组编码 如果字典组编码与对象属性名一致可以不传
 * @return 格式化后的数组对象
 */
const formatFormSelectDictItem = (obj, propKey, dictKey) => {
  const dicts = window.vm.$dict
  if (!dictKey) {
    dictKey = propKey
  }
  const cpObj = deepClone(obj)
  const selectOption = formatDictsToArray(dictKey, dicts)
  cpObj.forEach(item => {
    if (item.decorator[0] === propKey) {
      item.selectOptions = selectOption
    }
  })
  return cpObj
}

/**
 * 根据字典组编码查询字典数据，并转换格式为数组
 * [{
 *       label: dictName,
 *        value: dictValue
 *      }]
 * @param itemKey 字典组编码
 * @param dicts 字典组数据，需要页面传入  this.$dict
 * @param itemValue 字典值
 * @returns itemName 字典名称
 */
const getDictItemName = (itemKey, dicts, itemValue) => {
  let dict = {}
  // 根据 字典组编码 获得对应的字典项数组
  for (var key in dicts) {
    // 当前字典值拼接数据 ，1个字组为一个对象，属性只有1个 为字典组编码（dicts[key])[0]）
    if (Object.keys(dicts[key])[0] === itemKey) {
      dict = dicts[key][itemKey]
    }
  }
  // 转换字典项格式
  let itemLabel = ''
  dict.forEach((item) => {
    if (itemValue === item.itemValue) {
      itemLabel = item.itemName
    }
  })
  return itemLabel
}

/**
 * 判断str是否存在汉字
 * @param str
 * @returns {boolean}
 */
const hasHanZi = function (str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) return false
  return true
}

export {
  formatFormSelectDictItem,
  getDictItemName,
  formatDictsToArray,
  Auth,
  session,
  local,
  log,
  deepClone,
  deleteEmpty,
  listConvertObj,
  json2ExcelData,
  reverseString,
  // selectList,
  // exportMould,
  formatbreadcrumb,
  formatBreadcrumbTitle,
  filterTopRouterAuth,
  sliceInArr,
  localDate2utc,
  utc2localDate,
  getCurrentDicts,
  hasHanZi
}
