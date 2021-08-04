/* tool fun */

function $(s) {
  return document.querySelector(s)
}

/* page */

window.onload = main();


function main() {
  var tocEl = $('#outline');
  var toggleEl = $('#toggle');
  var topMargin = 80;
  var tocElInaitialAbsTop = tocEl.style.top;
  var tocElInaitialTop = getTopDistance2Doc(tocEl);

  var menuEl = $('#menu');
  var menuToggle = $('#menuToggle');

  var themeIsDark = false;

  var isMenuExpand = false;

  setTocPos();
  document.addEventListener("scroll", setTocPos);

  toggleEl.addEventListener("click", switchTheme);
  toggleEl.addEventListener("tap", switchTheme);

  menuToggle.addEventListener('click', toggleMenu);
  menuToggle.addEventListener('tap', toggleMenu);

  function toggleMenu() {
    console.log(menuEl.style.height)
    if (isMenuExpand) menuEl.style.height = "0px";
    else menuEl.style.height="200px";
    isMenuExpand = !isMenuExpand;
  }

  function switchTheme() {
    if (themeIsDark) {
      toggleEl.className = 'toggle toggle--off'; 
      document.body.className = '';
    } else {
      toggleEl.className = 'toggle toggle--on'; 
      document.body.className = 'dark';
    }
    themeIsDark = !themeIsDark;
  }

  function getTopDistance2Doc(node) {
    var res = node.offsetTop || 0;
    if (node.parentNode) return res + getTopDistance2Doc(node.parentNode);
    return res;
  }

  function setTocPos() {
    var htmlDOM = document.documentElement;
    if (htmlDOM.scrollTop > tocElInaitialTop - topMargin) {
      tocEl.style.position = "fixed";
      tocEl.style.top = topMargin + "px";
    } else {
      tocEl.style.position = "absolute";
      tocEl.style.top = tocElInaitialAbsTop;
    }
  }

}
