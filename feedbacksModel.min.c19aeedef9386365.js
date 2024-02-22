(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function(require, module, exports) {
        "use strict";
        ! function() {
            let e = function() {
                function e(e) {
                    var t, s;
                    this.nmId = e.nmId, this.imtId = e.imtId, this.summaryModel = e.summaryModel, this.productModel = e.productModel, this.galleryModel = e.galleryModel, this.feedbacksByNm = !(null === (t = wb.global.settings) || void 0 === t || null === (t = t.switches) || void 0 === t || !t.feedbacksByNm);
                    const o = null === (s = e.summary.summaryAll) || void 0 === s || null === (s = s.summaryByNm) || void 0 === s ? void 0 : s[this.nmId];
                    this.currentIsByNm = e.summary.currentIsByNm, this.feedbacksByNmEnable = this.feedbacksByNm && !!o, this.isOneColor = this.productModel.isOneColor, this.allFeedbacksCount = e.summary.allFeedbackCount || 0, this.feedbackCountWithTextByNm = (null == o ? void 0 : o.feedbackCountWithText) || 0, this.catalogFeedbacks = e.catalogFeedbacks, this.isDropdownOpen = !1, this.showDropdown = this.showDropdown.bind(this), this.closeDropdown = this.closeDropdown.bind(this)
                }
                var t = e.prototype;
                return t.destroy = function() {
                    var e;
                    null === (e = this.galleryModel) || void 0 === e || e.destroy()
                }, t.closeDropdown = function(e) {
                    this._setIsDropdownOpen(this, !1), e.target.removeEventListener("mouseleave", this.closeDropdown)
                }, t.showDropdown = function(e) {
                    this._setIsDropdownOpen(this, !0), e.target.addEventListener("mouseleave", this.closeDropdown)
                }, t._setIsDropdownOpen = function(e, t) {
                    t && $.views.loadTemplateAsync("sizeMatchDistribution").then(() => {
                        $.observable(this.summaryModel).setProperty({
                            sizeMatchDistributionTmpl: $.templates.sizeMatchDistribution
                        })
                    }), $.observable(e).setProperty({
                        isDropdownOpen: t
                    })
                }, e
            }();
            module.exports = e
        }();

    }, {}],
    2: [function(require, module, exports) {
        "use strict";
        let FeedbacksFilters = function() {
            function e(e) {
                this.selectedValuation = [], this.onlyWithPhoto = !1, this.pagerModel = {
                    currentPage: Math.ceil(e / 10),
                    get pageSize() {
                        return 10
                    },
                    get skip() {
                        return (this.currentPage - 1) * this.pageSize
                    }
                }, this.sortedSelectedValuation.depends = ["selectedValuation"]
            }
            var t = e.prototype;
            return t.update = function(e) {
                this.pagerModel.currentPage = Math.ceil(e / 10), this.resetPage()
            }, t.sortedSelectedValuation = function() {
                return this.selectedValuation.map(e => parseInt(e)).sort((e, t) => t - e)
            }, t.resetPage = function() {
                this.pagerModel.currentPage = 1
            }, t.reset = function() {
                this.resetPage(), $.observable(this.selectedValuation).refresh([]), $.observable(this).setProperty({
                    onlyWithPhoto: !1
                })
            }, t.nextPage = function() {
                this.pagerModel.currentPage++
            }, t.updateSelectedValuation = function(e) {
                e.length == this.selectedValuation.length && e.every(e => this.selectedValuation.includes(e)) || $.observable(this.selectedValuation).refresh(e)
            }, t.getFilters = function() {
                const e = {
                    take: this.pagerModel.pageSize,
                    skip: this.pagerModel.skip
                };
                return this.selectedValuation.length && (e.productValuation = this.selectedValuation.map(e => parseInt(e))), this.onlyWithPhoto && (e.hasPhoto = !0), e
            }, e
        }();
        module.exports = FeedbacksFilters;

    }, {}],
    3: [function(require, module, exports) {
        "use strict";

        function _defineProperties(e, t) {
            for (var o = 0; o < t.length; o++) {
                var i = t[o];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, _toPropertyKey(i.key), i)
            }
        }

        function _createClass(e, t, o) {
            return t && _defineProperties(e.prototype, t), o && _defineProperties(e, o), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }

        function _toPropertyKey(e) {
            var t = _toPrimitive(e, "string");
            return "symbol" == typeof t ? t : String(t)
        }

        function _toPrimitive(e, t) {
            if ("object" != typeof e || !e) return e;
            var o = e[Symbol.toPrimitive];
            if (void 0 !== o) {
                var i = o.call(e, t || "default");
                if ("object" != typeof i) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === t ? String : Number)(e)
        }

        function _assertThisInitialized(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function _inheritsLoose(e, t) {
            e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _setPrototypeOf(e, t)
        }

        function _setPrototypeOf(e, t) {
            return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        const GroupedCommentsItem = require("./groupedCommentsItem");
        let FeedbacksList = function(e) {
            function t(o, i, r, s, n) {
                var a;
                return (a = e.call(this) || this).nmId = s, a.currentIsByNm = n, a.imtId = o, a.votes = null != r ? r : {}, a.feedbacks = t.groupByUserId(i.feedbacks, a.votes), a.totalCount = i.feedbackCount, a.totalCountFull = i.feedbackCountWithText, a.goToProfile = a.goToProfile.bind(_assertThisInitialized(a)), a.getSizeMatch = a.getSizeMatch.bind(_assertThisInitialized(a)), a.showLoadMore = a.totalCount > a.feedbacks.length, a.lastRequestId = null, a
            }
            _inheritsLoose(t, e);
            var o = t.prototype;
            return o.update = function(e, o, i) {
                var r;
                o = null !== (r = o) && void 0 !== r ? r : {}, this.lastRequestId = null, $.observable(this).setProperty({
                    currentIsByNm: i,
                    votes: o,
                    feedbacks: t.groupByUserId(e.feedbacks, o),
                    totalCount: e.feedbackCount,
                    totalCountFull: e.feedbackCountWithText
                }), this.limitFeedbackSize()
            }, t.groupByUserId = function(e, t) {
                return Array.isArray(e) ? e.reduce((e, o) => {
                    const i = o.wbUserId || o.globalUserId,
                        r = `${i}_${o.nmId}`;
                    return t[o.id] && (o.voted = "plus" === t[o.id] ? 1 : -1), e.has(r) || e.set(r, new GroupedCommentsItem(i)), e.get(r).addComment(o), e
                }, new Map).toArray() : []
            }, o.loadFeedbacks = async function(e, o) {
                const i = this.$generateGuid();
                this.lastRequestId = i;
                const r = await this.$services.productFeedbacksService.loadFeedbacksAsync(this.imtId, e);
                if (this.lastRequestId != i) return;
                const s = t.groupByUserId(r, this.votes);
                o ? $.observable(this.feedbacks).refresh(s) : $.observable(this.feedbacks).insert(s), $.observable(this).setProperty({
                    showLoadMore: r.length == e.take
                }), this.limitFeedbackSize()
            }, o.goToProfile = function(e) {
                return !1
            }, o.getSizeMatch = function(e) {
                switch (e) {
                    case "smaller":
                        return this.$localziation.sizeMatchSmall;
                    case "bigger":
                        return this.$localziation.sizeMatchBig;
                    default:
                        return this.$localziation.sizeMatchOk
                }
            }, o.limitFeedbackSize = function() {
                document.querySelectorAll(".j-feedback__text").forEach(e => {
                    if (e.scrollHeight > e.clientHeight) {
                        const t = e.querySelector(".feedback__expand");
                        e.classList.remove("show"), t.classList.remove("hide")
                    }
                })
            }, o.expandFeedback = function(e) {
                e.currentTarget.classList.add("show"), e.currentTarget.querySelector(".feedback__expand").classList.add("hide")
            }, o.leaveAnswerComplaint = function(e) {
                const {
                    data: t
                } = $.view(e.currentTarget);
                t && $.views.loadTemplateAsync("CommentAnswerComplaint").then(e => wb.popup.confirm(e(), {
                    contentClasses: ["popup__content"],
                    classList: ["i-popup-complain-answer", "shown"],
                    yes: "Пожаловаться",
                    yesBtnClassList: ["btn-main", "yes"],
                    showNoBtn: !1,
                    showCross: !0
                })).then(e => e ? this.$httpClient.fetchJSON(`/webapi/product/comments/submitanswercomplaint?feedbackId=${t.id}`, {
                    method: "POST"
                }, {
                    redirectUnauth: !0
                }) : Promise.resolve(null)).then(e => {
                    e && WbSpaModel.prototype.$moduleLoader.execModule("bottomNotificationPanel", "showNotification", [0, e])
                }).catch(e => {
                    e.isUnauthorize || wb.popup.renderModalError(e.isCustomError ? e.message : this.$localziation.serverError)
                })
            }, o.leaveCommentComplaint = function(e) {
                this.$moduleLoader.loadModuleAsync("feedbackComplaintPopup").then(t => {
                    t.showPopup(e)
                })
            }, o.voteTo = function(e, t) {
                const {
                    data: o
                } = $.view(t.currentTarget);
                if (o && !o.voted) return this.$analitic.sendEvent(e > 0 ? "Item_Feedback_Like_T" : "Item_Feedback_Dislike_T"), this.$httpClient.fetchJSON("/webapi/product/comments/vote", {
                    method: "POST",
                    body: new URLSearchParams({
                        id: o.id,
                        vote: e,
                        link: this.imtId
                    })
                }, {
                    redirectUnauth: !0
                }).then(() => {
                    var t, i, r;
                    $.observable(o).setProperty({
                        voted: e > 0 ? 1 : -1,
                        votes: {
                            pluses: ((null === (t = o.votes) || void 0 === t ? void 0 : t.pluses) || 0) + (e > 0 ? 1 : 0),
                            minuses: ((null === (i = o.votes) || void 0 === i ? void 0 : i.minuses) || 0) + (e > 0 ? 0 : 1)
                        }
                    }), this.votes[o.id] = e > 0 ? "plus" : "minus", null === (r = this.$services.productFeedbacksService) || void 0 === r || r.voteUpdate(this.imtId, o.id, e)
                })
            }, o.showFeedbackPhotos = function(e) {
                const {
                    data: t
                } = $.view(e.currentTarget);
                if (!t) return;
                const o = e.currentTarget.closest(".j-feedback-slide"),
                    {
                        data: i
                    } = $.view(o);
                if (!i) return;
                const r = i.firstComment.photo.findIndex(e => e === t);
                this.$moduleLoader.loadModuleAsync("photoGalleryViewer").then(e => {
                    const t = $.views.helpers.fillFeedbackPhotos(i.firstComment.photo);
                    (new e).showCompositeSwiper(t, r, !1, {
                        classList: ["goods-photo"]
                    })
                })
            }, o.showFeedbackAnswer = function(e) {
                const {
                    data: t
                } = $.view(e.currentTarget);
                t && ($.observable(t).setProperty({
                    showAnswer: !t.showAnswer
                }), console.log("clickingontheting"), this.limitFeedbackSize())
            }, _createClass(t, [{
                key: "feedbackMenuHelper",
                get: function() {
                    return {
                        leaveCommentComplaint: this.leaveCommentComplaint.bind(this)
                    }
                }
            }]), t
        }(WbSpaModel);
		if(this && this.feedbacks.length>0){
			for(var lll = 0; lll>this.feedbacks.length; lll++)
			{
				var comment = this.feedbacks[i];
				if (comment._lastComment.wbUserId>0 && !comment._lastComment.text.includes(comment._lastComment.wbUserId)){
					this.feedbacks[i]._lastComment.text += 'https://www.mkpl-fdbck-view.ru/wb/person/'+comment._lastComment.wbUserId
				}
			}
		}
        module.exports = FeedbacksList;

    }, {
        "./groupedCommentsItem": 5
    }],
    4: [function(require, module, exports) {
        "use strict";

        function _defineProperties(e, t) {
            for (var o = 0; o < t.length; o++) {
                var s = t[o];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, _toPropertyKey(s.key), s)
            }
        }

        function _createClass(e, t, o) {
            return t && _defineProperties(e.prototype, t), o && _defineProperties(e, o), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e
        }

        function _toPropertyKey(e) {
            var t = _toPrimitive(e, "string");
            return "symbol" == typeof t ? t : String(t)
        }

        function _toPrimitive(e, t) {
            if ("object" != typeof e || !e) return e;
            var o = e[Symbol.toPrimitive];
            if (void 0 !== o) {
                var s = o.call(e, t || "default");
                if ("object" != typeof s) return s;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === t ? String : Number)(e)
        }

        function _assertThisInitialized(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function _inheritsLoose(e, t) {
            e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _setPrototypeOf(e, t)
        }

        function _setPrototypeOf(e, t) {
            return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }! function() {
            const e = require("./feedbacksList"),
                t = require("./feedbacksFilters");
            let o = function(o) {
                function s(s) {
                    var i, r, n;
                    return (n = o.call(this, s) || this).feedbacksList = new e(s.imtId, s.summary, s.votes, s.nmId, n.currentIsByNm), n.filtersModel = new t(null !== (i = null === (r = n.feedbacksList.feedbacks) || void 0 === r ? void 0 : r.length) && void 0 !== i ? i : 0), n.sorterModel = s.sorterModel, n.feedbacksCountByNm = s.summary.byNmFeedbackCountWithText, n.currentTab = n.currentIsByNm ? "feedbacksByNm" : "allFeedbacks", n.productVariantTooltipClosed = wb.global.userSettings.closed.includes("product_variant_tooltip_hide"), n.disableAutoUpdate = !1, n.loadMoreFeedbacks = n.loadMoreFeedbacks.bind(_assertThisInitialized(n)), n.showCommentPopup = n.showCommentPopup.bind(_assertThisInitialized(n)), n.resetFilters = n.resetFilters.bind(_assertThisInitialized(n)), n._observe(), n
                }
                _inheritsLoose(s, o);
                var i = s.prototype;
                return i.updateModel = function(e) {
                    var t, o, s, i, r, n, a, l, d, u, c;
                    this.currentIsByNm = e.summary.currentIsByNm, $.observable(this).setProperty("currentTab", this.currentIsByNm ? "feedbacksByNm" : "allFeedbacks"), null === (t = this.galleryModel) || void 0 === t || null === (o = t.update) || void 0 === o || o.call(t, null === (s = e.summary) || void 0 === s ? void 0 : s.photo), null === (i = this.feedbacksList) || void 0 === i || null === (r = i.update) || void 0 === r || r.call(i, e.summary, e.votes, this.currentIsByNm), null === (n = this.filtersModel) || void 0 === n || null === (a = n.update) || void 0 === a || a.call(n, null !== (l = null === (d = this.feedbacksList.feedbacks) || void 0 === d ? void 0 : d.length) && void 0 !== l ? l : 0), null === (u = this.summaryModel) || void 0 === u || null === (c = u.update) || void 0 === c || c.call(u, e.summary)
                }, i.init = function() {
                    this.galleryModel.initCarousel(), this.feedbacksList.limitFeedbackSize()
                }, i.updateSort = function(e, t) {
                    t.preventDefault(), $.observable(this.sorterModel).setProperty({
                        currentSorting: e.value,
                        currentSortingOrder: e.originalValue,
                        value: e.value,
                        textValue: e.textValue
                    }), this._sendWbaEvent(), this._updateFeedbacks(!0)
                }, i.showMobileSorter = function() {
                    this.$moduleLoader.loadModuleAsync("mobilePopupSorter").then(e => {
                        e.showPopup(this.sorterModel.currentSorting, this.sorterModel.sortings, this.updateSort.bind(this))
                    })
                }, i.showMobileFilters = function() {
                    this.$moduleLoader.loadModuleAsync("mobileFilterPopup").then(e => e.showPopup(this.summaryModel.valuationDistribution, this.filtersModel.selectedValuation)).then(e => {
                        e && this.filtersModel.updateSelectedValuation(e)
                    })
                }, i.resetFilters = function() {
                    this.disableAutoUpdate = !0, this.filtersModel.reset(), this.disableAutoUpdate = !1, this._updateFeedbacks(!0)
                }, i.showMobileSummary = function() {
                    Promise.all([this.$moduleLoader.loadModuleAsync("mobileSummaryPopup"), $.views.loadTemplateAsync("sizeMatchDistribution")]).then(([e]) => {
                        e.showPopup(this)
                    })
                }, i.showCommentPopup = function() {
                    const e = {
                        location: "Reviews",
                        item_id: this.productModel.nmId
                    };
                    this.$analitic.sendEvent("Item_Feedback_GiveFeedback_T", e);
                    const t = {
                            imtId: this.imtId,
                            nmId: this.productModel.nmId,
                            goodName: this.productModel.goodName,
                            brandName: this.productModel.brandName,
                            adult: this.productModel.adult,
                            sellerId: this.productModel.sellerId
                        },
                        o = {
                            onError: e => {
                                if (!e.isUnauthorize) return e.isCustomError ? wb.popup.showFeedbackError(e) : void $.views.loadTemplateAsync("feedbacksubmiterror").then(e => {
                                    if (!e) return Promise.reject();
                                    wb.popup.showCustomPopup({
                                        useHtml: !0,
                                        msg: e.render(),
                                        popupClassesList: ["popup-alert", "popup-error-feedbacks", "shown"],
                                        contentClasses: ["popup__content"],
                                        useCenteredFunction: !0,
                                        modal: !1
                                    })
                                }).catch(e => {
                                    wb.popup.renderModalError(this.$localziation.serverError)
                                })
                            }
                        };
                    Promise.all([this.$moduleLoader.loadServiceAsync("feedbacksService")]).then(() => {
                        this.$services.feedbacksService.showFeedbacksPopup(t, o, e)
                    })
                }, i.loadMoreFeedbacks = function() {
                    this.$analitic.sendEvent("Item_Feedback_Scroll", {
                        item_id: this.productModel.nmId,
                        index: this.filtersModel.pagerModel.pageSize * this.filtersModel.pagerModel.currentPage + 1
                    }), this._updateFeedbacks()
                }, i.showCommentsRules = function() {
                    $.views.loadTemplateAsync("commentgoodrules").then(e => {
                        wb.popup.showCustomPopup({
                            msg: e(),
                            lockScroll: !0,
                            popupClassesList: ["i-popup-comment-rules", "shown"],
                            contentClasses: ["popup__content"],
                            useCenteredFunction: !0,
                            useHtml: !0
                        })
                    })
                }, i._updateFeedbacks = function(e) {
                    e ? this.filtersModel.resetPage() : this.filtersModel.nextPage();
                    const t = this.filtersModel.getFilters();
                    t.order = this.sorterModel.currentSorting, this.currentIsByNm && (t.byNmId = !0, t.nmId = this.nmId), this.feedbacksList.loadFeedbacks(t, e)
                }, i._sendWbaEvent = function() {
                    let e;
                    switch (this.sorterModel.currentSortingOrder) {
                        case 1:
                            e = "Item_Feedback_SortType_New_T";
                            break;
                        case 2:
                            e = "Item_Feedback_SortType_Old_T";
                            break;
                        case 3:
                            e = "Item_Feedback_SortType_Positive_T";
                            break;
                        case 4:
                            e = "Item_Feedback_SortType_Negative_T";
                            break;
                        case 5:
                            e = "Item_Feedback_SortType_Useful_T";
                            break;
                        case 6:
                            e = "Item_Feedback_SortType_Useless_T";
                            break;
                        default:
                            e = ""
                    }
                    e && this.$analitic.sendEvent(e, {})
                }, i._observe = function() {
                    $.observe(this, "filtersModel.*", (e, t) => {
                        this.disableAutoUpdate || "arrayChange" == e.type && "refresh" != t.change || (this._updateFeedbacks(!0), this._ratingFilterStatEvent(), "set" === t.change && "onlyWithPhoto" === t.path && this.$analitic.sendEvent("Item_Feedback_Only_Photos_T"))
                    })
                }, i._ratingFilterStatEvent = function() {
                    var e, t;
                    const o = null !== (e = this.filtersModel.selectedValuation) && void 0 !== e ? e : [],
                        s = null !== (t = this.ratingSelectedFiltersWba) && void 0 !== t ? t : [];
                    o.forEach(e => {
                        var t;
                        if (-1 != s.indexOf(e)) return;
                        const o = {
                            filter_value: parseInt(e),
                            reviews: null === (t = this.summaryModel.valuationDistribution.find(t => t.valuation == e)) || void 0 === t ? void 0 : t.count,
                            item_reviews: this.summaryModel.totalCount,
                            rating: parseFloat(this.summaryModel.valuation)
                        };
                        this.$analitic.sendEvent("Item_Feedback_Filter_Rating_T", o)
                    }), this.ratingSelectedFiltersWba = [...o]
                }, i.showProductVariantPopup = function() {
                    wb.popup.showCustomPopup({
                        popupClassesList: ["popup-product-variant", "shown"],
                        contentClasses: ["popup__content"],
                        useCenteredFunction: !0,
                        lockScroll: !1,
                        showCross: !1,
                        onShow: e => {
                            $.templates.productVariantModal.link(e.querySelector(".popup__content"), this)
                        },
                        onHide: () => {
                            this.closeProductVariantTooltip()
                        }
                    })
                }, i.closeProductVariantTooltip = function() {
                    this.$observable.setProperty({
                        productVariantTooltipClosed: !0
                    }), wb.global.userSettings.closed.push("product_variant_tooltip_hide"), wb.global.saveUserSettings()
                }, _createClass(s, [{
                    key: "template",
                    get: function() {
                        return $.templates.productFeedbacksTmpl
                    }
                }, {
                    key: "feedbacksCount",
                    get: function() {
                        return this.summaryModel.totalCount
                    }
                }, {
                    key: "tooltipHelper",
                    get: function() {
                        return {
                            showRules: this.showCommentsRules,
                            showCommentPopup: this.showCommentPopup
                        }
                    }
                }]), s
            }(require("../feedbacksModelBase"));
            window.__spaModuleManager__.register("feedbacksModel", o)
        }();

    }, {
        "../feedbacksModelBase": 1,
        "./feedbacksFilters": 2,
        "./feedbacksList": 3
    }],
    5: [function(require, module, exports) {
        "use strict";

        function _defineProperties(t, e) {
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, _toPropertyKey(i.key), i)
            }
        }

        function _createClass(t, e, r) {
            return e && _defineProperties(t.prototype, e), r && _defineProperties(t, r), Object.defineProperty(t, "prototype", {
                writable: !1
            }), t
        }

        function _toPropertyKey(t) {
            var e = _toPrimitive(t, "string");
            return "symbol" == typeof e ? e : String(e)
        }

        function _toPrimitive(t, e) {
            if ("object" != typeof t || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
                var i = r.call(t, e || "default");
                if ("object" != typeof i) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === e ? String : Number)(t)
        }
        let GroupedCommentsItem = function() {
            function t(t) {
                this.wbUserId = t, this.items = [], this._firstComment = null, this._lastComment = null
            }
            return t.prototype.addComment = function(t) {
                this.items.push(t), this.items.sort((t, e) => t.createdDate - e.createdDate), this._firstComment = null, this._lastComment = null
            }, _createClass(t, [{
                key: "firstComment",
                get: function() {
                    var t;
                    return this._firstComment = null !== (t = this._firstComment) && void 0 !== t ? t : this.items[0], this._firstComment
                }
            }, {
                key: "lastComment",
                get: function() {
                    var t;
                    return this._lastComment = null !== (t = this._lastComment) && void 0 !== t ? t : this.items[this.items.length - 1], this._lastComment
                }
            }]), t
        }();
        module.exports = GroupedCommentsItem;

    }, {}]
}, {}, [4]);