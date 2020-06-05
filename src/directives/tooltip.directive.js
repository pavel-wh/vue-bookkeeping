import localizeFilter from '@/filters/localize.filter'

export default {
  bind(el, options) {
    console.log(options)
    M.Tooltip.init(el, {
      html: options.modifiers.noloc
        ? options.value.html
        : localizeFilter(options.value.html),
      position: options.value.position ? options.value.position : 'top'
    })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
