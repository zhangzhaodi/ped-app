(function() {
  var goog = goog || {};
  goog.global = this;
  goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
    var parts = name.split(".");
    var cur = opt_objectToExportTo || goog.global;
    if (!(parts[0] in cur) && cur.execScript) cur.execScript("var " + parts[0]);
    for (var part; parts.length && (part = parts.shift()); )
      if (!parts.length && opt_object !== undefined) cur[part] = opt_object;
      else if (cur[part]) cur = cur[part];
      else cur = cur[part] = {};
  };
  goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
    goog.exportPath_(publicPath, object, opt_objectToExportTo);
  };
  goog.exportProperty = function(object, publicName, symbol) {
    object[publicName] = symbol;
  };
  function m(w) {
    function Q(a, b, c) {
      window.getSelection()
        ? window.getSelection().removeAllRanges()
        : document.selection.empty();
      k.save();
      k.moveTo(a, b);
      F = (C / 2) * (A / 320);
      J &&
        (H(document, "mousemove", J),
        H(document, "touchmove", J),
        H(document, "mouseup", K),
        H(document, "touchend", K));
      "touchstart" == c
        ? (L(document, "touchmove", J), L(document, "touchend", K))
        : (L(document, "mousemove", J), L(document, "mouseup", K));
      x = null;
      N(a, b);
    }
    function N(a, b) {
      var c, d;
      if (
        p.length &&
        ((c = p[p.length - 1]),
        (d = Math.sqrt((c.x - a) * (c.x - a) + (c.y - b) * (c.y - b))),
        !d)
      )
        return;
      fa++;
      navigator.userAgent.match(/ OS (\d+).*? Mac OS/) &&
        !X &&
        2 == p.length &&
        4 * c < p[1].a &&
        ((p[0].x -= (2 / 3) * (p[0].x - p[1].x)),
        (p[0].y -= (2 / 3) * (p[0].y - p[1].y)),
        (p[1].a /= (2 / 3) * p[1].a));
      c = { x: a, y: b, a: d };
      p.push(c);
      3 <= p.length && ((c = p.shift()), ga(c));
    }
    function ga(a, b) {
      var c = a.x,
        d = a.y,
        f = a.a;
      if (!x || 0 !== f) {
        var n = p.length ? p[0] : null;
        if (f && x) {
          k.moveTo(x.x, x.y);
          var r;
          !X && n && f > 3 * n.a && ((f /= 4), (r = 1));
          X = 1;
          b || (b = ha(f));
          U = b;
          if (r)
            for (r = 1; 3 >= r; r++)
              ia(c + (r / 3) * (x.x - c), d + (r / 3) * (x.y - d), f);
        }
        ia(c, d, f);
        x = a;
      }
    }
    function ha(a) {
      var b = (A / 320) * C;
      return (
        0.65 *
        (a < 0.003125 * A
          ? 1.2 * b
          : a < 0.00625 * A
          ? 1.15 * b
          : a < 0.009375 * A
          ? 1.1 * b
          : a < 0.015625 * A
          ? 1.05 * b
          : a < 0.021875 * A
          ? b
          : a < 0.028125 * A
          ? 0.95 * b
          : a < 0.034375 * A
          ? 0.9 * b
          : a < 0.046875 * A
          ? 0.85 * b
          : a < 0.0625 * A
          ? 0.8 * b
          : 0.75 * b)
      );
    }
    function ia(a, b, c) {
      var d = { x: a, y: b },
        f = F;
      k.fillStyle = B;
      k.strokeStyle = B;
      if (x) {
        a = Math.floor(Math.abs(c) / (F / 3));
        if (1 < a)
          for (f = F, c = 0; c < a; c++) f -= (f - U) / (8 < a ? a : 8);
        else Math.abs(F - U) > (A / 320) * C * 0.025 && (f = F - (F - U) / 8);
        a = Math.abs(F - f);
        1 <= a && (f = F > f ? f + 0.4 * a : f - 0.4 * a);
        a = null;
        if (0 < p.length) {
          a = p[0];
          b = na;
          var n = a.x - x.x,
            r = a.y - x.y,
            e = ja(x, d),
            h = ja(d, a),
            g = e + h;
          a =
            0 == e ||
            0 == h ||
            (d.x - x.x) / (d.y - x.y) == (d.x - a.x) / (d.y - a.y)
              ? null
              : [
                  { x: d.x - (n * b * e) / g, y: d.y - (r * b * e) / g },
                  { x: d.x + (n * b * h) / g, y: d.y + (r * b * h) / g }
                ];
        }
        b = [x];
        if (M || a) {
          n = a ? a[0] : d;
          M = null == M ? x : M;
          r = x;
          e = M;
          c /= 2 * f;
          h = [];
          for (g = 0; g < c; g++) {
            var l = (g + 1) / (c + 1),
              q,
              u,
              v,
              t,
              y,
              w,
              E,
              z;
            v = 3 * (e.x - r.x);
            u = 3 * (n.x - e.x) - v;
            q = d.x - r.x - v - u;
            w = 3 * (e.y - r.y);
            y = 3 * (n.y - e.y) - w;
            t = d.y - r.y - w - y;
            E = l * l;
            z = E * l;
            h.push({
              x: q * z + u * E + v * l + r.x,
              y: t * z + y * E + w * l + r.y
            });
          }
          b = b.concat(h);
        }
        b.push(d);
        d = b;
        b = F;
        n = f;
        h = b;
        for (r = 1; r < d.length; r++)
          (e = (n - b) / (d.length - 1) + h),
            (y = d[r - 1]),
            (c = d[r]),
            (g = e),
            (v = h * Math.sin(Math.atan((c.y - y.y) / (c.x - y.x)))),
            (w = h * Math.cos(Math.atan((c.y - y.y) / (c.x - y.x)))),
            (t = g * Math.sin(Math.atan((c.y - y.y) / (c.x - y.x)))),
            (u = g * Math.cos(Math.atan((c.y - y.y) / (c.x - y.x)))),
            (l = y.x + v),
            (q = y.y - w),
            (v = y.x - v),
            (y = y.y + w),
            (w = c.x + t),
            (E = c.y - u),
            (t = c.x - t),
            (u = c.y + u),
            k.beginPath(),
            k.moveTo(l, q),
            k.lineTo(w, E),
            k.lineTo(t, u),
            k.lineTo(v, y),
            k.lineTo(l, q),
            k.fill(),
            k.closePath(),
            (k.lineWidth = h),
            k.beginPath(),
            k.arc(c.x, c.y, g, 0, 2 * Math.PI),
            k.fill(),
            k.closePath(),
            (h = e);
        k.lineWidth = F = f;
        !a || 1 >= a.length ? (M = null) : (M = a[1]);
      } else
        2 <= p.length && ((f = p[1].a) && (F = ha(f)), (F += 2)),
          k.beginPath(),
          (k.fillStyle = B),
          k.arc(a, b, F, 0, 2 * Math.PI),
          k.fill(),
          k.closePath();
    }
    function ja(a, b) {
      return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }
    function Y(a) {
      if ("edit" === t) {
        var b, c;
        if ("touchstart" == a.type) {
          if (2 <= a.touches.length) return;
          b = a.touches[0].pageX;
          c = a.touches[0].pageY;
          H(g, "mousedown", Y);
        } else (b = a.pageX), (c = a.pageY);
        ka() ||
          ((canvasRect = g.getBoundingClientRect()),
          (canvasRect = {
            left: canvasRect.left + (window.scrollX || window.pageXOffset),
            top: canvasRect.top + (window.scrollY || window.pageYOffset)
          }),
          (b -= canvasRect.left),
          (c -= canvasRect.top),
          (G = {
            time: new Date(),
            points: [{ x: b, y: c, t: 0 }],
            color: B,
            penSize: C
          }),
          Q(b, c, a.type),
          a.preventDefault());
      }
    }
    function J(a) {
      if ("edit" === t) {
        var b, c;
        if ("touchmove" == a.type) {
          if (2 <= a.touches.length) return;
          b = a.touches[0].pageX;
          c = a.touches[0].pageY;
        } else (b = a.pageX), (c = a.pageY);
        b -= canvasRect.left;
        c -= canvasRect.top;
        ka()
          ? K()
          : (G.points.push({ x: b, y: c, t: new Date() - G.time }),
            N(b, c),
            a.preventDefault());
      }
    }
    function K() {
      "edit" === t &&
        (R(),
        h.length
          ? (G.time -= la)
          : ((la = G.time), (G.time = G.time.getTime())),
        h.push(G),
        (O = null),
        (S = []),
        (G = null));
    }
    function ka() {
      var a = 0;
      G && (a += G.points.length);
      for (var b = 0; b < h.length; b++) a += h[b].points.length;
      return a > oa ? !0 : !1;
    }
    function Z() {
      "play" == t && ((t = V), clearTimeout(P), T());
      "edit" === t &&
        ((x = null),
        (e = [-1, -1, -1, -1]),
        (fa = 0),
        h.length && (O = h),
        (h = []),
        k.beginPath(),
        k.clearRect(0, 0, g.width, g.height),
        k.closePath());
    }
    function R() {
      H(document, "mousemove", J);
      H(document, "touchmove", J);
      H(document, "mouseup", K);
      H(document, "touchend", K);
      for (var a; p.length; ) (a = p.shift()), ga(a, ((A / 320) * C) / 8);
    }
    function ma() {
      function a() {
        B = b;
        C = c;
        I >= h.length
          ? (t = V)
          : (clearTimeout(P),
            (P = setTimeout(function() {
              ma();
            }, 300)));
      }
      var b = B,
        c = C,
        d = h[I];
      if (d && "play" == t) {
        B = d.color;
        C = d.penSize;
        Q(d.points[0].x, d.points[0].y);
        1 == d.points.length && (R(), a());
        var f = 1,
          n,
          r = 0;
        n = d.points[f];
        (function() {
          n &&
            (N(n.x, n.y),
            f >= d.points.length - 1 && (R(), a()),
            f++,
            (n = d.points[f])) &&
            (clearTimeout(P),
            (P = setTimeout(arguments.callee, n.t - r)),
            (r = n.t));
        })();
        I++;
      }
    }
    function T() {
      function a() {
        B = b;
        C = c;
        I >= h.length && (t = "edit");
      }
      var b = B,
        c = C;
      k.clearRect(0, 0, g.width, g.height);
      k.beginPath();
      I = 0;
      for (var d = h[I]; d; ) {
        B = d.color;
        C = d.penSize;
        Q(d.points[0].x, d.points[0].y);
        1 == d.points.length && (R(), a());
        for (var f = 1, n = 1; f < d.points.length; f++) {
          var r = d.points[n];
          n++;
          N(r.x, r.y);
          n >= d.points.length && (R(), a());
        }
        I++;
        d = h[I];
      }
    }
    function pa(a) {
      q += "convertImgToBase64URL  start \n";
      var b = document.createElement("CANVAS");
      ctx = b.getContext("2d");
      b.height = a.height;
      b.width = a.width;
      ctx.putImageData(a, 0, 0);
      dataURL = b.toDataURL("image/png");
      q += "convertImgToBase64URL  end \n";
      return dataURL;
    }
    function qa(a, b) {
      q += "convertImgToBase64URLWithRotating  start \n";
      var c = document.createElement("CANVAS"),
        d = c.getContext("2d");
      c.height = a.height;
      c.width = a.width;
      d.putImageData(a, 0, 0);
      var f = new Image();
      f.src = c.toDataURL("image/png");
      var n = c.toDataURL("image/png"),
        c = null;
      aa
        ? (f.onload = function() {
            var c = document.createElement("CANVAS"),
              d = c.getContext("2d");
            c.height = a.width;
            c.width = a.height;
            d.fillStyle = "#fff";
            d.fillRect(0, 0, c.width, c.height);
            d.rotate((3 * Math.PI) / 2);
            d.drawImage(f, -a.width, 0, a.width, a.height);
            n = c.toDataURL("image/png");
            b ? b(n) : null;
          })
        : b
        ? b(n)
        : null;
      q += "convertImgToBase64URLWithRotating  end \n";
    }
    function ra(a, b) {
      q += "getWritingRect  start \n";
      e = [-1, -1, -1, -1];
      for (var c = 0; c < h.length; c++)
        for (var d = 0; d < h[c].points.length; d++) {
          var f = h[c].points[d],
            n = f.x,
            f = f.y,
            r = 0 > n - 16 ? 0 : n - 16,
            g = 0 > f - 16 ? 0 : f - 16;
          e[0] = 0 > e[0] ? r : e[0];
          e[0] = e[0] > r ? r : e[0];
          e[1] = e[1] < n + 16 ? n + 16 : e[1];
          e[2] = 0 > e[2] ? g : e[2];
          e[2] = e[2] > g ? g : e[2];
          e[3] = e[3] < f + 16 ? f + 16 : e[3];
        }
      q +=
        "writingRect[0][1][2][3] = " +
        e[0] +
        "*" +
        e[1] +
        "*" +
        e[2] +
        "*" +
        e[3] +
        "*\n";
      e[1] = e[1] > a ? a : e[1];
      e[3] = e[3] > b ? b : e[3];
      q += "getWritingRect  end \n";
    }
    function L(a, b, c) {
      a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener(b, c, !1);
    }
    function H(a, b, c) {
      a.detachEvent
        ? a.detachEvent("on" + b, c)
        : a.removeEventListener(b, c, !1);
    }
    function ba(a) {
      var b = [];
      if (!a) return b;
      for (var c = 0; c < a.length; c++) {
        var d = ca(a.charCodeAt(c));
        b.push.apply(b, d);
      }
      return b;
    }
    function ca(a) {
      if (0 > a) return null;
      var b = Math.floor(a / 4294967295);
      a %= 4294967295;
      var c = [],
        d = [];
      if (b) {
        do c.push(b & 255), (b >>>= 8);
        while (b);
        d.push.apply(d, c.reverse());
      }
      c = [];
      do c.push(a & 255), (a >>>= 8);
      while (a);
      d.push.apply(d, c.reverse());
      return d;
    }
    function v(a) {
      if (!a || 0 == a.length) return null;
      var b = 4 < a.length ? a.slice(0, a.length - 4) : [];
      a = 4 < a.length ? a.slice(a.length - 4, a.length) : a;
      for (var c = 0, d = b.length - 1; 0 <= d; d--)
        c |= (b[d] & 255) << (8 * (b.length - 1 - d));
      b = 0;
      for (d = a.length - 1; 0 <= d; d--)
        b |= (a[d] & 255) << (8 * (a.length - 1 - d));
      return 4294967295 * c + b;
    }
    function da(a) {
      if (!a || 0 == a.length) return null;
      var b = a[0] & 128;
      128 == b && (a[0] ^= 128);
      a = v(a);
      128 == b && (a = -a);
      return a;
    }
    function W(a) {
      if (!a || 4 != a.length) return null;
      var b = new ArrayBuffer(4),
        c = new DataView(b);
      a.forEach(function(a, b) {
        c.setUint8(b, a);
      });
      return c.getFloat32(0);
    }
    function ea(a) {
      var b = new Float32Array(1);
      new DataView(b.buffer).setFloat32(0, a, !1);
      return new Int8Array(b.buffer);
    }
    function l(a, b, c) {
      return !a || c > a.P || 0 > b ? null : a.slice(b, c);
    }
    function z(a, b) {
      var c = [],
        d = ca(a);
      if (null == d) return null;
      if (d.length > b) {
        for (var f = 0; f < b; f++) c.push(255);
        return c;
      }
      for (f = d.length; f < b; f++) c.push(0);
      c.push.apply(c, d);
      return c;
    }
    function sa(a) {
      for (var b = 0, c = 0; c < a.data.length; c++)
        void 0 !== a.data[c + 3] && 0 !== a.data[c + 3] && b++;
      return b;
    }
    var g = null;
    if (w.nodeType) g = w;
    else if ("string" == typeof w) g = document.getElementById(w);
    else return;
    g.width = g.getBoundingClientRect().width;
    g.height = g.getBoundingClientRect().height;
    g.style.backgroundColor = g.style.backgroundColor;
    (function(a, b, c) {
      document.addEventListener
        ? a.addEventListener(b, c, !1)
        : document.attachEvent && a.attachEvent("on" + b, c);
    })(window, "resize", function() {
      q += "[window-resize function]  start \n";
      var a = g.getBoundingClientRect().width / g.width,
        b = g.getBoundingClientRect().height / g.height;
      if (1 != a || 1 != b)
        (g.width = g.getBoundingClientRect().width),
          (g.height = g.getBoundingClientRect().height),
          (q +=
            "[window-resize canvas.width + canvas.height] =" +
            g.width +
            "_" +
            g.height),
          (g.style.backgroundColor = g.style.backgroundColor),
          Z(),
          (q += "[window-resize function]  end \n");
    });
    var h = [],
      S = [],
      F = 1,
      U = 1,
      B = "rgb(0,0,0)",
      C = 8,
      A = 320,
      fa = 0,
      G = null,
      O = null,
      t = "edit",
      e = [-1, -1, -1, -1],
      na = 0.4,
      x = null,
      M = null,
      p = [],
      X = 0,
      la = null,
      I = 0,
      V = "edit",
      P = null,
      k = g.getContext("2d"),
      oa = 5e4,
      aa = !1,
      q = "";
    (function() {
      Z();
      g.getContext &&
        ((k.strokeStyle = B),
        (k.fillStyle = B),
        L(g, "selectstart", function() {
          return !1;
        }),
        L(g, "touchstart", Y),
        L(g, "mousedown", Y));
    })();
    this.v = function() {
      for (var a = "4.3.0.1"; 0 <= a.indexOf("."); ) a = a.replace(".", "");
      return z(parseInt(a), 2);
    };
    this.g = function(a) {
      var b = a.match(/(\d+)/g);
      a = [];
      if (b) for (var c = 0; c < b.length; c++) a.push.apply(a, ca(b[c]));
      for (b = a.length; 3 > b; b++) a.push(0);
      return a;
    };
    this.O = function(a) {
      aa = a;
    };
    this.M = function(a) {
      C =
        (1 == a && 18) ||
        (2 == a && 12) ||
        (3 == a && 8) ||
        (4 == a && 6) ||
        (5 == a && 3) ||
        8;
    };
    this.I = function(a, b, c) {
      B = "rgb(" + a + "," + b + "," + c + ")";
    };
    this.c = function() {
      return !!S.length;
    };
    this.b = function() {
      if ("edit" === t)
        if (O && O.length) (h = O), (O = null), T();
        else if (h.length) {
          var a = h.pop();
          S.push([a]);
          T();
        }
    };
    this.C = function() {
      "edit" === t && S.length && ((h = h.concat(S.pop())), T());
    };
    this.D = function() {
      0 != h.length &&
        ("play" == t
          ? ((t = V), clearTimeout(P), T())
          : ((V = t),
            (t = "play"),
            k.clearRect(0, 0, g.width, g.height),
            k.beginPath(),
            (I = 0),
            ma()));
    };
    this.A = function() {
      return 0 != h.length && "play" == t ? !0 : !1;
    };
    this.f = function() {
      q += "_clear  start \n";
      Z();
      q += "_clear  end \n";
    };
    this.i = function() {
      q += "_getHandWritingData  start \n";
      if (0 >= h.length) return null;
      var a = navigator.userAgent.match(/\([^\)]*\)[^\(]*\([^\)]*\)\s(.*)/);
      a && 0 < a.length && (a = a[1]);
      var b = navigator.userAgent.match(/\(([^\)]*)\)/);
      b && 0 < b.length && (b = b[1]);
      var c = [],
        d = this.v(),
        a = ba(a),
        f = ba(b),
        b = ba(""),
        n = 6 + a.length + 2 + f.length + 2 + 6 + 2 + b.length;
      c.push.apply(c, d);
      c.push.apply(c, z(n, 2));
      c.push.apply(c, z(a.length, 2));
      c.push.apply(c, a);
      c.push.apply(c, z(f.length, 2));
      c.push.apply(c, f);
      d = z(h.length, 2);
      c.push.apply(c, d);
      d = z(0 < h.length ? h[0].time : 0, 6);
      c.push.apply(c, d);
      c.push.apply(c, z(b.length, 2));
      c.push.apply(c, b);
      for (d = 0; d < h.length; d++) {
        a = [1, 4, 1, 2, 4, 1, 3, 2, 0];
        b = z(h[d].points.length, 2);
        c.push.apply(c, z(a.length + 9 + b.length + 4 + 4, 1));
        c.push.apply(c, z(a.length, 1));
        c.push.apply(c, a);
        a = d ? z(h[d].time, 3) : z(0, 3);
        c.push.apply(c, a);
        a = this.g(h[d].color);
        c.push.apply(c, a);
        c.push.apply(c, z(b.length, 1));
        c.push.apply(c, b);
        b = ea(parseFloat(h[d].penSize));
        c.push.apply(c, b);
        c.push.apply(c, b);
        b = [];
        a = [];
        f = [];
        for (n = 0; n < h[d].points.length; n++) {
          var e = h[d].points[n],
            k,
            l;
          aa ? ((k = e.y), (l = g.width - e.x)) : ((k = e.x), (l = e.y));
          e = e.t || 0;
          k = ea(k);
          b.push.apply(b, k);
          l = ea(l);
          a.push.apply(a, l);
          l = e;
          (e = z(Math.abs(l), 2)) && 0 != e.length
            ? (0 > l && (e[0] |= 128), (l = e))
            : (l = null);
          f.push.apply(f, l);
        }
        c.push.apply(c, b);
        c.push.apply(c, a);
        c.push.apply(c, f);
      }
      q += "_getHandWritingData  end \n";
      return c;
    };
    this.j = function(a) {
      q += "_getHandWritingPng  start \n";
      if (0 >= h.length) return a ? a(null) : null;
      ra(k.canvas.width, k.canvas.height);
      var b = k.getImageData(e[0], e[2], e[1] - e[0], e[3] - e[2]),
        c = sa(b);
      q += "_getHandWritingPng  imageLength \uff1a" + c;
      if (4 > c) return a ? a(null) : null;
      if (null == a)
        return (q += "_getHandWritingPng  end(callback == null) \n"), pa(b);
      q += "_getHandWritingPng  end(callback != null-1) \n";
      qa(b, function(b) {
        a(b);
      });
      q += "_getHandWritingPng  end(callback != null-2) \n";
    };
    this.u = function() {
      var a = (q += "userAgent \u4fe1\u606f:" + navigator.userAgent + "\n");
      q = "";
      return a;
    };
    this.B = function(a) {
      if (a) {
        var b = 0,
          c = v(l(a, b, 2)),
          d = 0;
        4101 < c ? ((d = v(l(a, b + 2, b + 4))), (b += 4)) : (b += 2);
        var f = v(l(a, b, b + 2)),
          b = b + 2 + f,
          e = v(l(a, b, b + 2)),
          b = b + 2 + e,
          g = v(l(a, b, b + 2)),
          k = v(l(a, b + 2, b + 2 + 6)),
          b = b + 2 + 6;
        4101 < c && (b = d);
        if (
          null !== c &&
          null !== f &&
          null !== e &&
          null !== g &&
          null !== k &&
          0 != g
        ) {
          this.clear();
          for (d = 0; d < g; d++) {
            var p = 0,
              f = [],
              e = [],
              q = [];
            if (4101 < c) {
              for (
                var w = b,
                  p = v(l(a, b, b + 1)),
                  t = v(l(a, b + 1, b + 1 + 1)),
                  b = b + 1 + 1,
                  u = 0;
                u < Math.floor(t / 3);
                u++
              )
                f.push(v(l(a, b + 3 * u, b + 3 * u + 1))),
                  e.push(v(l(a, b + 3 * u + 1, b + 3 * u + 2))),
                  q.push(v(l(a, b + 3 * u + 2, b + 3 * u + 3)));
              b += t;
            }
            var t = v(l(a, b, b + 3)),
              b = b + 3,
              x = v(l(a, b, b + 1)),
              z = v(l(a, b + 1, b + 2)),
              y = v(l(a, b + 2, b + 3)),
              F = "rgb(" + x + "," + z + "," + y + ")",
              b = b + 3,
              E,
              A;
            4101 < c
              ? ((E = v(l(a, b, b + 1))),
                (A = v(l(a, b + 1, b + 1 + E))),
                (b = b + 1 + E),
                (E = Math.round(W(l(a, b, b + 4)))),
                3 > E ? (E = 3) : 18 < E && (E = 18),
                (b = w + p))
              : (f.push.apply(f, [1, 2, 3]),
                e.push.apply(e, [2, 2, 2]),
                q.push.apply(q, [0, 0, 0]),
                (E = v(l(a, b, b + 1))),
                (A = v(l(a, b + 1, b + 3))),
                (b += 3));
            for (var B = -1, C = -1, p = -1, u = 0; u < f.length; u++)
              1 == f[u] ? (B = u) : 2 == f[u] ? (C = u) : 3 == f[u] && (p = u);
            if (
              null === t ||
              null === x ||
              null === z ||
              null === y ||
              null === A ||
              -1 == B ||
              -1 == C ||
              -1 == p
            )
              return;
            u || (t = k);
            for (var u = [], x = [], z = [], y = [], D = 0; D < A; ) {
              var G = l(a, b, b + e[B]);
              0 == q[B] ? x.push(da(G)) : x.push(W(G));
              D++;
              b += e[B];
            }
            for (D = 0; D < A; )
              (B = l(a, b, b + e[C])),
                0 == q[C] ? z.push(da(B)) : z.push(W(B)),
                D++,
                (b += e[C]);
            for (D = 0; D < A; )
              (C = l(a, b, b + e[p])),
                0 == q[p] ? y.push(da(C)) : y.push(W(C)),
                D++,
                (b += e[p]);
            for (D = 0; D < f.length; D++)
              1 != f[D] && 2 != f[D] && 3 != f[D] && (b += e[D] * A);
            for (D = 0; D < A; D++) u.push({ x: x[D], y: z[D], t: y[D] });
            h.push({ time: t, points: u, color: F, penSize: E });
          }
          replay();
        }
      }
    };
  }
  goog.exportSymbol("EPaper", m);
  m.prototype.K = function(w) {
    this.M(w);
  };
  goog.exportProperty(m.prototype, "setPenSize", m.prototype.K);
  m.prototype.J = function(w, Q, N) {
    this.I(w, Q, N);
  };
  goog.exportProperty(m.prototype, "setPenColor", m.prototype.J);
  m.prototype.h = function() {
    return this.c();
  };
  goog.exportProperty(m.prototype, "canRedo", m.prototype.h);
  m.prototype.L = function(w) {
    this.O(w);
  };
  goog.exportProperty(m.prototype, "setRotating", m.prototype.L);
  m.prototype.N = function() {
    this.b();
  };
  goog.exportProperty(m.prototype, "undo", m.prototype.N);
  m.prototype.G = function() {
    this.C();
  };
  goog.exportProperty(m.prototype, "redo", m.prototype.G);
  m.prototype.H = function() {
    this.D();
  };
  goog.exportProperty(m.prototype, "replay", m.prototype.H);
  m.prototype.w = function() {
    return this.A();
  };
  goog.exportProperty(m.prototype, "isReplaying", m.prototype.w);
  m.prototype.clear = function() {
    this.f();
  };
  goog.exportProperty(m.prototype, "clear", m.prototype.clear);
  m.prototype.l = function() {
    return this.i();
  };
  goog.exportProperty(m.prototype, "getHandWritingData", m.prototype.l);
  m.prototype.m = function(w) {
    return this.j(w);
  };
  goog.exportProperty(m.prototype, "getHandWritingPng", m.prototype.m);
  m.prototype.F = function(w) {
    this.B(w);
  };
  goog.exportProperty(m.prototype, "playWithData", m.prototype.F);
  m.prototype.o = function() {
    return this.u();
  };
  goog.exportProperty(m.prototype, "getLogInfo", m.prototype.o);
  m.prototype.s = function() {
    return "4.3.0.1";
  };
  goog.exportProperty(m.prototype, "getVersion", m.prototype.s);
  window.goog = goog;
    console.log("手写签名")
})();
