(function($) {
    'use strict';
    var Qe = "tooltip",
        Ke = t.fn.tooltip,
        Ge = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Ze = ["sanitize", "whiteList", "sanitizeFn"],
        Je = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        et = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        tt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Xe
        },
        nt = "show",
        it = "out",
        rt = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        ot = "fade",
        st = "show",
        at = ".tooltip-inner",
        lt = ".arrow",
        ct = "hover",
        ut = "focus",
        dt = "click",
        ht = "manual",
        ft = function() {
            function e(e, t) {
                if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
            }
            var i = e.prototype;
            return i.enable = function() {
                this._isEnabled = !0
            }, i.disable = function() {
                this._isEnabled = !1
            }, i.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, i.toggle = function(e) {
                if (this._isEnabled)
                    if (e) {
                        var n = this.constructor.DATA_KEY,
                            i = t(e.currentTarget).data(n);
                        i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (t(this.getTipElement()).hasClass(st)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, i.dispose = function() {
                clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, i.show = function() {
                var e = this;
                if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                var i = t.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    t(this.element).trigger(i);
                    var r = c.findShadowRoot(this.element),
                        o = t.contains(null !== r ? r : this.element.ownerDocument.documentElement, this.element);
                    if (i.isDefaultPrevented() || !o) return;
                    var s = this.getTipElement(),
                        a = c.getUID(this.constructor.NAME);
                    s.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && t(s).addClass(ot);
                    var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                        u = this._getAttachment(l);
                    this.addAttachmentClass(u);
                    var d = this._getContainer();
                    t(s).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(s).appendTo(d), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, s, {
                        placement: u,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: lt
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), t(s).addClass(st), "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
                    var h = function() {
                        e.config.animation && e._fixTransition();
                        var n = e._hoverState;
                        e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === it && e._leave(null, e)
                    };
                    if (t(this.tip).hasClass(ot)) {
                        var f = c.getTransitionDurationFromElement(this.tip);
                        t(this.tip).one(c.TRANSITION_END, h).emulateTransitionEnd(f)
                    } else h()
                }
            }, i.hide = function(e) {
                var n = this,
                    i = this.getTipElement(),
                    r = t.Event(this.constructor.Event.HIDE),
                    o = function() {
                        n._hoverState !== nt && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                    };
                if (t(this.element).trigger(r), !r.isDefaultPrevented()) {
                    if (t(i).removeClass(st), "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop), this._activeTrigger[dt] = !1, this._activeTrigger[ut] = !1, this._activeTrigger[ct] = !1, t(this.tip).hasClass(ot)) {
                        var s = c.getTransitionDurationFromElement(i);
                        t(i).one(c.TRANSITION_END, o).emulateTransitionEnd(s)
                    } else o();
                    this._hoverState = ""
                }
            }, i.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, i.isWithContent = function() {
                return Boolean(this.getTitle())
            }, i.addAttachmentClass = function(e) {
                t(this.getTipElement()).addClass("bs-tooltip-" + e)
            }, i.getTipElement = function() {
                return this.tip = this.tip || t(this.config.template)[0], this.tip
            }, i.setContent = function() {
                var e = this.getTipElement();
                this.setElementContent(t(e.querySelectorAll(at)), this.getTitle()), t(e).removeClass(ot + " " + st)
            }, i.setElementContent = function(e, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = ze(n, this.config.whiteList, this.config.sanitizeFn)), e.html(n)) : e.text(n) : this.config.html ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text())
            }, i.getTitle = function() {
                var e = this.element.getAttribute("data-original-title");
                return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
            }, i._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function(t) {
                    return t.offsets = s({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, i._getContainer = function() {
                return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? t(this.config.container) : t(document).find(this.config.container)
            }, i._getAttachment = function(e) {
                return et[e.toUpperCase()]
            }, i._setListeners = function() {
                var e = this;
                this.config.trigger.split(" ").forEach(function(n) {
                    if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                        return e.toggle(t)
                    });
                    else if (n !== ht) {
                        var i = n === ct ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                            r = n === ct ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                        t(e.element).on(i, e.config.selector, function(t) {
                            return e._enter(t)
                        }).on(r, e.config.selector, function(t) {
                            return e._leave(t)
                        })
                    }
                }), t(this.element).closest(".modal").on("hide.bs.modal", function() {
                    e.element && e.hide()
                }), this.config.selector ? this.config = s({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, i._fixTitle = function() {
                var e = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, i._enter = function(e, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? ut : ct] = !0), t(n.getTipElement()).hasClass(st) || n._hoverState === nt ? n._hoverState = nt : (clearTimeout(n._timeout), n._hoverState = nt, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                    n._hoverState === nt && n.show()
                }, n.config.delay.show) : n.show())
            }, i._leave = function(e, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? ut : ct] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = it, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                    n._hoverState === it && n.hide()
                }, n.config.delay.hide) : n.hide())
            }, i._isWithActiveTrigger = function() {
                for (var e in this._activeTrigger)
                    if (this._activeTrigger[e]) return !0;
                return !1
            }, i._getConfig = function(e) {
                var n = t(this.element).data();
                return Object.keys(n).forEach(function(e) {
                    -1 !== Ze.indexOf(e) && delete n[e]
                }), "number" == typeof(e = s({}, this.constructor.Default, n, "object" == typeof e && e ? e : {})).delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), c.typeCheckConfig(Qe, e, this.constructor.DefaultType), e.sanitize && (e.template = ze(e.template, e.whiteList, e.sanitizeFn)), e
            }, i._getDelegateConfig = function() {
                var e = {};
                if (this.config)
                    for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                return e
            }, i._cleanTipClass = function() {
                var e = t(this.getTipElement()),
                    n = e.attr("class").match(Ge);
                null !== n && n.length && e.removeClass(n.join(""))
            }, i._handlePopperPlacementChange = function(e) {
                var t = e.instance;
                this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
            }, i._fixTransition = function() {
                var e = this.getTipElement(),
                    n = this.config.animation;
                null === e.getAttribute("x-placement") && (t(e).removeClass(ot), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, e._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = t(this).data("bs.tooltip"),
                        r = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new e(this, r), t(this).data("bs.tooltip", i)), "string" == typeof n)) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, r(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return tt
                }
            }, {
                key: "NAME",
                get: function() {
                    return Qe
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "bs.tooltip"
                }
            }, {
                key: "Event",
                get: function() {
                    return rt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Je
                }
            }]), e
        }();
    t.fn.tooltip = ft._jQueryInterface, t.fn.tooltip.Constructor = ft, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = Ke, ft._jQueryInterface
    };
    var pt = "popover",
        gt = t.fn.popover,
        mt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        vt = s({}, ft.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        yt = s({}, ft.DefaultType, {
            content: "(string|element|function)"
        }),
        bt = "fade",
        wt = "show",
        _t = ".popover-header",
        Ct = ".popover-body",
        xt = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        St = function(e) {
            var n, i;

            function o() {
                return e.apply(this, arguments) || this
            }
            i = e, (n = o).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var s = o.prototype;
            return s.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, s.addAttachmentClass = function(e) {
                t(this.getTipElement()).addClass("bs-popover-" + e)
            }, s.getTipElement = function() {
                return this.tip = this.tip || t(this.config.template)[0], this.tip
            }, s.setContent = function() {
                var e = t(this.getTipElement());
                this.setElementContent(e.find(_t), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(Ct), n), e.removeClass(bt + " " + wt)
            }, s._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, s._cleanTipClass = function() {
                var e = t(this.getTipElement()),
                    n = e.attr("class").match(mt);
                null !== n && n.length > 0 && e.removeClass(n.join(""))
            }, o._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = t(this).data("bs.popover"),
                        i = "object" == typeof e ? e : null;
                    if ((n || !/dispose|hide/.test(e)) && (n || (n = new o(this, i), t(this).data("bs.popover", n)), "string" == typeof e)) {
                        if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                })
            }, r(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return vt
                }
            }, {
                key: "NAME",
                get: function() {
                    return pt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function() {
                    return xt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return yt
                }
            }]), o
        }(ft);
    t.fn.popover = St._jQueryInterface, t.fn.popover.Constructor = St, t.fn.popover.noConflict = function() {
        return t.fn.popover = gt, St._jQueryInterface
    };
    var Tt = "scrollspy",
        Et = t.fn[Tt],
        kt = {
            offset: 10,
            method: "auto",
            target: ""
        },
        Ot = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        At = {
            ACTIVATE: "activate.bs.scrollspy",
            SCROLL: "scroll.bs.scrollspy",
            LOAD_DATA_API: "load.bs.scrollspy.data-api"
        },
        Dt = "dropdown-item",
        Pt = "active",
        Lt = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        },
        Nt = "offset",
        It = "position",
        $t = function() {
            function e(e, n) {
                var i = this;
                this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + Lt.NAV_LINKS + "," + this._config.target + " " + Lt.LIST_ITEMS + "," + this._config.target + " " + Lt.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(At.SCROLL, function(e) {
                    return i._process(e)
                }), this.refresh(), this._process()
            }
            var n = e.prototype;
            return n.refresh = function() {
                var e = this,
                    n = this._scrollElement === this._scrollElement.window ? Nt : It,
                    i = "auto" === this._config.method ? n : this._config.method,
                    r = i === It ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
                    var n, o = c.getSelectorFromElement(e);
                    if (o && (n = document.querySelector(o)), n) {
                        var s = n.getBoundingClientRect();
                        if (s.width || s.height) return [t(n)[i]().top + r, o]
                    }
                    return null
                }).filter(function(e) {
                    return e
                }).sort(function(e, t) {
                    return e[0] - t[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, n.dispose = function() {
                t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function(e) {
                if ("string" != typeof(e = s({}, kt, "object" == typeof e && e ? e : {})).target) {
                    var n = t(e.target).attr("id");
                    n || (n = c.getUID(Tt), t(e.target).attr("id", n)), e.target = "#" + n
                }
                return c.typeCheckConfig(Tt, e, Ot), e
            }, n._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function() {
                var e = this._getScrollTop() + this._config.offset,
                    t = this._getScrollHeight(),
                    n = this._config.offset + t - this._getOffsetHeight();
                if (this._scrollHeight !== t && this.refresh(), e >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var r = this._offsets.length; r--;) {
                        this._activeTarget !== this._targets[r] && e >= this._offsets[r] && (void 0 === this._offsets[r + 1] || e < this._offsets[r + 1]) && this._activate(this._targets[r])
                    }
                }
            }, n._activate = function(e) {
                this._activeTarget = e, this._clear();
                var n = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    i = t([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass(Dt) ? (i.closest(Lt.DROPDOWN).find(Lt.DROPDOWN_TOGGLE).addClass(Pt), i.addClass(Pt)) : (i.addClass(Pt), i.parents(Lt.NAV_LIST_GROUP).prev(Lt.NAV_LINKS + ", " + Lt.LIST_ITEMS).addClass(Pt), i.parents(Lt.NAV_LIST_GROUP).prev(Lt.NAV_ITEMS).children(Lt.NAV_LINKS).addClass(Pt)), t(this._scrollElement).trigger(At.ACTIVATE, {
                    relatedTarget: e
                })
            }, n._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(e) {
                    return e.classList.contains(Pt)
                }).forEach(function(e) {
                    return e.classList.remove(Pt)
                })
            }, e._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = t(this).data("bs.scrollspy");
                    if (i || (i = new e(this, "object" == typeof n && n), t(this).data("bs.scrollspy", i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, r(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return kt
                }
            }]), e
        }();
    t(window).on(At.LOAD_DATA_API, function() {
        for (var e = [].slice.call(document.querySelectorAll(Lt.DATA_SPY)), n = e.length; n--;) {
            var i = t(e[n]);
            $t._jQueryInterface.call(i, i.data())
        }
    }), t.fn[Tt] = $t._jQueryInterface, t.fn[Tt].Constructor = $t, t.fn[Tt].noConflict = function() {
        return t.fn[Tt] = Et, $t._jQueryInterface
    };
    var jt = t.fn.tab,
        Mt = {
            HIDE: "hide.bs.tab",
            HIDDEN: "hidden.bs.tab",
            SHOW: "show.bs.tab",
            SHOWN: "shown.bs.tab",
            CLICK_DATA_API: "click.bs.tab.data-api"
        },
        Ht = "dropdown-menu",
        Wt = "active",
        Rt = "disabled",
        Ft = "fade",
        Bt = "show",
        qt = ".dropdown",
        Vt = ".nav, .list-group",
        Xt = ".active",
        Yt = "> li > .active",
        Ut = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        zt = ".dropdown-toggle",
        Qt = "> .dropdown-menu .active",
        Kt = function() {
            function e(e) {
                this._element = e
            }
            var n = e.prototype;
            return n.show = function() {
                var e = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(Wt) || t(this._element).hasClass(Rt))) {
                    var n, i, r = t(this._element).closest(Vt)[0],
                        o = c.getSelectorFromElement(this._element);
                    if (r) {
                        var s = "UL" === r.nodeName || "OL" === r.nodeName ? Yt : Xt;
                        i = (i = t.makeArray(t(r).find(s)))[i.length - 1]
                    }
                    var a = t.Event(Mt.HIDE, {
                            relatedTarget: this._element
                        }),
                        l = t.Event(Mt.SHOW, {
                            relatedTarget: i
                        });
                    if (i && t(i).trigger(a), t(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
                        o && (n = document.querySelector(o)), this._activate(this._element, r);
                        var u = function() {
                            var n = t.Event(Mt.HIDDEN, {
                                    relatedTarget: e._element
                                }),
                                r = t.Event(Mt.SHOWN, {
                                    relatedTarget: i
                                });
                            t(i).trigger(n), t(e._element).trigger(r)
                        };
                        n ? this._activate(n, n.parentNode, u) : u()
                    }
                }
            }, n.dispose = function() {
                t.removeData(this._element, "bs.tab"), this._element = null
            }, n._activate = function(e, n, i) {
                var r = this,
                    o = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? t(n).children(Xt) : t(n).find(Yt))[0],
                    s = i && o && t(o).hasClass(Ft),
                    a = function() {
                        return r._transitionComplete(e, o, i)
                    };
                if (o && s) {
                    var l = c.getTransitionDurationFromElement(o);
                    t(o).removeClass(Bt).one(c.TRANSITION_END, a).emulateTransitionEnd(l)
                } else a()
            }, n._transitionComplete = function(e, n, i) {
                if (n) {
                    t(n).removeClass(Wt);
                    var r = t(n.parentNode).find(Qt)[0];
                    r && t(r).removeClass(Wt), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (t(e).addClass(Wt), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), c.reflow(e), e.classList.contains(Ft) && e.classList.add(Bt), e.parentNode && t(e.parentNode).hasClass(Ht)) {
                    var o = t(e).closest(qt)[0];
                    if (o) {
                        var s = [].slice.call(o.querySelectorAll(zt));
                        t(s).addClass(Wt)
                    }
                    e.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, e._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = t(this),
                        r = i.data("bs.tab");
                    if (r || (r = new e(this), i.data("bs.tab", r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n]()
                    }
                })
            }, r(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), e
        }();
    t(document).on(Mt.CLICK_DATA_API, Ut, function(e) {
        e.preventDefault(), Kt._jQueryInterface.call(t(this), "show")
    }), t.fn.tab = Kt._jQueryInterface, t.fn.tab.Constructor = Kt, t.fn.tab.noConflict = function() {
        return t.fn.tab = jt, Kt._jQueryInterface
    };
    var Gt = t.fn.toast,
        Zt = {
            CLICK_DISMISS: "click.dismiss.bs.toast",
            HIDE: "hide.bs.toast",
            HIDDEN: "hidden.bs.toast",
            SHOW: "show.bs.toast",
            SHOWN: "shown.bs.toast"
        },
        Jt = "fade",
        en = "hide",
        tn = "show",
        nn = "showing",
        rn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        on = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        sn = '[data-dismiss="toast"]',
        an = function() {
            function e(e, t) {
                this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
            }
            var n = e.prototype;
            return n.show = function() {
                var e = this;
                t(this._element).trigger(Zt.SHOW), this._config.animation && this._element.classList.add(Jt);
                var n = function() {
                    e._element.classList.remove(nn), e._element.classList.add(tn), t(e._element).trigger(Zt.SHOWN), e._config.autohide && e.hide()
                };
                if (this._element.classList.remove(en), this._element.classList.add(nn), this._config.animation) {
                    var i = c.getTransitionDurationFromElement(this._element);
                    t(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, n.hide = function(e) {
                var n = this;
                this._element.classList.contains(tn) && (t(this._element).trigger(Zt.HIDE), e ? this._close() : this._timeout = setTimeout(function() {
                    n._close()
                }, this._config.delay))
            }, n.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(tn) && this._element.classList.remove(tn), t(this._element).off(Zt.CLICK_DISMISS), t.removeData(this._element, "bs.toast"), this._element = null, this._config = null
            }, n._getConfig = function(e) {
                return e = s({}, on, t(this._element).data(), "object" == typeof e && e ? e : {}), c.typeCheckConfig("toast", e, this.constructor.DefaultType), e
            }, n._setListeners = function() {
                var e = this;
                t(this._element).on(Zt.CLICK_DISMISS, sn, function() {
                    return e.hide(!0)
                })
            }, n._close = function() {
                var e = this,
                    n = function() {
                        e._element.classList.add(en), t(e._element).trigger(Zt.HIDDEN)
                    };
                if (this._element.classList.remove(tn), this._config.animation) {
                    var i = c.getTransitionDurationFromElement(this._element);
                    t(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, e._jQueryInterface = function(n) {
                return this.each(function() {
                    var i = t(this),
                        r = i.data("bs.toast");
                    if (r || (r = new e(this, "object" == typeof n && n), i.data("bs.toast", r)), "string" == typeof n) {
                        if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                        r[n](this)
                    }
                })
            }, r(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return rn
                }
            }, {
                key: "Default",
                get: function() {
                    return on
                }
            }]), e
        }();
    t.fn.toast = an._jQueryInterface, t.fn.toast.Constructor = an, t.fn.toast.noConflict = function() {
            return t.fn.toast = Gt, an._jQueryInterface
        },
        function() {
            if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = t.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), e.Util = c, e.Alert = g, e.Button = E, e.Carousel = U, e.Collapse = se, e.Dropdown = Pe, e.Modal = qe, e.Popover = St, e.Scrollspy = $t, e.Tab = Kt, e.Toast = an, e.Tooltip = ft, Object.defineProperty(e, "__esModule", {
            value: !0
        })
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, t, n, i, r) {
        return jQuery.easing[jQuery.easing.def](e, t, n, i, r)
    },
    easeInQuad: function(e, t, n, i, r) {
        return i * (t /= r) * t + n
    },
    easeOutQuad: function(e, t, n, i, r) {
        return -i * (t /= r) * (t - 2) + n
    },
    easeInOutQuad: function(e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function(e, t, n, i, r) {
        return i * (t /= r) * t * t + n
    },
    easeOutCubic: function(e, t, n, i, r) {
        return i * ((t = t / r - 1) * t * t + 1) + n
    },
    easeInOutCubic: function(e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function(e, t, n, i, r) {
        return i * (t /= r) * t * t * t + n
    },
    easeOutQuart: function(e, t, n, i, r) {
        return -i * ((t = t / r - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function(e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function(e, t, n, i, r) {
        return i * (t /= r) * t * t * t * t + n
    },
    easeOutQuint: function(e, t, n, i, r) {
        return i * ((t = t / r - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function(e, t, n, i, r) {
        return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function(e, t, n, i, r) {
        return -i * Math.cos(t / r * (Math.PI / 2)) + i + n
    },
    easeOutSine: function(e, t, n, i, r) {
        return i * Math.sin(t / r * (Math.PI / 2)) + n
    },
    easeInOutSine: function(e, t, n, i, r) {
        return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n
    },
    easeInExpo: function(e, t, n, i, r) {
        return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n
    },
    easeOutExpo: function(e, t, n, i, r) {
        return t == r ? n + i : i * (1 - Math.pow(2, -10 * t / r)) + n
    },
    easeInOutExpo: function(e, t, n, i, r) {
        return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (2 - Math.pow(2, -10 * --t)) + n
    },
    easeInCirc: function(e, t, n, i, r) {
        return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n
    },
    easeOutCirc: function(e, t, n, i, r) {
        return i * Math.sqrt(1 - (t = t / r - 1) * t) + n
    },
    easeInOutCirc: function(e, t, n, i, r) {
        return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function(e, t, n, i, r) {
        var o = 1.70158,
            s = 0,
            a = i;
        if (0 == t) return n;
        if (1 == (t /= r)) return n + i;
        if (s || (s = .3 * r), a < Math.abs(i)) {
            a = i;
            o = s / 4
        } else o = s / (2 * Math.PI) * Math.asin(i / a);
        return -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / s) + n
    },
    easeOutElastic: function(e, t, n, i, r) {
        var o = 1.70158,
            s = 0,
            a = i;
        if (0 == t) return n;
        if (1 == (t /= r)) return n + i;
        if (s || (s = .3 * r), a < Math.abs(i)) {
            a = i;
            o = s / 4
        } else o = s / (2 * Math.PI) * Math.asin(i / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * r - o) * (2 * Math.PI) / s) + i + n
    },
    easeInOutElastic: function(e, t, n, i, r) {
        var o = 1.70158,
            s = 0,
            a = i;
        if (0 == t) return n;
        if (2 == (t /= r / 2)) return n + i;
        if (s || (s = r * (.3 * 1.5)), a < Math.abs(i)) {
            a = i;
            o = s / 4
        } else o = s / (2 * Math.PI) * Math.asin(i / a);
        return t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / s) * -.5 + n : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / s) * .5 + i + n
    },
    easeInBack: function(e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n
    },
    easeOutBack: function(e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n
    },
    easeInOutBack: function(e, t, n, i, r, o) {
        return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * ((1 + (o *= 1.525)) * t - o)) + n : i / 2 * ((t -= 2) * t * ((1 + (o *= 1.525)) * t + o) + 2) + n
    },
    easeInBounce: function(e, t, n, i, r) {
        return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n
    },
    easeOutBounce: function(e, t, n, i, r) {
        return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + n : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInOutBounce: function(e, t, n, i, r) {
        return t < r / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n
    }
}), jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (function(e) {
    function t(e) {
        var t = e.length,
            i = n.type(e);
        return "function" !== i && !n.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
    }
    if (!e.jQuery) {
        var n = function(e, t) {
            return new n.fn.init(e, t)
        };
        n.isWindow = function(e) {
            return null != e && e == e.window
        }, n.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? r[s.call(e)] || "object" : typeof e
        }, n.isArray = Array.isArray || function(e) {
            return "array" === n.type(e)
        }, n.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e)) return !1;
            try {
                if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            for (t in e);
            return void 0 === t || o.call(e, t)
        }, n.each = function(e, n, i) {
            var r = 0,
                o = e.length,
                s = t(e);
            if (i) {
                if (s)
                    for (; o > r && !1 !== n.apply(e[r], i); r++);
                else
                    for (r in e)
                        if (!1 === n.apply(e[r], i)) break
            } else if (s)
                for (; o > r && !1 !== n.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === n.call(e[r], r, e[r])) break; return e
        }, n.data = function(e, t, r) {
            if (void 0 === r) {
                var o = (s = e[n.expando]) && i[s];
                if (void 0 === t) return o;
                if (o && t in o) return o[t]
            } else if (void 0 !== t) {
                var s = e[n.expando] || (e[n.expando] = ++n.uuid);
                return i[s] = i[s] || {}, i[s][t] = r, r
            }
        }, n.removeData = function(e, t) {
            var r = e[n.expando],
                o = r && i[r];
            o && n.each(t, function(e, t) {
                delete o[t]
            })
        }, n.extend = function() {
            var e, t, i, r, o, s, a = arguments[0] || {},
                l = 1,
                c = arguments.length,
                u = !1;
            for ("boolean" == typeof a && (u = a, a = arguments[l] || {}, l++), "object" != typeof a && "function" !== n.type(a) && (a = {}), l === c && (a = this, l--); c > l; l++)
                if (null != (o = arguments[l]))
                    for (r in o) e = a[r], a !== (i = o[r]) && (u && i && (n.isPlainObject(i) || (t = n.isArray(i))) ? (t ? (t = !1, s = e && n.isArray(e) ? e : []) : s = e && n.isPlainObject(e) ? e : {}, a[r] = n.extend(u, s, i)) : void 0 !== i && (a[r] = i));
            return a
        }, n.queue = function(e, i, r) {
            if (e) {
                i = (i || "fx") + "queue";
                var o = n.data(e, i);
                return r ? (!o || n.isArray(r) ? o = n.data(e, i, function(e, n) {
                    var i = n || [];
                    return null != e && (t(Object(e)) ? function(e, t) {
                        for (var n = +t.length, i = 0, r = e.length; n > i;) e[r++] = t[i++];
                        if (n != n)
                            for (; void 0 !== t[i];) e[r++] = t[i++];
                        e.length = r
                    }(i, "string" == typeof e ? [e] : e) : [].push.call(i, e)), i
                }(r)) : o.push(r), o) : o || []
            }
        }, n.dequeue = function(e, t) {
            n.each(e.nodeType ? [e] : e, function(e, i) {
                t = t || "fx";
                var r = n.queue(i, t),
                    o = r.shift();
                "inprogress" === o && (o = r.shift()), o && ("fx" === t && r.unshift("inprogress"), o.call(i, function() {
                    n.dequeue(i, t)
                }))
            })
        }, n.fn = n.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }
                var t = this[0],
                    e = e.apply(t),
                    i = this.offset(),
                    r = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0,
                        left: 0
                    } : n(e).offset();
                return i.top -= parseFloat(t.style.marginTop) || 0, i.left -= parseFloat(t.style.marginLeft) || 0, e.style && (r.top += parseFloat(e.style.borderTopWidth) || 0, r.left += parseFloat(e.style.borderLeftWidth) || 0), {
                    top: i.top - r.top,
                    left: i.left - r.left
                }
            }
        };
        var i = {};
        n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
        for (var r = {}, o = r.hasOwnProperty, s = r.toString, a = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < a.length; l++) r["[object " + a[l] + "]"] = a[l].toLowerCase();
        n.fn.init.prototype = n.fn, e.Velocity = {
            Utilities: n
        }
    }
}(window), function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    return function(e, t, n, i) {
        function r(e) {
            return f.isWrapped(e) ? e = [].slice.call(e) : f.isNode(e) && (e = [e]), e
        }

        function o(e) {
            var t = u.data(e, "velocity");
            return null === t ? i : t
        }

        function s(e, n, i, r) {
            function o(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function s(e, t) {
                return 3 * t - 6 * e
            }

            function a(e) {
                return 3 * e
            }

            function l(e, t, n) {
                return ((o(t, n) * e + s(t, n)) * e + a(t)) * e
            }

            function c(e, t, n) {
                return 3 * o(t, n) * e * e + 2 * s(t, n) * e + a(t)
            }

            function u(t, n) {
                for (var r = 0; f > r; ++r) {
                    var o = c(n, e, i);
                    if (0 === o) return n;
                    n -= (l(n, e, i) - t) / o
                }
                return n
            }

            function d(t, n, r) {
                var o, s, a = 0;
                do {
                    (o = l(s = n + (r - n) / 2, e, i) - t) > 0 ? r = s : n = s
                } while (Math.abs(o) > g && ++a < m);
                return s
            }

            function h() {
                C = !0, (e != n || i != r) && function() {
                    for (var t = 0; v > t; ++t) _[t] = l(t * y, e, i)
                }()
            }
            var f = 4,
                p = .001,
                g = 1e-7,
                m = 10,
                v = 11,
                y = 1 / (v - 1),
                b = "Float32Array" in t;
            if (4 !== arguments.length) return !1;
            for (var w = 0; 4 > w; ++w)
                if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
            e = Math.min(e, 1), i = Math.min(i, 1), e = Math.max(e, 0), i = Math.max(i, 0);
            var _ = b ? new Float32Array(v) : new Array(v),
                C = !1,
                x = function(t) {
                    return C || h(), e === n && i === r ? t : 0 === t ? 0 : 1 === t ? 1 : l(function(t) {
                        for (var n = 0, r = 1, o = v - 1; r != o && _[r] <= t; ++r) n += y;
                        var s = n + (t - _[--r]) / (_[r + 1] - _[r]) * y,
                            a = c(s, e, i);
                        return a >= p ? u(t, s) : 0 == a ? s : d(t, n, n + y)
                    }(t), n, r)
                };
            x.getControlPoints = function() {
                return [{
                    x: e,
                    y: n
                }, {
                    x: i,
                    y: r
                }]
            };
            var S = "generateBezier(" + [e, n, i, r] + ")";
            return x.toString = function() {
                return S
            }, x
        }

        function a(e, t) {
            var n = e;
            return f.isString(e) ? v.Easings[e] || (n = !1) : n = f.isArray(e) && 1 === e.length ? function(e) {
                return function(t) {
                    return Math.round(t * e) * (1 / e)
                }
            }.apply(null, e) : f.isArray(e) && 2 === e.length ? y.apply(null, e.concat([t])) : !(!f.isArray(e) || 4 !== e.length) && s.apply(null, e), !1 === n && (n = v.Easings[v.defaults.easing] ? v.defaults.easing : m), n
        }

        function l(e) {
            if (e) {
                var t = (new Date).getTime(),
                    n = v.State.calls.length;
                n > 1e4 && (v.State.calls = function(e) {
                    for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                        var r = e[t];
                        r && i.push(r)
                    }
                    return i
                }(v.State.calls));
                for (var r = 0; n > r; r++)
                    if (v.State.calls[r]) {
                        var s = v.State.calls[r],
                            a = s[0],
                            d = s[2],
                            h = s[3],
                            p = !!h,
                            g = null;
                        h || (h = v.State.calls[r][3] = t - 16);
                        for (var m = Math.min((t - h) / d.duration, 1), y = 0, w = a.length; w > y; y++) {
                            var C = a[y],
                                x = C.element;
                            if (o(x)) {
                                var S = !1;
                                if (d.display !== i && null !== d.display && "none" !== d.display) {
                                    if ("flex" === d.display) {
                                        u.each(["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"], function(e, t) {
                                            b.setPropertyValue(x, "display", t)
                                        })
                                    }
                                    b.setPropertyValue(x, "display", d.display)
                                }
                                for (var T in d.visibility !== i && "hidden" !== d.visibility && b.setPropertyValue(x, "visibility", d.visibility), C)
                                    if ("element" !== T) {
                                        var E, k = C[T],
                                            O = f.isString(k.easing) ? v.Easings[k.easing] : k.easing;
                                        if (1 === m) E = k.endValue;
                                        else {
                                            var A = k.endValue - k.startValue;
                                            if (E = k.startValue + A * O(m, d, A), !p && E === k.currentValue) continue
                                        }
                                        if (k.currentValue = E, "tween" === T) g = E;
                                        else {
                                            if (b.Hooks.registered[T]) {
                                                var D = b.Hooks.getRoot(T),
                                                    P = o(x).rootPropertyValueCache[D];
                                                P && (k.rootPropertyValue = P)
                                            }
                                            var L = b.setPropertyValue(x, T, k.currentValue + (0 === parseFloat(E) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);
                                            b.Hooks.registered[T] && (o(x).rootPropertyValueCache[D] = b.Normalizations.registered[D] ? b.Normalizations.registered[D]("extract", null, L[1]) : L[1]), "transform" === L[0] && (S = !0)
                                        }
                                    }
                                d.mobileHA && o(x).transformCache.translate3d === i && (o(x).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && b.flushTransformCache(x)
                            }
                        }
                        d.display !== i && "none" !== d.display && (v.State.calls[r][2].display = !1), d.visibility !== i && "hidden" !== d.visibility && (v.State.calls[r][2].visibility = !1), d.progress && d.progress.call(s[1], s[1], m, Math.max(0, h + d.duration - t), h, g), 1 === m && c(r)
                    }
            }
            v.State.isTicking && _(l)
        }

        function c(e, t) {
            if (!v.State.calls[e]) return !1;
            for (var n = v.State.calls[e][0], r = v.State.calls[e][1], s = v.State.calls[e][2], a = v.State.calls[e][4], l = !1, c = 0, d = n.length; d > c; c++) {
                var h = n[c].element;
                if (t || s.loop || ("none" === s.display && b.setPropertyValue(h, "display", s.display), "hidden" === s.visibility && b.setPropertyValue(h, "visibility", s.visibility)), !0 !== s.loop && (u.queue(h)[1] === i || !/\.velocityQueueEntryFlag/i.test(u.queue(h)[1])) && o(h)) {
                    o(h).isAnimating = !1, o(h).rootPropertyValueCache = {};
                    var f = !1;
                    u.each(b.Lists.transforms3D, function(e, t) {
                        var n = /^scale/.test(t) ? 1 : 0,
                            r = o(h).transformCache[t];
                        o(h).transformCache[t] !== i && new RegExp("^\\(" + n + "[^.]").test(r) && (f = !0, delete o(h).transformCache[t])
                    }), s.mobileHA && (f = !0, delete o(h).transformCache.translate3d), f && b.flushTransformCache(h), b.Values.removeClass(h, "velocity-animating")
                }
                if (!t && s.complete && !s.loop && c === d - 1) try {
                    s.complete.call(r, r)
                } catch (e) {
                    setTimeout(function() {
                        throw e
                    }, 1)
                }
                a && !0 !== s.loop && a(r), o(h) && !0 === s.loop && !t && (u.each(o(h).tweensContainer, function(e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                }), v(h, "reverse", {
                    loop: !0,
                    delay: s.delay
                })), !1 !== s.queue && u.dequeue(h, s.queue)
            }
            v.State.calls[e] = !1;
            for (var p = 0, g = v.State.calls.length; g > p; p++)
                if (!1 !== v.State.calls[p]) {
                    l = !0;
                    break
                }!1 === l && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = [])
        }
        var u, d = function() {
                if (n.documentMode) return n.documentMode;
                for (var e = 7; e > 4; e--) {
                    var t = n.createElement("div");
                    if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e
                }
                return i
            }(),
            h = function() {
                var e = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                    var n, i = (new Date).getTime();
                    return n = Math.max(0, 16 - (i - e)), e = i + n, setTimeout(function() {
                        t(i + n)
                    }, n)
                }
            }(),
            f = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                },
                isNode: function(e) {
                    return e && e.nodeType
                },
                isNodeList: function(e) {
                    return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== i && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                },
                isWrapped: function(e) {
                    return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                },
                isSVG: function(e) {
                    return t.SVGElement && e instanceof t.SVGElement
                },
                isEmptyObject: function(e) {
                    for (var t in e) return !1;
                    return !0
                }
            },
            p = !1;
        if (e.fn && e.fn.jquery ? (u = e, p = !0) : u = t.Velocity.Utilities, 8 >= d && !p) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (!(7 >= d)) {
            var g = 400,
                m = "swing",
                v = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: n.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: u,
                    Redirects: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: g,
                        easing: m,
                        begin: i,
                        complete: i,
                        progress: i,
                        display: i,
                        visibility: i,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(e) {
                        u.data(e, "velocity", {
                            isSVG: f.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            t.pageYOffset !== i ? (v.State.scrollAnchor = t, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");
            var y = function() {
                function e(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function t(t, n, i) {
                    var r = {
                        x: t.x + i.dx * n,
                        v: t.v + i.dv * n,
                        tension: t.tension,
                        friction: t.friction
                    };
                    return {
                        dx: r.v,
                        dv: e(r)
                    }
                }

                function n(n, i) {
                    var r = {
                            dx: n.v,
                            dv: e(n)
                        },
                        o = t(n, .5 * i, r),
                        s = t(n, .5 * i, o),
                        a = t(n, i, s),
                        l = 1 / 6 * (r.dx + 2 * (o.dx + s.dx) + a.dx),
                        c = 1 / 6 * (r.dv + 2 * (o.dv + s.dv) + a.dv);
                    return n.x = n.x + l * i, n.v = n.v + c * i, n
                }
                return function e(t, i, r) {
                    var o, s, a, l = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        c = [0],
                        u = 0;
                    for (t = parseFloat(t) || 500, i = parseFloat(i) || 20, r = r || null, l.tension = t, l.friction = i, (o = null !== r) ? s = (u = e(t, i)) / r * .016 : s = .016; a = n(a || l, s), c.push(1 + a.x), u += 16, Math.abs(a.x) > 1e-4 && Math.abs(a.v) > 1e-4;);
                    return o ? function(e) {
                        return c[e * (c.length - 1) | 0]
                    } : u
                }
            }();
            v.Easings = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, u.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(e, t) {
                v.Easings[t[0]] = s.apply(null, t[1])
            });
            var b = v.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var e = 0; e < b.Lists.colors.length; e++) {
                            var t = "color" === b.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            b.Hooks.templates[b.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var n, i, r;
                        if (d)
                            for (n in b.Hooks.templates) {
                                r = (i = b.Hooks.templates[n])[0].split(" ");
                                var o = i[1].match(b.RegEx.valueSplit);
                                "Color" === r[0] && (r.push(r.shift()), o.push(o.shift()), b.Hooks.templates[n] = [r.join(" "), o.join(" ")])
                            }
                        for (n in b.Hooks.templates)
                            for (var e in r = (i = b.Hooks.templates[n])[0].split(" ")) {
                                var s = n + r[e],
                                    a = e;
                                b.Hooks.registered[s] = [n, a]
                            }
                    },
                    getRoot: function(e) {
                        var t = b.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    cleanRootPropertyValue: function(e, t) {
                        return b.RegEx.valueUnwrap.test(t) && (t = t.match(b.RegEx.valueUnwrap)[1]), b.Values.isCSSNullValue(t) && (t = b.Hooks.templates[e][1]), t
                    },
                    extractValue: function(e, t) {
                        var n = b.Hooks.registered[e];
                        if (n) {
                            var i = n[0],
                                r = n[1];
                            return (t = b.Hooks.cleanRootPropertyValue(i, t)).toString().match(b.RegEx.valueSplit)[r]
                        }
                        return t
                    },
                    injectValue: function(e, t, n) {
                        var i = b.Hooks.registered[e];
                        if (i) {
                            var r, o = i[0],
                                s = i[1];
                            return (r = (n = b.Hooks.cleanRootPropertyValue(o, n)).toString().match(b.RegEx.valueSplit))[s] = t, r.join(" ")
                        }
                        return n
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var i;
                                    return b.RegEx.wrappedValueAlreadyExtracted.test(n) ? i = n : i = (i = n.toString().match(b.RegEx.valueUnwrap)) ? i[1].replace(/,(\s+)?/g, " ") : n, i;
                                case "inject":
                                    return "rect(" + n + ")"
                            }
                        },
                        blur: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return v.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var i = parseFloat(n);
                                    if (!i && 0 !== i) {
                                        var r = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        i = r ? r[1] : 0
                                    }
                                    return i;
                                case "inject":
                                    return parseFloat(n) ? "blur(" + n + ")" : "none"
                            }
                        },
                        opacity: function(e, t, n) {
                            if (8 >= d) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return i ? i[1] / 100 : 1;
                                case "inject":
                                    return t.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                case "inject":
                                    return n
                            }
                        }
                    },
                    register: function() {
                        9 >= d || v.State.isGingerbread || (b.Lists.transformsBase = b.Lists.transformsBase.concat(b.Lists.transforms3D));
                        for (var e = 0; e < b.Lists.transformsBase.length; e++) ! function() {
                            var t = b.Lists.transformsBase[e];
                            b.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return o(n) === i || o(n).transformCache[t] === i ? /^scale/i.test(t) ? 1 : 0 : o(n).transformCache[t].replace(/[()]/g, "");
                                    case "inject":
                                        var s = !1;
                                        switch (t.substr(0, t.length - 1)) {
                                            case "translate":
                                                s = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                break;
                                            case "scal":
                                            case "scale":
                                                v.State.isAndroid && o(n).transformCache[t] === i && 1 > r && (r = 1), s = !/(\d)$/i.test(r);
                                                break;
                                            case "skew":
                                                s = !/(deg|\d)$/i.test(r);
                                                break;
                                            case "rotate":
                                                s = !/(deg|\d)$/i.test(r)
                                        }
                                        return s || (o(n).transformCache[t] = "(" + r + ")"), o(n).transformCache[t]
                                }
                            }
                        }();
                        for (e = 0; e < b.Lists.colors.length; e++) ! function() {
                            var t = b.Lists.colors[e];
                            b.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return t;
                                    case "extract":
                                        var o;
                                        if (b.RegEx.wrappedValueAlreadyExtracted.test(r)) o = r;
                                        else {
                                            var s, a = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(r) ? s = a[r] !== i ? a[r] : a.black : b.RegEx.isHex.test(r) ? s = "rgb(" + b.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (s = a.black), o = (s || r).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;
                                    case "inject":
                                        return 8 >= d ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function(e) {
                        return e.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function(e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (d || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function(e) {
                        if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = t.length; i > n; n++) {
                            var r;
                            if (r = 0 === n ? e : t[n] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase()
                                }), f.isString(v.State.prefixElement.style[r])) return v.State.prefixMatches[e] = r, [r, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function(e) {
                        var t;
                        return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, i) {
                            return t + t + n + n + i + i
                        }), (t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(e) {
                        return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function(e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function(e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function(e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    },
                    removeClass: function(e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(e, n, r, s) {
                    function a(e, n) {
                        function r() {
                            h && b.setPropertyValue(e, "display", "none")
                        }
                        var l = 0;
                        if (8 >= d) l = u.css(e, n);
                        else {
                            var c, h = !1;
                            if (/^(width|height)$/.test(n) && 0 === b.getPropertyValue(e, "display") && (h = !0, b.setPropertyValue(e, "display", b.Values.getDisplayType(e))), !s) {
                                if ("height" === n && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var f = e.offsetHeight - (parseFloat(b.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingBottom")) || 0);
                                    return r(), f
                                }
                                if ("width" === n && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var p = e.offsetWidth - (parseFloat(b.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingRight")) || 0);
                                    return r(), p
                                }
                            }
                            c = o(e) === i ? t.getComputedStyle(e, null) : o(e).computedStyle ? o(e).computedStyle : o(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === n && (n = "borderTopColor"), ("" === (l = 9 === d && "filter" === n ? c.getPropertyValue(n) : c[n]) || null === l) && (l = e.style[n]), r()
                        }
                        if ("auto" === l && /^(top|right|bottom|left)$/i.test(n)) {
                            var g = a(e, "position");
                            ("fixed" === g || "absolute" === g && /top|left/i.test(n)) && (l = u(e).position()[n] + "px")
                        }
                        return l
                    }
                    var l;
                    if (b.Hooks.registered[n]) {
                        var c = n,
                            h = b.Hooks.getRoot(c);
                        r === i && (r = b.getPropertyValue(e, b.Names.prefixCheck(h)[0])), b.Normalizations.registered[h] && (r = b.Normalizations.registered[h]("extract", e, r)), l = b.Hooks.extractValue(c, r)
                    } else if (b.Normalizations.registered[n]) {
                        var f, p;
                        "transform" !== (f = b.Normalizations.registered[n]("name", e)) && (p = a(e, b.Names.prefixCheck(f)[0]), b.Values.isCSSNullValue(p) && b.Hooks.templates[n] && (p = b.Hooks.templates[n][1])), l = b.Normalizations.registered[n]("extract", e, p)
                    }
                    if (!/^[\d-]/.test(l))
                        if (o(e) && o(e).isSVG && b.Names.SVGAttribute(n))
                            if (/^(height|width)$/i.test(n)) try {
                                l = e.getBBox()[n]
                            } catch (e) {
                                l = 0
                            } else l = e.getAttribute(n);
                            else l = a(e, b.Names.prefixCheck(n)[0]);
                    return b.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + n + ": " + l), l
                },
                setPropertyValue: function(e, n, i, r, s) {
                    var a = n;
                    if ("scroll" === n) s.container ? s.container["scroll" + s.direction] = i : "Left" === s.direction ? t.scrollTo(i, s.alternateValue) : t.scrollTo(s.alternateValue, i);
                    else if (b.Normalizations.registered[n] && "transform" === b.Normalizations.registered[n]("name", e)) b.Normalizations.registered[n]("inject", e, i), a = "transform", i = o(e).transformCache[n];
                    else {
                        if (b.Hooks.registered[n]) {
                            var l = n,
                                c = b.Hooks.getRoot(n);
                            r = r || b.getPropertyValue(e, c), i = b.Hooks.injectValue(l, i, r), n = c
                        }
                        if (b.Normalizations.registered[n] && (i = b.Normalizations.registered[n]("inject", e, i), n = b.Normalizations.registered[n]("name", e)), a = b.Names.prefixCheck(n)[0], 8 >= d) try {
                            e.style[a] = i
                        } catch (e) {
                            v.debug && console.log("Browser does not support [" + i + "] for [" + a + "]")
                        } else o(e) && o(e).isSVG && b.Names.SVGAttribute(n) ? e.setAttribute(n, i) : e.style[a] = i;
                        v.debug >= 2 && console.log("Set " + n + " (" + a + "): " + i)
                    }
                    return [a, i]
                },
                flushTransformCache: function(e) {
                    function t(t) {
                        return parseFloat(b.getPropertyValue(e, t))
                    }
                    var n = "";
                    if ((d || v.State.isAndroid && !v.State.isChrome) && o(e).isSVG) {
                        var i = {
                            translate: [t("translateX"), t("translateY")],
                            skewX: [t("skewX")],
                            skewY: [t("skewY")],
                            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                            rotate: [t("rotateZ"), 0, 0]
                        };
                        u.each(o(e).transformCache, function(e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), i[e] && (n += e + "(" + i[e].join(" ") + ") ", delete i[e])
                        })
                    } else {
                        var r, s;
                        u.each(o(e).transformCache, function(t) {
                            return r = o(e).transformCache[t], "transformPerspective" === t ? (s = r, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void(n += t + r + " "))
                        }), s && (n = "perspective" + s + " " + n)
                    }
                    b.setPropertyValue(e, "transform", n)
                }
            };
            b.Hooks.register(), b.Normalizations.register(), v.hook = function(e, t, n) {
                var s = i;
                return e = r(e), u.each(e, function(e, r) {
                    if (o(r) === i && v.init(r), n === i) s === i && (s = v.CSS.getPropertyValue(r, t));
                    else {
                        var a = v.CSS.setPropertyValue(r, t, n);
                        "transform" === a[0] && v.CSS.flushTransformCache(r), s = a
                    }
                }), s
            };
            var w = function() {
                function e() {
                    return d ? k.promise || null : h
                }

                function s() {
                    function e(e) {
                        function h(e, t) {
                            var n = i,
                                r = i,
                                o = i;
                            return f.isArray(e) ? (n = e[0], !f.isArray(e[1]) && /^[\d-]/.test(e[1]) || f.isFunction(e[1]) || b.RegEx.isHex.test(e[1]) ? o = e[1] : (f.isString(e[1]) && !b.RegEx.isHex.test(e[1]) || f.isArray(e[1])) && (r = t ? e[1] : a(e[1], c.duration), e[2] !== i && (o = e[2]))) : n = e, t || (r = r || c.easing), f.isFunction(n) && (n = n.call(s, S, x)), f.isFunction(o) && (o = o.call(s, S, x)), [n || 0, r, o]
                        }

                        function p(e, t) {
                            var n, i;
                            return i = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                return n = e, ""
                            }), n || (n = b.Values.getUnitType(e)), [i, n]
                        }

                        function g() {
                            var e = {
                                    myParent: s.parentNode || n.body,
                                    position: b.getPropertyValue(s, "position"),
                                    fontSize: b.getPropertyValue(s, "fontSize")
                                },
                                i = e.position === I.lastPosition && e.myParent === I.lastParent,
                                r = e.fontSize === I.lastFontSize;
                            I.lastParent = e.myParent, I.lastPosition = e.position, I.lastFontSize = e.fontSize;
                            var a = 100,
                                l = {};
                            if (r && i) l.emToPx = I.lastEmToPx, l.percentToPxWidth = I.lastPercentToPxWidth, l.percentToPxHeight = I.lastPercentToPxHeight;
                            else {
                                var c = o(s).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                v.init(c), e.myParent.appendChild(c), u.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                    v.CSS.setPropertyValue(c, t, "hidden")
                                }), v.CSS.setPropertyValue(c, "position", e.position), v.CSS.setPropertyValue(c, "fontSize", e.fontSize), v.CSS.setPropertyValue(c, "boxSizing", "content-box"), u.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                    v.CSS.setPropertyValue(c, t, a + "%")
                                }), v.CSS.setPropertyValue(c, "paddingLeft", a + "em"), l.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(b.getPropertyValue(c, "width", null, !0)) || 1) / a, l.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(b.getPropertyValue(c, "height", null, !0)) || 1) / a, l.emToPx = I.lastEmToPx = (parseFloat(b.getPropertyValue(c, "paddingLeft")) || 1) / a, e.myParent.removeChild(c)
                            }
                            return null === I.remToPx && (I.remToPx = parseFloat(b.getPropertyValue(n.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(t.innerWidth) / 100, I.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = I.remToPx, l.vwToPx = I.vwToPx, l.vhToPx = I.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), s), l
                        }
                        if (c.begin && 0 === S) try {
                            c.begin.call(m, m)
                        } catch (e) {
                            setTimeout(function() {
                                throw e
                            }, 1)
                        }
                        if ("scroll" === E) {
                            var w, C, T, O = /^x$/i.test(c.axis) ? "Left" : "Top",
                                A = parseFloat(c.offset) || 0;
                            c.container ? f.isWrapped(c.container) || f.isNode(c.container) ? (c.container = c.container[0] || c.container, T = (w = c.container["scroll" + O]) + u(s).position()[O.toLowerCase()] + A) : c.container = null : (w = v.State.scrollAnchor[v.State["scrollProperty" + O]], C = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === O ? "Top" : "Left")]], T = u(s).offset()[O.toLowerCase()] + A), d = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: w,
                                    currentValue: w,
                                    endValue: T,
                                    unitType: "",
                                    easing: c.easing,
                                    scrollData: {
                                        container: c.container,
                                        direction: O,
                                        alternateValue: C
                                    }
                                },
                                element: s
                            }, v.debug && console.log("tweensContainer (scroll): ", d.scroll, s)
                        } else if ("reverse" === E) {
                            if (!o(s).tweensContainer) return void u.dequeue(s, c.queue);
                            "none" === o(s).opts.display && (o(s).opts.display = "auto"), "hidden" === o(s).opts.visibility && (o(s).opts.visibility = "visible"), o(s).opts.loop = !1, o(s).opts.begin = null, o(s).opts.complete = null, _.easing || delete c.easing, _.duration || delete c.duration, c = u.extend({}, o(s).opts, c);
                            var D = u.extend(!0, {}, o(s).tweensContainer);
                            for (var P in D)
                                if ("element" !== P) {
                                    var L = D[P].startValue;
                                    D[P].startValue = D[P].currentValue = D[P].endValue, D[P].endValue = L, f.isEmptyObject(_) || (D[P].easing = c.easing), v.debug && console.log("reverse tweensContainer (" + P + "): " + JSON.stringify(D[P]), s)
                                }
                            d = D
                        } else if ("start" === E) {
                            for (var N in o(s).tweensContainer && !0 === o(s).isAnimating && (D = o(s).tweensContainer), u.each(y, function(e, t) {
                                    if (RegExp("^" + b.Lists.colors.join("$|^") + "$").test(e)) {
                                        var n = h(t, !0),
                                            r = n[0],
                                            o = n[1],
                                            s = n[2];
                                        if (b.RegEx.isHex.test(r)) {
                                            for (var a = ["Red", "Green", "Blue"], l = b.Values.hexToRgb(r), c = s ? b.Values.hexToRgb(s) : i, u = 0; u < a.length; u++) {
                                                var d = [l[u]];
                                                o && d.push(o), c !== i && d.push(c[u]), y[e + a[u]] = d
                                            }
                                            delete y[e]
                                        }
                                    }
                                }), y) {
                                var j = h(y[N]),
                                    M = j[0],
                                    H = j[1],
                                    W = j[2];
                                N = b.Names.camelCase(N);
                                var R = b.Hooks.getRoot(N),
                                    F = !1;
                                if (o(s).isSVG || "tween" === R || !1 !== b.Names.prefixCheck(R)[1] || b.Normalizations.registered[R] !== i) {
                                    (c.display !== i && null !== c.display && "none" !== c.display || c.visibility !== i && "hidden" !== c.visibility) && /opacity|filter/.test(N) && !W && 0 !== M && (W = 0), c._cacheValues && D && D[N] ? (W === i && (W = D[N].endValue + D[N].unitType), F = o(s).rootPropertyValueCache[R]) : b.Hooks.registered[N] ? W === i ? (F = b.getPropertyValue(s, R), W = b.getPropertyValue(s, N, F)) : F = b.Hooks.templates[R][1] : W === i && (W = b.getPropertyValue(s, N));
                                    var B, q, V, X = !1;
                                    if (W = (B = p(N, W))[0], V = B[1], M = (B = p(N, M))[0].replace(/^([+-\/*])=/, function(e, t) {
                                            return X = t, ""
                                        }), q = B[1], W = parseFloat(W) || 0, M = parseFloat(M) || 0, "%" === q && (/^(fontSize|lineHeight)$/.test(N) ? (M /= 100, q = "em") : /^scale/.test(N) ? (M /= 100, q = "") : /(Red|Green|Blue)$/i.test(N) && (M = M / 100 * 255, q = "")), /[\/*]/.test(X)) q = V;
                                    else if (V !== q && 0 !== W)
                                        if (0 === M) q = V;
                                        else {
                                            r = r || g();
                                            var Y = /margin|padding|left|right|width|text|word|letter/i.test(N) || /X$/.test(N) || "x" === N ? "x" : "y";
                                            switch (V) {
                                                case "%":
                                                    W *= "x" === Y ? r.percentToPxWidth : r.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    W *= r[V + "ToPx"]
                                            }
                                            switch (q) {
                                                case "%":
                                                    W *= 1 / ("x" === Y ? r.percentToPxWidth : r.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    W *= 1 / r[q + "ToPx"]
                                            }
                                        }
                                    switch (X) {
                                        case "+":
                                            M = W + M;
                                            break;
                                        case "-":
                                            M = W - M;
                                            break;
                                        case "*":
                                            M *= W;
                                            break;
                                        case "/":
                                            M = W / M
                                    }
                                    d[N] = {
                                        rootPropertyValue: F,
                                        startValue: W,
                                        currentValue: W,
                                        endValue: M,
                                        unitType: q,
                                        easing: H
                                    }, v.debug && console.log("tweensContainer (" + N + "): " + JSON.stringify(d[N]), s)
                                } else v.debug && console.log("Skipping [" + R + "] due to a lack of browser support.")
                            }
                            d.element = s
                        }
                        d.element && (b.Values.addClass(s, "velocity-animating"), $.push(d), "" === c.queue && (o(s).tweensContainer = d, o(s).opts = c), o(s).isAnimating = !0, S === x - 1 ? (v.State.calls.push([$, m, c, null, k.resolver]), !1 === v.State.isTicking && (v.State.isTicking = !0, l())) : S++)
                    }
                    var r, s = this,
                        c = u.extend({}, v.defaults, _),
                        d = {};
                    switch (o(s) === i && v.init(s), parseFloat(c.delay) && !1 !== c.queue && u.queue(s, c.queue, function(e) {
                        v.velocityQueueEntryFlag = !0, o(s).delayTimer = {
                            setTimeout: setTimeout(e, parseFloat(c.delay)),
                            next: e
                        }
                    }), c.duration.toString().toLowerCase()) {
                        case "fast":
                            c.duration = 200;
                            break;
                        case "normal":
                            c.duration = g;
                            break;
                        case "slow":
                            c.duration = 600;
                            break;
                        default:
                            c.duration = parseFloat(c.duration) || 1
                    }!1 !== v.mock && (!0 === v.mock ? c.duration = c.delay = 1 : (c.duration *= parseFloat(v.mock) || 1, c.delay *= parseFloat(v.mock) || 1)), c.easing = a(c.easing, c.duration), c.begin && !f.isFunction(c.begin) && (c.begin = null), c.progress && !f.isFunction(c.progress) && (c.progress = null), c.complete && !f.isFunction(c.complete) && (c.complete = null), c.display !== i && null !== c.display && (c.display = c.display.toString().toLowerCase(), "auto" === c.display && (c.display = v.CSS.Values.getDisplayType(s))), c.visibility !== i && null !== c.visibility && (c.visibility = c.visibility.toString().toLowerCase()), c.mobileHA = c.mobileHA && v.State.isMobile && !v.State.isGingerbread, !1 === c.queue ? c.delay ? setTimeout(e, c.delay) : e() : u.queue(s, c.queue, function(t, n) {
                        return !0 === n ? (k.promise && k.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e())
                    }), "" !== c.queue && "fx" !== c.queue || "inprogress" === u.queue(s)[0] || u.dequeue(s)
                }
                var d, h, p, m, y, _, C = arguments[0] && (arguments[0].p || u.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || f.isString(arguments[0].properties));
                if (f.isWrapped(this) ? (d = !1, p = 0, m = this, h = this) : (d = !0, p = 1, m = C ? arguments[0].elements || arguments[0].e : arguments[0]), m = r(m)) {
                    C ? (y = arguments[0].properties || arguments[0].p, _ = arguments[0].options || arguments[0].o) : (y = arguments[p], _ = arguments[p + 1]);
                    var x = m.length,
                        S = 0;
                    if (!/^(stop|finish)$/i.test(y) && !u.isPlainObject(_)) {
                        _ = {};
                        for (var T = p + 1; T < arguments.length; T++) f.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? f.isString(arguments[T]) || f.isArray(arguments[T]) ? _.easing = arguments[T] : f.isFunction(arguments[T]) && (_.complete = arguments[T]) : _.duration = arguments[T]
                    }
                    var E, k = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    switch (d && v.Promise && (k.promise = new v.Promise(function(e, t) {
                        k.resolver = e, k.rejecter = t
                    })), y) {
                        case "scroll":
                            E = "scroll";
                            break;
                        case "reverse":
                            E = "reverse";
                            break;
                        case "finish":
                        case "stop":
                            u.each(m, function(e, t) {
                                o(t) && o(t).delayTimer && (clearTimeout(o(t).delayTimer.setTimeout), o(t).delayTimer.next && o(t).delayTimer.next(), delete o(t).delayTimer)
                            });
                            var O = [];
                            return u.each(v.State.calls, function(e, t) {
                                t && u.each(t[1], function(n, r) {
                                    var s = _ === i ? "" : _;
                                    return !0 !== s && t[2].queue !== s && (_ !== i || !1 !== t[2].queue) || void u.each(m, function(n, i) {
                                        i === r && ((!0 === _ || f.isString(_)) && (u.each(u.queue(i, f.isString(_) ? _ : ""), function(e, t) {
                                            f.isFunction(t) && t(null, !0)
                                        }), u.queue(i, f.isString(_) ? _ : "", [])), "stop" === y ? (o(i) && o(i).tweensContainer && !1 !== s && u.each(o(i).tweensContainer, function(e, t) {
                                            t.endValue = t.currentValue
                                        }), O.push(e)) : "finish" === y && (t[2].duration = 1))
                                    })
                                })
                            }), "stop" === y && (u.each(O, function(e, t) {
                                c(t, !0)
                            }), k.promise && k.resolver(m)), e();
                        default:
                            if (!u.isPlainObject(y) || f.isEmptyObject(y)) {
                                if (f.isString(y) && v.Redirects[y]) {
                                    var A = (N = u.extend({}, _)).duration,
                                        D = N.delay || 0;
                                    return !0 === N.backwards && (m = u.extend(!0, [], m).reverse()), u.each(m, function(e, t) {
                                        parseFloat(N.stagger) ? N.delay = D + parseFloat(N.stagger) * e : f.isFunction(N.stagger) && (N.delay = D + N.stagger.call(t, e, x)), N.drag && (N.duration = parseFloat(A) || (/^(callout|transition)/.test(y) ? 1e3 : g), N.duration = Math.max(N.duration * (N.backwards ? 1 - e / x : (e + 1) / x), .75 * N.duration, 200)), v.Redirects[y].call(t, t, N || {}, e, x, m, k.promise ? k : i)
                                    }), e()
                                }
                                var P = "Velocity: First argument (" + y + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return k.promise ? k.rejecter(new Error(P)) : console.log(P), e()
                            }
                            E = "start"
                    }
                    var L, N, I = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        $ = [];
                    if (u.each(m, function(e, t) {
                            f.isNode(t) && s.call(t)
                        }), (N = u.extend({}, v.defaults, _)).loop = parseInt(N.loop), L = 2 * N.loop - 1, N.loop)
                        for (var j = 0; L > j; j++) {
                            var M = {
                                delay: N.delay,
                                progress: N.progress
                            };
                            j === L - 1 && (M.display = N.display, M.visibility = N.visibility, M.complete = N.complete), w(m, "reverse", M)
                        }
                    return e()
                }
            };
            (v = u.extend(w, v)).animate = w;
            var _ = t.requestAnimationFrame || h;
            return v.State.isMobile || n.hidden === i || n.addEventListener("visibilitychange", function() {
                n.hidden ? (_ = function(e) {
                    return setTimeout(function() {
                        e(!0)
                    }, 16)
                }, l()) : _ = t.requestAnimationFrame || h
            }), e.Velocity = v, e !== t && (e.fn.velocity = w, e.fn.velocity.defaults = v.defaults), u.each(["Down", "Up"], function(e, t) {
                v.Redirects["slide" + t] = function(e, n, r, o, s, a) {
                    var l = u.extend({}, n),
                        c = l.begin,
                        d = l.complete,
                        h = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        f = {};
                    l.display === i && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function() {
                        for (var n in c && c.call(s, s), h) {
                            f[n] = e.style[n];
                            var i = v.CSS.getPropertyValue(e, n);
                            h[n] = "Down" === t ? [i, 0] : [0, i]
                        }
                        f.overflow = e.style.overflow, e.style.overflow = "hidden"
                    }, l.complete = function() {
                        for (var t in f) e.style[t] = f[t];
                        d && d.call(s, s), a && a.resolver(s)
                    }, v(e, h, l)
                }
            }), u.each(["In", "Out"], function(e, t) {
                v.Redirects["fade" + t] = function(e, n, r, o, s, a) {
                    var l = u.extend({}, n),
                        c = {
                            opacity: "In" === t ? 1 : 0
                        },
                        d = l.complete;
                    l.complete = r !== o - 1 ? l.begin = null : function() {
                        d && d.call(s, s), a && a.resolver(s)
                    }, l.display === i && (l.display = "In" === t ? "auto" : "none"), v(this, c, l)
                }
            }), v
        }
        jQuery.fn.velocity = jQuery.fn.animate
    }(window.jQuery || window.Zepto || window, window, document)
}))