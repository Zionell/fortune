(function () {
    "use strict";
    var t = {
        3404: function (t, i, n) {
            var e = n(9242), s = n(3396);
            const r = {class: "wheelOfFortune"}, a = {ref: "wheel", class: "wheel", width: "700", height: "700"},
                o = {ref: "spin", class: "spin"};

            function l(t, i, n, l, h, c) {
                const d = (0, s.up)("modalWindow");
                return (0, s.wg)(), (0, s.iD)("div", r, [(0, s._)("canvas", a, null, 512), (0, s._)("div", o, "SPIN", 512), (0, s.Wm)(e.uT, null, {
                    default: (0, s.w5)((() => [h.isModal ? ((0, s.wg)(), (0, s.j4)(d, {
                        key: 0,
                        prize: h.prize,
                        onSend: i[0] || (i[0] = t => c.sendMail(t))
                    }, null, 8, ["prize"])) : (0, s.kq)("", !0)])), _: 1
                })])
            }

            var h = n(7139);
            const c = (0, s._)("h2", null, "Поздравляем!!!", -1), d = (0, s._)("br", null, null, -1);

            function u(t, i, n, r, a, o) {
                const l = (0, s.Q2)("maska");
                return (0, s.wg)(), (0, s.iD)("div", {class: (0, h.C_)(t.$style.modalWindow)}, [(0, s._)("div", {class: (0, h.C_)(t.$style.wrap)}, [(0, s._)("div", null, [c, (0, s.Uk)(" Вы выиграли: " + (0, h.zw)(n.prize) + " ", 1), d, (0, s.Uk)(" Чтобы получить скидку, заполните форму: ")]), (0, s._)("form", {
                    class: (0, h.C_)(t.$style.form),
                    onSubmit: i[2] || (i[2] = (0, e.iM)(((...t) => o.send && o.send(...t)), ["prevent"]))
                }, [(0, s.wy)((0, s._)("input", {
                    "onUpdate:modelValue": i[0] || (i[0] = t => a.email = t),
                    type: "text",
                    placeholder: "Ваша почта",
                    class: (0, h.C_)([t.$style.input, {[t.$style._error]: this.error.email}])
                }, null, 2), [[e.nr, a.email]]), (0, s.wy)((0, s._)("input", {
                    "onUpdate:modelValue": i[1] || (i[1] = t => a.phone = t),
                    type: "text",
                    placeholder: "Ваш номер телефона",
                    class: (0, h.C_)([t.$style.input, {[t.$style._error]: this.error.phone}])
                }, null, 2), [[e.nr, a.phone], [l, o.mask()]]), (0, s._)("button", {
                    class: (0, h.C_)(t.$style.btn),
                    type: "submit"
                }, "Отправить", 2)], 34)], 2)], 2)
            }

            var p = {
                name: "modalWindow", props: {prize: {type: String, default: ""}}, data() {
                    return {email: "", phone: "", error: {email: !1, phone: !1}}
                }, methods: {
                    send() {
                        let t = !1;
                        const i = {}, n = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm, e = /^\+7[0-9]{10}$/gi;
                        this.email && n.test(this.email) || (t = !0, i.email = !0), this.phone && e.test(this.phone.replaceAll(" ", "")) || (t = !0, i.phone = !0), t ? this.error = i : this.$emit("send", {
                            email: this.email,
                            phone: this.phone
                        })
                    }, mask() {
                        return "+# ### ### ## ##"
                    }
                }
            }, f = {
                modalWindow: "modalWindow_modalWindow_h3QWM",
                wrap: "modalWindow_wrap_CinyK",
                form: "modalWindow_form_KPWD0",
                input: "modalWindow_input_DdnIX",
                _error: "modalWindow__error_NHIqY",
                btn: "modalWindow_btn_CYj5f"
            }, g = n(89);
            const m = {};
            m["$style"] = f;
            const w = (0, g.Z)(p, [["render", u], ["__cssModules", m]]);
            var v = w, x = {
                name: "App", components: {modalWindow: v}, data() {
                    return {
                        sectors: [],
                        ctx: null,
                        dia: 0,
                        PI: Math.PI,
                        friction: .991,
                        angVelMin: .002,
                        angVelMax: 0,
                        angVel: 0,
                        ang: 0,
                        isSpinning: !1,
                        prize: null,
                        isModal: !1
                    }
                }, computed: {
                    tot() {
                        return this.sectors.length
                    }, rad() {
                        return this.dia / 2
                    }, arc() {
                        return 2 * this.PI / this.sectors.length
                    }
                }, watch: {
                    isSpinning() {
                        this.isSpinning || (this.getIndex(), this.isModal = !0)
                    }
                }, async mounted() {
                    await this.asyncData(), this.ctx = this.$refs.wheel.getContext`2d`, this.dia = this.ctx.canvas.width, this.$refs.spin.addEventListener("click", (() => {
                        this.isSpinning || (this.isSpinning = !0, this.isAccelerating = !0, this.angVelMax = this.rand(.25, .4))
                    })), this.sectors.forEach(this.drawSector), this.rotate(), this.engine()
                }, methods: {
                    getIndex() {
                        const t = Math.floor(this.tot - this.ang / (2 * this.PI) * this.tot) % this.tot;
                        this.prize = this.sectors[t]?.label
                    }, async asyncData() {
                        try {
                            const t = await this.$axios.get("/api/get-content");
                            this.sectors = t?.data
                        } catch (t) {
                            console.log(t)
                        }
                    }, async sendMail(t) {
                        try {
                            await this.$axios.post("/api/send-result", {prize: this.prize, ...t}), this.isModal = !1
                        } catch (i) {
                            console.log(i)
                        }
                    }, rotate() {
                        this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`
                    }, engine() {
                        this.frame(), requestAnimationFrame(this.engine)
                    }, rand(t, i) {
                        return Math.random() * (i - t) + t
                    }, frame() {
                        this.isSpinning && (this.angVel >= this.angVelMax && (this.isAccelerating = !1), this.isAccelerating ? (this.angVel ||= this.angVelMin, this.angVel *= 1.06) : (this.isAccelerating = !1, this.angVel *= this.friction, this.angVel < this.angVelMin && (this.isSpinning = !1, this.angVel = 0)), this.ang += this.angVel, this.ang %= 2 * this.PI, this.rotate())
                    }, drawSector(t, i) {
                        const n = this.arc * i;
                        this.ctx.save(), this.ctx.beginPath(), this.ctx.fillStyle = t.color, this.ctx.moveTo(this.rad, this.rad), this.ctx.arc(this.rad, this.rad, this.rad, n, n + this.arc), this.ctx.lineTo(this.rad, this.rad), this.ctx.fill(), this.ctx.translate(this.rad, this.rad), this.ctx.rotate(n + this.arc / 2), this.ctx.textAlign = "right", this.ctx.fillStyle = "#fff", this.ctx.font = "bold 15px sans-serif", this.ctx.fillText(t.label, this.rad - 10, 10), this.ctx.restore()
                    }
                }
            };
            const _ = (0, g.Z)(x, [["render", l]]);
            var y = _, b = n(70);
            const M = "http://a0548906.xsph.ru/", $ = b.ZP.create({baseURL: M});
            var V = n(9583);
            const S = (0, e.ri)(y);
            S.config.globalProperties.$axios = $, S.use(V.ZP).mount("#app")
        }
    }, i = {};

    function n(e) {
        var s = i[e];
        if (void 0 !== s) return s.exports;
        var r = i[e] = {exports: {}};
        return t[e](r, r.exports, n), r.exports
    }

    n.m = t, function () {
        var t = [];
        n.O = function (i, e, s, r) {
            if (!e) {
                var a = 1 / 0;
                for (c = 0; c < t.length; c++) {
                    e = t[c][0], s = t[c][1], r = t[c][2];
                    for (var o = !0, l = 0; l < e.length; l++) (!1 & r || a >= r) && Object.keys(n.O).every((function (t) {
                        return n.O[t](e[l])
                    })) ? e.splice(l--, 1) : (o = !1, r < a && (a = r));
                    if (o) {
                        t.splice(c--, 1);
                        var h = s();
                        void 0 !== h && (i = h)
                    }
                }
                return i
            }
            r = r || 0;
            for (var c = t.length; c > 0 && t[c - 1][2] > r; c--) t[c] = t[c - 1];
            t[c] = [e, s, r]
        }
    }(), function () {
        n.n = function (t) {
            var i = t && t.__esModule ? function () {
                return t["default"]
            } : function () {
                return t
            };
            return n.d(i, {a: i}), i
        }
    }(), function () {
        n.d = function (t, i) {
            for (var e in i) n.o(i, e) && !n.o(t, e) && Object.defineProperty(t, e, {enumerable: !0, get: i[e]})
        }
    }(), function () {
        n.g = function () {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (t) {
                if ("object" === typeof window) return window
            }
        }()
    }(), function () {
        n.o = function (t, i) {
            return Object.prototype.hasOwnProperty.call(t, i)
        }
    }(), function () {
        var t = {143: 0};
        n.O.j = function (i) {
            return 0 === t[i]
        };
        var i = function (i, e) {
            var s, r, a = e[0], o = e[1], l = e[2], h = 0;
            if (a.some((function (i) {
                return 0 !== t[i]
            }))) {
                for (s in o) n.o(o, s) && (n.m[s] = o[s]);
                if (l) var c = l(n)
            }
            for (i && i(e); h < a.length; h++) r = a[h], n.o(t, r) && t[r] && t[r][0](), t[r] = 0;
            return n.O(c)
        }, e = self["webpackChunkfortune"] = self["webpackChunkfortune"] || [];
        e.forEach(i.bind(null, 0)), e.push = i.bind(null, e.push.bind(e))
    }();
    var e = n.O(void 0, [998], (function () {
        return n(3404)
    }));
    e = n.O(e)
})();
//# sourceMappingURL=app.2b04b63d.js.map