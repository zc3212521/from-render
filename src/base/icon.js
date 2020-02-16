import { Icon } from 'ant-design-vue'
import Vue from 'vue'
import baseConfig from '../baseConfig'

import localIcon from '@/assets/font/font'

const iconUrl = baseConfig.icon.scriptUrl

const icon = baseConfig.icon.localLoad ? localIcon : iconUrl

const MyIcon = Icon.createFromIconfontCN(icon)
Vue.component('my-icon', MyIcon)
