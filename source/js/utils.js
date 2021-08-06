void

function () {
  const onPageLoaded = () => document.dispatchEvent(
    new Event('page:loaded'), {
      bubbles: true
    }
  )

  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', onPageLoaded, {
      once: true
    })
  } else {
    onPageLoaded()
  }
}()

Academic.utils = {
  getScript: function (src, options = {}, legacyCondition) {
    if (typeof options === 'function') {
      return this.getScript(src, {
        condition: legacyCondition
      }).then(options);
    }
    const {
      condition = false,
        attributes: {
          id = '',
          async = false,
          defer = false,
          crossOrigin = '',
          dataset = {},
          ...otherAttributes
        } = {},
        parentNode = null
    } = options;
    return new Promise((resolve, reject) => {
      if (condition) {
        resolve();
      } else {
        const script = document.createElement('script');

        if (id) script.id = id;
        if (crossOrigin) script.crossOrigin = crossOrigin;
        script.async = async;
        script.defer = defer;
        Object.assign(script.dataset, dataset);
        Object.entries(otherAttributes).forEach(([name, value]) => {
          script.setAttribute(name, String(value));
        });

        script.onload = resolve;
        script.onerror = reject;

        if (typeof src === 'object') {
          const {
            url,
            integrity
          } = src;
          script.src = url;
          if (integrity) {
            script.integrity = integrity;
            script.crossOrigin = 'anonymous';
          }
        } else {
          script.src = src;
        }
        (parentNode || document.head).appendChild(script);
      }
    });
  },

  loadComments: function (selector, legacyCallback) {
    if (legacyCallback) {
      return this.loadComments(selector).then(legacyCallback);
    }
    return new Promise(resolve => {
      const element = document.querySelector(selector);
      if (!CONFIG.comments.lazyload || !element) {
        resolve();
        return;
      }
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;

        resolve();
        observer.disconnect();
      });
      intersectionObserver.observe(element);
    });
  },

  registerActiveMenuItem: function () {
    console.log('xxx')
    document.querySelectorAll('a[href].nav-item').forEach(target => {
      console.log(target)
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      const isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
      target.classList.toggle('nav-item--active', target.hostname === location.hostname && (isSamePath || isSubPath));
    });
  },

}