/* global hexo */

'use strict';


/**
 * Export theme config
 */
hexo.extend.helper.register('academic_config', function() {
  const { theme } = this;
  const exportConfig = {
    comments  : theme.comments,
  };
  return exportConfig;
});

hexo.extend.helper.register('academic_config_unique', function() {
  const { page, is_home, is_post } = this;
  return {
    sidebar  : page.sidebar || '',
    isHome   : is_home(),
    isPost   : is_post(),
    lang     : page.lang,
    comments : page.comments || '',
    permalink: page.permalink || '',
    path     : page.path || '',
    title    : page.title || ''
  };
});
