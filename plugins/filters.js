import dayjs from 'dayjs'
import Vue from 'vue'

Vue.filter('formatDate', (value, format) => {
  return dayjs(value).format(format)
})
