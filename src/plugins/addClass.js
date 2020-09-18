import Vue from 'vue'
const path = require('path')
const formatCase = (string, format) => {
  let convert = ''
  if (format === 'lowcase') {
    convert = string.toLowerCase()
  }
  if (format === 'kebabcase') {
    convert = string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('-')
  }
  return convert
}

Vue.directive('addClass', {
  inserted: (el, binding, vnode) => {
    const componentName =
      vnode.context.$options._componentTag ||
      vnode.context.$options.name
    const filename = path.basename(componentName)
    const kebabcase = formatCase(
      filename.split('.').shift(),
      'kebabcase'
    )
    const map = binding.value.map(
      v => kebabcase + '-' + formatCase(v, 'kebabcase')
    )
    map.push(el.className)
    el.className = map.join(' ')
  }
})
