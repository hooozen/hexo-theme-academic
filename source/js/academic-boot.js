/* global Academic, CONFIG */

Academic.boot = {}

Academic.boot.refresh = function () {
  Academic.utils.registerActiveMenuItem()

  CONFIG.fancybox && Academic.utils.wrapImageWithFancyBox()
}

document.addEventListener('DOMContentLoaded', () => {
  Academic.boot.refresh()
})