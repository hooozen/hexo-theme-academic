if (!window.Academic) window.Academic = {}

void function() {
  const className = 'academic-config'

  const staticConfig = {}
  let variableConfig = {}

  const parse = text => JSON.parse(text || '{}')

  const update = name => {
    const targetEle = document.querySelector(`.${className}[data-name="${name}"]`)
    if (!targetEle) return
    const parsedConfig = parse(targetEle.text)
    if (name === 'main') {
      Object.assign(staticConfig, parsedConfig)
    } else {
      variableConfig[name] = parsedConfig
    }
  }

  update('main')

  window.CONFIG = new Proxy({}, {
    get(overrideConfig, name) {
      let existing
      if (name in staticConfig) {
        existing = staticConfig[name]
      } else {
        if (!(name in variableConfig)) update(name)
        existing = variableConfig[name]
      }
      return existing
    }
  })
}()