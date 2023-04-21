/* tool fun */

function $(s) {
  return document.querySelector(s);
}

/* page */

window.onload = main();

function main() {
  toString()
  menu()
}

function tocScroll() {

  var tocEl = $('#outline');
  if (tocEl == null) return
  var topMargin = 80;
  var tocElInaitialAbsTop = tocEl.style.top;
  var tocElInaitialTop = getTopDistance2Doc(tocEl);

  setTocPos();
  document.addEventListener("scroll", setTocPos);

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

function menu() {

  var menuEl = $('#menu');
  var menuToggleEl = $('#menuToggle');


  var menuToggle = {
    isExpand: false,

    sleep() {
      menuEl.style.height = "auto";
      this.isExpand = false;
    },

    expand() {
      menuEl.style.height = window.innerHeight - 60 + 'px';
      this.isExpand = true;
    },

    fold() {
      menuEl.style.height = "0px";
      this.isExpand = false;
    },

    toggle() {
      console.log(this);
      if (this.isExpand) this.fold();
      else this.expand();
    }
  };


  menuToggleEl.addEventListener('click', function (e) { menuToggle.toggle(); });
  menuToggleEl.addEventListener('tap', function (e) { menuToggle.toggle(); });

  window.addEventListener('resize', resizeHanlder());

  function resizeHanlder() {
    var formerWidth = window.innerWidth;
    return function () {
      widthBreakpointHanlder(formerWidth);
      formerWidth = window.innerWidth;
    };
  }

  function widthBreakpointHanlder(formerWidth) {

    if (formerWidth < 767 && window.innerWidth >= 767) {
      console.info('to desktop breakpoint');
      menuToggle.sleep();
    }

    if (formerWidth >= 767 && window.innerWidth < 767) {
      console.info('to mobile breakpoint');
      menuToggle.fold();
    }
  }
}
