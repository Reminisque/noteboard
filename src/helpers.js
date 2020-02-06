export default function debounce(f, w, n) {
  var t, e;
  return function () {
    var c = this, a = arguments;
    function d() {
      t = null;
      n || (e = f.apply(c, a));
    }
    return (clearTimeout(t), t = setTimeout(d, w), n && !t && (e = f.apply(c, a)), e);
  }
};

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, '');
};