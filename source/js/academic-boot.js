/* global Academic, CONFIG */

Academic.boot = {}

Academic.boot.refresh = function () {
  Academic.utils.registerActiveMenuItem()
}

document.addEventListener('DOMContentLoaded', () => {
  Academic.boot.refresh()
})