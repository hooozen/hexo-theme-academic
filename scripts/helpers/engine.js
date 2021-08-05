const crypto = require('crypto')

hexo.extend.helper.register('academic_inject', function(point) {
  return this.theme.injects[point]
    .map(item => this.partial(item.layout, item.locals, item.options))
    .join('');
});

hexo.extend.helper.register('academic_js', function(file) {
  const src =this.url_for(`${this.theme.js}/${file}`)

  return `<script src="${src}"></script>`;
});


hexo.extend.helper.register('academic_data', function (name, ...data) {
  const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
  return `<script class="academic-config" data-name="${name}" type="application/json">${
    JSON.stringify(json).replace(/</g, '\\u003c')
  }</script>`;
});

hexo.extend.helper.register('gitalk_md5', function(path) {
  const str = this.url_for(path);
  return crypto.createHash('md5').update(str).digest('hex');
});