(() => {
  "use strict";
  const e = {};
  let t = !0,
    s = (e = 500) => {
      let s = document.querySelector("body");
      if (t) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (s.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    i = (e = 500) => {
      let s = document.querySelector("body");
      if (t) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight = "0px";
        }
        (s.style.paddingRight = "0px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function r() {
    let e = document.querySelector(".burger");
    e &&
      e.addEventListener("click", function (e) {
        t &&
          (((e = 500) => {
            document.documentElement.classList.contains("lock") ? s(e) : i(e);
          })(),
          document.documentElement.classList.toggle("open"));
      });
  }
  function n(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function a(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  r();
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.options.on.beforeClose(this),
        this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ) &&
          (this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ).innerHTML = ""),
        this.previousOpen.element.classList.remove(
          this.options.classes.popupActive
        ),
        this.previousOpen.element.setAttribute("aria-hidden", "true"),
        this._reopen ||
          (document.body.classList.remove(this.options.classes.bodyActive),
          (this.isOpen = !1)),
        this._removeHash(),
        this._selectorOpen &&
          ((this.lastClosed.selector = this.previousOpen.selector),
          (this.lastClosed.element = this.previousOpen.element)),
        this.options.on.afterClose(this),
        setTimeout(() => {
          this._focusTrap();
        }, 50),
        this.popupLogging("Закрыл попап");
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && n(`[Попапос]: ${e}`);
    }
  })({});
  let o = (e, t = !1, i = 500, r = 0) => {
    const a = "string" == typeof e ? document.querySelector(e) : e;
    if (a) {
      let o = "",
        l = 0;
      t &&
        ((o = "header.header"), (l = document.querySelector(o).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: i,
        header: o,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (s(), document.documentElement.classList.remove("open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(a, "", d);
      else {
        let e = a.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  function l(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function d(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : l(t[s]) && l(e[s]) && Object.keys(t[s]).length > 0 && d(e[s], t[s]);
    });
  }
  const c = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function p() {
    const e = "undefined" != typeof document ? document : {};
    return d(e, c), e;
  }
  const u = {
    document: c,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function h() {
    const e = "undefined" != typeof window ? window : {};
    return d(e, u), e;
  }
  function f(e, t = 0) {
    return setTimeout(e, t);
  }
  function m() {
    return Date.now();
  }
  function g(e, t = "x") {
    const s = h();
    let i, r, n;
    const a = (function (e) {
      const t = h();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((r = a.transform || a.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((n =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      r || 0
    );
  }
  function v(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function w(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < e.length; r += 1) {
      const n = e[r];
      if (
        null != n &&
        ((i = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? i instanceof HTMLElement
          : i && (1 === i.nodeType || 11 === i.nodeType)))
      ) {
        const e = Object.keys(Object(n)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, i = e.length; s < i; s += 1) {
          const i = e[s],
            r = Object.getOwnPropertyDescriptor(n, i);
          void 0 !== r &&
            r.enumerable &&
            (v(t[i]) && v(n[i])
              ? n[i].__swiper__
                ? (t[i] = n[i])
                : w(t[i], n[i])
              : !v(t[i]) && v(n[i])
              ? ((t[i] = {}), n[i].__swiper__ ? (t[i] = n[i]) : w(t[i], n[i]))
              : (t[i] = n[i]));
        }
      }
    }
    var i;
    return t;
  }
  function S(e, t, s) {
    e.style.setProperty(t, s);
  }
  function b({ swiper: e, targetPosition: t, side: s }) {
    const i = h(),
      r = -e.translate;
    let n,
      a = null;
    const o = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > r ? "next" : "prev",
      d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      c = () => {
        (n = new Date().getTime()), null === a && (a = n);
        const l = Math.max(Math.min((n - a) / o, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = r + p * (t - r);
        if ((d(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), d(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void i.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = i.requestAnimationFrame(c);
      };
    c();
  }
  function T(e, t = "") {
    return [...e.children].filter((e) => e.matches(t));
  }
  function y(e, t) {
    return h().getComputedStyle(e, null).getPropertyValue(t);
  }
  function E(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function x(e, t, s) {
    const i = h();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top")
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
          )
      : e.offsetWidth;
  }
  let C, L, M;
  function P() {
    return (
      C ||
        (C = (function () {
          const e = h(),
            t = p();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      C
    );
  }
  function O(e = {}) {
    return (
      L ||
        (L = (function ({ userAgent: e } = {}) {
          const t = P(),
            s = h(),
            i = s.navigator.platform,
            r = e || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            a = s.screen.width,
            o = s.screen.height,
            l = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !d &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${o}`) >= 0 &&
              ((d = r.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !u && ((n.os = "android"), (n.android = !0)),
            (d || p || c) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      L
    );
  }
  function A() {
    return (
      M ||
        (M = (function () {
          const e = h();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      M
    );
  }
  const k = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][r](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function r(...s) {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, s);
      }
      return (r.__emitterProxy = t), i.on(e, r, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, r) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(r, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let s, i, r;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (i = e.slice(1, e.length)), (r = t))
        : ((s = e[0].events), (i = e[0].data), (r = e[0].context || t)),
        i.unshift(r);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(r, [e, ...i]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(r, i);
              });
        }),
        t
      );
    },
  };
  const _ = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      );
      if (s) {
        const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        t && t.remove();
      }
    },
    I = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    z = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex,
        n = r + i - 1;
      if (e.params.rewind)
        for (let i = r - t; i <= n + t; i += 1) {
          const t = ((i % s) + s) % s;
          t !== r && t > n && I(e, t);
        }
      else
        for (let i = Math.max(n - t, 0); i <= Math.min(n + t, s - 1); i += 1)
          i !== r && i > n && I(e, i);
    };
  const G = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(y(i, "padding-left") || 0, 10) -
            parseInt(y(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(y(i, "padding-top") || 0, 10) -
            parseInt(y(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: r,
          slidesEl: n,
          size: a,
          rtlTranslate: o,
          wrongRTL: l,
        } = e,
        d = e.virtual && i.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = T(n, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let h = [];
      const f = [],
        m = [];
      let g = i.slidesOffsetBefore;
      "function" == typeof g && (g = i.slidesOffsetBefore.call(e));
      let v = i.slidesOffsetAfter;
      "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        b = e.slidesGrid.length;
      let E = i.spaceBetween,
        C = -g,
        L = 0,
        M = 0;
      if (void 0 === a) return;
      "string" == typeof E && E.indexOf("%") >= 0
        ? (E = (parseFloat(E.replace("%", "")) / 100) * a)
        : "string" == typeof E && (E = parseFloat(E)),
        (e.virtualSize = -E),
        p.forEach((e) => {
          o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (S(r, "--swiper-centered-offset-before", ""),
          S(r, "--swiper-centered-offset-after", ""));
      const P = i.grid && i.grid.rows > 1 && e.grid;
      let O;
      P && e.grid.initSlides(u);
      const A =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let r = 0; r < u; r += 1) {
        let n;
        if (
          ((O = 0),
          p[r] && (n = p[r]),
          P && e.grid.updateSlide(r, n, u, t),
          !p[r] || "none" !== y(n, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            A && (p[r].style[t("width")] = "");
            const a = getComputedStyle(n),
              o = n.style.transform,
              l = n.style.webkitTransform;
            if (
              (o && (n.style.transform = "none"),
              l && (n.style.webkitTransform = "none"),
              i.roundLengths)
            )
              O = e.isHorizontal() ? x(n, "width", !0) : x(n, "height", !0);
            else {
              const e = s(a, "width"),
                t = s(a, "padding-left"),
                i = s(a, "padding-right"),
                r = s(a, "margin-left"),
                o = s(a, "margin-right"),
                l = a.getPropertyValue("box-sizing");
              if (l && "border-box" === l) O = e + r + o;
              else {
                const { clientWidth: s, offsetWidth: a } = n;
                O = e + t + i + r + o + (a - s);
              }
            }
            o && (n.style.transform = o),
              l && (n.style.webkitTransform = l),
              i.roundLengths && (O = Math.floor(O));
          } else
            (O = (a - (i.slidesPerView - 1) * E) / i.slidesPerView),
              i.roundLengths && (O = Math.floor(O)),
              p[r] && (p[r].style[t("width")] = `${O}px`);
          p[r] && (p[r].swiperSlideSize = O),
            m.push(O),
            i.centeredSlides
              ? ((C = C + O / 2 + L / 2 + E),
                0 === L && 0 !== r && (C = C - a / 2 - E),
                0 === r && (C = C - a / 2 - E),
                Math.abs(C) < 0.001 && (C = 0),
                i.roundLengths && (C = Math.floor(C)),
                M % i.slidesPerGroup == 0 && h.push(C),
                f.push(C))
              : (i.roundLengths && (C = Math.floor(C)),
                (M - Math.min(e.params.slidesPerGroupSkip, M)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(C),
                f.push(C),
                (C = C + O + E)),
            (e.virtualSize += O + E),
            (L = O),
            (M += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + v),
        o &&
          l &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (r.style.width = `${e.virtualSize + E}px`),
        i.setWrapperSize && (r.style[t("width")] = `${e.virtualSize + E}px`),
        P && e.grid.updateWrapperSize(O, h, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < h.length; s += 1) {
          let r = h[s];
          i.roundLengths && (r = Math.floor(r)),
            h[s] <= e.virtualSize - a && t.push(r);
        }
        (h = t),
          Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - a);
      }
      if (d && i.loop) {
        const t = m[0] + E;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup
            ),
            r = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + r);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
            f.push(f[f.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== E)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1
        ).forEach((e) => {
          e.style[s] = `${E}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (E || 0);
        }),
          (e -= E);
        const t = e - a;
        h = h.map((e) => (e < 0 ? -g : e > t ? t + v : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (E || 0);
          }),
          (e -= E),
          e < a)
        ) {
          const t = (a - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }),
            f.forEach((e, s) => {
              f[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: f,
          slidesSizesGrid: m,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        S(r, "--swiper-centered-offset-before", -h[0] + "px"),
          S(
            r,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        h.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let r,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !i) break;
            s.push(a(e));
          }
      else s.push(a(t.activeIndex));
      for (r = 0; r < s.length; r += 1)
        if (void 0 !== s[r]) {
          const e = s[r].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: r, snapGrid: n } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      r && (a = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let o = s.spaceBetween;
      "string" == typeof o && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
        : "string" == typeof o && (o = parseFloat(o));
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (a + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          p =
            (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          u = -(a - d),
          h = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          (l.progress = r ? -c : c),
          (l.originalProgress = r ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: n, isEnd: a, progressLoop: o } = t;
      const l = n,
        d = a;
      if (0 === i) (r = 0), (n = !0), (a = !0);
      else {
        r = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (n = s || r <= 0), (a = o || r >= 1), s && (r = 0), o && (r = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          r = t.slidesGrid[s],
          n = t.slidesGrid[i],
          a = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= r ? (l - r) / a : (l + a - n) / a), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: r,
        progressLoop: o,
        isBeginning: n,
        isEnd: a,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !l && t.emit("reachBeginning toEdge"),
        a && !d && t.emit("reachEnd toEdge"),
        ((l && !n) || (d && !a)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
        n = e.virtual && s.virtual.enabled,
        a = (e) => T(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass
          );
        }),
        n)
      )
        if (s.loop) {
          let t = r - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = a(`[data-swiper-slide-index="${t}"]`));
        } else o = a(`[data-swiper-slide-index="${r}"]`);
      else o = t[r];
      if (o) {
        o.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let i = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !i && (i = t[t.length - 1]),
          i && i.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: r,
          activeIndex: n,
          realIndex: a,
          snapIndex: o,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let r;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (r = e)
                  : i >= t[e] && i < t[e + 1] && (r = e + 1)
                : i >= t[e] && (r = e);
            return (
              s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        l = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((l >= i.length && (l = i.length - 1), d === n))
        return (
          l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && r.virtual.enabled && r.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
        t.initialized && z(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = e.closest(`.${s.slideClass}, swiper-slide`);
      let r,
        n = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (n = !0), (r = e);
            break;
          }
      if (!i || !n)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              i.getAttribute("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = r),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const D = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let n = g(r, e);
      return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: r, wrapperEl: n, progress: a } = s;
      let o,
        l = 0,
        d = 0;
      s.isHorizontal() ? (l = i ? -e : e) : (d = e),
        r.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : d),
        r.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -d)
          : r.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (n.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
        o !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, r) {
      const n = this,
        { params: a, wrapperEl: o } = n;
      if (n.animating && a.preventInteractionOnTransition) return !1;
      const l = n.minTranslate(),
        d = n.maxTranslate();
      let c;
      if (
        ((c = i && e > l ? l : i && e < d ? d : e),
        n.updateProgress(c),
        a.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!n.support.smoothScroll)
            return (
              b({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function $({ swiper: e, runCallbacks: t, direction: s, step: i }) {
    const { activeIndex: r, previousIndex: n } = e;
    let a = s;
    if (
      (a || (a = r > n ? "next" : r < n ? "prev" : "reset"),
      e.emit(`transition${i}`),
      t && r !== n)
    ) {
      if ("reset" === a) return void e.emit(`slideResetTransition${i}`);
      e.emit(`slideChangeTransition${i}`),
        "next" === a
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`);
    }
  }
  const B = {
    setTransition: function (e, t) {
      const s = this;
      s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
        s.emit("setTransition", e, t);
    },
    transitionStart: function (e = !0, t) {
      const s = this,
        { params: i } = s;
      i.cssMode ||
        (i.autoHeight && s.updateAutoHeight(),
        $({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
    },
    transitionEnd: function (e = !0, t) {
      const s = this,
        { params: i } = s;
      (s.animating = !1),
        i.cssMode ||
          (s.setTransition(0),
          $({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
    },
  };
  const V = {
    slideTo: function (e = 0, t = this.params.speed, s = !0, i, r) {
      "string" == typeof e && (e = parseInt(e, 10));
      const n = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: f,
      } = n;
      if ((n.animating && o.preventInteractionOnTransition) || (!f && !i && !r))
        return !1;
      const m = Math.min(n.params.slidesPerGroupSkip, a);
      let g = m + Math.floor((a - m) / n.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (a = e)
              : t >= s && t < i && (a = e + 1)
            : t >= s && (a = e);
        }
      if (n.initialized && a !== p) {
        if (!n.allowSlideNext && v < n.translate && v < n.minTranslate())
          return !1;
        if (
          !n.allowSlidePrev &&
          v > n.translate &&
          v > n.maxTranslate() &&
          (p || 0) !== a
        )
          return !1;
      }
      let w;
      if (
        (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
        n.updateProgress(v),
        (w = a > p ? "next" : a < p ? "prev" : "reset"),
        (u && -v === n.translate) || (!u && v === n.translate))
      )
        return (
          n.updateActiveIndex(a),
          o.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== o.effect && n.setTranslate(v),
          "reset" !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)),
          !1
        );
      if (o.cssMode) {
        const e = n.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
              ? ((n._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._immediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              b({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(v),
        n.updateActiveIndex(a),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, i),
        n.transitionStart(s, w),
        0 === t
          ? n.transitionEnd(s, w)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, w));
              }),
            n.wrapperEl.addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
      if ("string" == typeof e) {
        e = parseInt(e, 10);
      }
      const r = this;
      let n = e;
      return (
        r.params.loop &&
          (r.virtual && r.params.virtual.enabled
            ? (n += r.virtual.slidesBefore)
            : (n = r.getSlideIndexByData(n))),
        r.slideTo(n, t, s, i)
      );
    },
    slideNext: function (e = this.params.speed, t = !0, s) {
      const i = this,
        { enabled: r, params: n, animating: a } = i;
      if (!r) return i;
      let o = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : o,
        d = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (a && !d && n.loopPreventsSliding) return !1;
        i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      return n.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + l, e, t, s);
    },
    slidePrev: function (e = this.params.speed, t = !0, s) {
      const i = this,
        {
          params: r,
          snapGrid: n,
          slidesGrid: a,
          rtlTranslate: o,
          enabled: l,
          animating: d,
        } = i;
      if (!l) return i;
      const c = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (d && !c && r.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(o ? i.translate : -i.translate),
        h = n.map((e) => p(e));
      let f = n[h.indexOf(u) - 1];
      if (void 0 === f && r.cssMode) {
        let e;
        n.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (f = n[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== f &&
          ((m = a.indexOf(f)),
          m < 0 && (m = i.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        r.rewind && i.isBeginning)
      ) {
        const r =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(r, e, t, s);
      }
      return i.slideTo(m, e, t, s);
    },
    slideReset: function (e = this.params.speed, t = !0, s) {
      return this.slideTo(this.activeIndex, e, t, s);
    },
    slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
      const r = this;
      let n = r.activeIndex;
      const a = Math.min(r.params.slidesPerGroupSkip, n),
        o = a + Math.floor((n - a) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
      if (l >= r.snapGrid[o]) {
        const e = r.snapGrid[o];
        l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[o - 1];
        l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, r.slidesGrid.length - 1)),
        r.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        n = e.clickedIndex;
      const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        )),
          t.centeredSlides
            ? n < e.loopedSlides - i / 2 ||
              n > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  T(s, `${a}[data-swiper-slide-index="${r}"]`)[0]
                )),
                f(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - i
            ? (e.loopFix(),
              (n = e.getSlideIndex(
                T(s, `${a}[data-swiper-slide-index="${r}"]`)[0]
              )),
              f(() => {
                e.slideTo(n);
              }))
            : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  const W = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      T(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function ({
      slideRealIndex: e,
      slideTo: t = !0,
      direction: s,
      setTranslate: i,
      activeSlideIndex: r,
      byController: n,
      byMousewheel: a,
    } = {}) {
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
        slides: l,
        allowSlidePrev: d,
        allowSlideNext: c,
        slidesEl: p,
        params: u,
      } = o;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && u.virtual.enabled)
      )
        return (
          t &&
            (u.centeredSlides || 0 !== o.snapIndex
              ? u.centeredSlides && o.snapIndex < u.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = d),
          (o.allowSlideNext = c),
          void o.emit("loopFix")
        );
      const h =
        "auto" === u.slidesPerView
          ? o.slidesPerViewDynamic()
          : Math.ceil(parseFloat(u.slidesPerView, 10));
      let f = u.loopedSlides || h;
      f % u.slidesPerGroup != 0 &&
        (f += u.slidesPerGroup - (f % u.slidesPerGroup)),
        (o.loopedSlides = f);
      const m = [],
        g = [];
      let v = o.activeIndex;
      void 0 === r
        ? (r = o.getSlideIndex(
            o.slides.filter((e) => e.classList.contains(u.slideActiveClass))[0]
          ))
        : (v = r);
      const w = "next" === s || !s,
        S = "prev" === s || !s;
      let b = 0,
        T = 0;
      if (r < f) {
        b = Math.max(f - r, u.slidesPerGroup);
        for (let e = 0; e < f - r; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          m.push(l.length - t - 1);
        }
      } else if (r > o.slides.length - 2 * f) {
        T = Math.max(r - (o.slides.length - 2 * f), u.slidesPerGroup);
        for (let e = 0; e < T; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          g.push(t);
        }
      }
      if (
        (S &&
          m.forEach((e) => {
            (o.slides[e].swiperLoopMoveDOM = !0),
              p.prepend(o.slides[e]),
              (o.slides[e].swiperLoopMoveDOM = !1);
          }),
        w &&
          g.forEach((e) => {
            (o.slides[e].swiperLoopMoveDOM = !0),
              p.append(o.slides[e]),
              (o.slides[e].swiperLoopMoveDOM = !1);
          }),
        o.recalcSlides(),
        "auto" === u.slidesPerView && o.updateSlides(),
        u.watchSlidesProgress && o.updateSlidesOffset(),
        t)
      )
        if (m.length > 0 && S)
          if (void 0 === e) {
            const e = o.slidesGrid[v],
              t = o.slidesGrid[v + b] - e;
            a
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(v + b, 0, !1, !0),
                i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t));
          } else i && o.slideToLoop(e, 0, !1, !0);
        else if (g.length > 0 && w)
          if (void 0 === e) {
            const e = o.slidesGrid[v],
              t = o.slidesGrid[v - T] - e;
            a
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(v - T, 0, !1, !0),
                i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t));
          } else o.slideToLoop(e, 0, !1, !0);
      if (
        ((o.allowSlidePrev = d),
        (o.allowSlideNext = c),
        o.controller && o.controller.control && !n)
      ) {
        const t = {
          slideRealIndex: e,
          slideTo: !1,
          direction: s,
          setTranslate: i,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((e) => {
              !e.destroyed && e.params.loop && e.loopFix(t);
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix(t);
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  const H = {
    setGrabCursor: function (e) {
      const t = this;
      if (
        !t.params.simulateTouch ||
        (t.params.watchOverflow && t.isLocked) ||
        t.params.cssMode
      )
        return;
      const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
      t.isElement && (t.__preventObserver__ = !0),
        (s.style.cursor = "move"),
        (s.style.cursor = e ? "grabbing" : "grab"),
        t.isElement &&
          requestAnimationFrame(() => {
            t.__preventObserver__ = !1;
          });
    },
    unsetGrabCursor: function () {
      const e = this;
      (e.params.watchOverflow && e.isLocked) ||
        e.params.cssMode ||
        (e.isElement && (e.__preventObserver__ = !0),
        (e[
          "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
        ].style.cursor = ""),
        e.isElement &&
          requestAnimationFrame(() => {
            e.__preventObserver__ = !1;
          }));
    },
  };
  function F(e) {
    const t = this,
      s = p(),
      i = h(),
      r = t.touchEventsData;
    r.evCache.push(e);
    const { params: n, touches: a, enabled: o } = t;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const c = !!n.noSwipingClass && "" !== n.noSwipingClass,
      u = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && u && (d = u[0]);
    const f = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      g = !(!l.target || !l.target.shadowRoot);
    if (
      n.noSwiping &&
      (g
        ? (function (e, t = this) {
            return (function t(s) {
              if (!s || s === p() || s === h()) return null;
              s.assignedSlot && (s = s.assignedSlot);
              const i = s.closest(e);
              return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
            })(t);
          })(f, d)
        : d.closest(f))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
    (a.currentX = l.pageX), (a.currentY = l.pageY);
    const v = a.currentX,
      w = a.currentY,
      S = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
      b = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (S && (v <= b || v >= i.innerWidth - b)) {
      if ("prevent" !== S) return;
      e.preventDefault();
    }
    Object.assign(r, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (a.startX = v),
      (a.startY = w),
      (r.touchStartTime = m()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (r.allowThresholdMove = !1);
    let T = !0;
    d.matches(r.focusableElements) &&
      ((T = !1), "SELECT" === d.nodeName && (r.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(r.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const y = T && t.allowTouchMove && n.touchStartPreventDefault;
    (!n.touchStartForcePreventDefault && !y) ||
      d.isContentEditable ||
      l.preventDefault(),
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function q(e) {
    const t = p(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: a, enabled: o } = s;
    if (!o) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    const d = i.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (i.evCache[d] = l);
    const c = i.evCache.length > 1 ? i.evCache[0] : l,
      u = c.pageX,
      h = c.pageY;
    if (l.preventedByNestedSwiper) return (n.startX = u), void (n.startY = h);
    if (!s.allowTouchMove)
      return (
        l.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, {
            startX: u,
            startY: h,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: u,
            currentY: h,
          }),
          (i.touchStartTime = m()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (h < n.startY && s.translate <= s.maxTranslate()) ||
          (h > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (u < n.startX && s.translate <= s.maxTranslate()) ||
        (u > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (n.currentX = u), (n.currentY = h);
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : f * f + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && l.cancelable && l.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && l.stopPropagation();
    let v = s.isHorizontal() ? f : g,
      w = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    r.oneWayMovement &&
      ((v = Math.abs(v) * (a ? 1 : -1)), (w = Math.abs(w) * (a ? 1 : -1))),
      (n.diff = v),
      (v *= r.touchRatio),
      a && ((v = -v), (w = -w));
    const S = s.touchesDirection;
    (s.swipeDirection = v > 0 ? "prev" : "next"),
      (s.touchesDirection = w > 0 ? "prev" : "next");
    const b = s.params.loop && !r.cssMode;
    if (!i.isMoved) {
      if (
        (b && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l);
    }
    let T;
    i.isMoved &&
      S !== s.touchesDirection &&
      b &&
      Math.abs(v) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (T = !0)),
      s.emit("sliderMove", l),
      (i.isMoved = !0),
      (i.currentTranslate = v + i.startTranslate);
    let y = !0,
      E = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (E = 0),
      v > 0
        ? (b &&
            !T &&
            i.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((y = !1),
            r.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + v) ** E)))
        : v < 0 &&
          (b &&
            !T &&
            i.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((y = !1),
            r.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - v) ** E))),
      y && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function N(e) {
    const t = this,
      s = t.touchEventsData,
      i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (i >= 0 && s.evCache.splice(i, 1),
      ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
    ) {
      if (
        !(
          "pointercancel" === e.type &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: r,
      touches: n,
      rtlTranslate: a,
      slidesGrid: o,
      enabled: l,
    } = t;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", d),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = m(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target),
        t.emit("tap click", d),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((s.lastClickTime = m()),
      f(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = r.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (t.params.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      g = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((h = e), (g = o[e + t] - o[e]))
        : u >= o[e] && ((h = e), (g = o[o.length - 1] - o[o.length - 2]));
    }
    let v = null,
      w = null;
    r.rewind &&
      (t.isBeginning
        ? (w =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (v = 0));
    const S = (u - o[h]) / g,
      b = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (p > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (S >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? v : h + b)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (S > 1 - r.longSwipesRatio
            ? t.slideTo(h + b)
            : null !== w && S < 0 && Math.abs(S) > r.longSwipesRatio
            ? t.slideTo(w)
            : t.slideTo(h));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(h + b)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : h + b),
          "prev" === t.swipeDirection && t.slideTo(null !== w ? w : h));
    }
  }
  function R() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
      a = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !a
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = i),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function j(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Y() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function X(e) {
    const t = this;
    _(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let U = !1;
  function K() {}
  const Z = (e, t) => {
    const s = p(),
      { params: i, el: r, wrapperEl: n, device: a } = e,
      o = !!i.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    r[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        r[l]("click", e.onClick, !0),
      i.cssMode && n[l]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[d](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            R,
            !0
          )
        : e[d]("observerUpdate", R, !0),
      r[l]("load", e.onLoad, { capture: !0 });
  };
  const Q = {
      attachEvents: function () {
        const e = this,
          t = p(),
          { params: s } = e;
        (e.onTouchStart = F.bind(e)),
          (e.onTouchMove = q.bind(e)),
          (e.onTouchEnd = N.bind(e)),
          s.cssMode && (e.onScroll = Y.bind(e)),
          (e.onClick = j.bind(e)),
          (e.onLoad = X.bind(e)),
          U || (t.addEventListener("touchstart", K), (U = !0)),
          Z(e, "on");
      },
      detachEvents: function () {
        Z(this, "off");
      },
    },
    J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const ee = {
    setBreakpoint: function () {
      const e = this,
        { realIndex: t, initialized: s, params: i, el: r } = e,
        n = i.breakpoints;
      if (!n || (n && 0 === Object.keys(n).length)) return;
      const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const o = (a in n ? n[a] : void 0) || e.originalParams,
        l = J(e, i),
        d = J(e, o),
        c = i.enabled;
      l && !d
        ? (r.classList.remove(
            `${i.containerModifierClass}grid`,
            `${i.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !l &&
          d &&
          (r.classList.add(`${i.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) ||
            (!o.grid.fill && "column" === i.grid.fill)) &&
            r.classList.add(`${i.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const s = i[t] && i[t].enabled,
            r = o[t] && o[t].enabled;
          s && !r && e[t].disable(), !s && r && e[t].enable();
        });
      const p = o.direction && o.direction !== i.direction,
        u = i.loop && (o.slidesPerView !== i.slidesPerView || p);
      p && s && e.changeDirection(), w(e.params, o);
      const h = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        c && !h ? e.disable() : !c && h && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", o),
        u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
        e.emit("breakpoint", o);
    },
    getBreakpoint: function (e, t = "window", s) {
      if (!e || ("container" === t && !s)) return;
      let i = !1;
      const r = h(),
        n = "window" === t ? r.innerHeight : s.clientHeight,
        a = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: n * t, point: e };
          }
          return { value: e, point: e };
        });
      a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < a.length; e += 1) {
        const { point: n, value: o } = a[e];
        "window" === t
          ? r.matchMedia(`(min-width: ${o}px)`).matches && (i = n)
          : o <= s.clientWidth && (i = n);
      }
      return i || "max";
    },
  };
  const te = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: i, el: r, device: n } = e,
        a = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && s.push(t + i);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: i },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: n.android },
            { ios: n.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { "watch-progress": s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...a), r.classList.add(...t), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { el: e, classNames: t } = this;
      e.classList.remove(...t), this.emitContainerClasses();
    },
  };
  const se = {
      checkOverflow: function () {
        const e = this,
          { isLocked: t, params: s } = e,
          { slidesOffsetBefore: i } = s;
        if (i) {
          const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
          e.isLocked = e.size > s;
        } else e.isLocked = 1 === e.snapGrid.length;
        !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
          !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
          t && t !== e.isLocked && (e.isEnd = !1),
          t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
      },
    },
    ie = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopedSlides: null,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
  function re(e, t) {
    return function (s = {}) {
      const i = Object.keys(s)[0],
        r = s[i];
      "object" == typeof r && null !== r
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in r
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              w(t, s))
            : w(t, s))
        : w(t, s);
    };
  }
  const ne = {
      eventsEmitter: k,
      update: G,
      translate: D,
      transition: B,
      slide: V,
      loop: W,
      grabCursor: H,
      events: Q,
      breakpoints: ee,
      checkOverflow: se,
      classes: te,
    },
    ae = {};
  class oe {
    constructor(...e) {
      let t, s;
      1 === e.length &&
      e[0].constructor &&
      "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
        ? (s = e[0])
        : ([t, s] = e),
        s || (s = {}),
        (s = w({}, s)),
        t && !s.el && (s.el = t);
      const i = p();
      if (
        s.el &&
        "string" == typeof s.el &&
        i.querySelectorAll(s.el).length > 1
      ) {
        const e = [];
        return (
          i.querySelectorAll(s.el).forEach((t) => {
            const i = w({}, s, { el: t });
            e.push(new oe(i));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = P()),
        (r.device = O({ userAgent: s.userAgent })),
        (r.browser = A()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        s.modules && Array.isArray(s.modules) && r.modules.push(...s.modules);
      const n = {};
      r.modules.forEach((e) => {
        e({
          params: s,
          swiper: r,
          extendParams: re(s, n),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const a = w({}, ie, n);
      return (
        (r.params = w({}, a, ae, s)),
        (r.originalParams = w({}, r.params)),
        (r.passedParams = w({}, s)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: t,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = E(T(t, `.${s.slideClass}, swiper-slide`)[0]);
      return E(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
        )[0]
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = T(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        r = (s.maxTranslate() - i) * e + i;
      s.translateTo(r, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: n,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if (s.centeredSlides) {
        let e,
          t = i[o].swiperSlideSize;
        for (let s = o + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let s = o - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < i.length; e += 1) {
          (t ? r[e] + n[e] - r[o] < a : r[e] - r[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          r[o] - r[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && _(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled)
      )
        i(), e.params.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
          e.isEnd &&
          !e.params.centeredSlides
        ) {
          const t =
            e.virtual && e.params.virtual.enabled ? e.virtual.slides : e.slides;
          r = e.slideTo(t.length - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t), s.shadowEl && (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return T(s, i())[0];
      })();
      return (
        !r &&
          t.params.createElements &&
          ((r = (function (e, t = []) {
            const s = document.createElement(e);
            return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
          })("div", t.params.wrapperClass)),
          s.append(r),
          T(s, `.${t.params.slideClass}`).forEach((e) => {
            r.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: r,
          slidesEl: t.isElement ? s : r,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === y(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === y(s, "direction")),
          wrongRTL: "-webkit-box" === y(r, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents(),
          [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
            e.complete
              ? _(t, e)
              : e.addEventListener("load", (e) => {
                  _(t, e.target);
                });
          }),
          z(t),
          (t.initialized = !0),
          z(t),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: i, el: r, wrapperEl: n, slides: a } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            r.removeAttribute("style"),
            n.removeAttribute("style"),
            a &&
              a.length &&
              a.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      w(ae, e);
    }
    static get extendedDefaults() {
      return ae;
    }
    static get defaults() {
      return ie;
    }
    static installModule(e) {
      oe.prototype.__modules__ || (oe.prototype.__modules__ = []);
      const t = oe.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => oe.installModule(e)), oe)
        : (oe.installModule(e), oe);
    }
  }
  Object.keys(ne).forEach((e) => {
    Object.keys(ne[e]).forEach((t) => {
      oe.prototype[t] = ne[e][t];
    });
  }),
    oe.use([
      function ({ swiper: e, on: t, emit: s }) {
        const i = h();
        let r = null,
          n = null;
        const a = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== i.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((r = new ResizeObserver((t) => {
                n = i.requestAnimationFrame(() => {
                  const { width: s, height: i } = e;
                  let r = s,
                    n = i;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: s, target: i }) => {
                      (i && i !== e.el) ||
                        ((r = s ? s.width : (t[0] || t).inlineSize),
                        (n = s ? s.height : (t[0] || t).blockSize));
                    }
                  ),
                    (r === s && n === i) || a();
                });
              })),
              r.observe(e.el))
            : (i.addEventListener("resize", a),
              i.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            n && i.cancelAnimationFrame(n),
              r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
              i.removeEventListener("resize", a),
              i.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: i }) {
        const r = [],
          n = h(),
          a = (t, s = {}) => {
            const a = new (n.MutationObserver || n.WebkitMutationObserver)(
              (t) => {
                if (e.__preventObserver__) return;
                if (1 === t.length) return void i("observerUpdate", t[0]);
                const s = function () {
                  i("observerUpdate", t[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              }
            );
            a.observe(t, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              r.push(a);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = (function (e, t) {
                  const s = [];
                  let i = e.parentElement;
                  for (; i; )
                    t ? i.matches(t) && s.push(i) : s.push(i),
                      (i = i.parentElement);
                  return s;
                })(e.el);
                for (let e = 0; e < t.length; e += 1) a(t[e]);
              }
              a(e.el, { childList: e.params.observeSlideChildren }),
                a(e.wrapperEl, { attributes: !1 });
            }
          }),
          s("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  function le() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    le();
  });
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`
        ),
          a(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let s = t.split("|"),
              i = { root: s[0], margin: s[1], threshold: s[2] },
              r = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  r = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(s) === i.margin &&
                  String(r) === i.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(r, n);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && n(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let de = !1;
  setTimeout(() => {
    if (de) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    r(),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const s = t.closest("[data-goto]"),
              i = s.dataset.goto ? s.dataset.goto : "",
              r = !!s.hasAttribute("data-goto-header"),
              n = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
            o(i, r, n), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            s = t.target;
          if ("navigator" === s.dataset.watch) {
            const e = s.id,
              i =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? i && i.classList.add("_navigator-active")
              : i && i.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })(),
    (function () {
      de = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        i = e.dataset.scroll ? e.dataset.scroll : 1;
      let r,
        n = 0;
      document.addEventListener("windowScroll", function (a) {
        const o = window.scrollY;
        clearTimeout(r),
          o >= i
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (o > n
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (r = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, s))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (n = o <= 0 ? 0 : o);
      });
    })();
  const ce = document.body,
    pe = "scroll-up",
    ue = "scroll-down";
  let he = 0;
  window.addEventListener("scroll", () => {
    const e = window.pageYOffset;
    e <= 0
      ? ce.classList.remove(pe)
      : (e > he && !ce.classList.contains(ue)
          ? (ce.classList.remove(pe), ce.classList.add(ue))
          : e < he &&
            ce.classList.contains(ue) &&
            (ce.classList.remove(ue), ce.classList.add(pe)),
        (he = e));
  });
  const fe = document.querySelectorAll(".tabpanel");
  fe.forEach((e) => {
    new Swiper(e.querySelector(".swiper"), {
      slidesPerView: "1",
      spaceBetween: 20,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1200: { slidesPerView: 3, spaceBetween: 60 },
      },
      loop: !0,
      grabCursor: !0,
    });
  });
  const me = document.querySelectorAll(".tab");
  me.forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault(),
        me.forEach((e) => e.classList.remove("active")),
        e.classList.add("active");
      const s = e.getAttribute("href");
      fe.forEach((e) => {
        e.classList.remove("active"),
          "#" + e.getAttribute("id") === s && e.classList.add("active");
      });
    });
  });
  const ge = document.querySelector("#tablist").querySelectorAll("li"),
    ve = document.querySelectorAll(".tabpanel");
  document.querySelectorAll(".trainerSwiper");
  for (const e of ge) {
    const t = e.querySelector("a");
    t.addEventListener("click", (e) => {
      e.preventDefault(), we(t);
    });
  }
  function we(e) {
    const t = document.querySelector(e.getAttribute("href"));
    for (const e of ve)
      e === t
        ? (e.classList.add("active"), Se(t))
        : e.classList.remove("active");
  }
  function Se(e) {
    const t = e.querySelector(".trainerSwiper");
    t.classList.contains("swiper-container-initialized") ||
      (new Swiper(t, {
        slidesPerView: "1",
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 60 },
        },
        loop: !0,
        grabCursor: !0,
      }),
      t.classList.add("swiper-container-initialized"));
  }
  new Swiper(".gallerySwiper", {
    slidesPerView: "1",
    loop: !0,
    navigation: { nextEl: ".swiper-button-next" },
    pagination: { el: ".swiper-pagination", clickable: !0 },
    paginationType: "fraction",
    grabCursor: !0,
  });
  we(ge[0].querySelector("a"));
  const be = document.querySelectorAll(".gallery__tab");
  be.forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault(),
        be.forEach((e) => {
          e.classList.remove("active");
        }),
        e.classList.add("active");
    });
  });
})();
