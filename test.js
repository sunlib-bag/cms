if (function (t) {
    t.fn.camera = function (e, i) {
      function s() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) return !0
      }
      
      function n() {
        var e = t(k).width();
        t("li", k).removeClass("camera_visThumb"), t("li", k).each(function () {
          var i = t(this).position(), s = t("ul", k).outerWidth(), n = t("ul", k).offset().left,
            o = t("> div", k).offset().left - n;
          o > 0 ? t(".camera_prevThumbs", Z).removeClass("hideNav") : t(".camera_prevThumbs", Z).addClass("hideNav"), s - o > e ? t(".camera_nextThumbs", Z).removeClass("hideNav") : t(".camera_nextThumbs", Z).addClass("hideNav");
          var a = i.left;
          i.left + t(this).width() - o <= e && a - o >= 0 && t(this).addClass("camera_visThumb")
        })
      }
      
      function o() {
        function i() {
          if (R = p.width(), -1 != e.height.indexOf("%")) {
            var i = Math.round(R / (100 / parseFloat(e.height)));
            N = "" != e.minHeight && i < parseFloat(e.minHeight) ? parseFloat(e.minHeight) : i, p.css({height: N})
          } else "auto" == e.height ? N = p.height() : (N = parseFloat(e.height), p.css({height: N}));
          t(".camerarelative", y).css({width: R, height: N}), t(".imgLoaded", y).each(function () {
            var i, s, n = t(this), o = n.attr("width"), a = n.attr("height"), r = (n.index(), n.attr("data-alignment")),
              l = n.attr("data-portrait");
            if (void 0 !== r && !1 !== r && "" !== r || (r = e.alignment), void 0 !== l && !1 !== l && "" !== l || (l = e.portrait), 0 == l || "false" == l) if (o / a < R / N) {
              var c = R / o, d = .5 * Math.abs(N - a * c);
              switch (r) {
                case"topLeft":
                case"topCenter":
                case"topRight":
                  i = 0;
                  break;
                case"centerLeft":
                case"center":
                case"centerRight":
                  i = "-" + d + "px";
                  break;
                case"bottomLeft":
                case"bottomCenter":
                case"bottomRight":
                  i = "-" + 2 * d + "px"
              }
              n.css({
                height: a * c,
                "margin-left": 0,
                "margin-right": 0,
                "margin-top": i,
                position: "absolute",
                visibility: "visible",
                width: R
              })
            } else {
              var c = N / a, d = .5 * Math.abs(R - o * c);
              switch (r) {
                case"topLeft":
                  s = 0;
                  break;
                case"topCenter":
                  s = "-" + d + "px";
                  break;
                case"topRight":
                  s = "-" + 2 * d + "px";
                  break;
                case"centerLeft":
                  s = 0;
                  break;
                case"center":
                  s = "-" + d + "px";
                  break;
                case"centerRight":
                  s = "-" + 2 * d + "px";
                  break;
                case"bottomLeft":
                  s = 0;
                  break;
                case"bottomCenter":
                  s = "-" + d + "px";
                  break;
                case"bottomRight":
                  s = "-" + 2 * d + "px"
              }
              n.css({
                height: N,
                "margin-left": s,
                "margin-right": s,
                "margin-top": 0,
                position: "absolute",
                visibility: "visible",
                width: o * c
              })
            } else if (o / a < R / N) {
              var c = N / a, d = .5 * Math.abs(R - o * c);
              switch (r) {
                case"topLeft":
                  s = 0;
                  break;
                case"topCenter":
                  s = d + "px";
                  break;
                case"topRight":
                  s = 2 * d + "px";
                  break;
                case"centerLeft":
                  s = 0;
                  break;
                case"center":
                  s = d + "px";
                  break;
                case"centerRight":
                  s = 2 * d + "px";
                  break;
                case"bottomLeft":
                  s = 0;
                  break;
                case"bottomCenter":
                  s = d + "px";
                  break;
                case"bottomRight":
                  s = 2 * d + "px"
              }
              n.css({
                height: N,
                "margin-left": s,
                "margin-right": s,
                "margin-top": 0,
                position: "absolute",
                visibility: "visible",
                width: o * c
              })
            } else {
              var c = R / o, d = .5 * Math.abs(N - a * c);
              switch (r) {
                case"topLeft":
                case"topCenter":
                case"topRight":
                  i = 0;
                  break;
                case"centerLeft":
                case"center":
                case"centerRight":
                  i = d + "px";
                  break;
                case"bottomLeft":
                case"bottomCenter":
                case"bottomRight":
                  i = 2 * d + "px"
              }
              n.css({
                height: a * c,
                "margin-left": 0,
                "margin-right": 0,
                "margin-top": i,
                position: "absolute",
                visibility: "visible",
                width: R
              })
            }
          })
        }
        
        var s;
        1 == W ? (clearTimeout(s), s = setTimeout(i, 200)) : i(), W = !0
      }
      
      function a() {
        t("iframe", u).each(function () {
          t(".camera_caption", u).show();
          var i = t(this), s = i.attr("data-src");
          i.attr("src", s);
          var n = e.imagePath + "blank.gif", o = new Image;
          if (o.src = n, -1 != e.height.indexOf("%")) {
            var a = Math.round(R / (100 / parseFloat(e.height)));
            N = "" != e.minHeight && a < parseFloat(e.minHeight) ? parseFloat(e.minHeight) : a
          } else N = "auto" == e.height ? p.height() : parseFloat(e.height);
          i.after(t(o).attr({class: "imgFake", width: R, height: N}));
          var r = i.clone();
          i.remove(), t(o).bind("click", function () {
            "absolute" == t(this).css("position") ? (t(this).remove(), -1 != s.indexOf("vimeo") || -1 != s.indexOf("youtube") ? -1 != s.indexOf("?") ? autoplay = "&autoplay=1" : autoplay = "?autoplay=1" : -1 != s.indexOf("dailymotion") && (-1 != s.indexOf("?") ? autoplay = "&autoPlay=1" : autoplay = "?autoPlay=1"), r.attr("src", s + autoplay), X = !0) : (t(this).css({
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10
            }).after(r), r.css({position: "absolute", top: 0, left: 0, zIndex: 9}))
          })
        })
      }
      
      function r(t) {
        for (var e, i, s = t.length; s; e = parseInt(Math.random() * s), i = t[--s], t[s] = t[e], t[e] = i) ;
        return t
      }
      
      function l() {
        if (t(k).length && !t(T).length) {
          var e, i = t(k).outerWidth(),
            s = (t("ul > li", k).outerWidth(), t("li.cameracurrent", k).length ? t("li.cameracurrent", k).position() : ""),
            o = t("ul > li", k).length * t("ul > li", k).outerWidth(), a = t("ul", k).offset().left,
            r = t("> div", k).offset().left;
          e = a < 0 ? "-" + (r - a) : r - a, 1 == nt && (t("ul", k).width(t("ul > li", k).length * t("ul > li", k).outerWidth()), t(k).length && !t(T).lenght && p.css({marginBottom: t(k).outerHeight()}), n(), t("ul", k).width(t("ul > li", k).length * t("ul > li", k).outerWidth()), t(k).length && !t(T).lenght && p.css({marginBottom: t(k).outerHeight()})), nt = !1;
          var l = t("li.cameracurrent", k).length ? s.left : "",
            c = t("li.cameracurrent", k).length ? s.left + t("li.cameracurrent", k).outerWidth() : "";
          l < t("li.cameracurrent", k).outerWidth() && (l = 0), c - e > i ? l + i < o ? t("ul", k).animate({"margin-left": "-" + l + "px"}, 500, n) : t("ul", k).animate({"margin-left": "-" + (t("ul", k).outerWidth() - i) + "px"}, 500, n) : l - e < 0 ? t("ul", k).animate({"margin-left": "-" + l + "px"}, 500, n) : (t("ul", k).css({
            "margin-left": "auto",
            "margin-right": "auto"
          }), setTimeout(n, 100))
        }
      }
      
      function c() {
        tt = 0;
        var i = t(".camera_bar_cont", Z).width(), s = t(".camera_bar_cont", Z).height();
        if ("pie" != m) switch (G) {
          case"leftToRight":
            t("#" + g).css({right: i});
            break;
          case"rightToLeft":
            t("#" + g).css({left: i});
            break;
          case"topToBottom":
            t("#" + g).css({bottom: s});
            break;
          case"bottomToTop":
            t("#" + g).css({top: s})
        } else it.clearRect(0, 0, e.pieDiameter, e.pieDiameter)
      }
      
      function d(i) {
        v.addClass("camerasliding"), X = !1;
        var n = parseFloat(t("div.cameraSlide.cameracurrent", y).index());
        if (i > 0) h = i - 1; else if (n == M - 1) h = 0; else var h = n + 1;
        var f = t(".cameraSlide:eq(" + h + ")", y), w = t(".cameraSlide:eq(" + (h + 1) + ")", y).addClass("cameranext");
        if (n != h + 1 && w.hide(), t(".cameraContent", u).fadeOut(600), t(".camera_caption", u).show(), t(".camerarelative", f).append(t("> div ", v).eq(h).find("> div.camera_effected")), t(".camera_target_content .cameraContent:eq(" + h + ")", p).append(t("> div ", v).eq(h).find("> div")), t(".imgLoaded", f).length) {
          if ($.length > h + 1 && !t(".imgLoaded", w).length) {
            var b = $[h + 1], _ = new Image;
            _.src = b + "?" + (new Date).getTime(), w.prepend(t(_).attr("class", "imgLoaded").css("visibility", "hidden")), _.onload = function () {
              wt = _.naturalWidth, bt = _.naturalHeight, t(_).attr("data-alignment", L[h + 1]).attr("data-portrait", I[h + 1]), t(_).attr("width", wt), t(_).attr("height", bt), o()
            }
          }
          e.onLoaded.call(this), t(".camera_loader", p).is(":visible") ? t(".camera_loader", p).fadeOut(400) : (t(".camera_loader", p).css({visibility: "hidden"}), t(".camera_loader", p).fadeOut(400, function () {
            t(".camera_loader", p).css({visibility: "visible"})
          }));
          var x, C, S, E, P, z = e.rows, O = e.cols, D = 1, A = 0,
            j = new Array("simpleFade", "curtainTopLeft", "curtainTopRight", "curtainBottomLeft", "curtainBottomRight", "curtainSliceLeft", "curtainSliceRight", "blindCurtainTopLeft", "blindCurtainTopRight", "blindCurtainBottomLeft", "blindCurtainBottomRight", "blindCurtainSliceBottom", "blindCurtainSliceTop", "stampede", "mosaic", "mosaicReverse", "mosaicRandom", "mosaicSpiral", "mosaicSpiralReverse", "topLeftBottomRight", "bottomRightTopLeft", "bottomLeftTopRight", "topRightBottomLeft", "scrollLeft", "scrollRight", "scrollTop", "scrollBottom", "scrollHorz");
          marginLeft = 0, marginTop = 0, opacityOnGrid = 0, 1 == e.opacityOnGrid ? opacityOnGrid = 0 : opacityOnGrid = 1;
          var W = t(" > div", v).eq(h).attr("data-fx");
          if (E = s() && "" != e.mobileFx && "default" != e.mobileFx ? e.mobileFx : void 0 !== W && !1 !== W && "default" !== W ? W : e.fx, "random" == E ? (E = r(j), E = E[0]) : (E = E).indexOf(",") > 0 && (E = E.replace(/ /g, ""), E = E.split(","), E = r(E), E = E[0]), dataEasing = t(" > div", v).eq(h).attr("data-easing"), mobileEasing = t(" > div", v).eq(h).attr("data-mobileEasing"), P = s() && "" != e.mobileEasing && "default" != e.mobileEasing ? "undefined" != typeof mobileEasing && !1 !== mobileEasing && "default" !== mobileEasing ? mobileEasing : e.mobileEasing : "undefined" != typeof dataEasing && !1 !== dataEasing && "default" !== dataEasing ? dataEasing : e.easing, void 0 !== (x = t(" > div", v).eq(h).attr("data-slideOn")) && !1 !== x) F = x; else if ("random" == e.slideOn) {
            var F = new Array("next", "prev");
            F = r(F), F = F[0]
          } else F = e.slideOn;
          var Q = t(" > div", v).eq(h).attr("data-time");
          C = void 0 !== Q && !1 !== Q && "" !== Q ? parseFloat(Q) : e.time;
          var U = t(" > div", v).eq(h).attr("data-transPeriod");
          switch (S = void 0 !== U && !1 !== U && "" !== U ? parseFloat(U) : e.transPeriod, t(v).hasClass("camerastarted") || (E = "simpleFade", F = "next", P = "", S = 400, t(v).addClass("camerastarted")), E) {
            case"simpleFade":
              O = 1, z = 1;
              break;
            case"curtainTopLeft":
            case"curtainTopRight":
            case"curtainBottomLeft":
            case"curtainBottomRight":
            case"curtainSliceLeft":
            case"curtainSliceRight":
              O = 0 == e.slicedCols ? e.cols : e.slicedCols, z = 1;
              break;
            case"blindCurtainTopLeft":
            case"blindCurtainTopRight":
            case"blindCurtainBottomLeft":
            case"blindCurtainBottomRight":
            case"blindCurtainSliceTop":
            case"blindCurtainSliceBottom":
              z = 0 == e.slicedRows ? e.rows : e.slicedRows, O = 1;
              break;
            case"stampede":
              A = "-" + S;
              break;
            case"mosaic":
            case"mosaicReverse":
              A = e.gridDifference;
              break;
            case"mosaicRandom":
              break;
            case"mosaicSpiral":
            case"mosaicSpiralReverse":
              A = e.gridDifference, D = 1.7;
              break;
            case"topLeftBottomRight":
            case"bottomRightTopLeft":
            case"bottomLeftTopRight":
            case"topRightBottomLeft":
              A = e.gridDifference, D = 6;
              break;
            case"scrollLeft":
            case"scrollRight":
            case"scrollTop":
            case"scrollBottom":
            case"scrollHorz":
              O = 1, z = 1
          }
          for (var Y, K, J = 0, st = z * O, nt = R - Math.floor(R / O) * O, ot = N - Math.floor(N / z) * z, at = 0, rt = 0, lt = new Array, ct = new Array, dt = new Array; J < st;) {
            lt.push(J), ct.push(J), H.append('<div class="cameraappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');
            var ht = t(".cameraappended:eq(" + J + ")", y);
            "scrollLeft" == E || "scrollRight" == E || "scrollTop" == E || "scrollBottom" == E || "scrollHorz" == E ? V.eq(h).clone().show().appendTo(ht) : "next" == F ? V.eq(h).clone().show().appendTo(ht) : V.eq(n).clone().show().appendTo(ht), Y = J % O < nt ? 1 : 0, J % O == 0 && (at = 0), K = Math.floor(J / O) < ot ? 1 : 0, ht.css({
              height: Math.floor(N / z + K + 1),
              left: at,
              top: rt,
              width: Math.floor(R / O + Y + 1)
            }), t("> .cameraSlide", ht).css({
              height: N,
              "margin-left": "-" + at + "px",
              "margin-top": "-" + rt + "px",
              width: R
            }), at = at + ht.width() - 1, J % O == O - 1 && (rt = rt + ht.height() - 1), J++
          }
          switch (E) {
            case"curtainTopLeft":
            case"curtainBottomLeft":
            case"curtainSliceLeft":
              break;
            case"curtainTopRight":
            case"curtainBottomRight":
            case"curtainSliceRight":
              lt = lt.reverse();
              break;
            case"blindCurtainTopLeft":
              break;
            case"blindCurtainBottomLeft":
              lt = lt.reverse();
              break;
            case"blindCurtainSliceTop":
            case"blindCurtainTopRight":
              break;
            case"blindCurtainBottomRight":
            case"blindCurtainSliceBottom":
              lt = lt.reverse();
              break;
            case"stampede":
              lt = r(lt);
              break;
            case"mosaic":
              break;
            case"mosaicReverse":
              lt = lt.reverse();
              break;
            case"mosaicRandom":
              lt = r(lt);
              break;
            case"mosaicSpiral":
              var pt = z / 2, ut = 0;
              for (ft = 0; ft < pt; ft++) {
                for (mt = ft, gt = ft; gt < O - ft - 1; gt++) dt[ut++] = mt * O + gt;
                for (gt = O - ft - 1, mt = ft; mt < z - ft - 1; mt++) dt[ut++] = mt * O + gt;
                for (mt = z - ft - 1, gt = O - ft - 1; gt > ft; gt--) dt[ut++] = mt * O + gt;
                for (gt = ft, mt = z - ft - 1; mt > ft; mt--) dt[ut++] = mt * O + gt
              }
              lt = dt;
              break;
            case"mosaicSpiralReverse":
              var ft, pt = z / 2, ut = st - 1;
              for (ft = 0; ft < pt; ft++) {
                for (mt = ft, gt = ft; gt < O - ft - 1; gt++) dt[ut--] = mt * O + gt;
                for (gt = O - ft - 1, mt = ft; mt < z - ft - 1; mt++) dt[ut--] = mt * O + gt;
                for (mt = z - ft - 1, gt = O - ft - 1; gt > ft; gt--) dt[ut--] = mt * O + gt;
                for (gt = ft, mt = z - ft - 1; mt > ft; mt--) dt[ut--] = mt * O + gt
              }
              lt = dt;
              break;
            case"topLeftBottomRight":
              for (mt = 0; mt < z; mt++) for (gt = 0; gt < O; gt++) dt.push(gt + mt);
              ct = dt;
              break;
            case"bottomRightTopLeft":
              for (mt = 0; mt < z; mt++) for (gt = 0; gt < O; gt++) dt.push(gt + mt);
              ct = dt.reverse();
              break;
            case"bottomLeftTopRight":
              for (mt = z; mt > 0; mt--) for (gt = 0; gt < O; gt++) dt.push(gt + mt);
              ct = dt;
              break;
            case"topRightBottomLeft":
              for (var mt = 0; mt < z; mt++) for (var gt = O; gt > 0; gt--) dt.push(gt + mt);
              ct = dt
          }
          t.each(lt, function (i, s) {
            function o() {
              if (t(this).addClass("cameraeased"), t(".cameraeased", y).length >= 0 && t(k).css({visibility: "visible"}), t(".cameraeased", y).length == st) {
                l(), t(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom", u).each(function () {
                  t(this).css("visibility", "hidden")
                }), V.eq(h).show().css("z-index", "999").removeClass("cameranext").addClass("cameracurrent"), V.eq(n).css("z-index", "1").removeClass("cameracurrent"), t(".cameraContent", u).eq(h).addClass("cameracurrent"), n >= 0 && t(".cameraContent", u).eq(n).removeClass("cameracurrent"), e.onEndTransition.call(this), "hide" != t("> div", v).eq(h).attr("data-video") && t(".cameraContent.cameracurrent .imgFake", u).length && t(".cameraContent.cameracurrent .imgFake", u).click();
                var i = V.eq(h).find(".fadeIn").length,
                  s = t(".cameraContent", u).eq(h).find(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom").length;
                0 != i && t(".cameraSlide.cameracurrent .fadeIn", u).each(function () {
                  if ("" != t(this).attr("data-easing")) e = t(this).attr("data-easing"); else var e = P;
                  var s = t(this);
                  if (void 0 === s.attr("data-outerWidth") || !1 === s.attr("data-outerWidth") || "" === s.attr("data-outerWidth")) {
                    n = s.outerWidth();
                    s.attr("data-outerWidth", n)
                  } else var n = s.attr("data-outerWidth");
                  if (void 0 === s.attr("data-outerHeight") || !1 === s.attr("data-outerHeight") || "" === s.attr("data-outerHeight")) {
                    o = s.outerHeight();
                    s.attr("data-outerHeight", o)
                  } else var o = s.attr("data-outerHeight");
                  var a = s.position(), r = (a.left, a.top, s.attr("class")), l = s.index();
                  s.parents(".camerarelative").outerHeight(), s.parents(".camerarelative").outerWidth();
                  -1 != r.indexOf("fadeIn") ? s.animate({opacity: 0}, 0).css("visibility", "visible").delay(C / i * (.1 * (l - 1))).animate({opacity: 1}, C / i * .15, e) : s.css("visibility", "visible")
                }), t(".cameraContent.cameracurrent", u).show(), 0 != s && t(".cameraContent.cameracurrent .moveFromLeft, .cameraContent.cameracurrent .moveFromRight, .cameraContent.cameracurrent .moveFromTop, .cameraContent.cameracurrent .moveFromBottom, .cameraContent.cameracurrent .fadeIn, .cameraContent.cameracurrent .fadeFromLeft, .cameraContent.cameracurrent .fadeFromRight, .cameraContent.cameracurrent .fadeFromTop, .cameraContent.cameracurrent .fadeFromBottom", u).each(function () {
                  if ("" != t(this).attr("data-easing")) e = t(this).attr("data-easing"); else var e = P;
                  var i = t(this), n = i.position(), o = (n.left, n.top, i.attr("class")), a = i.index(),
                    r = i.outerHeight();
                  -1 != o.indexOf("moveFromLeft") ? (i.css({
                    left: "-" + R + "px",
                    right: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({left: n.left}, C / s * .15, e)) : -1 != o.indexOf("moveFromRight") ? (i.css({
                    left: R + "px",
                    right: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({left: n.left}, C / s * .15, e)) : -1 != o.indexOf("moveFromTop") ? (i.css({
                    top: "-" + N + "px",
                    bottom: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({top: n.top}, C / s * .15, e, function () {
                    i.css({top: "auto", bottom: 0})
                  })) : -1 != o.indexOf("moveFromBottom") ? (i.css({
                    top: N + "px",
                    bottom: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({top: n.top}, C / s * .15, e)) : -1 != o.indexOf("fadeFromLeft") ? (i.animate({opacity: 0}, 0).css({
                    left: "-" + R + "px",
                    right: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({
                    left: n.left,
                    opacity: 1
                  }, C / s * .15, e)) : -1 != o.indexOf("fadeFromRight") ? (i.animate({opacity: 0}, 0).css({
                    left: R + "px",
                    right: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({
                    left: n.left,
                    opacity: 1
                  }, C / s * .15, e)) : -1 != o.indexOf("fadeFromTop") ? (i.animate({opacity: 0}, 0).css({
                    top: "-" + N + "px",
                    bottom: "auto"
                  }), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({
                    top: n.top,
                    opacity: 1
                  }, C / s * .15, e, function () {
                    i.css({top: "auto", bottom: 0})
                  })) : -1 != o.indexOf("fadeFromBottom") ? (i.animate({opacity: 0}, 0).css({bottom: "-" + r + "px"}), i.css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({
                    bottom: "0",
                    opacity: 1
                  }, C / s * .15, e)) : -1 != o.indexOf("fadeIn") ? i.animate({opacity: 0}, 0).css("visibility", "visible").delay(C / s * (.1 * (a - 1))).animate({opacity: 1}, C / s * .15, e) : i.css("visibility", "visible")
                }), t(".cameraappended", y).remove(), v.removeClass("camerasliding"), V.eq(n).hide();
                var o, r = t(".camera_bar_cont", Z).width(), p = t(".camera_bar_cont", Z).height();
                o = "pie" != m ? .05 : .005, t("#" + g).animate({opacity: e.loaderOpacity}, 200), B = setInterval(function () {
                  if (v.hasClass("stopped") && clearInterval(B), "pie" != m) switch (tt <= 1.002 && !v.hasClass("stopped") && !v.hasClass("paused") && !v.hasClass("hovered") ? tt += o : tt <= 1 && (v.hasClass("stopped") || v.hasClass("paused") || v.hasClass("stopped") || v.hasClass("hovered")) ? tt = tt : v.hasClass("stopped") || v.hasClass("paused") || v.hasClass("hovered") || (clearInterval(B), a(), t("#" + g).animate({opacity: 0}, 200, function () {
                    clearTimeout(q), q = setTimeout(c, f), d(), e.onStartLoading.call(this)
                  })), G) {
                    case"leftToRight":
                      t("#" + g).animate({right: r - r * tt}, C * o, "linear");
                      break;
                    case"rightToLeft":
                      t("#" + g).animate({left: r - r * tt}, C * o, "linear");
                      break;
                    case"topToBottom":
                    case"bottomToTop":
                      t("#" + g).animate({bottom: p - p * tt}, C * o, "linear")
                  } else et = tt, it.clearRect(0, 0, e.pieDiameter, e.pieDiameter), it.globalCompositeOperation = "destination-over", it.beginPath(), it.arc(e.pieDiameter / 2, e.pieDiameter / 2, e.pieDiameter / 2 - e.loaderStroke, 0, 2 * Math.PI, !1), it.lineWidth = e.loaderStroke, it.strokeStyle = e.loaderBgColor, it.stroke(), it.closePath(), it.globalCompositeOperation = "source-over", it.beginPath(), it.arc(e.pieDiameter / 2, e.pieDiameter / 2, e.pieDiameter / 2 - e.loaderStroke, 0, 2 * Math.PI * et, !1), it.lineWidth = e.loaderStroke - 2 * e.loaderPadding, it.strokeStyle = e.loaderColor, it.stroke(), it.closePath(), tt <= 1.002 && !v.hasClass("stopped") && !v.hasClass("paused") && !v.hasClass("hovered") ? tt += o : tt <= 1 && (v.hasClass("stopped") || v.hasClass("paused") || v.hasClass("hovered")) ? tt = tt : v.hasClass("stopped") || v.hasClass("paused") || v.hasClass("hovered") || (clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 200, function () {
                    clearTimeout(q), q = setTimeout(c, f), d(), e.onStartLoading.call(this)
                  }))
                }, C * o)
              }
            }
            
            switch (Y = s % O < nt ? 1 : 0, s % O == 0 && (at = 0), K = Math.floor(s / O) < ot ? 1 : 0, E) {
              case"simpleFade":
                height = N, width = R, opacityOnGrid = 0;
                break;
              case"curtainTopLeft":
              case"curtainTopRight":
                height = 0, width = Math.floor(R / O + Y + 1), marginTop = "-" + Math.floor(N / z + K + 1) + "px";
                break;
              case"curtainBottomLeft":
              case"curtainBottomRight":
                height = 0, width = Math.floor(R / O + Y + 1), marginTop = Math.floor(N / z + K + 1) + "px";
                break;
              case"curtainSliceLeft":
              case"curtainSliceRight":
                height = 0, width = Math.floor(R / O + Y + 1), marginTop = s % 2 == 0 ? Math.floor(N / z + K + 1) + "px" : "-" + Math.floor(N / z + K + 1) + "px";
                break;
              case"blindCurtainTopLeft":
                height = Math.floor(N / z + K + 1), width = 0, marginLeft = "-" + Math.floor(R / O + Y + 1) + "px";
                break;
              case"blindCurtainTopRight":
                height = Math.floor(N / z + K + 1), width = 0, marginLeft = Math.floor(R / O + Y + 1) + "px";
                break;
              case"blindCurtainBottomLeft":
                height = Math.floor(N / z + K + 1), width = 0, marginLeft = "-" + Math.floor(R / O + Y + 1) + "px";
                break;
              case"blindCurtainBottomRight":
                height = Math.floor(N / z + K + 1), width = 0, marginLeft = Math.floor(R / O + Y + 1) + "px";
                break;
              case"blindCurtainSliceBottom":
              case"blindCurtainSliceTop":
                height = Math.floor(N / z + K + 1), width = 0, marginLeft = s % 2 == 0 ? "-" + Math.floor(R / O + Y + 1) + "px" : Math.floor(R / O + Y + 1) + "px";
                break;
              case"stampede":
                height = 0, width = 0, marginLeft = .2 * R * (i % O - (O - Math.floor(O / 2))) + "px", marginTop = .2 * N * (Math.floor(i / O) + 1 - (z - Math.floor(z / 2))) + "px";
                break;
              case"mosaic":
                height = 0, width = 0;
                break;
              case"mosaicReverse":
                height = 0, width = 0, marginLeft = Math.floor(R / O + Y + 1) + "px", marginTop = Math.floor(N / z + K + 1) + "px";
                break;
              case"mosaicRandom":
              case"mosaicSpiral":
              case"mosaicSpiralReverse":
                height = 0, width = 0, marginLeft = .5 * Math.floor(R / O + Y + 1) + "px", marginTop = .5 * Math.floor(N / z + K + 1) + "px";
                break;
              case"topLeftBottomRight":
                height = 0, width = 0;
                break;
              case"bottomRightTopLeft":
                height = 0, width = 0, marginLeft = Math.floor(R / O + Y + 1) + "px", marginTop = Math.floor(N / z + K + 1) + "px";
                break;
              case"bottomLeftTopRight":
                height = 0, width = 0, marginLeft = 0, marginTop = Math.floor(N / z + K + 1) + "px";
                break;
              case"topRightBottomLeft":
                height = 0, width = 0, marginLeft = Math.floor(R / O + Y + 1) + "px", marginTop = 0;
                break;
              case"scrollRight":
                height = N, width = R, marginLeft = -R;
                break;
              case"scrollLeft":
                height = N, width = R, marginLeft = R;
                break;
              case"scrollTop":
                height = N, width = R, marginTop = N;
                break;
              case"scrollBottom":
                height = N, width = R, marginTop = -N;
                break;
              case"scrollHorz":
                height = N, width = R, marginLeft = 0 == n && h == M - 1 ? -R : n < h || n == M - 1 && 0 == h ? R : -R
            }
            var r = t(".cameraappended:eq(" + s + ")", y);
            void 0 !== B && (clearInterval(B), clearTimeout(q), q = setTimeout(c, S + A)), t(T).length && (t(".camera_pag li", p).removeClass("cameracurrent"), t(".camera_pag li", p).eq(h).addClass("cameracurrent")), t(k).length && (t("li", k).removeClass("cameracurrent"), t("li", k).eq(h).addClass("cameracurrent"), t("li", k).not(".cameracurrent").find("img").animate({opacity: .5}, 0), t("li.cameracurrent img", k).animate({opacity: 1}, 0), t("li", k).hover(function () {
              t("img", this).stop(!0, !1).animate({opacity: 1}, 150)
            }, function () {
              t(this).hasClass("cameracurrent") || t("img", this).stop(!0, !1).animate({opacity: .5}, 150)
            }));
            var f = parseFloat(S) + parseFloat(A);
            "scrollLeft" == E || "scrollRight" == E || "scrollTop" == E || "scrollBottom" == E || "scrollHorz" == E ? (e.onStartTransition.call(this), f = 0, r.delay((S + A) / st * ct[i] * D * .5).css({
              display: "block",
              height: height,
              "margin-left": marginLeft,
              "margin-top": marginTop,
              width: width
            }).animate({
              height: Math.floor(N / z + K + 1),
              "margin-top": 0,
              "margin-left": 0,
              width: Math.floor(R / O + Y + 1)
            }, S - A, P, o), V.eq(n).delay((S + A) / st * ct[i] * D * .5).animate({
              "margin-left": -1 * marginLeft,
              "margin-top": -1 * marginTop
            }, S - A, P, function () {
              t(this).css({"margin-top": 0, "margin-left": 0})
            })) : (e.onStartTransition.call(this), f = parseFloat(S) + parseFloat(A), "next" == F ? r.delay((S + A) / st * ct[i] * D * .5).css({
              display: "block",
              height: height,
              "margin-left": marginLeft,
              "margin-top": marginTop,
              width: width,
              opacity: opacityOnGrid
            }).animate({
              height: Math.floor(N / z + K + 1),
              "margin-top": 0,
              "margin-left": 0,
              opacity: 1,
              width: Math.floor(R / O + Y + 1)
            }, S - A, P, o) : (V.eq(h).show().css("z-index", "999").addClass("cameracurrent"), V.eq(n).css("z-index", "1").removeClass("cameracurrent"), t(".cameraContent", u).eq(h).addClass("cameracurrent"), t(".cameraContent", u).eq(n).removeClass("cameracurrent"), r.delay((S + A) / st * ct[i] * D * .5).css({
              display: "block",
              height: Math.floor(N / z + K + 1),
              "margin-top": 0,
              "margin-left": 0,
              opacity: 1,
              width: Math.floor(R / O + Y + 1)
            }).animate({
              height: height,
              "margin-left": marginLeft,
              "margin-top": marginTop,
              width: width,
              opacity: opacityOnGrid
            }, S - A, P, o)))
          })
        } else {
          var vt = $[h], yt = new Image;
          yt.src = vt + "?" + (new Date).getTime(), f.css("visibility", "hidden"), f.prepend(t(yt).attr("class", "imgLoaded").css("visibility", "hidden"));
          var wt, bt;
          t(yt).get(0).complete && "0" != wt && "0" != bt && void 0 !== wt && !1 !== wt && void 0 !== bt && !1 !== bt || (t(".camera_loader", p).delay(500).fadeIn(400), yt.onload = function () {
            wt = yt.naturalWidth, bt = yt.naturalHeight, t(yt).attr("data-alignment", L[h]).attr("data-portrait", I[h]), t(yt).attr("width", wt), t(yt).attr("height", bt), y.find(".cameraSlide_" + h).hide().css("visibility", "visible"), o(), d(h + 1)
          })
        }
      }
      
      var h = {
        alignment: "center",
        autoAdvance: !0,
        mobileAutoAdvance: !0,
        barDirection: "leftToRight",
        barPosition: "bottom",
        cols: 6,
        easing: "easeInOutExpo",
        mobileEasing: "",
        fx: "random",
        mobileFx: "",
        gridDifference: 250,
        height: "50%",
        imagePath: "images/",
        hover: !0,
        loader: "pie",
        loaderColor: "#eeeeee",
        loaderBgColor: "#222222",
        loaderOpacity: .8,
        loaderPadding: 2,
        loaderStroke: 7,
        minHeight: "200px",
        navigation: !0,
        navigationHover: !0,
        mobileNavHover: !0,
        opacityOnGrid: !1,
        overlayer: !0,
        pagination: !0,
        playPause: !0,
        pauseOnClick: !0,
        pieDiameter: 38,
        piePosition: "rightTop",
        portrait: !1,
        rows: 4,
        slicedCols: 12,
        slicedRows: 8,
        slideOn: "random",
        thumbnails: !1,
        time: 7e3,
        transPeriod: 1500,
        onEndTransition: function () {
        },
        onLoaded: function () {
        },
        onStartLoading: function () {
        },
        onStartTransition: function () {
        }
      };
      t.support.borderRadius = !1, t.each(["borderRadius", "BorderRadius", "MozBorderRadius", "WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"], function () {
        void 0 !== document.body.style[this] && (t.support.borderRadius = !0)
      });
      var e = t.extend({}, h, e), p = t(this).addClass("camera_wrap");
      p.wrapInner('<div class="camera_src" />').wrapInner('<div class="camera_fakehover" />');
      var u = t(".camera_fakehover", p), f = p;
      u.append('<div class="camera_target"></div>'), 1 == e.overlayer && u.append('<div class="camera_overlayer"></div>'), u.append('<div class="camera_target_content"></div>');
      var m;
      "pie" == (m = "pie" != e.loader || t.support.borderRadius ? e.loader : "bar") ? u.append('<div class="camera_pie"></div>') : "bar" == m ? u.append('<div class="camera_bar"></div>') : u.append('<div class="camera_bar" style="display:none"></div>'), 1 == e.playPause && u.append('<div class="camera_commands"></div>'), 1 == e.navigation && u.append('<div class="camera_prev"><span></span></div>').append('<div class="camera_next"><span></span></div>'), 1 == e.thumbnails && p.append('<div class="camera_thumbs_cont" />'), 1 == e.thumbnails && 1 != e.pagination && t(".camera_thumbs_cont", p).wrap("<div />").wrap('<div class="camera_thumbs" />').wrap("<div />").wrap('<div class="camera_command_wrap" />'), 1 == e.pagination && p.append('<div class="camera_pag"></div>'), p.append('<div class="camera_loader"></div>'), t(".camera_caption", p).each(function () {
        t(this).wrapInner("<div />")
      });
      var g = "pie_" + p.index(), v = t(".camera_src", p), y = t(".camera_target", p),
        w = t(".camera_target_content", p), b = t(".camera_pie", p), _ = t(".camera_bar", p), x = t(".camera_prev", p),
        C = t(".camera_next", p), S = t(".camera_commands", p), T = t(".camera_pag", p),
        k = t(".camera_thumbs_cont", p), $ = new Array;
      t("> div", v).each(function () {
        $.push(t(this).attr("data-src"))
      });
      var E = new Array;
      t("> div", v).each(function () {
        t(this).attr("data-link") ? E.push(t(this).attr("data-link")) : E.push("")
      });
      var P = new Array;
      t("> div", v).each(function () {
        t(this).attr("data-target") ? P.push(t(this).attr("data-target")) : P.push("")
      });
      var I = new Array;
      t("> div", v).each(function () {
        t(this).attr("data-portrait") ? I.push(t(this).attr("data-portrait")) : I.push("")
      });
      var L = new Array;
      t("> div", v).each(function () {
        t(this).attr("data-alignment") ? L.push(t(this).attr("data-alignment")) : L.push("")
      });
      var z = new Array;
      t("> div", v).each(function () {
        t(this).attr("data-thumb") ? z.push(t(this).attr("data-thumb")) : z.push("")
      });
      var M = $.length;
      t(w).append('<div class="cameraContents" />');
      var O;
      for (O = 0; O < M; O++) if (t(".cameraContents", w).append('<div class="cameraContent" />'), "" != E[O]) {
        var D = t("> div ", v).eq(O).attr("data-box");
        D = void 0 !== D && !1 !== D && "" != D ? 'data-box="' + t("> div ", v).eq(O).attr("data-box") + '"' : "", t(".camera_target_content .cameraContent:eq(" + O + ")", p).append('<a class="camera_link" href="' + E[O] + '" ' + D + ' target="' + P[O] + '"></a>')
      }
      t(".camera_caption", p).each(function () {
        var e = t(this).parent().index(), i = p.find(".cameraContent").eq(e);
        t(this).appendTo(i)
      }), y.append('<div class="cameraCont" />');
      var A, H = t(".cameraCont", p);
      for (A = 0; A < M; A++) {
        H.append('<div class="cameraSlide cameraSlide_' + A + '" />');
        var j = t("> div:eq(" + A + ")", v);
        y.find(".cameraSlide_" + A).clone(j)
      }
      t(window).bind("load resize pageshow", function () {
        l(), n()
      }), H.append('<div class="cameraSlide cameraSlide_' + A + '" />');
      var W;
      p.show();
      var F, R = y.width(), N = y.height();
      t(window).bind("resize pageshow", function () {
        1 == W && o(), t("ul", k).animate({"margin-top": 0}, 0, l), v.hasClass("paused") || (v.addClass("paused"), t(".camera_stop", Z).length ? (t(".camera_stop", Z).hide(), t(".camera_play", Z).show(), "none" != m && t("#" + g).hide()) : "none" != m && t("#" + g).hide(), clearTimeout(F), F = setTimeout(function () {
          v.removeClass("paused"), t(".camera_play", Z).length ? (t(".camera_play", Z).hide(), t(".camera_stop", Z).show(), "none" != m && t("#" + g).fadeIn()) : "none" != m && t("#" + g).fadeIn()
        }, 1500))
      });
      var B, q, Q, U, Y, X;
      if (0 == (Q = s() && "" != e.mobileAutoAdvance ? e.mobileAutoAdvance : e.autoAdvance) && v.addClass("paused"), U = s() && "" != e.mobileNavHover ? e.mobileNavHover : e.navigationHover, 0 != v.length) {
        var V = t(".cameraSlide", y);
        V.wrapInner('<div class="camerarelative" />');
        var G = e.barDirection, Z = p;
        t("iframe", u).each(function () {
          var e = t(this), i = e.attr("src");
          e.attr("data-src", i);
          var s = e.parent().index(".camera_src > div");
          t(".camera_target_content .cameraContent:eq(" + s + ")", p).append(e)
        }), a(), 1 == e.hover && (s() || u.hover(function () {
          v.addClass("hovered")
        }, function () {
          v.removeClass("hovered")
        })), 1 == U && (t(x, p).animate({opacity: 0}, 0), t(C, p).animate({opacity: 0}, 0), t(S, p).animate({opacity: 0}, 0), s() ? (t(document).on("vmouseover", f, function () {
          t(x, p).animate({opacity: 1}, 200), t(C, p).animate({opacity: 1}, 200), t(S, p).animate({opacity: 1}, 200)
        }), t(document).on("vmouseout", f, function () {
          t(x, p).delay(500).animate({opacity: 0}, 200), t(C, p).delay(500).animate({opacity: 0}, 200), t(S, p).delay(500).animate({opacity: 0}, 200)
        })) : u.hover(function () {
          t(x, p).animate({opacity: 1}, 200), t(C, p).animate({opacity: 1}, 200), t(S, p).animate({opacity: 1}, 200)
        }, function () {
          t(x, p).animate({opacity: 0}, 200), t(C, p).animate({opacity: 0}, 200), t(S, p).animate({opacity: 0}, 200)
        })), Z.on("click", ".camera_stop", function () {
          Q = !1, v.addClass("paused"), t(".camera_stop", Z).length ? (t(".camera_stop", Z).hide(), t(".camera_play", Z).show(), "none" != m && t("#" + g).hide()) : "none" != m && t("#" + g).hide()
        }), Z.on("click", ".camera_play", function () {
          Q = !0, v.removeClass("paused"), t(".camera_play", Z).length ? (t(".camera_play", Z).hide(), t(".camera_stop", Z).show(), "none" != m && t("#" + g).show()) : "none" != m && t("#" + g).show()
        }), 1 == e.pauseOnClick && t(".camera_target_content", u).mouseup(function () {
          Q = !1, v.addClass("paused"), t(".camera_stop", Z).hide(), t(".camera_play", Z).show(), t("#" + g).hide()
        }), t(".cameraContent, .imgFake", u).hover(function () {
          Y = !0
        }, function () {
          Y = !1
        }), t(".cameraContent, .imgFake", u).bind("click", function () {
          1 == X && 1 == Y && (Q = !1, t(".camera_caption", u).hide(), v.addClass("paused"), t(".camera_stop", Z).hide(), t(".camera_play", Z).show(), t("#" + g).hide())
        })
      }
      if ("pie" != m) {
        switch (_.append('<span class="camera_bar_cont" />'), t(".camera_bar_cont", _).animate({opacity: e.loaderOpacity}, 0).css({
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          "background-color": e.loaderBgColor
        }).append('<span id="' + g + '" />'), t("#" + g).animate({opacity: 0}, 0), (K = t("#" + g)).css({
          position: "absolute",
          "background-color": e.loaderColor
        }), e.barPosition) {
          case"left":
            _.css({right: "auto", width: e.loaderStroke});
            break;
          case"right":
            _.css({left: "auto", width: e.loaderStroke});
            break;
          case"top":
            _.css({bottom: "auto", height: e.loaderStroke});
            break;
          case"bottom":
            _.css({top: "auto", height: e.loaderStroke})
        }
        switch (G) {
          case"leftToRight":
          case"rightToLeft":
            K.css({left: 0, right: 0, top: e.loaderPadding, bottom: e.loaderPadding});
            break;
          case"topToBottom":
          case"bottomToTop":
            K.css({left: e.loaderPadding, right: e.loaderPadding, top: 0, bottom: 0})
        }
      } else {
        b.append('<canvas id="' + g + '"></canvas>');
        var K = document.getElementById(g);
        K.setAttribute("width", e.pieDiameter), K.setAttribute("height", e.pieDiameter);
        var J;
        switch (e.piePosition) {
          case"leftTop":
            J = "left:0; top:0;";
            break;
          case"rightTop":
            J = "right:0; top:0;";
            break;
          case"leftBottom":
            J = "left:0; bottom:0;";
            break;
          case"rightBottom":
            J = "right:0; bottom:0;"
        }
        K.setAttribute("style", "position:absolute; z-index:1002; " + J);
        var tt, et;
        if (K && K.getContext) {
          var it = K.getContext("2d");
          it.rotate(1.5 * Math.PI), it.translate(-e.pieDiameter, 0)
        }
      }
      if ("none" != m && 0 != Q || (t("#" + g).hide(), t(".camera_canvas_wrap", Z).hide()), t(T).length) {
        t(T).append('<ul class="camera_pag_ul" />');
        var st;
        for (st = 0; st < M; st++) t(".camera_pag_ul", p).append('<li class="pag_nav_' + st + '" style="position:relative; z-index:1002"><span><span>' + st + "</span></span></li>");
        t(".camera_pag_ul li", p).hover(function () {
          if (t(this).addClass("camera_hover"), t(".camera_thumb", this).length) {
            var e = t(".camera_thumb", this).outerWidth(), i = t(".camera_thumb", this).outerHeight(),
              s = t(this).outerWidth();
            t(".camera_thumb", this).show().css({
              top: "-" + i + "px",
              left: "-" + (e - s) / 2 + "px"
            }).animate({opacity: 1, "margin-top": "-3px"}, 200), t(".thumb_arrow", this).show().animate({
              opacity: 1,
              "margin-top": "-3px"
            }, 200)
          }
        }, function () {
          t(this).removeClass("camera_hover"), t(".camera_thumb", this).animate({
            "margin-top": "-20px",
            opacity: 0
          }, 200, function () {
            t(this).css({marginTop: "5px"}).hide()
          }), t(".thumb_arrow", this).animate({"margin-top": "-20px", opacity: 0}, 200, function () {
            t(this).css({marginTop: "5px"}).hide()
          })
        })
      }
      if (t(k).length) {
        t(T).length ? (t.each(z, function (e, i) {
          if ("" != t("> div", v).eq(e).attr("data-thumb")) {
            var s = t("> div", v).eq(e).attr("data-thumb"), n = new Image;
            n.src = s, t("li.pag_nav_" + e, T).append(t(n).attr("class", "camera_thumb").css({position: "absolute"}).animate({opacity: 0}, 0)), t("li.pag_nav_" + e + " > img", T).after('<div class="thumb_arrow" />'), t("li.pag_nav_" + e + " > .thumb_arrow", T).animate({opacity: 0}, 0)
          }
        }), p.css({marginBottom: t(T).outerHeight()})) : (t(k).append("<div />"), t(k).before('<div class="camera_prevThumbs hideNav"><div></div></div>').before('<div class="camera_nextThumbs hideNav"><div></div></div>'), t("> div", k).append("<ul />"), t.each(z, function (e, i) {
          if ("" != t("> div", v).eq(e).attr("data-thumb")) {
            var s = t("> div", v).eq(e).attr("data-thumb"), n = new Image;
            n.src = s, t("ul", k).append('<li class="pix_thumb pix_thumb_' + e + '" />'), t("li.pix_thumb_" + e, k).append(t(n).attr("class", "camera_thumb"))
          }
        }))
      } else !t(k).length && t(T).length && p.css({marginBottom: t(T).outerHeight()});
      var nt = !0;
      t(S).length && (t(S).append('<div class="camera_play"></div>').append('<div class="camera_stop"></div>'), 1 == Q ? (t(".camera_play", Z).hide(), t(".camera_stop", Z).show()) : (t(".camera_stop", Z).hide(), t(".camera_play", Z).show())), c(), t(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom", u).each(function () {
        t(this).css("visibility", "hidden")
      }), e.onStartLoading.call(this), d(), t(x).length && t(x).click(function () {
        if (!v.hasClass("camerasliding")) {
          var i = parseFloat(t(".cameraSlide.cameracurrent", y).index());
          clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", p).animate({opacity: 0}, 0), c(), d(0 != i ? i : M), e.onStartLoading.call(this)
        }
      }), t(C).length && t(C).click(function () {
        if (!v.hasClass("camerasliding")) {
          var i = parseFloat(t(".cameraSlide.cameracurrent", y).index());
          clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 0), c(), d(i == M - 1 ? 1 : i + 2), e.onStartLoading.call(this)
        }
      }), s() && (u.bind("swipeleft", function (i) {
        if (!v.hasClass("camerasliding")) {
          var s = parseFloat(t(".cameraSlide.cameracurrent", y).index());
          clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 0), c(), d(s == M - 1 ? 1 : s + 2), e.onStartLoading.call(this)
        }
      }), u.bind("swiperight", function (i) {
        if (!v.hasClass("camerasliding")) {
          var s = parseFloat(t(".cameraSlide.cameracurrent", y).index());
          clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 0), c(), d(0 != s ? s : M), e.onStartLoading.call(this)
        }
      })), t(T).length && t(".camera_pag li", p).click(function () {
        if (!v.hasClass("camerasliding")) {
          var i = parseFloat(t(this).index());
          i != parseFloat(t(".cameraSlide.cameracurrent", y).index()) && (clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 0), c(), d(i + 1), e.onStartLoading.call(this))
        }
      }), t(k).length && (t(".pix_thumb img", k).click(function () {
        if (!v.hasClass("camerasliding")) {
          var i = parseFloat(t(this).parents("li").index());
          i != parseFloat(t(".cameracurrent", y).index()) && (clearInterval(B), a(), t("#" + g + ", .camera_canvas_wrap", Z).animate({opacity: 0}, 0), t(".pix_thumb", k).removeClass("cameracurrent"), t(this).parents("li").addClass("cameracurrent"), c(), d(i + 1), l(), e.onStartLoading.call(this))
        }
      }), t(".camera_thumbs_cont .camera_prevThumbs", Z).hover(function () {
        t(this).stop(!0, !1).animate({opacity: 1}, 250)
      }, function () {
        t(this).stop(!0, !1).animate({opacity: .7}, 250)
      }), t(".camera_prevThumbs", Z).click(function () {
        var e = 0, i = (t(k).outerWidth(), t("ul", k).offset().left), s = t("> div", k).offset().left - i;
        t(".camera_visThumb", k).each(function () {
          var i = t(this).outerWidth();
          e += i
        }), s - e > 0 ? t("ul", k).animate({"margin-left": "-" + (s - e) + "px"}, 500, n) : t("ul", k).animate({"margin-left": 0}, 500, n)
      }), t(".camera_thumbs_cont .camera_nextThumbs", Z).hover(function () {
        t(this).stop(!0, !1).animate({opacity: 1}, 250)
      }, function () {
        t(this).stop(!0, !1).animate({opacity: .7}, 250)
      }), t(".camera_nextThumbs", Z).click(function () {
        var e = 0, i = t(k).outerWidth(), s = t("ul", k).outerWidth(), o = t("ul", k).offset().left,
          a = t("> div", k).offset().left - o;
        t(".camera_visThumb", k).each(function () {
          var i = t(this).outerWidth();
          e += i
        }), a + e + e < s ? t("ul", k).animate({"margin-left": "-" + (a + e) + "px"}, 500, n) : t("ul", k).animate({"margin-left": "-" + (s - i) + "px"}, 500, n)
      }))
    }
  }(jQuery), function (t) {
    t.fn.cameraStop = function () {
      var e = t(this), i = t(".camera_src", e);
      e.index();
      if (i.addClass("stopped"), t(".camera_showcommands").length) t(".camera_thumbs_wrap", e); else ;
    }
  }(jQuery), function (t) {
    t.fn.cameraPause = function () {
      var e = t(this);
      t(".camera_src", e).addClass("paused")
    }
  }(jQuery), function (t) {
    t.fn.cameraResume = function () {
      var e = t(this), i = t(".camera_src", e);
      "undefined" != typeof autoAdv && !0 === autoAdv || i.removeClass("paused")
    }
  }(jQuery), function () {
    function t() {
      I.keyboardSupport && u("keydown", o)
    }
    
    function e() {
      if (!O && document.body) {
        O = !0;
        var e = document.body, i = document.documentElement, s = window.innerHeight, n = e.scrollHeight;
        if (D = document.compatMode.indexOf("CSS") >= 0 ? i : e, S = e, t(), top != self) z = !0; else if (n > s && (e.offsetHeight <= s || i.offsetHeight <= s)) {
          var o = document.createElement("div");
          o.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + D.scrollHeight + "px", document.body.appendChild(o);
          var a;
          k = function () {
            a || (a = setTimeout(function () {
              L || (o.style.height = "0", o.style.height = D.scrollHeight + "px", a = null)
            }, 500))
          }, setTimeout(k, 10), u("resize", k);
          var r = {attributes: !0, childList: !0, characterData: !1};
          if ((T = new U(k)).observe(e, r), D.offsetHeight <= s) {
            var l = document.createElement("div");
            l.style.clear = "both", e.appendChild(l)
          }
        }
        I.fixedBackground || L || (e.style.backgroundAttachment = "scroll", i.style.backgroundAttachment = "scroll")
      }
    }
    
    function i() {
      T && T.disconnect(), f(q, n), f("mousedown", a), f("keydown", o), f("resize", k), f("load", e)
    }
    
    function s(t, e, i) {
      if (g(e, i), 1 != I.accelerationMax) {
        var s = Date.now() - R;
        if (s < I.accelerationDelta) {
          var n = (1 + 50 / s) / 2;
          n > 1 && (n = Math.min(n, I.accelerationMax), e *= n, i *= n)
        }
        R = Date.now()
      }
      if (W.push({x: e, y: i, lastX: 0 > e ? .99 : -.99, lastY: 0 > i ? .99 : -.99, start: Date.now()}), !F) {
        var o = t === document.body, a = function (s) {
          for (var n = Date.now(), r = 0, l = 0, c = 0; c < W.length; c++) {
            var d = W[c], h = n - d.start, p = h >= I.animationTime, u = p ? 1 : h / I.animationTime;
            I.pulseAlgorithm && (u = x(u));
            var f = d.x * u - d.lastX >> 0, m = d.y * u - d.lastY >> 0;
            r += f, l += m, d.lastX += f, d.lastY += m, p && (W.splice(c, 1), c--)
          }
          o ? window.scrollBy(r, l) : (r && (t.scrollLeft += r), l && (t.scrollTop += l)), e || i || (W = []), W.length ? Q(a, t, 1e3 / I.frameRate + 1) : F = !1
        };
        Q(a, t, 0), F = !0
      }
    }
    
    function n(t) {
      O || e();
      var i = t.target, n = c(i);
      if (!n || t.defaultPrevented || t.ctrlKey) return !0;
      if (m(S, "embed") || m(i, "embed") && /\.pdf/i.test(i.src) || m(S, "object")) return !0;
      var o = -t.wheelDeltaX || t.deltaX || 0, a = -t.wheelDeltaY || t.deltaY || 0;
      return H && (t.wheelDeltaX && y(t.wheelDeltaX, 120) && (o = t.wheelDeltaX / Math.abs(t.wheelDeltaX) * -120), t.wheelDeltaY && y(t.wheelDeltaY, 120) && (a = t.wheelDeltaY / Math.abs(t.wheelDeltaY) * -120)), o || a || (a = -t.wheelDelta || 0), 1 === t.deltaMode && (o *= 40, a *= 40), !(I.touchpadSupport || !v(a)) || (Math.abs(o) > 1.2 && (o *= I.stepSize / 120), Math.abs(a) > 1.2 && (a *= I.stepSize / 120), s(n, o, a), t.preventDefault(), void r())
    }
    
    function o(t) {
      var e = t.target, i = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== j.spacebar;
      document.contains(S) || (S = document.activeElement);
      var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
      if (/^(textarea|select|embed|object)$/i.test(e.nodeName) || m(e, "input") && !n.test(e.type) || m(S, "video") || b(t) || e.isContentEditable || t.defaultPrevented || i) return !0;
      if ((m(e, "button") || m(e, "input") && n.test(e.type)) && t.keyCode === j.spacebar) return !0;
      var o = 0, a = 0, l = c(S), d = l.clientHeight;
      switch (l == document.body && (d = window.innerHeight), t.keyCode) {
        case j.up:
          a = -I.arrowScroll;
          break;
        case j.down:
          a = I.arrowScroll;
          break;
        case j.spacebar:
          a = -(t.shiftKey ? 1 : -1) * d * .9;
          break;
        case j.pageup:
          a = .9 * -d;
          break;
        case j.pagedown:
          a = .9 * d;
          break;
        case j.home:
          a = -l.scrollTop;
          break;
        case j.end:
          var h = l.scrollHeight - l.scrollTop - d;
          a = h > 0 ? h + 10 : 0;
          break;
        case j.left:
          o = -I.arrowScroll;
          break;
        case j.right:
          o = I.arrowScroll;
          break;
        default:
          return !0
      }
      s(l, o, a), t.preventDefault(), r()
    }
    
    function a(t) {
      S = t.target
    }
    
    function r() {
      clearTimeout($), $ = setInterval(function () {
        B = {}
      }, 1e3)
    }
    
    function l(t, e) {
      for (var i = t.length; i--;) B[N(t[i])] = e;
      return e
    }
    
    function c(t) {
      var e = [], i = document.body, s = D.scrollHeight;
      do {
        var n = B[N(t)];
        if (n) return l(e, n);
        if (e.push(t), s === t.scrollHeight) {
          var o = h(D) && h(i) || p(D);
          if (z && d(D) || !z && o) return l(e, Y())
        } else if (d(t) && p(t)) return l(e, t)
      } while (t = t.parentElement)
    }
    
    function d(t) {
      return t.clientHeight + 10 < t.scrollHeight
    }
    
    function h(t) {
      return "hidden" !== getComputedStyle(t, "").getPropertyValue("overflow-y")
    }
    
    function p(t) {
      var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
      return "scroll" === e || "auto" === e
    }
    
    function u(t, e) {
      window.addEventListener(t, e, !1)
    }
    
    function f(t, e) {
      window.removeEventListener(t, e, !1)
    }
    
    function m(t, e) {
      return (t.nodeName || "").toLowerCase() === e.toLowerCase()
    }
    
    function g(t, e) {
      t = t > 0 ? 1 : -1, e = e > 0 ? 1 : -1, (M.x !== t || M.y !== e) && (M.x = t, M.y = e, W = [], R = 0)
    }
    
    function v(t) {
      return t ? (A.length || (A = [t, t, t]), t = Math.abs(t), A.push(t), A.shift(), clearTimeout(E), E = setTimeout(function () {
        window.localStorage && (localStorage.SS_deltaBuffer = A.join(","))
      }, 1e3), !w(120) && !w(100)) : void 0
    }
    
    function y(t, e) {
      return Math.floor(t / e) == t / e
    }
    
    function w(t) {
      return y(A[0], t) && y(A[1], t) && y(A[2], t)
    }
    
    function b(t) {
      var e = t.target, i = !1;
      if (-1 != document.URL.indexOf("www.youtube.com/watch")) do {
        if (i = e.classList && e.classList.contains("html5-video-controls")) break
      } while (e = e.parentNode);
      return i
    }
    
    function _(t) {
      var e, i, s;
      return t *= I.pulseScale, 1 > t ? e = t - (1 - Math.exp(-t)) : (i = Math.exp(-1), t -= 1, s = 1 - Math.exp(-t), e = i + s * (1 - i)), e * I.pulseNormalize
    }
    
    function x(t) {
      return t >= 1 ? 1 : 0 >= t ? 0 : (1 == I.pulseNormalize && (I.pulseNormalize /= _(1)), _(t))
    }
    
    function C(t) {
      for (var e in t) P.hasOwnProperty(e) && (I[e] = t[e])
    }
    
    var S, T, k, $, E, P = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !1,
        fixedBackground: !0,
        excluded: ""
      }, I = P, L = !1, z = !1, M = {x: 0, y: 0}, O = !1, D = document.documentElement, A = [],
      H = /^Mac/.test(navigator.platform),
      j = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36}, W = [],
      F = !1, R = Date.now(), N = function () {
        var t = 0;
        return function (e) {
          return e.uniqueID || (e.uniqueID = t++)
        }
      }(), B = {};
    window.localStorage && localStorage.SS_deltaBuffer && (A = localStorage.SS_deltaBuffer.split(","));
    var q, Q = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t, e, i) {
          window.setTimeout(t, i || 1e3 / 60)
        }
      }(), U = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, Y = function () {
        var t;
        return function () {
          if (!t) {
            var e = document.createElement("div");
            e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
            var i = document.body.scrollTop;
            document.documentElement.scrollTop, window.scrollBy(0, 3), t = document.body.scrollTop != i ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
          }
          return t
        }
      }(), X = window.navigator.userAgent, V = /Edge/.test(X), G = /chrome/i.test(X) && !V, Z = /safari/i.test(X) && !V,
      K = /mobile/i.test(X), J = (G || Z) && !K;
    "onwheel" in document.createElement("div") ? q = "wheel" : "onmousewheel" in document.createElement("div") && (q = "mousewheel"), q && J && (u(q, n), u("mousedown", a), u("load", e)), C.destroy = i, window.SmoothScrollOptions && C(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
      return C
    }) : "object" == typeof exports ? module.exports = C : window.SmoothScroll = C
  }(), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
  "use strict";
  
  function e() {
    var t = document.createElement("bootstrap"), e = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };
    for (var i in e) if (void 0 !== t.style[i]) return {end: e[i]};
    return !1
  }
  
  t.fn.emulateTransitionEnd = function (e) {
    var i = !1, s = this;
    t(this).one("bsTransitionEnd", function () {
      i = !0
    });
    var n = function () {
      i || t(s).trigger(t.support.transition.end)
    };
    return setTimeout(n, e), this
  }, t(function () {
    t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
      bindType: t.support.transition.end,
      delegateType: t.support.transition.end,
      handle: function (e) {
        return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
      }
    })
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var i = t(this), n = i.data("bs.alert");
      n || i.data("bs.alert", n = new s(this)), "string" == typeof e && n[e].call(i)
    })
  }
  
  var i = '[data-dismiss="alert"]', s = function (e) {
    t(e).on("click", i, this.close)
  };
  s.VERSION = "3.2.0", s.prototype.close = function (e) {
    function i() {
      o.detach().trigger("closed.bs.alert").remove()
    }
    
    var s = t(this), n = s.attr("data-target");
    n || (n = s.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
    var o = t(n);
    e && e.preventDefault(), o.length || (o = s.hasClass("alert") ? s : s.parent()), o.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(150) : i())
  };
  var n = t.fn.alert;
  t.fn.alert = e, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function () {
    return t.fn.alert = n, this
  }, t(document).on("click.bs.alert.data-api", i, s.prototype.close)
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.button"), o = "object" == typeof e && e;
      n || s.data("bs.button", n = new i(this, o)), "toggle" == e ? n.toggle() : e && n.setState(e)
    })
  }
  
  var i = function (e, s) {
    this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, s), this.isLoading = !1
  };
  i.VERSION = "3.2.0", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
    var i = "disabled", s = this.$element, n = s.is("input") ? "val" : "html", o = s.data();
    e += "Text", null == o.resetText && s.data("resetText", s[n]()), s[n](null == o[e] ? this.options[e] : o[e]), setTimeout(t.proxy(function () {
      "loadingText" == e ? (this.isLoading = !0, s.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, s.removeClass(i).removeAttr(i))
    }, this), 0)
  }, i.prototype.toggle = function () {
    var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
    if (e.length) {
      var i = this.$element.find("input");
      "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
    }
    t && this.$element.toggleClass("active")
  };
  var s = t.fn.button;
  t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
    return t.fn.button = s, this
  }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
    var s = t(i.target);
    s.hasClass("btn") || (s = s.closest(".btn")), e.call(s, "toggle"), i.preventDefault()
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.carousel"), o = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e),
        a = "string" == typeof e ? e : o.slide;
      n || s.data("bs.carousel", n = new i(this, o)), "number" == typeof e ? n.to(e) : a ? n[a]() : o.interval && n.pause().cycle()
    })
  }
  
  var i = function (e, i) {
    this.$element = t(e).on("keydown.bs.carousel", t.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
  };
  i.VERSION = "3.2.0", i.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, i.prototype.keydown = function (t) {
    switch (t.which) {
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
      default:
        return
    }
    t.preventDefault()
  }, i.prototype.cycle = function (e) {
    return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
  }, i.prototype.getItemIndex = function (t) {
    return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
  }, i.prototype.to = function (e) {
    var i = this, s = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
      i.to(e)
    }) : s == e ? this.pause().cycle() : this.slide(e > s ? "next" : "prev", t(this.$items[e]))
  }, i.prototype.pause = function (e) {
    return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, i.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next")
  }, i.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev")
  }, i.prototype.slide = function (e, i) {
    var s = this.$element.find(".item.active"), n = i || s[e](), o = this.interval, a = "next" == e ? "left" : "right",
      r = "next" == e ? "first" : "last", l = this;
    if (!n.length) {
      if (!this.options.wrap) return;
      n = this.$element.find(".item")[r]()
    }
    if (n.hasClass("active")) return this.sliding = !1;
    var c = n[0], d = t.Event("slide.bs.carousel", {relatedTarget: c, direction: a});
    if (this.$element.trigger(d), !d.isDefaultPrevented()) {
      if (this.sliding = !0, o && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var h = t(this.$indicators.children()[this.getItemIndex(n)]);
        h && h.addClass("active")
      }
      var p = t.Event("slid.bs.carousel", {relatedTarget: c, direction: a});
      return t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, s.addClass(a), n.addClass(a), s.one("bsTransitionEnd", function () {
        n.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function () {
          l.$element.trigger(p)
        }, 0)
      }).emulateTransitionEnd(1e3 * s.css("transition-duration").slice(0, -1))) : (s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger(p)), o && this.cycle(), this
    }
  };
  var s = t.fn.carousel;
  t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
    return t.fn.carousel = s, this
  }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (i) {
    var s, n = t(this), o = t(n.attr("data-target") || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
    if (o.hasClass("carousel")) {
      var a = t.extend({}, o.data(), n.data()), r = n.attr("data-slide-to");
      r && (a.interval = !1), e.call(o, a), r && o.data("bs.carousel").to(r), i.preventDefault()
    }
  }), t(window).on("load", function () {
    t('[data-ride="carousel"]').each(function () {
      var i = t(this);
      e.call(i, i.data())
    })
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.collapse"), o = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
      !n && o.toggle && "show" == e && (e = !e), n || s.data("bs.collapse", n = new i(this, o)), "string" == typeof e && n[e]()
    })
  }
  
  var i = function (e, s) {
    this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, s), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
  };
  i.VERSION = "3.2.0", i.DEFAULTS = {toggle: !0}, i.prototype.dimension = function () {
    return this.$element.hasClass("width") ? "width" : "height"
  }, i.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var i = t.Event("show.bs.collapse");
      if (this.$element.trigger(i), !i.isDefaultPrevented()) {
        var s = this.$parent && this.$parent.find("> .panel > .in");
        if (s && s.length) {
          var n = s.data("bs.collapse");
          if (n && n.transitioning) return;
          e.call(s, "hide"), n || s.data("bs.collapse", null)
        }
        var o = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
        var a = function () {
          this.$element.removeClass("collapsing").addClass("collapse in")[o](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if (!t.support.transition) return a.call(this);
        var r = t.camelCase(["scroll", o].join("-"));
        this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(350)[o](this.$element[0][r])
      }
    }
  }, i.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var e = t.Event("hide.bs.collapse");
      if (this.$element.trigger(e), !e.isDefaultPrevented()) {
        var i = this.dimension();
        this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var s = function () {
          this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(350) : s.call(this)
      }
    }
  }, i.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  };
  var s = t.fn.collapse;
  t.fn.collapse = e, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function () {
    return t.fn.collapse = s, this
  }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
    var s, n = t(this),
      o = n.attr("data-target") || i.preventDefault() || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""),
      a = t(o), r = a.data("bs.collapse"), l = r ? "toggle" : n.data(), c = n.attr("data-parent"), d = c && t(c);
    r && r.transitioning || (d && d.find('[data-toggle="collapse"][data-parent="' + c + '"]').not(n).addClass("collapsed"), n[a.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), e.call(a, l)
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    e && 3 === e.which || (t(n).remove(), t(o).each(function () {
      var s = i(t(this)), n = {relatedTarget: this};
      s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", n)), e.isDefaultPrevented() || s.removeClass("open").trigger("hidden.bs.dropdown", n))
    }))
  }
  
  function i(e) {
    var i = e.attr("data-target");
    i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
    var s = i && t(i);
    return s && s.length ? s : e.parent()
  }
  
  function s(e) {
    return this.each(function () {
      var i = t(this), s = i.data("bs.dropdown");
      s || i.data("bs.dropdown", s = new a(this)), "string" == typeof e && s[e].call(i)
    })
  }
  
  var n = ".dropdown-backdrop", o = '[data-toggle="dropdown"]', a = function (e) {
    t(e).on("click.bs.dropdown", this.toggle)
  };
  a.VERSION = "3.2.0", a.prototype.toggle = function (s) {
    var n = t(this);
    if (!n.is(".disabled, :disabled")) {
      var o = i(n), a = o.hasClass("open");
      if (e(), !a) {
        "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
        var r = {relatedTarget: this};
        if (o.trigger(s = t.Event("show.bs.dropdown", r)), s.isDefaultPrevented()) return;
        n.trigger("focus"), o.toggleClass("open").trigger("shown.bs.dropdown", r)
      }
      return !1
    }
  }, a.prototype.keydown = function (e) {
    if (/(38|40|27)/.test(e.keyCode)) {
      var s = t(this);
      if (e.preventDefault(), e.stopPropagation(), !s.is(".disabled, :disabled")) {
        var n = i(s), a = n.hasClass("open");
        if (!a || a && 27 == e.keyCode) return 27 == e.which && n.find(o).trigger("focus"), s.trigger("click");
        var r = " li:not(.divider):visible a", l = n.find('[role="menu"]' + r + ', [role="listbox"]' + r);
        if (l.length) {
          var c = l.index(l.filter(":focus"));
          38 == e.keyCode && c > 0 && c--, 40 == e.keyCode && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
        }
      }
    }
  };
  var r = t.fn.dropdown;
  t.fn.dropdown = s, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function () {
    return t.fn.dropdown = r, this
  }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
    t.stopPropagation()
  }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o + ', [role="menu"], [role="listbox"]', a.prototype.keydown)
}(jQuery), function (t) {
  "use strict";
  
  function e(e, s) {
    return this.each(function () {
      var n = t(this), o = n.data("bs.modal"), a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
      o || n.data("bs.modal", o = new i(this, a)), "string" == typeof e ? o[e](s) : a.show && o.show(s)
    })
  }
  
  var i = function (e, i) {
    this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  i.VERSION = "3.2.0", i.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, i.prototype.toggle = function (t) {
    return this.isShown ? this.hide() : this.show(t)
  }, i.prototype.show = function (e) {
    var i = this, s = t.Event("show.bs.modal", {relatedTarget: e});
    this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
      var s = t.support.transition && i.$element.hasClass("fade");
      i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), s && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), i.enforceFocus();
      var n = t.Event("shown.bs.modal", {relatedTarget: e});
      s ? i.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
        i.$element.trigger("focus").trigger(n)
      }).emulateTransitionEnd(300) : i.$element.trigger("focus").trigger(n)
    }))
  }, i.prototype.hide = function (e) {
    e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
  }, i.prototype.enforceFocus = function () {
    t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
      this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
    }, this))
  }, i.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function (t) {
      27 == t.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
  }, i.prototype.hideModal = function () {
    var t = this;
    this.$element.hide(), this.backdrop(function () {
      t.$element.trigger("hidden.bs.modal")
    })
  }, i.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, i.prototype.backdrop = function (e) {
    var i = this, s = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var n = t.support.transition && s;
      if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
          t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
        }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
      n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var o = function () {
        i.removeBackdrop(), e && e()
      };
      t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", o).emulateTransitionEnd(150) : o()
    } else e && e()
  }, i.prototype.checkScrollbar = function () {
    document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
  }, i.prototype.setScrollbar = function () {
    var t = parseInt(this.$body.css("padding-right") || 0, 10);
    this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
  }, i.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", "")
  }, i.prototype.measureScrollbar = function () {
    var t = document.createElement("div");
    t.className = "modal-scrollbar-measure", this.$body.append(t);
    var e = t.offsetWidth - t.clientWidth;
    return this.$body[0].removeChild(t), e
  };
  var s = t.fn.modal;
  t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
    return t.fn.modal = s, this
  }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
    var s = t(this), n = s.attr("href"), o = t(s.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
      a = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, o.data(), s.data());
    s.is("a") && i.preventDefault(), o.one("show.bs.modal", function (t) {
      t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
        s.is(":visible") && s.trigger("focus")
      })
    }), e.call(o, a, this)
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.tooltip"), o = "object" == typeof e && e;
      (n || "destroy" != e) && (n || s.data("bs.tooltip", n = new i(this, o)), "string" == typeof e && n[e]())
    })
  }
  
  var i = function (t, e) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
  };
  i.VERSION = "3.2.0", i.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {selector: "body", padding: 0}
  }, i.prototype.init = function (e, i, s) {
    this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
    for (var n = this.options.trigger.split(" "), o = n.length; o--;) {
      var a = n[o];
      if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
        var r = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
        this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = t.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, i.prototype.getDefaults = function () {
    return i.DEFAULTS
  }, i.prototype.getOptions = function (e) {
    return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
      show: e.delay,
      hide: e.delay
    }), e
  }, i.prototype.getDelegateOptions = function () {
    var e = {}, i = this.getDefaults();
    return this._options && t.each(this._options, function (t, s) {
      i[t] != s && (e[t] = s)
    }), e
  }, i.prototype.enter = function (e) {
    var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
    return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
      "in" == i.hoverState && i.show()
    }, i.options.delay.show)) : i.show()
  }, i.prototype.leave = function (e) {
    var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
    return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
      "out" == i.hoverState && i.hide()
    }, i.options.delay.hide)) : i.hide()
  }, i.prototype.show = function () {
    var e = t.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      var i = t.contains(document.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !i) return;
      var s = this, n = this.tip(), o = this.getUID(this.type);
      this.setContent(), n.attr("id", o), this.$element.attr("aria-describedby", o), this.options.animation && n.addClass("fade");
      var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
        r = /\s?auto?\s?/i, l = r.test(a);
      l && (a = a.replace(r, "") || "top"), n.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
      var c = this.getPosition(), d = n[0].offsetWidth, h = n[0].offsetHeight;
      if (l) {
        var p = a, u = this.$element.parent(), f = this.getPosition(u);
        a = "bottom" == a && c.top + c.height + h - f.scroll > f.height ? "top" : "top" == a && c.top - f.scroll - h < 0 ? "bottom" : "right" == a && c.right + d > f.width ? "left" : "left" == a && c.left - d < f.left ? "right" : a, n.removeClass(p).addClass(a)
      }
      var m = this.getCalculatedOffset(a, c, d, h);
      this.applyPlacement(m, a);
      var g = function () {
        s.$element.trigger("shown.bs." + s.type), s.hoverState = null
      };
      t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", g).emulateTransitionEnd(150) : g()
    }
  }, i.prototype.applyPlacement = function (e, i) {
    var s = this.tip(), n = s[0].offsetWidth, o = s[0].offsetHeight, a = parseInt(s.css("margin-top"), 10),
      r = parseInt(s.css("margin-left"), 10);
    isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top = e.top + a, e.left = e.left + r, t.offset.setOffset(s[0], t.extend({
      using: function (t) {
        s.css({top: Math.round(t.top), left: Math.round(t.left)})
      }
    }, e), 0), s.addClass("in");
    var l = s[0].offsetWidth, c = s[0].offsetHeight;
    "top" == i && c != o && (e.top = e.top + o - c);
    var d = this.getViewportAdjustedDelta(i, e, l, c);
    d.left ? e.left += d.left : e.top += d.top;
    var h = d.left ? 2 * d.left - n + l : 2 * d.top - o + c, p = d.left ? "left" : "top",
      u = d.left ? "offsetWidth" : "offsetHeight";
    s.offset(e), this.replaceArrow(h, s[0][u], p)
  }, i.prototype.replaceArrow = function (t, e, i) {
    this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
  }, i.prototype.setContent = function () {
    var t = this.tip(), e = this.getTitle();
    t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
  }, i.prototype.hide = function () {
    function e() {
      "in" != i.hoverState && s.detach(), i.$element.trigger("hidden.bs." + i.type)
    }
    
    var i = this, s = this.tip(), n = t.Event("hide.bs." + this.type);
    return this.$element.removeAttr("aria-describedby"), this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), this.hoverState = null, this)
  }, i.prototype.fixTitle = function () {
    var t = this.$element;
    (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
  }, i.prototype.hasContent = function () {
    return this.getTitle()
  }, i.prototype.getPosition = function (e) {
    var i = (e = e || this.$element)[0], s = "BODY" == i.tagName;
    return t.extend({}, "function" == typeof i.getBoundingClientRect ? i.getBoundingClientRect() : null, {
      scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
      width: s ? t(window).width() : e.outerWidth(),
      height: s ? t(window).height() : e.outerHeight()
    }, s ? {top: 0, left: 0} : e.offset())
  }, i.prototype.getCalculatedOffset = function (t, e, i, s) {
    return "bottom" == t ? {top: e.top + e.height, left: e.left + e.width / 2 - i / 2} : "top" == t ? {
      top: e.top - s,
      left: e.left + e.width / 2 - i / 2
    } : "left" == t ? {top: e.top + e.height / 2 - s / 2, left: e.left - i} : {
      top: e.top + e.height / 2 - s / 2,
      left: e.left + e.width
    }
  }, i.prototype.getViewportAdjustedDelta = function (t, e, i, s) {
    var n = {top: 0, left: 0};
    if (!this.$viewport) return n;
    var o = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
    if (/right|left/.test(t)) {
      var r = e.top - o - a.scroll, l = e.top + o - a.scroll + s;
      r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
    } else {
      var c = e.left - o, d = e.left + o + i;
      c < a.left ? n.left = a.left - c : d > a.width && (n.left = a.left + a.width - d)
    }
    return n
  }, i.prototype.getTitle = function () {
    var t = this.$element, e = this.options;
    return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
  }, i.prototype.getUID = function (t) {
    do {
      t += ~~(1e6 * Math.random())
    } while (document.getElementById(t));
    return t
  }, i.prototype.tip = function () {
    return this.$tip = this.$tip || t(this.options.template)
  }, i.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, i.prototype.validate = function () {
    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
  }, i.prototype.enable = function () {
    this.enabled = !0
  }, i.prototype.disable = function () {
    this.enabled = !1
  }, i.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, i.prototype.toggle = function (e) {
    var i = this;
    e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
  }, i.prototype.destroy = function () {
    clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var s = t.fn.tooltip;
  t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
    return t.fn.tooltip = s, this
  }
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.popover"), o = "object" == typeof e && e;
      (n || "destroy" != e) && (n || s.data("bs.popover", n = new i(this, o)), "string" == typeof e && n[e]())
    })
  }
  
  var i = function (t, e) {
    this.init("popover", t, e)
  };
  if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
  i.VERSION = "3.2.0", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
    return i.DEFAULTS
  }, i.prototype.setContent = function () {
    var t = this.tip(), e = this.getTitle(), i = this.getContent();
    t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").empty()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
  }, i.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, i.prototype.getContent = function () {
    var t = this.$element, e = this.options;
    return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
  }, i.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  }, i.prototype.tip = function () {
    return this.$tip || (this.$tip = t(this.options.template)), this.$tip
  };
  var s = t.fn.popover;
  t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
    return t.fn.popover = s, this
  }
}(jQuery), function (t) {
  "use strict";
  
  function e(i, s) {
    var n = t.proxy(this.process, this);
    this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", n), this.refresh(), this.process()
  }
  
  function i(i) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.scrollspy"), o = "object" == typeof i && i;
      n || s.data("bs.scrollspy", n = new e(this, o)), "string" == typeof i && n[i]()
    })
  }
  
  e.VERSION = "3.2.0", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, e.prototype.refresh = function () {
    var e = "offset", i = 0;
    t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
    var s = this;
    this.$body.find(this.selector).map(function () {
      var s = t(this), n = s.data("target") || s.attr("href"), o = /^#./.test(n) && t(n);
      return o && o.length && o.is(":visible") && [[o[e]().top + i, n]] || null
    }).sort(function (t, e) {
      return t[0] - e[0]
    }).each(function () {
      s.offsets.push(this[0]), s.targets.push(this[1])
    })
  }, e.prototype.process = function () {
    var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(),
      s = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, o = this.targets,
      a = this.activeTarget;
    if (this.scrollHeight != i && this.refresh(), e >= s) return a != (t = o[o.length - 1]) && this.activate(t);
    if (a && e <= n[0]) return a != (t = o[0]) && this.activate(t);
    for (t = n.length; t--;) a != o[t] && e >= n[t] && (!n[t + 1] || e <= n[t + 1]) && this.activate(o[t])
  }, e.prototype.activate = function (e) {
    this.activeTarget = e, t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
      s = t(i).parents("li").addClass("active");
    s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
  };
  var s = t.fn.scrollspy;
  t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
    return t.fn.scrollspy = s, this
  }, t(window).on("load.bs.scrollspy.data-api", function () {
    t('[data-spy="scroll"]').each(function () {
      var e = t(this);
      i.call(e, e.data())
    })
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.tab");
      n || s.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
    })
  }
  
  var i = function (e) {
    this.element = t(e)
  };
  i.VERSION = "3.2.0", i.prototype.show = function () {
    var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), s = e.data("target");
    if (s || (s = e.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
      var n = i.find(".active:last a")[0], o = t.Event("show.bs.tab", {relatedTarget: n});
      if (e.trigger(o), !o.isDefaultPrevented()) {
        var a = t(s);
        this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
          e.trigger({type: "shown.bs.tab", relatedTarget: n})
        })
      }
    }
  }, i.prototype.activate = function (e, i, s) {
    function n() {
      o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), s && s()
    }
    
    var o = i.find("> .active"), a = s && t.support.transition && o.hasClass("fade");
    a ? o.one("bsTransitionEnd", n).emulateTransitionEnd(150) : n(), o.removeClass("in")
  };
  var s = t.fn.tab;
  t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
    return t.fn.tab = s, this
  }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (i) {
    i.preventDefault(), e.call(t(this), "show")
  })
}(jQuery), function (t) {
  "use strict";
  
  function e(e) {
    return this.each(function () {
      var s = t(this), n = s.data("bs.affix"), o = "object" == typeof e && e;
      n || s.data("bs.affix", n = new i(this, o)), "string" == typeof e && n[e]()
    })
  }
  
  var i = function (e, s) {
    this.options = t.extend({}, i.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
  };
  i.VERSION = "3.2.0", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
    offset: 0,
    target: window
  }, i.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(i.RESET).addClass("affix");
    var t = this.$target.scrollTop(), e = this.$element.offset();
    return this.pinnedOffset = e.top - t
  }, i.prototype.checkPositionWithEventLoop = function () {
    setTimeout(t.proxy(this.checkPosition, this), 1)
  }, i.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var e = t(document).height(), s = this.$target.scrollTop(), n = this.$element.offset(), o = this.options.offset,
        a = o.top, r = o.bottom;
      "object" != typeof o && (r = a = o), "function" == typeof a && (a = o.top(this.$element)), "function" == typeof r && (r = o.bottom(this.$element));
      var l = !(null != this.unpin && s + this.unpin <= n.top) && (null != r && n.top + this.$element.height() >= e - r ? "bottom" : null != a && a >= s && "top");
      if (this.affixed !== l) {
        null != this.unpin && this.$element.css("top", "");
        var c = "affix" + (l ? "-" + l : ""), d = t.Event(c + ".bs.affix");
        this.$element.trigger(d), d.isDefaultPrevented() || (this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(c).trigger(t.Event(c.replace("affix", "affixed"))), "bottom" == l && this.$element.offset({top: e - this.$element.height() - r}))
      }
    }
  };
  var s = t.fn.affix;
  t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
    return t.fn.affix = s, this
  }, t(window).on("load", function () {
    t('[data-spy="affix"]').each(function () {
      var i = t(this), s = i.data();
      s.offset = s.offset || {}, s.offsetBottom && (s.offset.bottom = s.offsetBottom), s.offsetTop && (s.offset.top = s.offsetTop), e.call(i, s)
    })
  })
}(jQuery), function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
  var e, i, s, n, o, a, r = "Close", l = "BeforeClose", c = "MarkupParse", d = "Open", h = "Change", p = "mfp",
    u = "." + p, f = "mfp-ready", m = "mfp-removing", g = "mfp-prevent-close", v = function () {
    }, y = !!window.jQuery, w = t(window), b = function (t, i) {
      e.ev.on(p + t + u, i)
    }, _ = function (e, i, s, n) {
      var o = document.createElement("div");
      return o.className = "mfp-" + e, s && (o.innerHTML = s), n ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
    }, x = function (i, s) {
      e.ev.triggerHandler(p + i, s), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(s) ? s : [s]))
    }, C = function (i) {
      return i === a && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), a = i), e.currTemplate.closeBtn
    }, S = function () {
      t.magnificPopup.instance || ((e = new v).init(), t.magnificPopup.instance = e)
    }, T = function () {
      var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== t.transition) return !0;
      for (; e.length;) if (e.pop() + "Transition" in t) return !0;
      return !1
    };
  v.prototype = {
    constructor: v, init: function () {
      var i = navigator.appVersion;
      e.isIE7 = -1 !== i.indexOf("MSIE 7."), e.isIE8 = -1 !== i.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = T(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = t(document), e.popupsCache = {}
    }, open: function (i) {
      var n;
      if (!1 === i.isObj) {
        e.items = i.items.toArray(), e.index = 0;
        var a, r = i.items;
        for (n = 0; n < r.length; n++) if ((a = r[n]).parsed && (a = a.el[0]), a === i.el[0]) {
          e.index = n;
          break
        }
      } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
      {
        if (!e.isOpen) {
          e.types = [], o = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = s, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = _("bg").on("click" + u, function () {
            e.close()
          }), e.wrap = _("wrap").attr("tabindex", -1).on("click" + u, function (t) {
            e._checkIfClose(t.target) && e.close()
          }), e.container = _("container", e.wrap)), e.contentContainer = _("content"), e.st.preloader && (e.preloader = _("preloader", e.container, e.st.tLoading));
          var l = t.magnificPopup.modules;
          for (n = 0; n < l.length; n++) {
            var h = l[n];
            h = h.charAt(0).toUpperCase() + h.slice(1), e["init" + h].call(e)
          }
          x("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (b(c, function (t, e, i, s) {
            i.close_replaceWith = C(s.type)
          }), o += " mfp-close-btn-in") : e.wrap.append(C())), e.st.alignTop && (o += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
            overflow: e.st.overflowY,
            overflowX: "hidden",
            overflowY: e.st.overflowY
          }) : e.wrap.css({
            top: w.scrollTop(),
            position: "absolute"
          }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
            height: s.height(),
            position: "absolute"
          }), e.st.enableEscapeKey && s.on("keyup" + u, function (t) {
            27 === t.keyCode && e.close()
          }), w.on("resize" + u, function () {
            e.updateSize()
          }), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
          var p = e.wH = w.height(), m = {};
          if (e.fixedContentPos && e._hasScrollBar(p)) {
            var g = e._getScrollbarSize();
            g && (m.marginRight = g)
          }
          e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : m.overflow = "hidden");
          var v = e.st.mainClass;
          return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), x("BuildControls"), t("html").css(m), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
            e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), s.on("focusin" + u, e._onFocusIn)
          }, 16), e.isOpen = !0, e.updateSize(p), x(d), i
        }
        e.updateItemHTML()
      }
    }, close: function () {
      e.isOpen && (x(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(m), setTimeout(function () {
        e._close()
      }, e.st.removalDelay)) : e._close())
    }, _close: function () {
      x(r);
      var i = m + " " + f + " ";
      if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
        var n = {marginRight: ""};
        e.isIE7 ? t("body, html").css("overflow", "") : n.overflow = "", t("html").css(n)
      }
      s.off("keyup.mfp focusin" + u), e.ev.off(u), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, x("AfterClose")
    }, updateSize: function (t) {
      if (e.isIOS) {
        var i = document.documentElement.clientWidth / window.innerWidth, s = window.innerHeight * i;
        e.wrap.css("height", s), e.wH = s
      } else e.wH = t || w.height();
      e.fixedContentPos || e.wrap.css("height", e.wH), x("Resize")
    }, updateItemHTML: function () {
      var i = e.items[e.index];
      e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
      var s = i.type;
      if (x("BeforeChange", [e.currItem ? e.currItem.type : "", s]), e.currItem = i, !e.currTemplate[s]) {
        var o = !!e.st[s] && e.st[s].markup;
        x("FirstMarkupParse", o), e.currTemplate[s] = !o || t(o)
      }
      n && n !== i.type && e.container.removeClass("mfp-" + n + "-holder");
      var a = e["get" + s.charAt(0).toUpperCase() + s.slice(1)](i, e.currTemplate[s]);
      e.appendContent(a, s), i.preloaded = !0, x(h, i), n = i.type, e.container.prepend(e.contentContainer), x("AfterChange")
    }, appendContent: function (t, i) {
      e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(C()) : e.content = t : e.content = "", x("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
    }, parseEl: function (i) {
      var s, n = e.items[i];
      if (n.tagName ? n = {el: t(n)} : (s = n.type, n = {data: n, src: n.src}), n.el) {
        for (var o = e.types, a = 0; a < o.length; a++) if (n.el.hasClass("mfp-" + o[a])) {
          s = o[a];
          break
        }
        n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
      }
      return n.type = s || e.st.type || "inline", n.index = i, n.parsed = !0, e.items[i] = n, x("ElementParse", n), e.items[i]
    }, addGroup: function (t, i) {
      var s = function (s) {
        s.mfpEl = this, e._openClick(s, t, i)
      };
      i || (i = {});
      var n = "click.magnificPopup";
      i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, s)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, s) : (i.items = t, t.off(n).on(n, s)))
    }, _openClick: function (i, s, n) {
      if ((void 0 !== n.midClick ? n.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
        var o = void 0 !== n.disableOn ? n.disableOn : t.magnificPopup.defaults.disableOn;
        if (o) if (t.isFunction(o)) {
          if (!o.call(e)) return !0
        } else if (w.width() < o) return !0;
        i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), n.el = t(i.mfpEl), n.delegate && (n.items = s.find(n.delegate)), e.open(n)
      }
    }, updateStatus: function (t, s) {
      if (e.preloader) {
        i !== t && e.container.removeClass("mfp-s-" + i), s || "loading" !== t || (s = e.st.tLoading);
        var n = {status: t, text: s};
        x("UpdateStatus", n), t = n.status, s = n.text, e.preloader.html(s), e.preloader.find("a").on("click", function (t) {
          t.stopImmediatePropagation()
        }), e.container.addClass("mfp-s-" + t), i = t
      }
    }, _checkIfClose: function (i) {
      if (!t(i).hasClass(g)) {
        var s = e.st.closeOnContentClick, n = e.st.closeOnBgClick;
        if (s && n) return !0;
        if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
        if (i === e.content[0] || t.contains(e.content[0], i)) {
          if (s) return !0
        } else if (n && t.contains(document, i)) return !0;
        return !1
      }
    }, _addClassToMFP: function (t) {
      e.bgOverlay.addClass(t), e.wrap.addClass(t)
    }, _removeClassFromMFP: function (t) {
      this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
    }, _hasScrollBar: function (t) {
      return (e.isIE7 ? s.height() : document.body.scrollHeight) > (t || w.height())
    }, _setFocus: function () {
      (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
    }, _onFocusIn: function (i) {
      return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
    }, _parseMarkup: function (e, i, s) {
      var n;
      s.data && (i = t.extend(s.data, i)), x(c, [e, i, s]), t.each(i, function (t, i) {
        if (void 0 === i || !1 === i) return !0;
        if ((n = t.split("_")).length > 1) {
          var s = e.find(u + "-" + n[0]);
          if (s.length > 0) {
            var o = n[1];
            "replaceWith" === o ? s[0] !== i[0] && s.replaceWith(i) : "img" === o ? s.is("img") ? s.attr("src", i) : s.replaceWith('<img src="' + i + '" class="' + s.attr("class") + '" />') : s.attr(n[1], i)
          }
        } else e.find(u + "-" + t).html(i)
      })
    }, _getScrollbarSize: function () {
      if (void 0 === e.scrollbarSize) {
        var t = document.createElement("div");
        t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
      }
      return e.scrollbarSize
    }
  }, t.magnificPopup = {
    instance: null,
    proto: v.prototype,
    modules: [],
    open: function (e, i) {
      return S(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
    },
    close: function () {
      return t.magnificPopup.instance && t.magnificPopup.instance.close()
    },
    registerModule: function (e, i) {
      i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, t.fn.magnificPopup = function (i) {
    S();
    var s = t(this);
    if ("string" == typeof i) if ("open" === i) {
      var n, o = y ? s.data("magnificPopup") : s[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
      o.items ? n = o.items[a] : (n = s, o.delegate && (n = n.find(o.delegate)), n = n.eq(a)), e._openClick({mfpEl: n}, s, o)
    } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1)); else i = t.extend(!0, {}, i), y ? s.data("magnificPopup", i) : s[0].magnificPopup = i, e.addGroup(s, i);
    return s
  };
  var k, $, E, P = "inline", I = function () {
    E && ($.after(E.addClass(k)).detach(), E = null)
  };
  t.magnificPopup.registerModule(P, {
    options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
    proto: {
      initInline: function () {
        e.types.push(P), b(r + "." + P, function () {
          I()
        })
      }, getInline: function (i, s) {
        if (I(), i.src) {
          var n = e.st.inline, o = t(i.src);
          if (o.length) {
            var a = o[0].parentNode;
            a && a.tagName && ($ || (k = n.hiddenClass, $ = _(k), k = "mfp-" + k), E = o.after($).detach().removeClass(k)), e.updateStatus("ready")
          } else e.updateStatus("error", n.tNotFound), o = t("<div>");
          return i.inlineElement = o, o
        }
        return e.updateStatus("ready"), e._parseMarkup(s, {}, i), s
      }
    }
  });
  var L, z = "ajax", M = function () {
    L && t(document.body).removeClass(L)
  }, O = function () {
    M(), e.req && e.req.abort()
  };
  t.magnificPopup.registerModule(z, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    }, proto: {
      initAjax: function () {
        e.types.push(z), L = e.st.ajax.cursor, b(r + "." + z, O), b("BeforeChange." + z, O)
      }, getAjax: function (i) {
        L && t(document.body).addClass(L), e.updateStatus("loading");
        var s = t.extend({
          url: i.src, success: function (s, n, o) {
            var a = {data: s, xhr: o};
            x("ParseAjax", a), e.appendContent(t(a.data), z), i.finished = !0, M(), e._setFocus(), setTimeout(function () {
              e.wrap.addClass(f)
            }, 16), e.updateStatus("ready"), x("AjaxContentAdded")
          }, error: function () {
            M(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
          }
        }, e.st.ajax.settings);
        return e.req = t.ajax(s), ""
      }
    }
  });
  var D, A = function (i) {
    if (i.data && void 0 !== i.data.title) return i.data.title;
    var s = e.st.image.titleSrc;
    if (s) {
      if (t.isFunction(s)) return s.call(e, i);
      if (i.el) return i.el.attr(s) || ""
    }
    return ""
  };
  t.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    }, proto: {
      initImage: function () {
        var i = e.st.image, s = ".image";
        e.types.push("image"), b(d + s, function () {
          "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
        }), b(r + s, function () {
          i.cursor && t(document.body).removeClass(i.cursor), w.off("resize" + u)
        }), b("Resize" + s, e.resizeImage), e.isLowIE && b("AfterChange", e.resizeImage)
      }, resizeImage: function () {
        var t = e.currItem;
        if (t && t.img && e.st.image.verticalFit) {
          var i = 0;
          e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
        }
      }, _onImageHasSize: function (t) {
        t.img && (t.hasSize = !0, D && clearInterval(D), t.isCheckingImgSize = !1, x("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
      }, findImageSize: function (t) {
        var i = 0, s = t.img[0], n = function (o) {
          D && clearInterval(D), D = setInterval(function () {
            return s.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(D), i++, void(3 === i ? n(10) : 40 === i ? n(50) : 100 === i && n(500)))
          }, o)
        };
        n(1)
      }, getImage: function (i, s) {
        var n = 0, o = function () {
          i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, x("ImageLoadComplete")) : (n++, 200 > n ? setTimeout(o, 100) : a()))
        }, a = function () {
          i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", r.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
        }, r = e.st.image, l = s.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", o).on("error.mfploader", a), c.src = i.src, l.is("img") && (i.img = i.img.clone()), (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
        }
        return e._parseMarkup(s, {
          title: A(i),
          img_replaceWith: i.img
        }, i), e.resizeImage(), i.hasSize ? (D && clearInterval(D), i.loadError ? (s.addClass("mfp-loading"), e.updateStatus("error", r.tError.replace("%url%", i.src))) : (s.removeClass("mfp-loading"), e.updateStatus("ready")), s) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, s.addClass("mfp-loading"), e.findImageSize(i)), s)
      }
    }
  });
  var H, j = function () {
    return void 0 === H && (H = void 0 !== document.createElement("p").style.MozTransform), H
  };
  t.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (t) {
        return t.is("img") ? t : t.find("img")
      }
    }, proto: {
      initZoom: function () {
        var t, i = e.st.zoom, s = ".zoom";
        if (i.enabled && e.supportsTransition) {
          var n, o, a = i.duration, c = function (t) {
            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
              s = "all " + i.duration / 1e3 + "s " + i.easing,
              n = {position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden"},
              o = "transition";
            return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = s, e.css(n), e
          }, d = function () {
            e.content.css("visibility", "visible")
          };
          b("BuildControls" + s, function () {
            if (e._allowZoom()) {
              if (clearTimeout(n), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void d();
              (o = c(t)).css(e._getOffset()), e.wrap.append(o), n = setTimeout(function () {
                o.css(e._getOffset(!0)), n = setTimeout(function () {
                  d(), setTimeout(function () {
                    o.remove(), t = o = null, x("ZoomAnimationEnded")
                  }, 16)
                }, a)
              }, 16)
            }
          }), b(l + s, function () {
            if (e._allowZoom()) {
              if (clearTimeout(n), e.st.removalDelay = a, !t) {
                if (!(t = e._getItemToZoom())) return;
                o = c(t)
              }
              o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function () {
                o.css(e._getOffset())
              }, 16)
            }
          }), b(r + s, function () {
            e._allowZoom() && (d(), o && o.remove(), t = null)
          })
        }
      }, _allowZoom: function () {
        return "image" === e.currItem.type
      }, _getItemToZoom: function () {
        return !!e.currItem.hasSize && e.currItem.img
      }, _getOffset: function (i) {
        var s, n = (s = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
          o = parseInt(s.css("padding-top"), 10), a = parseInt(s.css("padding-bottom"), 10);
        n.top -= t(window).scrollTop() - o;
        var r = {width: s.width(), height: (y ? s.innerHeight() : s[0].offsetHeight) - a - o};
        return j() ? r["-moz-transform"] = r.transform = "translate(" + n.left + "px," + n.top + "px)" : (r.left = n.left, r.top = n.top), r
      }
    }
  });
  var W = "iframe", F = function (t) {
    if (e.currTemplate[W]) {
      var i = e.currTemplate[W].find("iframe");
      i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"))
    }
  };
  t.magnificPopup.registerModule(W, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
        vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
        gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
      }
    }, proto: {
      initIframe: function () {
        e.types.push(W), b("BeforeChange", function (t, e, i) {
          e !== i && (e === W ? F() : i === W && F(!0))
        }), b(r + "." + W, function () {
          F()
        })
      }, getIframe: function (i, s) {
        var n = i.src, o = e.st.iframe;
        t.each(o.patterns, function () {
          return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
        });
        var a = {};
        return o.srcAction && (a[o.srcAction] = n), e._parseMarkup(s, a, i), e.updateStatus("ready"), s
      }
    }
  });
  var R = function (t) {
    var i = e.items.length;
    return t > i - 1 ? t - i : 0 > t ? i + t : t
  }, N = function (t, e, i) {
    return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
  };
  t.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    }, proto: {
      initGallery: function () {
        var i = e.st.gallery, n = ".mfp-gallery", a = Boolean(t.fn.mfpFastClick);
        return e.direction = !0, !(!i || !i.enabled) && (o += " mfp-gallery", b(d + n, function () {
          i.navigateByImgClick && e.wrap.on("click" + n, ".mfp-img", function () {
            return e.items.length > 1 ? (e.next(), !1) : void 0
          }), s.on("keydown" + n, function (t) {
            37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
          })
        }), b("UpdateStatus" + n, function (t, i) {
          i.text && (i.text = N(i.text, e.currItem.index, e.items.length))
        }), b(c + n, function (t, s, n, o) {
          var a = e.items.length;
          n.counter = a > 1 ? N(i.tCounter, o.index, a) : ""
        }), b("BuildControls" + n, function () {
          if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
            var s = i.arrowMarkup,
              n = e.arrowLeft = t(s.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g),
              o = e.arrowRight = t(s.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g),
              r = a ? "mfpFastClick" : "click";
            n[r](function () {
              e.prev()
            }), o[r](function () {
              e.next()
            }), e.isIE7 && (_("b", n[0], !1, !0), _("a", n[0], !1, !0), _("b", o[0], !1, !0), _("a", o[0], !1, !0)), e.container.append(n.add(o))
          }
        }), b(h + n, function () {
          e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
            e.preloadNearbyImages(), e._preloadTimeout = null
          }, 16)
        }), void b(r + n, function () {
          s.off(n), e.wrap.off("click" + n), e.arrowLeft && a && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
        }))
      }, next: function () {
        e.direction = !0, e.index = R(e.index + 1), e.updateItemHTML()
      }, prev: function () {
        e.direction = !1, e.index = R(e.index - 1), e.updateItemHTML()
      }, goTo: function (t) {
        e.direction = t >= e.index, e.index = t, e.updateItemHTML()
      }, preloadNearbyImages: function () {
        var t, i = e.st.gallery.preload, s = Math.min(i[0], e.items.length), n = Math.min(i[1], e.items.length);
        for (t = 1; t <= (e.direction ? n : s); t++) e._preloadItem(e.index + t);
        for (t = 1; t <= (e.direction ? s : n); t++) e._preloadItem(e.index - t)
      }, _preloadItem: function (i) {
        if (i = R(i), !e.items[i].preloaded) {
          var s = e.items[i];
          s.parsed || (s = e.parseEl(i)), x("LazyLoad", s), "image" === s.type && (s.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
            s.hasSize = !0
          }).on("error.mfploader", function () {
            s.hasSize = !0, s.loadError = !0, x("LazyLoadError", s)
          }).attr("src", s.src)), s.preloaded = !0
        }
      }
    }
  });
  var B = "retina";
  t.magnificPopup.registerModule(B, {
    options: {
      replaceSrc: function (t) {
        return t.src.replace(/\.\w+$/, function (t) {
          return "@2x" + t
        })
      }, ratio: 1
    }, proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var t = e.st.retina, i = t.ratio;
          (i = isNaN(i) ? i() : i) > 1 && (b("ImageHasSize." + B, function (t, e) {
            e.img.css({"max-width": e.img[0].naturalWidth / i, width: "100%"})
          }), b("ElementParse." + B, function (e, s) {
            s.src = t.replaceSrc(s, i)
          }))
        }
      }
    }
  }), function () {
    var e = "ontouchstart" in window, i = function () {
      w.off("touchmove" + s + " touchend" + s)
    }, s = ".mfpFastClick";
    t.fn.mfpFastClick = function (n) {
      return t(this).each(function () {
        var o, a = t(this);
        if (e) {
          var r, l, c, d, h, p;
          a.on("touchstart" + s, function (t) {
            d = !1, p = 1, h = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], l = h.clientX, c = h.clientY, w.on("touchmove" + s, function (t) {
              h = t.originalEvent ? t.originalEvent.touches : t.touches, p = h.length, h = h[0], (Math.abs(h.clientX - l) > 10 || Math.abs(h.clientY - c) > 10) && (d = !0, i())
            }).on("touchend" + s, function (t) {
              i(), d || p > 1 || (o = !0, t.preventDefault(), clearTimeout(r), r = setTimeout(function () {
                o = !1
              }, 1e3), n())
            })
          })
        }
        a.on("click" + s, function () {
          o || n()
        })
      })
    }, t.fn.destroyMfpFastClick = function () {
      t(this).off("touchstart" + s + " click" + s), e && w.off("touchmove" + s + " touchend" + s)
    }
  }(), S()
}), function (t, e, i, s) {
  function n(e, i) {
    this.settings = null, this.options = t.extend({}, n.Defaults, i), this.$element = t(e), this.drag = t.extend({}, p), this.state = t.extend({}, u), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(n.Plugins, t.proxy(function (t, e) {
      this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
    }, this)), t.each(n.Pipe, t.proxy(function (e, i) {
      this._pipe.push({filter: i.filter, run: t.proxy(i.run, this)})
    }, this)), this.setup(), this.initialize()
  }
  
  function o(t) {
    if (t.touches !== s) return {x: t.touches[0].pageX, y: t.touches[0].pageY};
    if (t.touches === s) {
      if (t.pageX !== s) return {x: t.pageX, y: t.pageY};
      if (t.pageX === s) return {x: t.clientX, y: t.clientY}
    }
  }
  
  function a(t) {
    var e, s, n = i.createElement("div"), o = t;
    for (e in o) if (s = o[e], void 0 !== n.style[s]) return n = null, [s, e];
    return [!1]
  }
  
  function r() {
    return a(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
  }
  
  function l() {
    return a(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
  }
  
  function c() {
    return a(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
  }
  
  function d() {
    return "ontouchstart" in e || !!navigator.msMaxTouchPoints
  }
  
  function h() {
    return e.navigator.msPointerEnabled
  }
  
  var p, u, f;
  p = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null
  }, u = {isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1}, f = {
    _onDragStart: null,
    _onDragMove: null,
    _onDragEnd: null,
    _transitionEnd: null,
    _resizer: null,
    _responsiveCall: null,
    _goToLoop: null,
    _checkVisibile: null
  }, n.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: e,
    responsiveClass: !1,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    themeClass: "owl-theme",
    baseClass: "owl-carousel",
    itemClass: "owl-item",
    centerClass: "center",
    activeClass: "active"
  }, n.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, n.Plugins = {}, n.Pipe = [{
    filter: ["width", "items", "settings"], run: function (t) {
      t.current = this._items && this._items[this.relative(this._current)]
    }
  }, {
    filter: ["items", "settings"], run: function () {
      var t = this._clones;
      (this.$stage.children(".cloned").length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
    }
  }, {
    filter: ["items", "settings"], run: function () {
      var t, e, i = this._clones, s = this._items,
        n = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
      for (t = 0, e = Math.abs(n / 2); e > t; t++) n > 0 ? (this.$stage.children().eq(s.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(s[i[i.length - 1]].clone().addClass("cloned")), i.push(s.length - 1 - (i.length - 1) / 2), this.$stage.prepend(s[i[i.length - 1]].clone().addClass("cloned")))
    }
  }, {
    filter: ["width", "items", "settings"], run: function () {
      var t, e, i, s = this.settings.rtl ? 1 : -1, n = (this.width() / this.settings.items).toFixed(3), o = 0;
      for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : n * t) * s, this._coordinates.push(o)
    }
  }, {
    filter: ["width", "items", "settings"], run: function () {
      var e, i, s = (this.width() / this.settings.items).toFixed(3), n = {
        width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
        "padding-left": this.settings.stagePadding || "",
        "padding-right": this.settings.stagePadding || ""
      };
      if (this.$stage.css(n), n = {width: this.settings.autoWidth ? "auto" : s - this.settings.margin}, n[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function (t) {
          return t > 1
        }).length > 0) for (e = 0, i = this._coordinates.length; i > e; e++) n.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(n); else this.$stage.children().css(n)
    }
  }, {
    filter: ["width", "items", "settings"], run: function (t) {
      t.current && this.reset(this.$stage.children().index(t.current))
    }
  }, {
    filter: ["position"], run: function () {
      this.animate(this.coordinates(this._current))
    }
  }, {
    filter: ["width", "position", "items", "settings"], run: function () {
      var t, e, i, s, n = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding,
        a = this.coordinates(this.current()) + o, r = a + this.width() * n, l = [];
      for (i = 0, s = this._coordinates.length; s > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", a) && this.op(t, ">", r) || this.op(e, "<", a) && this.op(e, ">", r)) && l.push(i);
      this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
    }
  }], n.prototype.initialize = function () {
    if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && !0 !== this.state.imagesLoaded) {
      var e, i, n;
      if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s, n = this.$element.children(i).width(), e.length && 0 >= n) return this.preloadAutoWidthImages(e), !1
    }
    this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
  }, n.prototype.setup = function () {
    var e = this.viewport(), i = this.options.responsive, s = -1, n = null;
    i ? (t.each(i, function (t) {
      e >= t && t > s && (s = Number(t))
    }), n = t.extend({}, this.options, i[s]), delete n.responsive, n.responsiveClass && this.$element.attr("class", function (t, e) {
      return e.replace(/\b owl-responsive-\S+/g, "")
    }).addClass("owl-responsive-" + s)) : n = t.extend({}, this.options), (null === this.settings || this._breakpoint !== s) && (this.trigger("change", {
      property: {
        name: "settings",
        value: n
      }
    }), this._breakpoint = s, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    }))
  }, n.prototype.optionsLogic = function () {
    this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, n.prototype.prepare = function (e) {
    var i = this.trigger("prepare", {content: e});
    return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {content: i.data}), i.data
  }, n.prototype.update = function () {
    for (var e = 0, i = this._pipe.length, s = t.proxy(function (t) {
      return this[t]
    }, this._invalidated), n = {}; i > e;) (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
    this._invalidated = {}
  }, n.prototype.width = function (t) {
    switch (t = t || n.Width.Default) {
      case n.Width.Inner:
      case n.Width.Outer:
        return this._width;
      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
  }, n.prototype.refresh = function () {
    if (0 === this._items.length) return !1;
    (new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed")
  }, n.prototype.eventsCall = function () {
    this.e._onDragStart = t.proxy(function (t) {
      this.onDragStart(t)
    }, this), this.e._onDragMove = t.proxy(function (t) {
      this.onDragMove(t)
    }, this), this.e._onDragEnd = t.proxy(function (t) {
      this.onDragEnd(t)
    }, this), this.e._onResize = t.proxy(function (t) {
      this.onResize(t)
    }, this), this.e._transitionEnd = t.proxy(function (t) {
      this.transitionEnd(t)
    }, this), this.e._preventClick = t.proxy(function (t) {
      this.preventClick(t)
    }, this)
  }, n.prototype.onThrottledResize = function () {
    e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
  }, n.prototype.onResize = function () {
    return !!this._items.length && (this._width !== this.$element.width() && (!this.trigger("resize").isDefaultPrevented() && (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized"))))
  }, n.prototype.eventsRouter = function (t) {
    var e = t.type;
    "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
  }, n.prototype.internalEvents = function () {
    var i = (d(), h());
    this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function (t) {
      this.eventsRouter(t)
    }, this)), this.$stage.on("dragstart", function () {
      return !1
    }), this.$stage.get(0).onselectstart = function () {
      return !1
    }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function (t) {
      this.eventsRouter(t)
    }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), !1 !== this.settings.responsive && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
  }, n.prototype.onDragStart = function (s) {
    var n, a, r, l;
    if (3 === (n = s.originalEvent || s || e.event).which || this.state.isTouch) return !1;
    if ("mousedown" === n.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, a = o(n).x, r = o(n).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
    this.drag.startX = a - this.drag.offsetX, this.drag.startY = r - this.drag.offsetY, this.drag.start = a - this.drag.startX, this.drag.targetEl = n.target || n.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function (t) {
      this.eventsRouter(t)
    }, this))
  }, n.prototype.onDragMove = function (t) {
    var i, n, a, r, l, c;
    this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, n = o(i).x, a = o(i).y, this.drag.currentX = n - this.drag.startX, this.drag.currentY = a - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (r = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), c = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, r + c), l + c)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== s ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && !1 === this.state.isSwiping && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
  }, n.prototype.onDragEnd = function (e) {
    var s, n;
    if (this.state.isTouch) {
      if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && !0 !== this.state.inMotion) return this.state.inMotion = !1, !1;
      this.drag.endTime = (new Date).getTime(), s = this.drag.endTime - this.drag.startTime, (Math.abs(this.drag.distance) > 3 || s > 300) && this.removeClick(this.drag.targetEl), n = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(n), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(n) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
    }
  }, n.prototype.removeClick = function (i) {
    this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function () {
      t(i).off("click.preventClick")
    }, 300)
  }, n.prototype.preventClick = function (e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
  }, n.prototype.getTransformProperty = function () {
    var t, i;
    return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, !0 !== i ? t[4] : t[12]
  }, n.prototype.closest = function (e) {
    var i = -1, s = this.width(), n = this.coordinates();
    return this.settings.freeDrag || t.each(n, t.proxy(function (t, o) {
      return e > o - 30 && o + 30 > e ? i = t : this.op(e, "<", o) && this.op(e, ">", n[t + 1] || o - s) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
    }, this)), this.settings.loop || (this.op(e, ">", n[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", n[this.maximum()]) && (i = e = this.maximum())), i
  }, n.prototype.animate = function (e) {
    this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
      transform: "translate3d(" + e + "px,0px, 0px)",
      transition: this.speed() / 1e3 + "s"
    }) : this.state.isTouch ? this.$stage.css({left: e + "px"}) : this.$stage.animate({left: e}, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function () {
      this.state.inMotion && this.transitionEnd()
    }, this))
  }, n.prototype.current = function (t) {
    if (t === s) return this._current;
    if (0 === this._items.length) return s;
    if (t = this.normalize(t), this._current !== t) {
      var e = this.trigger("change", {property: {name: "position", value: t}});
      e.data !== s && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      })
    }
    return this._current
  }, n.prototype.invalidate = function (t) {
    this._invalidated[t] = !0
  }, n.prototype.reset = function (t) {
    (t = this.normalize(t)) !== s && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
  }, n.prototype.normalize = function (e, i) {
    var n = i ? this._items.length : this._items.length + this._clones.length;
    return !t.isNumeric(e) || 1 > n ? s : e = this._clones.length ? (e % n + n) % n : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
  }, n.prototype.relative = function (t) {
    return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
  }, n.prototype.maximum = function (t) {
    var e, i, s, n = 0, o = this.settings;
    if (t) return this._items.length - 1;
    if (!o.loop && o.center) e = this._items.length - 1; else if (o.loop || o.center) if (o.loop || o.center) e = this._items.length + o.items; else {
      if (!o.autoWidth && !o.merge) throw"Can not detect maximum absolute position.";
      for (revert = o.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width(); (s = this.coordinates(n)) && !(s * revert >= i);) e = ++n
    } else e = this._items.length - o.items;
    return e
  }, n.prototype.minimum = function (t) {
    return t ? 0 : this._clones.length / 2
  }, n.prototype.items = function (t) {
    return t === s ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
  }, n.prototype.mergers = function (t) {
    return t === s ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
  }, n.prototype.clones = function (e) {
    var i = this._clones.length / 2, n = i + this._items.length, o = function (t) {
      return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2
    };
    return e === s ? t.map(this._clones, function (t, e) {
      return o(e)
    }) : t.map(this._clones, function (t, i) {
      return t === e ? o(i) : null
    })
  }, n.prototype.speed = function (t) {
    return t !== s && (this._speed = t), this._speed
  }, n.prototype.coordinates = function (e) {
    var i = null;
    return e === s ? t.map(this._coordinates, t.proxy(function (t, e) {
      return this.coordinates(e)
    }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
  }, n.prototype.duration = function (t, e, i) {
    return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
  }, n.prototype.to = function (i, s) {
    if (this.settings.loop) {
      var n = i - this.relative(this.current()), o = this.current(), a = this.current(), r = this.current() + n,
        l = 0 > a - r, c = this._clones.length + this._items.length;
      r < this.settings.items && !1 === l ? (o = a + this._items.length, this.reset(o)) : r >= c - this.settings.items && !0 === l && (o = a - this._items.length, this.reset(o)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function () {
        this.speed(this.duration(this.current(), o + n, s)), this.current(o + n), this.update()
      }, this), 30)
    } else this.speed(this.duration(this.current(), i, s)), this.current(i), this.update()
  }, n.prototype.next = function (t) {
    t = t || !1, this.to(this.relative(this.current()) + 1, t)
  }, n.prototype.prev = function (t) {
    t = t || !1, this.to(this.relative(this.current()) - 1, t)
  }, n.prototype.transitionEnd = function (t) {
    return (t === s || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.state.inMotion = !1, void this.trigger("translated"))
  }, n.prototype.viewport = function () {
    var s;
    if (this.options.responsiveBaseElement !== e) s = t(this.options.responsiveBaseElement).width(); else if (e.innerWidth) s = e.innerWidth; else {
      if (!i.documentElement || !i.documentElement.clientWidth) throw"Can not detect viewport width.";
      s = i.documentElement.clientWidth
    }
    return s
  }, n.prototype.replace = function (e) {
    this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
      return 1 === this.nodeType
    }).each(t.proxy(function (t, e) {
      e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, n.prototype.add = function (t, e) {
    e = e === s ? this._items.length : this.normalize(e, !0), this.trigger("add", {
      content: t,
      position: e
    }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
      content: t,
      position: e
    })
  }, n.prototype.remove = function (t) {
    (t = this.normalize(t, !0)) !== s && (this.trigger("remove", {
      content: this._items[t],
      position: t
    }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: t
    }))
  }, n.prototype.addTriggerableEvents = function () {
    var e = t.proxy(function (e, i) {
      return t.proxy(function (t) {
        t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
      }, this)
    }, this);
    t.each({
      next: this.next,
      prev: this.prev,
      to: this.to,
      destroy: this.destroy,
      refresh: this.refresh,
      replace: this.replace,
      add: this.add,
      remove: this.remove
    }, t.proxy(function (t, i) {
      this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
    }, this))
  }, n.prototype.watchVisibility = function () {
    function i(t) {
      return t.offsetWidth > 0 && t.offsetHeight > 0
    }
    
    function s() {
      i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
    }
    
    i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(s, this), 500))
  }, n.prototype.preloadAutoWidthImages = function (e) {
    var i, s, n, o;
    i = 0, s = this, e.each(function (a, r) {
      n = t(r), (o = new Image).onload = function () {
        i++, n.attr("src", o.src), n.css("opacity", 1), i >= e.length && (s.state.imagesLoaded = !0, s.initialize())
      }, o.src = n.attr("src") || n.attr("data-src") || n.attr("data-src-retina")
    })
  }, n.prototype.destroy = function () {
    this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), !1 !== this.settings.responsive && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
    for (var s in this._plugins) this._plugins[s].destroy();
    (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {
    }, this.$stage.off("dragstart", function () {
      return !1
    })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
  }, n.prototype.op = function (t, e, i) {
    var s = this.settings.rtl;
    switch (e) {
      case"<":
        return s ? t > i : i > t;
      case">":
        return s ? i > t : t > i;
      case">=":
        return s ? i >= t : t >= i;
      case"<=":
        return s ? t >= i : i >= t
    }
  }, n.prototype.on = function (t, e, i, s) {
    t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
  }, n.prototype.off = function (t, e, i, s) {
    t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
  }, n.prototype.trigger = function (e, i, s) {
    var n = {item: {count: this._items.length, index: this.current()}},
      o = t.camelCase(t.grep(["on", e, s], function (t) {
        return t
      }).join("-").toLowerCase()),
      a = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({relatedTarget: this}, n, i));
    return this._supress[e] || (t.each(this._plugins, function (t, e) {
      e.onTrigger && e.onTrigger(a)
    }), this.$element.trigger(a), this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, a)), a
  }, n.prototype.suppress = function (e) {
    t.each(e, t.proxy(function (t, e) {
      this._supress[e] = !0
    }, this))
  }, n.prototype.release = function (e) {
    t.each(e, t.proxy(function (t, e) {
      delete this._supress[e]
    }, this))
  }, n.prototype.browserSupport = function () {
    if (this.support3d = c(), this.support3d) {
      this.transformVendor = l();
      var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
      this.transitionEndVendor = t[r()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
    }
    this.state.orientation = e.orientation
  }, t.fn.owlCarousel = function (e) {
    return this.each(function () {
      t(this).data("owlCarousel") || t(this).data("owlCarousel", new n(this, e))
    })
  }, t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document), function (t, e) {
  var i = function (e) {
    this._core = e, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel": t.proxy(function (e) {
        if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && e.property.value || this._core.current()) + n, a = this._core.clones().length, r = t.proxy(function (t, e) {
          this.load(e)
        }, this); n++ < s;) this.load(a / 2 + this._core.relative(o)), a && t.each(this._core.clones(this._core.relative(o++)), r)
      }, this)
    }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  i.Defaults = {lazyLoad: !1}, i.prototype.load = function (i) {
    var s = this._core.$stage.children().eq(i), n = s && s.find(".owl-lazy");
    !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function (i, s) {
      var n, o = t(s), a = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
      this._core.trigger("load", {
        element: o,
        url: a
      }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
        o.css("opacity", 1), this._core.trigger("loaded", {element: o, url: a}, "lazy")
      }, this)).attr("src", a) : (n = new Image, n.onload = t.proxy(function () {
        o.css({"background-image": "url(" + a + ")", opacity: "1"}), this._core.trigger("loaded", {
          element: o,
          url: a
        }, "lazy")
      }, this), n.src = a)
    }, this)), this._loaded.push(s.get(0)))
  }, i.prototype.destroy = function () {
    var t, e;
    for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document), function (t) {
  var e = function (i) {
    this._core = i, this._handlers = {
      "initialized.owl.carousel": t.proxy(function () {
        this._core.settings.autoHeight && this.update()
      }, this), "changed.owl.carousel": t.proxy(function (t) {
        this._core.settings.autoHeight && "position" == t.property.name && this.update()
      }, this), "loaded.owl.lazy": t.proxy(function (t) {
        this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
      }, this)
    }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, e.prototype.update = function () {
    this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
  }, e.prototype.destroy = function () {
    var t, e;
    for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
  var s = function (e) {
    this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
      "resize.owl.carousel": t.proxy(function (t) {
        this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
      }, this), "refresh.owl.carousel changed.owl.carousel": t.proxy(function () {
        this._playing && this.stop()
      }, this), "prepared.owl.carousel": t.proxy(function (e) {
        var i = t(e.content).find(".owl-video");
        i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
      }, this)
    }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
      this.play(t)
    }, this))
  };
  s.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, s.prototype.fetch = function (t, e) {
    var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube", s = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
      n = t.attr("data-width") || this._core.settings.videoWidth,
      o = t.attr("data-height") || this._core.settings.videoHeight, a = t.attr("href");
    if (!a) throw new Error("Missing video URL.");
    if ((s = a.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube"; else {
      if (!(s[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
      i = "vimeo"
    }
    s = s[6], this._videos[a] = {
      type: i,
      id: s,
      width: n,
      height: o
    }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
  }, s.prototype.thumbnail = function (e, i) {
    var s, n, o, a = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
      r = e.find("img"), l = "src", c = "", d = this._core.settings, h = function (t) {
        n = '<div class="owl-video-play-icon"></div>', s = d.lazyLoad ? '<div class="owl-video-tn ' + c + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(s), e.after(n)
      };
    return e.wrap('<div class="owl-video-wrapper"' + a + "></div>"), this._core.settings.lazyLoad && (l = "data-src", c = "owl-lazy"), r.length ? (h(r.attr(l)), r.remove(), !1) : void("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", h(o)) : "vimeo" === i.type && t.ajax({
      type: "GET",
      url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (t) {
        o = t[0].thumbnail_large, h(o)
      }
    }))
  }, s.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
  }, s.prototype.play = function (e) {
    this._core.trigger("play", null, "video"), this._playing && this.stop();
    var i, s, n = t(e.target || e.srcElement), o = n.closest("." + this._core.settings.itemClass),
      a = this._videos[o.attr("data-video")], r = a.width || "100%", l = a.height || this._core.$stage.height();
    "youtube" === a.type ? i = '<iframe width="' + r + '" height="' + l + '" src="http://www.youtube.com/embed/' + a.id + "?autoplay=1&v=" + a.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === a.type && (i = '<iframe src="http://player.vimeo.com/video/' + a.id + '?autoplay=1" width="' + r + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), o.addClass("owl-video-playing"), this._playing = o, s = t('<div style="height:' + l + "px; width:" + r + 'px" class="owl-video-frame">' + i + "</div>"), n.after(s)
  }, s.prototype.isInFullScreen = function () {
    var s = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
    return s && t(s).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), !(s && this._fullscreen && this._playing) && (this._fullscreen ? (this._fullscreen = !1, !1) : !this._playing || this._core.state.orientation === e.orientation || (this._core.state.orientation = e.orientation, !1))
  }, s.prototype.destroy = function () {
    var t, e;
    this._core.$element.off("click.owl.video");
    for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, s) {
  var n = function (e) {
    this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = s, this.next = s, this.handlers = {
      "change.owl.carousel": t.proxy(function (t) {
        "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
      }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
        this.swapping = "translated" == t.type
      }, this), "translate.owl.carousel": t.proxy(function () {
        this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  n.Defaults = {animateOut: !1, animateIn: !1}, n.prototype.swap = function () {
    if (1 === this.core.settings.items && this.core.support3d) {
      this.core.speed(0);
      var e, i = t.proxy(this.clear, this), s = this.core.$stage.children().eq(this.previous),
        n = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn,
        a = this.core.settings.animateOut;
      this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.css({left: e + "px"}).addClass("animated owl-animated-out").addClass(a).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), o && n.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
    }
  }, n.prototype.clear = function (e) {
    t(e.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
  }, n.prototype.destroy = function () {
    var t, e;
    for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
  var s = function (e) {
    this.core = e, this.core.options = t.extend({}, s.Defaults, this.core.options), this.handlers = {
      "translated.owl.carousel refreshed.owl.carousel": t.proxy(function () {
        this.autoplay()
      }, this), "play.owl.autoplay": t.proxy(function (t, e, i) {
        this.play(e, i)
      }, this), "stop.owl.autoplay": t.proxy(function () {
        this.stop()
      }, this), "mouseover.owl.autoplay": t.proxy(function () {
        this.core.settings.autoplayHoverPause && this.pause()
      }, this), "mouseleave.owl.autoplay": t.proxy(function () {
        this.core.settings.autoplayHoverPause && this.autoplay()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  s.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, s.prototype.autoplay = function () {
    this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function () {
      this.play()
    }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
  }, s.prototype.play = function () {
    return !0 === i.hidden || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : !1 === this.core.settings.autoplay ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
  }, s.prototype.stop = function () {
    e.clearInterval(this.interval)
  }, s.prototype.pause = function () {
    e.clearInterval(this.interval)
  }, s.prototype.destroy = function () {
    var t, i;
    e.clearInterval(this.interval);
    for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
    for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.autoplay = s
}(window.Zepto || window.jQuery, window, document), function (t) {
  "use strict";
  var e = function (i) {
    this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": t.proxy(function (e) {
        this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
      }, this), "add.owl.carousel": t.proxy(function (e) {
        this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
      }, this), "remove.owl.carousel prepared.owl.carousel": t.proxy(function (t) {
        this._core.settings.dotsData && this._templates.splice(t.position, 1)
      }, this), "change.owl.carousel": t.proxy(function (t) {
        if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
          var e = this._core.current(), i = this._core.maximum(), s = this._core.minimum();
          t.data = t.property.value > i ? e >= i ? s : i : t.property.value < s ? i : t.property.value
        }
      }, this), "changed.owl.carousel": t.proxy(function (t) {
        "position" == t.property.name && this.draw()
      }, this), "refreshed.owl.carousel": t.proxy(function () {
        this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
      }, this)
    }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  e.Defaults = {
    nav: !1,
    navRewind: !0,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotData: !1,
    dotsSpeed: !1,
    dotsContainer: !1,
    controlsClass: "owl-controls"
  }, e.prototype.initialize = function () {
    var e, i, s = this._core.settings;
    s.dotsData || (this._templates = [t("<div>").addClass(s.dotClass).append(t("<span>")).prop("outerHTML")]), s.navContainer && s.dotsContainer || (this._controls.$container = t("<div>").addClass(s.controlsClass).appendTo(this.$element)), this._controls.$indicators = s.dotsContainer ? t(s.dotsContainer) : t("<div>").hide().addClass(s.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function (e) {
      var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
      e.preventDefault(), this.to(i, s.dotsSpeed)
    }, this)), e = s.navContainer ? t(s.navContainer) : t("<div>").addClass(s.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + s.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(s.navClass[0]).html(s.navText[0]).hide().prependTo(e).on("click", t.proxy(function () {
      this.prev(s.navSpeed)
    }, this)), this._controls.$next.addClass(s.navClass[1]).html(s.navText[1]).hide().appendTo(e).on("click", t.proxy(function () {
      this.next(s.navSpeed)
    }, this));
    for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
  }, e.prototype.destroy = function () {
    var t, e, i, s;
    for (t in this._handlers) this.$element.off(t, this._handlers[t]);
    for (e in this._controls) this._controls[e].remove();
    for (s in this.overides) this._core[s] = this._overrides[s];
    for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
  }, e.prototype.update = function () {
    var t, e, i, s = this._core.settings, n = this._core.clones().length / 2, o = n + this._core.items().length,
      a = s.center || s.autoWidth || s.dotData ? 1 : s.dotsEach || s.items;
    if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)), s.dots || "page" == s.slideBy) for (this._pages = [], t = n, e = 0, i = 0; o > t; t++) (e >= a || 0 === e) && (this._pages.push({
      start: t - n,
      end: t - n + a - 1
    }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
  }, e.prototype.draw = function () {
    var e, i, s = "", n = this._core.settings,
      o = (this._core.$stage.children(), this._core.relative(this._core.current()));
    if (!n.nav || n.loop || n.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o), this._controls.$next.toggleClass("disabled", o >= this._core.maximum())), this._controls.$previous.toggle(n.nav), this._controls.$next.toggle(n.nav), n.dots) {
      if (e = this._pages.length - this._controls.$indicators.children().length, n.dotData && 0 !== e) {
        for (i = 0; i < this._controls.$indicators.children().length; i++) s += this._templates[this._core.relative(i)];
        this._controls.$indicators.html(s)
      } else e > 0 ? (s = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(s)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
      this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
    }
    this._controls.$indicators.toggle(n.dots)
  }, e.prototype.onTrigger = function (e) {
    var i = this._core.settings;
    e.page = {
      index: t.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
    }
  }, e.prototype.current = function () {
    var e = this._core.relative(this._core.current());
    return t.grep(this._pages, function (t) {
      return t.start <= e && t.end >= e
    }).pop()
  }, e.prototype.getPosition = function (e) {
    var i, s, n = this._core.settings;
    return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += n.slideBy : i -= n.slideBy), i
  }, e.prototype.next = function (e) {
    t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
  }, e.prototype.prev = function (e) {
    t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
  }, e.prototype.to = function (e, i, s) {
    var n;
    s ? t.proxy(this._overrides.to, this._core)(e, i) : (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i))
  }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document), function (t, e) {
  "use strict";
  var i = function (s) {
    this._core = s, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": t.proxy(function () {
        "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
      }, this), "prepared.owl.carousel": t.proxy(function (e) {
        var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
        this._hashes[i] = e.content
      }, this)
    }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function () {
      var t = e.location.hash.substring(1), i = this._core.$stage.children(),
        s = this._hashes[t] && i.index(this._hashes[t]) || 0;
      return !!t && void this._core.to(s, !1, !0)
    }, this))
  };
  i.Defaults = {URLhashListener: !1}, i.prototype.destroy = function () {
    var i, s;
    t(e).off("hashchange.owl.navigation");
    for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
    for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document), function (t) {
  var e;
  (e = function (e, i, s, n, o) {
    this.$el = t(i), this.end = e, this.active = !1, this.interval = 1e3, this.speed = n, this.callBack = jQuery.isFunction(o) ? o : null, this.localization = {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds"
    }, t.extend(this.localization, this.localization, s)
  }).prototype = {
    getCounterNumbers: function () {
      var t, e, i, s, n, o = {
        days: {tens: 0, units: 0, hundreds: 0},
        hours: {tens: 0, units: 0},
        minutes: {tens: 0, units: 0},
        seconds: {tens: 0, units: 0}
      }, a = 0, r = new Date, l = this.end.getTime() - r.getTime();
      return l <= 0 ? o : (t = Math.min(Math.floor(l / 864e5), 999), a = l % 864e5, o.days.hundreds = Math.floor(t / 100), e = t % 100, o.days.tens = Math.floor(e / 10), o.days.units = e % 10, i = Math.floor(a / 36e5), a %= 36e5, o.hours.tens = Math.floor(i / 10), o.hours.units = i % 10, s = Math.floor(a / 6e4), a %= 6e4, o.minutes.tens = Math.floor(s / 10), o.minutes.units = s % 10, n = Math.floor(a / 1e3), o.seconds.tens = Math.floor(n / 10), o.seconds.units = n % 10, o)
    }, updatePart: function (e) {
      var i, s, n = this.getCounterNumbers(), o = t("." + e, this.$el);
      "days" == e && (this.setDayHundreds(n.days.hundreds > 0), o.find(".number.hundreds.show").html() != n[e].hundreds && (i = t(".n1.hundreds", o), s = t(".n2.hundreds", o), this.scrollNumber(i, s, n[e].hundreds))), o.find(".number.tens.show").html() != n[e].tens && (i = t(".n1.tens", o), s = t(".n2.tens", o), this.scrollNumber(i, s, n[e].tens)), o.find(".number.units.show").html() != n[e].units && (i = t(".n1.units", o), s = t(".n2.units", o), this.scrollNumber(i, s, n[e].units))
    }, timeOut: function () {
      var t = new Date;
      return this.end.getTime() - t.getTime() <= 0
    }, setDayHundreds: function (e) {
      e ? t(".counter.days", this.$el).addClass("with-hundreds") : t(".counter.days", this.$el).removeClass("with-hundreds")
    }, updateCounter: function () {
      this.updatePart("days"), this.updatePart("hours"), this.updatePart("minutes"), this.updatePart("seconds"), this.timeOut() && (this.active = !1, this.callBack && this.callBack(this))
    }, localize: function (e) {
      t.isPlainObject(e) && t.extend(this.localization, this.localization, e), t(".days", this.$el).siblings(".counter-caption").text(this.localization.days), t(".hours", this.$el).siblings(".counter-caption").text(this.localization.hours), t(".minutes", this.$el).siblings(".counter-caption").text(this.localization.minutes), t(".seconds", this.$el).siblings(".counter-caption").text(this.localization.seconds)
    }, start: function (t) {
      var e, i;
      t && (this.interval = t), e = this.interval, this.active = !0, i = this, setTimeout(function () {
        i.updateCounter(), i.active && i.start()
      }, e)
    }, stop: function () {
      this.active = !1
    }, scrollNumber: function (t, e, i) {
      t.hasClass("show") ? (e.removeClass("hidden-down").css("top", "-100%").text(i).stop().animate({top: 0}, this.speed, function () {
        e.addClass("show")
      }), t.stop().animate({top: "100%"}, this.speed, function () {
        t.removeClass("show").addClass("hidden-down")
      })) : (t.removeClass("hidden-down").css("top", "-100%").text(i).stop().animate({top: 0}, this.speed, function () {
        t.addClass("show")
      }), e.stop().animate({top: "100%"}, this.speed, function () {
        e.removeClass("show").addClass("hidden-down")
      }))
    }
  }, jQuery.fn.mbComingsoon = function (i) {
    var s = {
      interval: 1e3,
      callBack: null,
      localization: {days: "days", hours: "hours", minutes: "minutes", seconds: "seconds"},
      speed: 500
    }, n = {};
    return this.each(function () {
      var o = t(this), a = o.data("mbComingsoon");
      if (a) "start" == i ? a.start() : "stop" == i ? a.stop() : t.isPlainObject(i) && (i.expiryDate instanceof Date && (a.end = i.expiryDate), t.isNumeric(i.interval) && (a.interval = i.interval), t.isFunction(i.callBack) && (a.callBack = i.callBack), t.isPlainObject(i.localization) && this.localize(i.localization)); else {
        if (i instanceof Date ? n.expiryDate = i : t.isPlainObject(i) ? t.extend(n, s, i) : "string" == typeof i && (n.expiryDate = new Date(i)), !n.expiryDate) throw new Error("Expiry date is required!");
        a = new e(n.expiryDate, o, n.localization, n.speed, n.callBack), o.html('   <div class="counter-group" id="myCounter">       <div class="counter-block">           <div class="counter days">               <div class="number show n1 hundreds">0</div>               <div class="number show n1 tens">0</div>               <div class="number show n1 units">0</div>               <div class="number hidden-up n2 hundreds">0</div>               <div class="number hidden-up n2 tens">0</div>               <div class="number hidden-up n2 units">0</div>           </div>           <div class="counter-caption">days</div>       </div>       <div class="counter-block">           <div class="counter hours">               <div class="number show n1 tens">0</div>               <div class="number show n1 units">0</div>               <div class="number hidden-up n2 tens">0</div>               <div class="number hidden-up n2 units">0</div>           </div>           <div class="counter-caption">hours</div>       </div>       <div class="counter-block">           <div class="counter minutes">               <div class="number show n1 tens">0</div>               <div class="number show n1 units">0</div>               <div class="number hidden-up n2 tens">0</div>               <div class="number hidden-up n2 units">0</div>           </div>           <div class="counter-caption">minutes</div>       </div>       <div class="counter-block">           <div class="counter seconds">               <div class="number show n1 tens">0</div>               <div class="number show n1 units">0</div>               <div class="number hidden-up n2 tens">0</div>               <div class="number hidden-up n2 units">0</div>           </div>           <div class="counter-caption">seconds</div>       </div>   </div>'), a.localize(), a.start()
      }
    })
  }
}(jQuery), function (t, e, i, s) {
  function n(e, i) {
    this.element = e, this.options = t.extend({}, a, i), this._defaults = a, this._name = o, this.init()
  }
  
  var o = "stellar", a = {
      scrollProperty: "scroll",
      positionProperty: "position",
      horizontalScrolling: !0,
      verticalScrolling: !0,
      horizontalOffset: 0,
      verticalOffset: 0,
      responsive: !1,
      parallaxBackgrounds: !0,
      parallaxElements: !0,
      hideDistantElements: !0,
      hideElement: function (t) {
        t.hide()
      },
      showElement: function (t) {
        t.show()
      }
    }, r = {
      scroll: {
        getLeft: function (t) {
          return t.scrollLeft()
        }, setLeft: function (t, e) {
          t.scrollLeft(e)
        }, getTop: function (t) {
          return t.scrollTop()
        }, setTop: function (t, e) {
          t.scrollTop(e)
        }
      }, position: {
        getLeft: function (t) {
          return -1 * parseInt(t.css("left"), 10)
        }, getTop: function (t) {
          return -1 * parseInt(t.css("top"), 10)
        }
      }, margin: {
        getLeft: function (t) {
          return -1 * parseInt(t.css("margin-left"), 10)
        }, getTop: function (t) {
          return -1 * parseInt(t.css("margin-top"), 10)
        }
      }, transform: {
        getLeft: function (t) {
          var e = getComputedStyle(t[0])[c];
          return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[4], 10) : 0
        }, getTop: function (t) {
          var e = getComputedStyle(t[0])[c];
          return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[5], 10) : 0
        }
      }
    }, l = {
      position: {
        setLeft: function (t, e) {
          t.css("left", e)
        }, setTop: function (t, e) {
          t.css("top", e)
        }
      }, transform: {
        setPosition: function (t, e, i, s, n) {
          t[0].style[c] = "translate3d(" + (e - i) + "px, " + (s - n) + "px, 0)"
        }
      }
    }, c = function () {
      var e, i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/, s = t("script")[0].style, n = "";
      for (e in s) if (i.test(e)) {
        n = e.match(i)[0];
        break
      }
      return "WebkitOpacity" in s && (n = "Webkit"), "KhtmlOpacity" in s && (n = "Khtml"), function (t) {
        return n + (n.length > 0 ? t.charAt(0).toUpperCase() + t.slice(1) : t)
      }
    }()("transform"), d = t("<div />", {style: "background:#fff"}).css("background-position-x") !== s,
    h = d ? function (t, e, i) {
      t.css({"background-position-x": e, "background-position-y": i})
    } : function (t, e, i) {
      t.css("background-position", e + " " + i)
    }, p = d ? function (t) {
      return [t.css("background-position-x"), t.css("background-position-y")]
    } : function (t) {
      return t.css("background-position").split(" ")
    },
    u = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) {
      setTimeout(t, 1e3 / 60)
    };
  n.prototype = {
    init: function () {
      this.options.name = o + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({firstLoad: !0}), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
    }, _defineElements: function () {
      this.element === i.body && (this.element = e), this.$scrollElement = t(this.element), this.$element = this.element === e ? t("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== s ? t(this.options.viewportElement) : this.$scrollElement[0] === e || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
    }, _defineGetters: function () {
      var t = this, e = r[t.options.scrollProperty];
      this._getScrollLeft = function () {
        return e.getLeft(t.$scrollElement)
      }, this._getScrollTop = function () {
        return e.getTop(t.$scrollElement)
      }
    }, _defineSetters: function () {
      var e = this, i = r[e.options.scrollProperty], s = l[e.options.positionProperty], n = i.setLeft, o = i.setTop;
      this._setScrollLeft = "function" == typeof n ? function (t) {
        n(e.$scrollElement, t)
      } : t.noop, this._setScrollTop = "function" == typeof o ? function (t) {
        o(e.$scrollElement, t)
      } : t.noop, this._setPosition = s.setPosition || function (t, i, n, o, a) {
        e.options.horizontalScrolling && s.setLeft(t, i, n), e.options.verticalScrolling && s.setTop(t, o, a)
      }
    }, _handleWindowLoadAndResize: function () {
      var i = this, s = t(e);
      i.options.responsive && s.bind("load." + this.name, function () {
        i.refresh()
      }), s.bind("resize." + this.name, function () {
        i._detectViewport(), i.options.responsive && i.refresh()
      })
    }, refresh: function (i) {
      var s = this, n = s._getScrollLeft(), o = s._getScrollTop();
      i && i.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), i && i.firstLoad && /WebKit/.test(navigator.userAgent) && t(e).load(function () {
        var t = s._getScrollLeft(), e = s._getScrollTop();
        s._setScrollLeft(t + 1), s._setScrollTop(e + 1), s._setScrollLeft(t), s._setScrollTop(e)
      }), this._setScrollLeft(n), this._setScrollTop(o)
    }, _detectViewport: function () {
      var t = this.$viewportElement.offset(), e = null !== t && t !== s;
      this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = e ? t.top : 0, this.viewportOffsetLeft = e ? t.left : 0
    }, _findParticles: function () {
      var e = this;
      if (this._getScrollLeft(), this._getScrollTop(), this.particles !== s) for (var i = this.particles.length - 1; i >= 0; i--) this.particles[i].$element.data("stellar-elementIsActive", s);
      this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function () {
        var i, n, o, a, r, l, c, d, h, p = t(this), u = 0, f = 0, m = 0, g = 0;
        if (p.data("stellar-elementIsActive")) {
          if (p.data("stellar-elementIsActive") !== this) return
        } else p.data("stellar-elementIsActive", this);
        e.options.showElement(p), p.data("stellar-startingLeft") ? (p.css("left", p.data("stellar-startingLeft")), p.css("top", p.data("stellar-startingTop"))) : (p.data("stellar-startingLeft", p.css("left")), p.data("stellar-startingTop", p.css("top"))), o = p.position().left, a = p.position().top, r = "auto" === p.css("margin-left") ? 0 : parseInt(p.css("margin-left"), 10), l = "auto" === p.css("margin-top") ? 0 : parseInt(p.css("margin-top"), 10), d = p.offset().left - r, h = p.offset().top - l, p.parents().each(function () {
          var e = t(this);
          return !0 === e.data("stellar-offset-parent") ? (u = m, f = g, c = e, !1) : (m += e.position().left, void(g += e.position().top))
        }), i = p.data("stellar-horizontal-offset") !== s ? p.data("stellar-horizontal-offset") : c !== s && c.data("stellar-horizontal-offset") !== s ? c.data("stellar-horizontal-offset") : e.horizontalOffset, n = p.data("stellar-vertical-offset") !== s ? p.data("stellar-vertical-offset") : c !== s && c.data("stellar-vertical-offset") !== s ? c.data("stellar-vertical-offset") : e.verticalOffset, e.particles.push({
          $element: p,
          $offsetParent: c,
          isFixed: "fixed" === p.css("position"),
          horizontalOffset: i,
          verticalOffset: n,
          startingPositionLeft: o,
          startingPositionTop: a,
          startingOffsetLeft: d,
          startingOffsetTop: h,
          parentOffsetLeft: u,
          parentOffsetTop: f,
          stellarRatio: p.data("stellar-ratio") !== s ? p.data("stellar-ratio") : 1,
          width: p.outerWidth(!0),
          height: p.outerHeight(!0),
          isHidden: !1
        })
      })
    }, _findBackgrounds: function () {
      var e, i = this, n = this._getScrollLeft(), o = this._getScrollTop();
      this.backgrounds = [], this.options.parallaxBackgrounds && (e = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (e = e.add(this.$element)), e.each(function () {
        var e, a, r, l, c, d, u, f = t(this), m = p(f), g = 0, v = 0, y = 0, w = 0;
        if (f.data("stellar-backgroundIsActive")) {
          if (f.data("stellar-backgroundIsActive") !== this) return
        } else f.data("stellar-backgroundIsActive", this);
        f.data("stellar-backgroundStartingLeft") ? h(f, f.data("stellar-backgroundStartingLeft"), f.data("stellar-backgroundStartingTop")) : (f.data("stellar-backgroundStartingLeft", m[0]), f.data("stellar-backgroundStartingTop", m[1])), r = "auto" === f.css("margin-left") ? 0 : parseInt(f.css("margin-left"), 10), l = "auto" === f.css("margin-top") ? 0 : parseInt(f.css("margin-top"), 10), c = f.offset().left - r - n, d = f.offset().top - l - o, f.parents().each(function () {
          var e = t(this);
          return !0 === e.data("stellar-offset-parent") ? (g = y, v = w, u = e, !1) : (y += e.position().left, void(w += e.position().top))
        }), e = f.data("stellar-horizontal-offset") !== s ? f.data("stellar-horizontal-offset") : u !== s && u.data("stellar-horizontal-offset") !== s ? u.data("stellar-horizontal-offset") : i.horizontalOffset, a = f.data("stellar-vertical-offset") !== s ? f.data("stellar-vertical-offset") : u !== s && u.data("stellar-vertical-offset") !== s ? u.data("stellar-vertical-offset") : i.verticalOffset, i.backgrounds.push({
          $element: f,
          $offsetParent: u,
          isFixed: "fixed" === f.css("background-attachment"),
          horizontalOffset: e,
          verticalOffset: a,
          startingValueLeft: m[0],
          startingValueTop: m[1],
          startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
          startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
          startingPositionLeft: f.position().left,
          startingPositionTop: f.position().top,
          startingOffsetLeft: c,
          startingOffsetTop: d,
          parentOffsetLeft: g,
          parentOffsetTop: v,
          stellarRatio: f.data("stellar-background-ratio") === s ? 1 : f.data("stellar-background-ratio")
        })
      }))
    }, _reset: function () {
      var t, e, i, s, n;
      for (n = this.particles.length - 1; n >= 0; n--) t = this.particles[n], e = t.$element.data("stellar-startingLeft"), i = t.$element.data("stellar-startingTop"), this._setPosition(t.$element, e, e, i, i), this.options.showElement(t.$element), t.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
      for (n = this.backgrounds.length - 1; n >= 0; n--) (s = this.backgrounds[n]).$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), h(s.$element, s.startingValueLeft, s.startingValueTop)
    }, destroy: function () {
      this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = t.noop, t(e).unbind("load." + this.name).unbind("resize." + this.name)
    }, _setOffsets: function () {
      var i = this, s = t(e);
      s.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), s.bind("resize.horizontal-" + this.name, function () {
        i.horizontalOffset = i.options.horizontalOffset()
      })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), s.bind("resize.vertical-" + this.name, function () {
        i.verticalOffset = i.options.verticalOffset()
      })) : this.verticalOffset = this.options.verticalOffset
    }, _repositionElements: function () {
      var t, e, i, s, n, o, a, r, l, c, d = this._getScrollLeft(), p = this._getScrollTop(), u = !0, f = !0;
      if (this.currentScrollLeft !== d || this.currentScrollTop !== p || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
        for (this.currentScrollLeft = d, this.currentScrollTop = p, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, c = this.particles.length - 1; c >= 0; c--) t = this.particles[c], e = t.isFixed ? 1 : 0, this.options.horizontalScrolling ? (o = (d + t.horizontalOffset + this.viewportOffsetLeft + t.startingPositionLeft - t.startingOffsetLeft + t.parentOffsetLeft) * -(t.stellarRatio + e - 1) + t.startingPositionLeft, r = o - t.startingPositionLeft + t.startingOffsetLeft) : (o = t.startingPositionLeft, r = t.startingOffsetLeft), this.options.verticalScrolling ? (a = (p + t.verticalOffset + this.viewportOffsetTop + t.startingPositionTop - t.startingOffsetTop + t.parentOffsetTop) * -(t.stellarRatio + e - 1) + t.startingPositionTop, l = a - t.startingPositionTop + t.startingOffsetTop) : (a = t.startingPositionTop, l = t.startingOffsetTop), this.options.hideDistantElements && (f = !this.options.horizontalScrolling || r + t.width > (t.isFixed ? 0 : d) && r < (t.isFixed ? 0 : d) + this.viewportWidth + this.viewportOffsetLeft, u = !this.options.verticalScrolling || l + t.height > (t.isFixed ? 0 : p) && l < (t.isFixed ? 0 : p) + this.viewportHeight + this.viewportOffsetTop), f && u ? (t.isHidden && (this.options.showElement(t.$element), t.isHidden = !1), this._setPosition(t.$element, o, t.startingPositionLeft, a, t.startingPositionTop)) : t.isHidden || (this.options.hideElement(t.$element), t.isHidden = !0);
        for (c = this.backgrounds.length - 1; c >= 0; c--) i = this.backgrounds[c], e = i.isFixed ? 0 : 1, s = this.options.horizontalScrolling ? (d + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (e - i.stellarRatio) + "px" : i.startingValueLeft, n = this.options.verticalScrolling ? (p + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (e - i.stellarRatio) + "px" : i.startingValueTop, h(i.$element, s, n)
      }
    }, _handleScrollEvent: function () {
      var t = this, e = !1, i = function () {
        t._repositionElements(), e = !1
      }, s = function () {
        e || (u(i), e = !0)
      };
      this.$scrollElement.bind("scroll." + this.name, s), s()
    }, _startAnimationLoop: function () {
      var t = this;
      this._animationLoop = function () {
        u(t._animationLoop), t._repositionElements()
      }, this._animationLoop()
    }
  }, t.fn[o] = function (e) {
    var i = arguments;
    return e === s || "object" == typeof e ? this.each(function () {
      t.data(this, "plugin_" + o) || t.data(this, "plugin_" + o, new n(this, e))
    }) : "string" == typeof e && "_" !== e[0] && "init" !== e ? this.each(function () {
      var s = t.data(this, "plugin_" + o);
      s instanceof n && "function" == typeof s[e] && s[e].apply(s, Array.prototype.slice.call(i, 1)), "destroy" === e && t.data(this, "plugin_" + o, null)
    }) : void 0
  }, t[o] = function () {
    var i = t(e);
    return i.stellar.apply(i, Array.prototype.slice.call(arguments, 0))
  }, t[o].scrollProperty = r, t[o].positionProperty = l, e.Stellar = n
}(jQuery, this, document), function (t) {
  t.flexslider = function (e, i) {
    var s = t(e);
    s.vars = t.extend({}, t.flexslider.defaults, i);
    var n, o = s.vars.namespace, a = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      r = ("ontouchstart" in window || a || window.DocumentTouch && document instanceof DocumentTouch) && s.vars.touch,
      l = "click touchend MSPointerUp keyup", c = "", d = "vertical" === s.vars.direction, h = s.vars.reverse,
      p = s.vars.itemWidth > 0, u = "fade" === s.vars.animation, f = "" !== s.vars.asNavFor, m = {};
    t.data(e, "flexslider", s), m = {
      init: function () {
        s.animating = !1, s.currentSlide = parseInt(s.vars.startAt ? s.vars.startAt : 0, 10), isNaN(s.currentSlide) && (s.currentSlide = 0), s.animatingTo = s.currentSlide, s.atEnd = 0 === s.currentSlide || s.currentSlide === s.last, s.containerSelector = s.vars.selector.substr(0, s.vars.selector.search(" ")), s.slides = t(s.vars.selector, s), s.container = t(s.containerSelector, s), s.count = s.slides.length, s.syncExists = t(s.vars.sync).length > 0, "slide" === s.vars.animation && (s.vars.animation = "swing"), s.prop = d ? "top" : "marginLeft", s.args = {}, s.manualPause = !1, s.stopped = !1, s.started = !1, s.startTimeout = null, s.transitions = !s.vars.video && !u && s.vars.useCSS && function () {
          var t = document.createElement("div"),
            e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
          for (var i in e) if (void 0 !== t.style[e[i]]) return s.pfx = e[i].replace("Perspective", "").toLowerCase(), s.prop = "-" + s.pfx + "-transform", !0;
          return !1
        }(), s.ensureAnimationEnd = "", "" !== s.vars.controlsContainer && (s.controlsContainer = t(s.vars.controlsContainer).length > 0 && t(s.vars.controlsContainer)), "" !== s.vars.manualControls && (s.manualControls = t(s.vars.manualControls).length > 0 && t(s.vars.manualControls)), "" !== s.vars.customDirectionNav && (s.customDirectionNav = 2 === t(s.vars.customDirectionNav).length && t(s.vars.customDirectionNav)), s.vars.randomize && (s.slides.sort(function () {
          return Math.round(Math.random()) - .5
        }), s.container.empty().append(s.slides)), s.doMath(), s.setup("init"), s.vars.controlNav && m.controlNav.setup(), s.vars.directionNav && m.directionNav.setup(), s.vars.keyboard && (1 === t(s.containerSelector).length || s.vars.multipleKeyboard) && t(document).bind("keyup", function (t) {
          var e = t.keyCode;
          if (!s.animating && (39 === e || 37 === e)) {
            var i = 39 === e ? s.getTarget("next") : 37 === e && s.getTarget("prev");
            s.flexAnimate(i, s.vars.pauseOnAction)
          }
        }), s.vars.mousewheel && s.bind("mousewheel", function (t, e, i, n) {
          t.preventDefault();
          var o = s.getTarget(0 > e ? "next" : "prev");
          s.flexAnimate(o, s.vars.pauseOnAction)
        }), s.vars.pausePlay && m.pausePlay.setup(), s.vars.slideshow && s.vars.pauseInvisible && m.pauseInvisible.init(), s.vars.slideshow && (s.vars.pauseOnHover && s.hover(function () {
          s.manualPlay || s.manualPause || s.pause()
        }, function () {
          s.manualPause || s.manualPlay || s.stopped || s.play()
        }), s.vars.pauseInvisible && m.pauseInvisible.isHidden() || (s.vars.initDelay > 0 ? s.startTimeout = setTimeout(s.play, s.vars.initDelay) : s.play())), f && m.asNav.setup(), r && s.vars.touch && m.touch(), (!u || u && s.vars.smoothHeight) && t(window).bind("resize orientationchange focus", m.resize), s.find("img").attr("draggable", "false"), setTimeout(function () {
          s.vars.start(s)
        }, 200)
      }, asNav: {
        setup: function () {
          s.asNav = !0, s.animatingTo = Math.floor(s.currentSlide / s.move), s.currentItem = s.currentSlide, s.slides.removeClass(o + "active-slide").eq(s.currentItem).addClass(o + "active-slide"), a ? (e._slider = s, s.slides.each(function () {
            var e = this;
            e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (t) {
              t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
            }, !1), e.addEventListener("MSGestureTap", function (e) {
              e.preventDefault();
              var i = t(this), n = i.index();
              t(s.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
            })
          })) : s.slides.on(l, function (e) {
            e.preventDefault();
            var i = t(this), n = i.index();
            0 >= i.offset().left - t(s).scrollLeft() && i.hasClass(o + "active-slide") ? s.flexAnimate(s.getTarget("prev"), !0) : t(s.vars.asNavFor).data("flexslider").animating || i.hasClass(o + "active-slide") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
          })
        }
      }, controlNav: {
        setup: function () {
          s.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
        }, setupPaging: function () {
          var e, i, n = "thumbnails" === s.vars.controlNav ? "control-thumbs" : "control-paging", a = 1;
          if (s.controlNavScaffold = t('<ol class="' + o + "control-nav " + o + n + '"></ol>'), s.pagingCount > 1) for (var r = 0; r < s.pagingCount; r++) {
            if (i = s.slides.eq(r), e = "thumbnails" === s.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + a + "</a>", "thumbnails" === s.vars.controlNav && !0 === s.vars.thumbCaptions) {
              var d = i.attr("data-thumbcaption");
              "" !== d && void 0 !== d && (e += '<span class="' + o + 'caption">' + d + "</span>")
            }
            s.controlNavScaffold.append("<li>" + e + "</li>"), a++
          }
          s.controlsContainer ? t(s.controlsContainer).append(s.controlNavScaffold) : s.append(s.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), s.controlNavScaffold.delegate("a, img", l, function (e) {
            if (e.preventDefault(), "" === c || c === e.type) {
              var i = t(this), n = s.controlNav.index(i);
              i.hasClass(o + "active") || (s.direction = n > s.currentSlide ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction))
            }
            "" === c && (c = e.type), m.setToClearWatchedEvent()
          })
        }, setupManual: function () {
          s.controlNav = s.manualControls, m.controlNav.active(), s.controlNav.bind(l, function (e) {
            if (e.preventDefault(), "" === c || c === e.type) {
              var i = t(this), n = s.controlNav.index(i);
              i.hasClass(o + "active") || (s.direction = n > s.currentSlide ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction))
            }
            "" === c && (c = e.type), m.setToClearWatchedEvent()
          })
        }, set: function () {
          var e = "thumbnails" === s.vars.controlNav ? "img" : "a";
          s.controlNav = t("." + o + "control-nav li " + e, s.controlsContainer ? s.controlsContainer : s)
        }, active: function () {
          s.controlNav.removeClass(o + "active").eq(s.animatingTo).addClass(o + "active")
        }, update: function (e, i) {
          s.pagingCount > 1 && "add" === e ? s.controlNavScaffold.append(t("<li><a>" + s.count + "</a></li>")) : 1 === s.pagingCount ? s.controlNavScaffold.find("li").remove() : s.controlNav.eq(i).closest("li").remove(), m.controlNav.set(), s.pagingCount > 1 && s.pagingCount !== s.controlNav.length ? s.update(i, e) : m.controlNav.active()
        }
      }, directionNav: {
        setup: function () {
          var e = t('<ul class="' + o + 'direction-nav"><li class="' + o + 'nav-prev"><a class="' + o + 'prev" href="#">' + s.vars.prevText + '</a></li><li class="' + o + 'nav-next"><a class="' + o + 'next" href="#">' + s.vars.nextText + "</a></li></ul>");
          s.customDirectionNav ? s.directionNav = s.customDirectionNav : s.controlsContainer ? (t(s.controlsContainer).append(e), s.directionNav = t("." + o + "direction-nav li a", s.controlsContainer)) : (s.append(e), s.directionNav = t("." + o + "direction-nav li a", s)), m.directionNav.update(), s.directionNav.bind(l, function (e) {
            e.preventDefault();
            var i;
            ("" === c || c === e.type) && (i = s.getTarget(t(this).hasClass(o + "next") ? "next" : "prev"), s.flexAnimate(i, s.vars.pauseOnAction)), "" === c && (c = e.type), m.setToClearWatchedEvent()
          })
        }, update: function () {
          var t = o + "disabled";
          1 === s.pagingCount ? s.directionNav.addClass(t).attr("tabindex", "-1") : s.vars.animationLoop ? s.directionNav.removeClass(t).removeAttr("tabindex") : 0 === s.animatingTo ? s.directionNav.removeClass(t).filter("." + o + "prev").addClass(t).attr("tabindex", "-1") : s.animatingTo === s.last ? s.directionNav.removeClass(t).filter("." + o + "next").addClass(t).attr("tabindex", "-1") : s.directionNav.removeClass(t).removeAttr("tabindex")
        }
      }, pausePlay: {
        setup: function () {
          var e = t('<div class="' + o + 'pauseplay"><a></a></div>');
          s.controlsContainer ? (s.controlsContainer.append(e), s.pausePlay = t("." + o + "pauseplay a", s.controlsContainer)) : (s.append(e), s.pausePlay = t("." + o + "pauseplay a", s)), m.pausePlay.update(s.vars.slideshow ? o + "pause" : o + "play"), s.pausePlay.bind(l, function (e) {
            e.preventDefault(), ("" === c || c === e.type) && (t(this).hasClass(o + "pause") ? (s.manualPause = !0, s.manualPlay = !1, s.pause()) : (s.manualPause = !1, s.manualPlay = !0, s.play())), "" === c && (c = e.type), m.setToClearWatchedEvent()
          })
        }, update: function (t) {
          "play" === t ? s.pausePlay.removeClass(o + "pause").addClass(o + "play").html(s.vars.playText) : s.pausePlay.removeClass(o + "play").addClass(o + "pause").html(s.vars.pauseText)
        }
      }, touch: function () {
        function t(t) {
          t.stopPropagation(), s.animating ? t.preventDefault() : (s.pause(), e._gesture.addPointer(t.pointerId), x = 0, c = d ? s.h : s.w, m = Number(new Date), l = p && h && s.animatingTo === s.last ? 0 : p && h ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : p && s.currentSlide === s.last ? s.limit : p ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : h ? (s.last - s.currentSlide + s.cloneOffset) * c : (s.currentSlide + s.cloneOffset) * c)
        }
        
        function i(t) {
          t.stopPropagation();
          var i = t.target._slider;
          if (i) {
            var s = -t.translationX, n = -t.translationY;
            return x += d ? n : s, f = x, w = d ? Math.abs(x) < Math.abs(-s) : Math.abs(x) < Math.abs(-n), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
              e._gesture.stop()
            }) : void((!w || Number(new Date) - m > 500) && (t.preventDefault(), !u && i.transitions && (i.vars.animationLoop || (f = x / (0 === i.currentSlide && 0 > x || i.currentSlide === i.last && x > 0 ? Math.abs(x) / c + 2 : 1)), i.setProps(l + f, "setTouch"))))
          }
        }
        
        function n(t) {
          t.stopPropagation();
          var e = t.target._slider;
          if (e) {
            if (e.animatingTo === e.currentSlide && !w && null !== f) {
              var i = h ? -f : f, s = e.getTarget(i > 0 ? "next" : "prev");
              e.canAdvance(s) && (Number(new Date) - m < 550 && Math.abs(i) > 50 || Math.abs(i) > c / 2) ? e.flexAnimate(s, e.vars.pauseOnAction) : u || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
            }
            o = null, r = null, f = null, l = null, x = 0
          }
        }
        
        var o, r, l, c, f, m, g, v, y, w = !1, b = 0, _ = 0, x = 0;
        a ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = s, e.addEventListener("MSGestureChange", i, !1), e.addEventListener("MSGestureEnd", n, !1)) : (g = function (t) {
          s.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (s.pause(), c = d ? s.h : s.w, m = Number(new Date), b = t.touches[0].pageX, _ = t.touches[0].pageY, l = p && h && s.animatingTo === s.last ? 0 : p && h ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : p && s.currentSlide === s.last ? s.limit : p ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : h ? (s.last - s.currentSlide + s.cloneOffset) * c : (s.currentSlide + s.cloneOffset) * c, o = d ? _ : b, r = d ? b : _, e.addEventListener("touchmove", v, !1), e.addEventListener("touchend", y, !1))
        }, v = function (t) {
          b = t.touches[0].pageX, _ = t.touches[0].pageY, f = d ? o - _ : o - b;
          (!(w = d ? Math.abs(f) < Math.abs(b - r) : Math.abs(f) < Math.abs(_ - r)) || Number(new Date) - m > 500) && (t.preventDefault(), !u && s.transitions && (s.vars.animationLoop || (f /= 0 === s.currentSlide && 0 > f || s.currentSlide === s.last && f > 0 ? Math.abs(f) / c + 2 : 1), s.setProps(l + f, "setTouch")))
        }, y = function (t) {
          if (e.removeEventListener("touchmove", v, !1), s.animatingTo === s.currentSlide && !w && null !== f) {
            var i = h ? -f : f, n = s.getTarget(i > 0 ? "next" : "prev");
            s.canAdvance(n) && (Number(new Date) - m < 550 && Math.abs(i) > 50 || Math.abs(i) > c / 2) ? s.flexAnimate(n, s.vars.pauseOnAction) : u || s.flexAnimate(s.currentSlide, s.vars.pauseOnAction, !0)
          }
          e.removeEventListener("touchend", y, !1), o = null, r = null, f = null, l = null
        }, e.addEventListener("touchstart", g, !1))
      }, resize: function () {
        !s.animating && s.is(":visible") && (p || s.doMath(), u ? m.smoothHeight() : p ? (s.slides.width(s.computedW), s.update(s.pagingCount), s.setProps()) : d ? (s.viewport.height(s.h), s.setProps(s.h, "setTotal")) : (s.vars.smoothHeight && m.smoothHeight(), s.newSlides.width(s.computedW), s.setProps(s.computedW, "setTotal")))
      }, smoothHeight: function (t) {
        if (!d || u) {
          var e = u ? s : s.viewport;
          t ? e.animate({height: s.slides.eq(s.animatingTo).height()}, t) : e.height(s.slides.eq(s.animatingTo).height())
        }
      }, sync: function (e) {
        var i = t(s.vars.sync).data("flexslider"), n = s.animatingTo;
        switch (e) {
          case"animate":
            i.flexAnimate(n, s.vars.pauseOnAction, !1, !0);
            break;
          case"play":
            i.playing || i.asNav || i.play();
            break;
          case"pause":
            i.pause()
        }
      }, uniqueID: function (e) {
        return e.filter("[id]").add(e.find("[id]")).each(function () {
          var e = t(this);
          e.attr("id", e.attr("id") + "_clone")
        }), e
      }, pauseInvisible: {
        visProp: null, init: function () {
          var t = m.pauseInvisible.getHiddenProp();
          if (t) {
            var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(e, function () {
              m.pauseInvisible.isHidden() ? s.startTimeout ? clearTimeout(s.startTimeout) : s.pause() : s.started ? s.play() : s.vars.initDelay > 0 ? setTimeout(s.play, s.vars.initDelay) : s.play()
            })
          }
        }, isHidden: function () {
          var t = m.pauseInvisible.getHiddenProp();
          return !!t && document[t]
        }, getHiddenProp: function () {
          var t = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var e = 0; e < t.length; e++) if (t[e] + "Hidden" in document) return t[e] + "Hidden";
          return null
        }
      }, setToClearWatchedEvent: function () {
        clearTimeout(n), n = setTimeout(function () {
          c = ""
        }, 3e3)
      }
    }, s.flexAnimate = function (e, i, n, a, l) {
      if (s.vars.animationLoop || e === s.currentSlide || (s.direction = e > s.currentSlide ? "next" : "prev"), f && 1 === s.pagingCount && (s.direction = s.currentItem < e ? "next" : "prev"), !s.animating && (s.canAdvance(e, l) || n) && s.is(":visible")) {
        if (f && a) {
          var c = t(s.vars.asNavFor).data("flexslider");
          if (s.atEnd = 0 === e || e === s.count - 1, c.flexAnimate(e, !0, !1, !0, l), s.direction = s.currentItem < e ? "next" : "prev", c.direction = s.direction, Math.ceil((e + 1) / s.visible) - 1 === s.currentSlide || 0 === e) return s.currentItem = e, s.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), !1;
          s.currentItem = e, s.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), e = Math.floor(e / s.visible)
        }
        if (s.animating = !0, s.animatingTo = e, i && s.pause(), s.vars.before(s), s.syncExists && !l && m.sync("animate"), s.vars.controlNav && m.controlNav.active(), p || s.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), s.atEnd = 0 === e || e === s.last, s.vars.directionNav && m.directionNav.update(), e === s.last && (s.vars.end(s), s.vars.animationLoop || s.pause()), u) r ? (s.slides.eq(s.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), s.slides.eq(e).css({
          opacity: 1,
          zIndex: 2
        }), s.wrapup(w)) : (s.slides.eq(s.currentSlide).css({zIndex: 1}).animate({opacity: 0}, s.vars.animationSpeed, s.vars.easing), s.slides.eq(e).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing, s.wrapup)); else {
          var g, v, y, w = d ? s.slides.filter(":first").height() : s.computedW;
          p ? (g = s.vars.itemMargin, y = (s.itemW + g) * s.move * s.animatingTo, v = y > s.limit && 1 !== s.visible ? s.limit : y) : v = 0 === s.currentSlide && e === s.count - 1 && s.vars.animationLoop && "next" !== s.direction ? h ? (s.count + s.cloneOffset) * w : 0 : s.currentSlide === s.last && 0 === e && s.vars.animationLoop && "prev" !== s.direction ? h ? 0 : (s.count + 1) * w : h ? (s.count - 1 - e + s.cloneOffset) * w : (e + s.cloneOffset) * w, s.setProps(v, "", s.vars.animationSpeed), s.transitions ? (s.vars.animationLoop && s.atEnd || (s.animating = !1, s.currentSlide = s.animatingTo), s.container.unbind("webkitTransitionEnd transitionend"), s.container.bind("webkitTransitionEnd transitionend", function () {
            clearTimeout(s.ensureAnimationEnd), s.wrapup(w)
          }), clearTimeout(s.ensureAnimationEnd), s.ensureAnimationEnd = setTimeout(function () {
            s.wrapup(w)
          }, s.vars.animationSpeed + 100)) : s.container.animate(s.args, s.vars.animationSpeed, s.vars.easing, function () {
            s.wrapup(w)
          })
        }
        s.vars.smoothHeight && m.smoothHeight(s.vars.animationSpeed)
      }
    }, s.wrapup = function (t) {
      u || p || (0 === s.currentSlide && s.animatingTo === s.last && s.vars.animationLoop ? s.setProps(t, "jumpEnd") : s.currentSlide === s.last && 0 === s.animatingTo && s.vars.animationLoop && s.setProps(t, "jumpStart")), s.animating = !1, s.currentSlide = s.animatingTo, s.vars.after(s)
    }, s.animateSlides = function () {
      !s.animating && !0 && s.flexAnimate(s.getTarget("next"))
    }, s.pause = function () {
      clearInterval(s.animatedSlides), s.animatedSlides = null, s.playing = !1, s.vars.pausePlay && m.pausePlay.update("play"), s.syncExists && m.sync("pause")
    }, s.play = function () {
      s.playing && clearInterval(s.animatedSlides), s.animatedSlides = s.animatedSlides || setInterval(s.animateSlides, s.vars.slideshowSpeed), s.started = s.playing = !0, s.vars.pausePlay && m.pausePlay.update("pause"), s.syncExists && m.sync("play")
    }, s.stop = function () {
      s.pause(), s.stopped = !0
    }, s.canAdvance = function (t, e) {
      var i = f ? s.pagingCount - 1 : s.last;
      return !!e || (!(!f || s.currentItem !== s.count - 1 || 0 !== t || "prev" !== s.direction) || (!f || 0 !== s.currentItem || t !== s.pagingCount - 1 || "next" === s.direction) && (!(t === s.currentSlide && !f) && (!!s.vars.animationLoop || (!s.atEnd || 0 !== s.currentSlide || t !== i || "next" === s.direction) && (!s.atEnd || s.currentSlide !== i || 0 !== t || "next" !== s.direction))))
    }, s.getTarget = function (t) {
      return s.direction = t, "next" === t ? s.currentSlide === s.last ? 0 : s.currentSlide + 1 : 0 === s.currentSlide ? s.last : s.currentSlide - 1
    }, s.setProps = function (t, e, i) {
      var n = function () {
        var i = t || (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo;
        return -1 * function () {
          if (p) return "setTouch" === e ? t : h && s.animatingTo === s.last ? 0 : h ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : s.animatingTo === s.last ? s.limit : i;
          switch (e) {
            case"setTotal":
              return h ? (s.count - 1 - s.currentSlide + s.cloneOffset) * t : (s.currentSlide + s.cloneOffset) * t;
            case"setTouch":
              return t;
            case"jumpEnd":
              return h ? t : s.count * t;
            case"jumpStart":
              return h ? s.count * t : t;
            default:
              return t
          }
        }() + "px"
      }();
      s.transitions && (n = d ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", s.container.css("-" + s.pfx + "-transition-duration", i), s.container.css("transition-duration", i)), s.args[s.prop] = n, (s.transitions || void 0 === i) && s.container.css(s.args), s.container.css("transform", n)
    }, s.setup = function (e) {
      if (u) s.slides.css({
        width: "100%",
        float: "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === e && (r ? s.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + s.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(s.currentSlide).css({opacity: 1, zIndex: 2}) : 0 == s.vars.fadeFirstSlide ? s.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(s.currentSlide).css({zIndex: 2}).css({opacity: 1}) : s.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(s.currentSlide).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing)), s.vars.smoothHeight && m.smoothHeight(); else {
        var i, n;
        "init" === e && (s.viewport = t('<div class="' + o + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(s).append(s.container), s.cloneCount = 0, s.cloneOffset = 0, h && (n = t.makeArray(s.slides).reverse(), s.slides = t(n), s.container.empty().append(s.slides))), s.vars.animationLoop && !p && (s.cloneCount = 2, s.cloneOffset = 1, "init" !== e && s.container.find(".clone").remove(), s.container.append(m.uniqueID(s.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(s.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), s.newSlides = t(s.vars.selector, s), i = h ? s.count - 1 - s.currentSlide + s.cloneOffset : s.currentSlide + s.cloneOffset, d && !p ? (s.container.height(200 * (s.count + s.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
          s.newSlides.css({display: "block"}), s.doMath(), s.viewport.height(s.h), s.setProps(i * s.h, "init")
        }, "init" === e ? 100 : 0)) : (s.container.width(200 * (s.count + s.cloneCount) + "%"), s.setProps(i * s.computedW, "init"), setTimeout(function () {
          s.doMath(), s.newSlides.css({
            width: s.computedW,
            float: "left",
            display: "block"
          }), s.vars.smoothHeight && m.smoothHeight()
        }, "init" === e ? 100 : 0))
      }
      p || s.slides.removeClass(o + "active-slide").eq(s.currentSlide).addClass(o + "active-slide"), s.vars.init(s)
    }, s.doMath = function () {
      var t = s.slides.first(), e = s.vars.itemMargin, i = s.vars.minItems, n = s.vars.maxItems;
      s.w = void 0 === s.viewport ? s.width() : s.viewport.width(), s.h = t.height(), s.boxPadding = t.outerWidth() - t.width(), p ? (s.itemT = s.vars.itemWidth + e, s.minW = i ? i * s.itemT : s.w, s.maxW = n ? n * s.itemT - e : s.w, s.itemW = s.minW > s.w ? (s.w - e * (i - 1)) / i : s.maxW < s.w ? (s.w - e * (n - 1)) / n : s.vars.itemWidth > s.w ? s.w : s.vars.itemWidth, s.visible = Math.floor(s.w / s.itemW), s.move = s.vars.move > 0 && s.vars.move < s.visible ? s.vars.move : s.visible, s.pagingCount = Math.ceil((s.count - s.visible) / s.move + 1), s.last = s.pagingCount - 1, s.limit = 1 === s.pagingCount ? 0 : s.vars.itemWidth > s.w ? s.itemW * (s.count - 1) + e * (s.count - 1) : (s.itemW + e) * s.count - s.w - e) : (s.itemW = s.w, s.pagingCount = s.count, s.last = s.count - 1), s.computedW = s.itemW - s.boxPadding
    }, s.update = function (t, e) {
      s.doMath(), p || (t < s.currentSlide ? s.currentSlide += 1 : t <= s.currentSlide && 0 !== t && (s.currentSlide -= 1), s.animatingTo = s.currentSlide), s.vars.controlNav && !s.manualControls && ("add" === e && !p || s.pagingCount > s.controlNav.length ? m.controlNav.update("add") : ("remove" === e && !p || s.pagingCount < s.controlNav.length) && (p && s.currentSlide > s.last && (s.currentSlide -= 1, s.animatingTo -= 1), m.controlNav.update("remove", s.last))), s.vars.directionNav && m.directionNav.update()
    }, s.addSlide = function (e, i) {
      var n = t(e);
      s.count += 1, s.last = s.count - 1, d && h ? void 0 !== i ? s.slides.eq(s.count - i).after(n) : s.container.prepend(n) : void 0 !== i ? s.slides.eq(i).before(n) : s.container.append(n), s.update(i, "add"), s.slides = t(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.added(s)
    }, s.removeSlide = function (e) {
      var i = isNaN(e) ? s.slides.index(t(e)) : e;
      s.count -= 1, s.last = s.count - 1, isNaN(e) ? t(e, s.slides).remove() : d && h ? s.slides.eq(s.last).remove() : s.slides.eq(e).remove(), s.doMath(), s.update(i, "remove"), s.slides = t(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.removed(s)
    }, m.init()
  }, t(window).blur(function (t) {
    focused = !1
  }).focus(function (t) {
    focused = !0
  }), t.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    fadeFirstSlide: !0,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    customDirectionNav: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function () {
    },
    before: function () {
    },
    after: function () {
    },
    end: function () {
    },
    added: function () {
    },
    removed: function () {
    },
    init: function () {
    }
  }, t.fn.flexslider = function (e) {
    if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function () {
      var i = t(this), s = e.selector ? e.selector : ".slides > li", n = i.find(s);
      1 === n.length && !0 === e.allowOneSlide || 0 === n.length ? (n.fadeIn(400), e.start && e.start(i)) : void 0 === i.data("flexslider") && new t.flexslider(this, e)
    });
    var i = t(this).data("flexslider");
    switch (e) {
      case"play":
        i.play();
        break;
      case"pause":
        i.pause();
        break;
      case"stop":
        i.stop();
        break;
      case"next":
        i.flexAnimate(i.getTarget("next"), !0);
        break;
      case"prev":
      case"previous":
        i.flexAnimate(i.getTarget("prev"), !0);
        break;
      default:
        "number" == typeof e && i.flexAnimate(e, !0)
    }
  }
}(jQuery), window.Modernizr = function (t, e, i) {
  function s(t) {
    f.cssText = t
  }
  
  function n(t, e) {
    return typeof t === e
  }
  
  function o(t, e) {
    for (var s in t) if (f[t[s]] !== i) return "pfx" != e || t[s];
    return !1
  }
  
  function a(t, e, s) {
    for (var o in t) {
      var a = e[t[o]];
      if (a !== i) return !1 === s ? t[o] : n(a, "function") ? a.bind(s || e) : a
    }
    return !1
  }
  
  function r(t, e, i) {
    var s = t.charAt(0).toUpperCase() + t.substr(1), r = (t + " " + v.join(s + " ") + s).split(" ");
    return n(e, "string") || n(e, "undefined") ? o(r, e) : (r = (t + " " + y.join(s + " ") + s).split(" "), a(r, e, i))
  }
  
  var l, c, d = {}, h = e.documentElement, p = "modernizr", u = e.createElement(p), f = u.style,
    m = " -webkit- -moz- -o- -ms- ".split(" "), g = "Webkit Moz O ms", v = g.split(" "), y = g.toLowerCase().split(" "),
    w = {}, b = [], _ = b.slice, x = function (t, i, s, n) {
      var o, a, r, l = e.createElement("div"), c = e.body, d = c || e.createElement("body");
      if (parseInt(s, 10)) for (; s--;) r = e.createElement("div"), r.id = n ? n[s] : p + (s + 1), l.appendChild(r);
      return o = ["&#173;", "<style>", t, "</style>"].join(""), l.id = p, (c ? l : d).innerHTML += o, d.appendChild(l), c || (d.style.background = "", h.appendChild(d)), a = i(l, t), c ? l.parentNode.removeChild(l) : d.parentNode.removeChild(d), !!a
    }, C = {}.hasOwnProperty;
  c = n(C, "undefined") || n(C.call, "undefined") ? function (t, e) {
    return e in t && n(t.constructor.prototype[e], "undefined")
  } : function (t, e) {
    return C.call(t, e)
  }, Function.prototype.bind || (Function.prototype.bind = function (t) {
    var e = this;
    if ("function" != typeof e) throw new TypeError;
    var i = _.call(arguments, 1), s = function () {
      if (this instanceof s) {
        var n = function () {
        };
        n.prototype = e.prototype;
        var o = new n, a = e.apply(o, i.concat(_.call(arguments)));
        return Object(a) === a ? a : o
      }
      return e.apply(t, i.concat(_.call(arguments)))
    };
    return s
  });
  !function (t, i) {
    var s = t.join(""), n = i.length;
    x(s, function (t, i) {
      for (var s = e.styleSheets[e.styleSheets.length - 1], o = (s && (s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText), t.childNodes), a = {}; n--;) a[o[n].id] = o[n];
      d.csstransforms3d = 9 === (a.csstransforms3d && a.csstransforms3d.offsetLeft) && 3 === a.csstransforms3d.offsetHeight
    }, n, i)
  }([, ["@media (", m.join("transform-3d),("), p, ")", "{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
  w.csstransforms = function () {
    return !!r("transform")
  }, w.csstransforms3d = function () {
    var t = !!r("perspective");
    return t && "webkitPerspective" in h.style && (t = d.csstransforms3d), t
  };
  for (var S in w) c(w, S) && (l = S.toLowerCase(), d[l] = w[S](), b.push((d[l] ? "" : "no-") + l));
  return s(""), u = null, function (t, e) {
    function i(t, e) {
      var i = t.createElement("p"), s = t.getElementsByTagName("head")[0] || t.documentElement;
      return i.innerHTML = "x<style>" + e + "</style>", s.insertBefore(i.lastChild, s.firstChild)
    }
    
    function s() {
      var t = d.elements;
      return "string" == typeof t ? t.split(" ") : t
    }
    
    function n(t) {
      var e = {}, i = t.createElement, n = (0, t.createDocumentFragment)();
      t.createElement = function (t) {
        var s = (e[t] || (e[t] = i(t))).cloneNode();
        return d.shivMethods && s.canHaveChildren && !c.test(t) ? n.appendChild(s) : s
      }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/\w+/g, function (t) {
        return e[t] = i(t), n.createElement(t), 'c("' + t + '")'
      }) + ");return n}")(d, n)
    }
    
    function o(t) {
      var e;
      return t.documentShived ? t : (d.shivCSS && !a && (e = !!i(t, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")), r || (e = !n(t)), e && (t.documentShived = e), t)
    }
    
    var a, r, l = t.html5 || {}, c = /^<|^(?:button|form|map|select|textarea)$/i;
    !function () {
      var t = e.createElement("a");
      t.innerHTML = "<xyz></xyz>", a = "hidden" in t, r = 1 == t.childNodes.length || function () {
        try {
          e.createElement("a")
        } catch (t) {
          return !0
        }
        var t = e.createDocumentFragment();
        return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement
      }()
    }();
    var d = {
      elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
      shivCSS: !1 !== l.shivCSS,
      shivMethods: !1 !== l.shivMethods,
      type: "default",
      shivDocument: o
    };
    t.html5 = d, o(e)
  }(this, e), d._version = "2.5.3", d._prefixes = m, d._domPrefixes = y, d._cssomPrefixes = v, d.testProp = function (t) {
    return o([t])
  }, d.testAllProps = r, d.testStyles = x, h.className = h.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + b.join(" "), d
}(0, this.document), function (t, e, i) {
  function s(t) {
    return "[object Function]" == g.call(t)
  }
  
  function n(t) {
    return "string" == typeof t
  }
  
  function o() {
  }
  
  function a(t) {
    return !t || "loaded" == t || "complete" == t || "uninitialized" == t
  }
  
  function r() {
    var t = v.shift();
    y = 1, t ? t.t ? f(function () {
      ("c" == t.t ? p.injectCss : p.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
    }, 0) : (t(), r()) : y = 0
  }
  
  function l(t, i, s, n, o, l, c) {
    function d(e) {
      if (!u && a(h.readyState) && (w.r = u = 1, !y && r(), h.onload = h.onreadystatechange = null, e)) {
        "img" != t && f(function () {
          _.removeChild(h)
        }, 50);
        for (var s in k[i]) k[i].hasOwnProperty(s) && k[i][s].onload()
      }
    }
    
    var c = c || p.errorTimeout, h = {}, u = 0, g = 0, w = {t: s, s: i, e: o, a: l, x: c};
    1 === k[i] && (g = 1, k[i] = [], h = e.createElement(t)), "object" == t ? h.data = i : (h.src = i, h.type = t), h.width = h.height = "0", h.onerror = h.onload = h.onreadystatechange = function () {
      d.call(this, g)
    }, v.splice(n, 0, w), "img" != t && (g || 2 === k[i] ? (_.insertBefore(h, b ? null : m), f(d, c)) : k[i].push(h))
  }
  
  function c(t, e, i, s, o) {
    return y = 0, e = e || "j", n(t) ? l("c" == e ? C : x, t, e, this.i++, i, s, o) : (v.splice(this.i++, 0, t), 1 == v.length && r()), this
  }
  
  function d() {
    var t = p;
    return t.loader = {load: c, i: 0}, t
  }
  
  var h, p, u = e.documentElement, f = t.setTimeout, m = e.getElementsByTagName("script")[0], g = {}.toString, v = [],
    y = 0, w = "MozAppearance" in u.style, b = w && !!e.createRange().compareNode, _ = b ? u : m.parentNode,
    u = t.opera && "[object Opera]" == g.call(t.opera), u = !!e.attachEvent && !u,
    x = w ? "object" : u ? "script" : "img", C = u ? "script" : x, S = Array.isArray || function (t) {
      return "[object Array]" == g.call(t)
    }, T = [], k = {}, $ = {
      timeout: function (t, e) {
        return e.length && (t.timeout = e[0]), t
      }
    };
  (p = function (t) {
    function e(t) {
      var e, i, s, t = t.split("!"), n = T.length, o = t.pop(), a = t.length, o = {url: o, origUrl: o, prefixes: t};
      for (i = 0; i < a; i++) s = t[i].split("="), (e = $[s.shift()]) && (o = e(o, s));
      for (i = 0; i < n; i++) o = T[i](o);
      return o
    }
    
    function a(t, n, o, a, l) {
      var c = e(t), h = c.autoCallback;
      c.url.split(".").pop().split("?").shift(), c.bypass || (n && (n = s(n) ? n : n[t] || n[a] || n[t.split("/").pop().split("?")[0]] || r), c.instead ? c.instead(t, n, o, a, l) : (k[c.url] ? c.noexec = !0 : k[c.url] = 1, o.load(c.url, c.forceCSS || !c.forceJS && "css" == c.url.split(".").pop().split("?").shift() ? "c" : i, c.noexec, c.attrs, c.timeout), (s(n) || s(h)) && o.load(function () {
        d(), n && n(c.origUrl, l, a), h && h(c.origUrl, l, a), k[c.url] = 2
      })))
    }
    
    function l(t, e) {
      function i(t, i) {
        if (t) {
          if (n(t)) i || (h = function () {
            var t = [].slice.call(arguments);
            p.apply(this, t), u()
          }), a(t, h, e, 0, c); else if (Object(t) === t) for (l in r = function () {
            var e, i = 0;
            for (e in t) t.hasOwnProperty(e) && i++;
            return i
          }(), t) t.hasOwnProperty(l) && (!i && !--r && (s(h) ? h = function () {
            var t = [].slice.call(arguments);
            p.apply(this, t), u()
          } : h[l] = function (t) {
            return function () {
              var e = [].slice.call(arguments);
              t && t.apply(this, e), u()
            }
          }(p[l])), a(t[l], h, e, l, c))
        } else !i && u()
      }
      
      var r, l, c = !!t.test, d = t.load || t.both, h = t.callback || o, p = h, u = t.complete || o;
      i(c ? t.yep : t.nope, !!d), d && i(d)
    }
    
    var c, h, u = this.yepnope.loader;
    if (n(t)) a(t, 0, u, 0); else if (S(t)) for (c = 0; c < t.length; c++) h = t[c], n(h) ? a(h, 0, u, 0) : S(h) ? p(h) : Object(h) === h && l(h, u); else Object(t) === t && l(t, u)
  }).addPrefix = function (t, e) {
    $[t] = e
  }, p.addFilter = function (t) {
    T.push(t)
  }, p.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", h = function () {
    e.removeEventListener("DOMContentLoaded", h, 0), e.readyState = "complete"
  }, 0)), t.yepnope = d(), t.yepnope.executeStack = r, t.yepnope.injectJs = function (t, i, s, n, l, c) {
    var d, h, u = e.createElement("script"), n = n || p.errorTimeout;
    u.src = t;
    for (h in s) u.setAttribute(h, s[h]);
    i = c ? r : i || o, u.onreadystatechange = u.onload = function () {
      !d && a(u.readyState) && (d = 1, i(), u.onload = u.onreadystatechange = null)
    }, f(function () {
      d || (d = 1, i(1))
    }, n), l ? u.onload() : m.parentNode.insertBefore(u, m)
  }, t.yepnope.injectCss = function (t, i, s, n, a, l) {
    var c, n = e.createElement("link"), i = l ? r : i || o;
    n.href = t, n.rel = "stylesheet", n.type = "text/css";
    for (c in s) n.setAttribute(c, s[c]);
    a || (m.parentNode.insertBefore(n, m), f(i, 0))
  }
}(this, document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0))
}, function (t) {
  var e = t(window), i = e.height();
  e.resize(function () {
    i = e.height()
  }), t.fn.parallax = function (s, n, o) {
    function a() {
      var o = e.scrollTop();
      c.each(function () {
        var e = t(this), a = e.offset().top;
        a + (e = r(e)) < o || a > o + i || c.css("backgroundPosition", s + " " + Math.round((l - o) * n) + "px")
      })
    }
    
    var r, l, c = t(this);
    c.each(function () {
      l = c.offset().top
    }), r = o ? function (t) {
      return t.outerHeight(!0)
    } : function (t) {
      return t.height()
    }, (1 > arguments.length || null === s) && (s = "50%"), (2 > arguments.length || null === n) && (n = .1), (3 > arguments.length || null === o) && (o = !0), e.bind("scroll", a).resize(a), a()
  }
}(jQuery), function (t, e, i, s) {
  function n(e, i) {
    var o = this;
    "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this, i)), this.$element = t(e), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
    var a = (this.position + "").toLowerCase().match(/\S+/g) || [];
    return 1 > a.length && a.push("center"), 1 == a.length && a.push(a[0]), "top" != a[0] && "bottom" != a[0] && "left" != a[1] && "right" != a[1] || (a = [a[1], a[0]]), this.positionX != s && (a[0] = this.positionX.toLowerCase()), this.positionY != s && (a[1] = this.positionY.toLowerCase()), o.positionX = a[0], o.positionY = a[1], "left" != this.positionX && "right" != this.positionX && (isNaN(parseInt(this.positionX)) ? this.positionX = "center" : this.positionX = parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (isNaN(parseInt(this.positionY)) ? this.positionY = "center" : this.positionY = parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
      backgroundImage: "url(" + this.imageSrc + ")",
      backgroundSize: "cover",
      backgroundPosition: this.position
    }), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
      backgroundImage: "url(" + this.imageSrc + ")",
      backgroundSize: "cover",
      backgroundPosition: this.position
    }), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), this.$mirror.addClass("parallax_images-mirror").css({
      visibility: "hidden",
      zIndex: this.zIndex,
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden"
    }), this.$slider.addClass("parallax_images-slider").one("load", function () {
      o.naturalHeight && o.naturalWidth || (o.naturalHeight = this.naturalHeight || this.height || 1, o.naturalWidth = this.naturalWidth || this.width || 1), o.aspectRatio = o.naturalWidth / o.naturalHeight, n.isSetup || n.setup(), n.sliders.push(o), n.isFresh = !1, n.requestRender()
    }), this.$slider[0].src = this.imageSrc, void((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")))
  }
  
  !function () {
    for (var t = 0, i = ["ms", "moz", "webkit", "o"], s = 0; s < i.length && !e.requestAnimationFrame; ++s) e.requestAnimationFrame = e[i[s] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[s] + "CancelAnimationFrame"] || e[i[s] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function (i) {
      var s = (new Date).getTime(), n = Math.max(0, 16 - (s - t)), o = e.setTimeout(function () {
        i(s + n)
      }, n);
      return t = s + n, o
    }), e.cancelAnimationFrame || (e.cancelAnimationFrame = function (t) {
      clearTimeout(t)
    })
  }(), t.extend(n.prototype, {
    speed: .2,
    bleed: 0,
    zIndex: -100,
    iosFix: !0,
    androidFix: !0,
    position: "center",
    overScrollFix: !1,
    refresh: function () {
      this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
      var t = n.winHeight, e = Math.min(this.boxOffsetTop, n.docHeight - t),
        t = Math.max(this.boxOffsetTop + this.boxHeight - t, 0), t = this.boxHeight + (e - t) * (1 - this.speed) | 0,
        e = (this.boxOffsetTop - e) * (1 - this.speed) | 0;
      t * this.aspectRatio >= this.boxWidth ? (this.imageWidth = t * this.aspectRatio | 0, this.imageHeight = t, this.offsetBaseTop = e, t = this.imageWidth - this.boxWidth, "left" == this.positionX ? this.offsetLeft = 0 : "right" == this.positionX ? this.offsetLeft = -t : isNaN(this.positionX) ? this.offsetLeft = -t / 2 | 0 : this.offsetLeft = Math.max(this.positionX, -t)) : (this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0, t = this.imageHeight - t, "top" == this.positionY ? this.offsetBaseTop = e : "bottom" == this.positionY ? this.offsetBaseTop = e - t : isNaN(this.positionY) ? this.offsetBaseTop = e - t / 2 | 0 : this.offsetBaseTop = e + Math.max(this.positionY, -t))
    },
    render: function () {
      var t = n.scrollTop, e = n.scrollLeft, i = this.overScrollFix ? n.overScroll : 0, s = t + n.winHeight;
      this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < s ? "visible" : "hidden", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - e, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
        transform: "translate3d(0px, 0px, 0px)",
        visibility: this.visibility,
        top: this.mirrorTop - i,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      }), this.$slider.css({
        transform: "translate3d(0px, 0px, 0px)",
        position: "absolute",
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: "none"
      })
    }
  }), t.extend(n, {
    scrollTop: 0,
    scrollLeft: 0,
    winHeight: 0,
    winWidth: 0,
    docHeight: 1073741824,
    docWidth: 1073741824,
    sliders: [],
    isReady: !1,
    isFresh: !1,
    isBusy: !1,
    setup: function () {
      if (!this.isReady) {
        var s = t(i), o = t(e);
        o.on("resize.px.parallax_images load.px.parallax_images", function () {
          n.winHeight = o.height(), n.winWidth = o.width(), n.docHeight = s.height(), n.docWidth = s.width(), n.isFresh = !1, n.requestRender()
        }).on("scroll.px.parallax_images load.px.parallax_images", function () {
          var t = n.docHeight - n.winHeight, e = n.docWidth - n.winWidth;
          n.scrollTop = Math.max(0, Math.min(t, o.scrollTop())), n.scrollLeft = Math.max(0, Math.min(e, o.scrollLeft())), n.overScroll = Math.max(o.scrollTop() - t, Math.min(o.scrollTop(), 0)), n.requestRender()
        }), this.isReady = !0
      }
    },
    configure: function (e) {
      "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this.prototype, e))
    },
    refresh: function () {
      t.each(this.sliders, function () {
        this.refresh()
      }), this.isFresh = !0
    },
    render: function () {
      this.isFresh || this.refresh(), t.each(this.sliders, function () {
        this.render()
      })
    },
    requestRender: function () {
      var t = this;
      this.isBusy || (this.isBusy = !0, e.requestAnimationFrame(function () {
        t.render(), t.isBusy = !1
      }))
    }
  });
  var o = t.fn.parallax_images;
  t.fn.parallax_images = function (s) {
    return this.each(function () {
      var o = t(this), a = "object" == typeof s && s;
      this == e || this == i || o.is("body") ? n.configure(a) : o.data("px.parallax_images") || (a = t.extend({}, o.data(), a), o.data("px.parallax_images", new n(this, a))), "string" == typeof s && n[s]()
    })
  }, t.fn.parallax_images.Constructor = n, t.fn.parallax_images.noConflict = function () {
    return t.fn.parallax_images = o, this
  }, t(i).on("ready.px.parallax_images.data-api", function () {
    t('[data-parallax_images="scroll"]').parallax_images()
  })
}(jQuery, window, document), function () {
  var t = !1;
  window.JQClass = function () {
  }, JQClass.classes = {}, JQClass.extend = function e(i) {
    function s() {
      !t && this._init && this._init.apply(this, arguments)
    }
    
    var n = this.prototype;
    t = !0;
    var o = new this;
    t = !1;
    for (var a in i) o[a] = "function" == typeof i[a] && "function" == typeof n[a] ? function (t, e) {
      return function () {
        var i = this._super;
        this._super = function (e) {
          return n[t].apply(this, e || [])
        };
        var s = e.apply(this, arguments);
        return this._super = i, s
      }
    }(a, i[a]) : i[a];
    return s.prototype = o, s.prototype.constructor = s, s.extend = e, s
  }
}(), function ($) {
  function camelCase(t) {
    return t.replace(/-([a-z])/g, function (t, e) {
      return e.toUpperCase()
    })
  }
  
  JQClass.classes.JQPlugin = JQClass.extend({
    name: "plugin",
    defaultOptions: {},
    regionalOptions: {},
    _getters: [],
    _getMarker: function () {
      return "is-" + this.name
    },
    _init: function () {
      $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
      var t = camelCase(this.name);
      $[t] = this, $.fn[t] = function (e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return $[t]._isNotChained(e, i) ? $[t][e].apply($[t], [this[0]].concat(i)) : this.each(function () {
          if ("string" == typeof e) {
            if ("_" === e[0] || !$[t][e]) throw"Unknown method: " + e;
            $[t][e].apply($[t], [this].concat(i))
          } else $[t]._attach(this, e)
        })
      }
    },
    setDefaults: function (t) {
      $.extend(this.defaultOptions, t || {})
    },
    _isNotChained: function (t, e) {
      return "option" === t && (0 === e.length || 1 === e.length && "string" == typeof e[0]) || $.inArray(t, this._getters) > -1
    },
    _attach: function (t, e) {
      if (!(t = $(t)).hasClass(this._getMarker())) {
        t.addClass(this._getMarker()), e = $.extend({}, this.defaultOptions, this._getMetadata(t), e || {});
        var i = $.extend({name: this.name, elem: t, options: e}, this._instSettings(t, e));
        t.data(this.name, i), this._postAttach(t, i), this.option(t, e)
      }
    },
    _instSettings: function (t, e) {
      return {}
    },
    _postAttach: function (t, e) {
    },
    _getMetadata: function (d) {
      try {
        var f = d.data(this.name.toLowerCase()) || "";
        f = f.replace(/'/g, '"'), f = f.replace(/([a-zA-Z0-9]+):/g, function (t, e, i) {
          var s = f.substring(0, i).match(/"/g);
          return s && s.length % 2 != 0 ? e + ":" : '"' + e + '":'
        }), f = $.parseJSON("{" + f + "}");
        for (var g in f) {
          var h = f[g];
          "string" == typeof h && h.match(/^new Date\((.*)\)$/) && (f[g] = eval(h))
        }
        return f
      } catch (t) {
        return {}
      }
    },
    _getInst: function (t) {
      return $(t).data(this.name) || {}
    },
    option: function (t, e, i) {
      var s = (t = $(t)).data(this.name);
      if (!e || "string" == typeof e && null == i) return (n = (s || {}).options) && e ? n[e] : n;
      if (t.hasClass(this._getMarker())) {
        var n = e || {};
        "string" == typeof e && ((n = {})[e] = i), this._optionsChanged(t, s, n), $.extend(s.options, n)
      }
    },
    _optionsChanged: function (t, e, i) {
    },
    destroy: function (t) {
      (t = $(t)).hasClass(this._getMarker()) && (this._preDestroy(t, this._getInst(t)), t.removeData(this.name).removeClass(this._getMarker()))
    },
    _preDestroy: function (t, e) {
    }
  }), $.JQPlugin = {
    createPlugin: function (t, e) {
      "object" == typeof t && (e = t, t = "JQPlugin"), t = camelCase(t);
      var i = camelCase(e.name);
      JQClass.classes[i] = JQClass.classes[t].extend(e), new JQClass.classes[i]
    }
  }
}(jQuery), function (t) {
  var e = "countdown";
  t.JQPlugin.createPlugin({
    name: e,
    defaultOptions: {
      until: null,
      since: null,
      timezone: null,
      serverSync: null,
      format: "dHMS",
      layout: "",
      compact: !1,
      padZeroes: !1,
      significant: 0,
      description: "",
      expiryUrl: "",
      expiryText: "",
      alwaysExpire: !1,
      onExpiry: null,
      onTick: null,
      tickInterval: 1
    },
    regionalOptions: {
      "": {
        labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
        labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
        compactLabels: ["y", "m", "w", "d"],
        whichLabels: null,
        digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        timeSeparator: ":",
        isRTL: !1
      }
    },
    _getters: ["getTimes"],
    _rtlClass: e + "-rtl",
    _sectionClass: e + "-section",
    _amountClass: e + "-amount",
    _periodClass: e + "-period",
    _rowClass: e + "-row",
    _holdingClass: e + "-holding",
    _showClass: e + "-show",
    _descrClass: e + "-descr",
    _timerElems: [],
    _init: function () {
      function e(t) {
        var r = t < 1e12 ? n ? performance.now() + performance.timing.navigationStart : s() : t || s();
        r - a >= 1e3 && (i._updateElems(), a = r), o(e)
      }
      
      var i = this;
      this._super(), this._serverSyncs = [];
      var s = "function" == typeof Date.now ? Date.now : function () {
          return (new Date).getTime()
        }, n = window.performance && "function" == typeof window.performance.now,
        o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
        a = 0;
      !o || t.noRequestAnimationFrame ? (t.noRequestAnimationFrame = null, setInterval(function () {
        i._updateElems()
      }, 980)) : (a = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || s(), o(e))
    },
    UTCDate: function (t, e, i, s, n, o, a, r) {
      "object" == typeof e && e.constructor == Date && (r = e.getMilliseconds(), a = e.getSeconds(), o = e.getMinutes(), n = e.getHours(), s = e.getDate(), i = e.getMonth(), e = e.getFullYear());
      var l = new Date;
      return l.setUTCFullYear(e), l.setUTCDate(1), l.setUTCMonth(i || 0), l.setUTCDate(s || 1), l.setUTCHours(n || 0), l.setUTCMinutes((o || 0) - (Math.abs(t) < 30 ? 60 * t : t)), l.setUTCSeconds(a || 0), l.setUTCMilliseconds(r || 0), l
    },
    periodsToSeconds: function (t) {
      return 31557600 * t[0] + 2629800 * t[1] + 604800 * t[2] + 86400 * t[3] + 3600 * t[4] + 60 * t[5] + t[6]
    },
    resync: function () {
      var e = this;
      t("." + this._getMarker()).each(function () {
        var i = t.data(this, e.name);
        if (i.options.serverSync) {
          for (var s = null, n = 0; n < e._serverSyncs.length; n++) if (e._serverSyncs[n][0] == i.options.serverSync) {
            s = e._serverSyncs[n];
            break
          }
          if (null == s[2]) {
            var o = t.isFunction(i.options.serverSync) ? i.options.serverSync.apply(this, []) : null;
            s[2] = (o ? (new Date).getTime() - o.getTime() : 0) - s[1]
          }
          i._since && i._since.setMilliseconds(i._since.getMilliseconds() + s[2]), i._until.setMilliseconds(i._until.getMilliseconds() + s[2])
        }
      });
      for (var i = 0; i < e._serverSyncs.length; i++) null != e._serverSyncs[i][2] && (e._serverSyncs[i][1] += e._serverSyncs[i][2], delete e._serverSyncs[i][2])
    },
    _instSettings: function (t, e) {
      return {_periods: [0, 0, 0, 0, 0, 0, 0]}
    },
    _addElem: function (t) {
      this._hasElem(t) || this._timerElems.push(t)
    },
    _hasElem: function (e) {
      return t.inArray(e, this._timerElems) > -1
    },
    _removeElem: function (e) {
      this._timerElems = t.map(this._timerElems, function (t) {
        return t == e ? null : t
      })
    },
    _updateElems: function () {
      for (var t = this._timerElems.length - 1; t >= 0; t--) this._updateCountdown(this._timerElems[t])
    },
    _optionsChanged: function (e, i, s) {
      s.layout && (s.layout = s.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(i.options, s);
      var n = i.options.timezone != s.timezone;
      t.extend(i.options, s), this._adjustSettings(e, i, null != s.until || null != s.since || n);
      var o = new Date;
      (i._since && i._since < o || i._until && i._until > o) && this._addElem(e[0]), this._updateCountdown(e, i)
    },
    _updateCountdown: function (e, i) {
      if (e = e.jquery ? e : t(e), i = i || this._getInst(e)) {
        if (e.html(this._generateHTML(i)).toggleClass(this._rtlClass, i.options.isRTL), t.isFunction(i.options.onTick)) {
          var s = "lap" != i._hold ? i._periods : this._calculatePeriods(i, i._show, i.options.significant, new Date);
          1 != i.options.tickInterval && this.periodsToSeconds(s) % i.options.tickInterval != 0 || i.options.onTick.apply(e[0], [s])
        }
        if ("pause" != i._hold && (i._since ? i._now.getTime() < i._since.getTime() : i._now.getTime() >= i._until.getTime()) && !i._expiring) {
          if (i._expiring = !0, this._hasElem(e[0]) || i.options.alwaysExpire) {
            if (this._removeElem(e[0]), t.isFunction(i.options.onExpiry) && i.options.onExpiry.apply(e[0], []), i.options.expiryText) {
              var n = i.options.layout;
              i.options.layout = i.options.expiryText, this._updateCountdown(e[0], i), i.options.layout = n
            }
            i.options.expiryUrl && (window.location = i.options.expiryUrl)
          }
          i._expiring = !1
        } else "pause" == i._hold && this._removeElem(e[0])
      }
    },
    _resetExtraLabels: function (t, e) {
      for (var i in e) i.match(/[Ll]abels[02-9]|compactLabels1/) && (t[i] = e[i]);
      for (var i in t) i.match(/[Ll]abels[02-9]|compactLabels1/) && void 0 === e[i] && (t[i] = null)
    },
    _adjustSettings: function (e, i, s) {
      for (var n = null, o = 0; o < this._serverSyncs.length; o++) if (this._serverSyncs[o][0] == i.options.serverSync) {
        n = this._serverSyncs[o][1];
        break
      }
      if (null != n) var a = i.options.serverSync ? n : 0, r = new Date; else {
        var l = t.isFunction(i.options.serverSync) ? i.options.serverSync.apply(e[0], []) : null, r = new Date,
          a = l ? r.getTime() - l.getTime() : 0;
        this._serverSyncs.push([i.options.serverSync, a])
      }
      var c = i.options.timezone;
      c = null == c ? -r.getTimezoneOffset() : c, (s || !s && null == i._until && null == i._since) && (i._since = i.options.since, null != i._since && (i._since = this.UTCDate(c, this._determineTime(i._since, null)), i._since && a && i._since.setMilliseconds(i._since.getMilliseconds() + a)), i._until = this.UTCDate(c, this._determineTime(i.options.until, r)), a && i._until.setMilliseconds(i._until.getMilliseconds() + a)), i._show = this._determineShow(i)
    },
    _preDestroy: function (t, e) {
      this._removeElem(t[0]), t.empty()
    },
    pause: function (t) {
      this._hold(t, "pause")
    },
    lap: function (t) {
      this._hold(t, "lap")
    },
    resume: function (t) {
      this._hold(t, null)
    },
    toggle: function (e) {
      this[(t.data(e, this.name) || {})._hold ? "resume" : "pause"](e)
    },
    toggleLap: function (e) {
      this[(t.data(e, this.name) || {})._hold ? "resume" : "lap"](e)
    },
    _hold: function (e, i) {
      var s = t.data(e, this.name);
      if (s) {
        if ("pause" == s._hold && !i) {
          s._periods = s._savePeriods;
          var n = s._since ? "-" : "+";
          s[s._since ? "_since" : "_until"] = this._determineTime(n + s._periods[0] + "y" + n + s._periods[1] + "o" + n + s._periods[2] + "w" + n + s._periods[3] + "d" + n + s._periods[4] + "h" + n + s._periods[5] + "m" + n + s._periods[6] + "s"), this._addElem(e)
        }
        s._hold = i, s._savePeriods = "pause" == i ? s._periods : null, t.data(e, this.name, s), this._updateCountdown(e, s)
      }
    },
    getTimes: function (e) {
      var i = t.data(e, this.name);
      return i ? "pause" == i._hold ? i._savePeriods : i._hold ? this._calculatePeriods(i, i._show, i.options.significant, new Date) : i._periods : null
    },
    _determineTime: function (t, e) {
      var i = this, s = null == t ? e : "string" == typeof t ? function (t) {
        t = t.toLowerCase();
        for (var e = new Date, s = e.getFullYear(), n = e.getMonth(), o = e.getDate(), a = e.getHours(), r = e.getMinutes(), l = e.getSeconds(), c = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, d = c.exec(t); d;) {
          switch (d[2] || "s") {
            case"s":
              l += parseInt(d[1], 10);
              break;
            case"m":
              r += parseInt(d[1], 10);
              break;
            case"h":
              a += parseInt(d[1], 10);
              break;
            case"d":
              o += parseInt(d[1], 10);
              break;
            case"w":
              o += 7 * parseInt(d[1], 10);
              break;
            case"o":
              n += parseInt(d[1], 10), o = Math.min(o, i._getDaysInMonth(s, n));
              break;
            case"y":
              s += parseInt(d[1], 10), o = Math.min(o, i._getDaysInMonth(s, n))
          }
          d = c.exec(t)
        }
        return new Date(s, n, o, a, r, l, 0)
      }(t) : "number" == typeof t ? function (t) {
        var e = new Date;
        return e.setTime(e.getTime() + 1e3 * t), e
      }(t) : t;
      return s && s.setMilliseconds(0), s
    },
    _getDaysInMonth: function (t, e) {
      return 32 - new Date(t, e, 32).getDate()
    },
    _normalLabels: function (t) {
      return t
    },
    _generateHTML: function (e) {
      var i = this;
      e._periods = e._hold ? e._periods : this._calculatePeriods(e, e._show, e.options.significant, new Date);
      for (var s = !1, n = 0, o = e.options.significant, a = t.extend({}, e._show), r = 0; r <= 6; r++) s |= "?" == e._show[r] && e._periods[r] > 0, a[r] = "?" != e._show[r] || s ? e._show[r] : null, n += a[r] ? 1 : 0, o -= e._periods[r] > 0 ? 1 : 0;
      for (var l = [!1, !1, !1, !1, !1, !1, !1], r = 6; r >= 0; r--) e._show[r] && (e._periods[r] ? l[r] = !0 : (l[r] = o > 0, o--));
      var c = e.options.compact ? e.options.compactLabels : e.options.labels,
        d = e.options.whichLabels || this._normalLabels, h = function (t) {
          var s = e.options["compactLabels" + d(e._periods[t])];
          return a[t] ? i._translateDigits(e, e._periods[t]) + (s ? s[t] : c[t]) + " " : ""
        }, p = e.options.padZeroes ? 2 : 1, u = function (t) {
          var s = e.options["labels" + d(e._periods[t])];
          return !e.options.significant && a[t] || e.options.significant && l[t] ? '<span class="' + i._sectionClass + '"><span class="' + i._amountClass + '">' + i._minDigits(e, e._periods[t], p) + '</span><span class="' + i._periodClass + '">' + (s ? s[t] : c[t]) + "</span></span>" : ""
        };
      return e.options.layout ? this._buildLayout(e, a, e.options.layout, e.options.compact, e.options.significant, l) : (e.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (e._hold ? " " + this._holdingClass : "") + '">' + h(0) + h(1) + h(2) + h(3) + (a[4] ? this._minDigits(e, e._periods[4], 2) : "") + (a[5] ? (a[4] ? e.options.timeSeparator : "") + this._minDigits(e, e._periods[5], 2) : "") + (a[6] ? (a[4] || a[5] ? e.options.timeSeparator : "") + this._minDigits(e, e._periods[6], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (e.options.significant || n) + (e._hold ? " " + this._holdingClass : "") + '">' + u(0) + u(1) + u(2) + u(3) + u(4) + u(5) + u(6)) + "</span>" + (e.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + e.options.description + "</span>" : "")
    },
    _buildLayout: function (e, i, s, n, o, a) {
      for (var r = e.options[n ? "compactLabels" : "labels"], l = e.options.whichLabels || this._normalLabels, c = function (t) {
        return (e.options[(n ? "compactLabels" : "labels") + l(e._periods[t])] || r)[t]
      }, d = function (t, i) {
        return e.options.digits[Math.floor(t / i) % 10]
      }, h = {
        desc: e.options.description,
        sep: e.options.timeSeparator,
        yl: c(0),
        yn: this._minDigits(e, e._periods[0], 1),
        ynn: this._minDigits(e, e._periods[0], 2),
        ynnn: this._minDigits(e, e._periods[0], 3),
        y1: d(e._periods[0], 1),
        y10: d(e._periods[0], 10),
        y100: d(e._periods[0], 100),
        y1000: d(e._periods[0], 1e3),
        ol: c(1),
        on: this._minDigits(e, e._periods[1], 1),
        onn: this._minDigits(e, e._periods[1], 2),
        onnn: this._minDigits(e, e._periods[1], 3),
        o1: d(e._periods[1], 1),
        o10: d(e._periods[1], 10),
        o100: d(e._periods[1], 100),
        o1000: d(e._periods[1], 1e3),
        wl: c(2),
        wn: this._minDigits(e, e._periods[2], 1),
        wnn: this._minDigits(e, e._periods[2], 2),
        wnnn: this._minDigits(e, e._periods[2], 3),
        w1: d(e._periods[2], 1),
        w10: d(e._periods[2], 10),
        w100: d(e._periods[2], 100),
        w1000: d(e._periods[2], 1e3),
        dl: c(3),
        dn: this._minDigits(e, e._periods[3], 1),
        dnn: this._minDigits(e, e._periods[3], 2),
        dnnn: this._minDigits(e, e._periods[3], 3),
        d1: d(e._periods[3], 1),
        d10: d(e._periods[3], 10),
        d100: d(e._periods[3], 100),
        d1000: d(e._periods[3], 1e3),
        hl: c(4),
        hn: this._minDigits(e, e._periods[4], 1),
        hnn: this._minDigits(e, e._periods[4], 2),
        hnnn: this._minDigits(e, e._periods[4], 3),
        h1: d(e._periods[4], 1),
        h10: d(e._periods[4], 10),
        h100: d(e._periods[4], 100),
        h1000: d(e._periods[4], 1e3),
        ml: c(5),
        mn: this._minDigits(e, e._periods[5], 1),
        mnn: this._minDigits(e, e._periods[5], 2),
        mnnn: this._minDigits(e, e._periods[5], 3),
        m1: d(e._periods[5], 1),
        m10: d(e._periods[5], 10),
        m100: d(e._periods[5], 100),
        m1000: d(e._periods[5], 1e3),
        sl: c(6),
        sn: this._minDigits(e, e._periods[6], 1),
        snn: this._minDigits(e, e._periods[6], 2),
        snnn: this._minDigits(e, e._periods[6], 3),
        s1: d(e._periods[6], 1),
        s10: d(e._periods[6], 10),
        s100: d(e._periods[6], 100),
        s1000: d(e._periods[6], 1e3)
      }, p = s, u = 0; u <= 6; u++) {
        var f = "yowdhms".charAt(u), m = new RegExp("\\{" + f + "<\\}([\\s\\S]*)\\{" + f + ">\\}", "g");
        p = p.replace(m, !o && i[u] || o && a[u] ? "$1" : "")
      }
      return t.each(h, function (t, e) {
        var i = new RegExp("\\{" + t + "\\}", "g");
        p = p.replace(i, e)
      }), p
    },
    _minDigits: function (t, e, i) {
      return (e = "" + e).length >= i ? this._translateDigits(t, e) : (e = "0000000000" + e, this._translateDigits(t, e.substr(e.length - i)))
    },
    _translateDigits: function (t, e) {
      return ("" + e).replace(/[0-9]/g, function (e) {
        return t.options.digits[e]
      })
    },
    _determineShow: function (t) {
      var e = t.options.format, i = [];
      return i[0] = e.match("y") ? "?" : e.match("Y") ? "!" : null, i[1] = e.match("o") ? "?" : e.match("O") ? "!" : null, i[2] = e.match("w") ? "?" : e.match("W") ? "!" : null, i[3] = e.match("d") ? "?" : e.match("D") ? "!" : null, i[4] = e.match("h") ? "?" : e.match("H") ? "!" : null, i[5] = e.match("m") ? "?" : e.match("M") ? "!" : null, i[6] = e.match("s") ? "?" : e.match("S") ? "!" : null, i
    },
    _calculatePeriods: function (t, e, i, s) {
      t._now = s, t._now.setMilliseconds(0);
      var n = new Date(t._now.getTime());
      t._since ? s.getTime() < t._since.getTime() ? t._now = s = n : s = t._since : (n.setTime(t._until.getTime()), s.getTime() > t._until.getTime() && (t._now = s = n));
      var o = [0, 0, 0, 0, 0, 0, 0];
      if (e[0] || e[1]) {
        var a = this._getDaysInMonth(s.getFullYear(), s.getMonth()),
          r = this._getDaysInMonth(n.getFullYear(), n.getMonth()),
          l = n.getDate() == s.getDate() || n.getDate() >= Math.min(a, r) && s.getDate() >= Math.min(a, r),
          c = function (t) {
            return 60 * (60 * t.getHours() + t.getMinutes()) + t.getSeconds()
          },
          d = Math.max(0, 12 * (n.getFullYear() - s.getFullYear()) + n.getMonth() - s.getMonth() + (n.getDate() < s.getDate() && !l || l && c(n) < c(s) ? -1 : 0));
        o[0] = e[0] ? Math.floor(d / 12) : 0, o[1] = e[1] ? d - 12 * o[0] : 0;
        var h = (s = new Date(s.getTime())).getDate() == a,
          p = this._getDaysInMonth(s.getFullYear() + o[0], s.getMonth() + o[1]);
        s.getDate() > p && s.setDate(p), s.setFullYear(s.getFullYear() + o[0]), s.setMonth(s.getMonth() + o[1]), h && s.setDate(p)
      }
      var u = Math.floor((n.getTime() - s.getTime()) / 1e3), f = function (t, i) {
        o[t] = e[t] ? Math.floor(u / i) : 0, u -= o[t] * i
      };
      if (f(2, 604800), f(3, 86400), f(4, 3600), f(5, 60), f(6, 1), u > 0 && !t._since) for (var m = [1, 12, 4.3482, 7, 24, 60, 60], g = 6, v = 1, y = 6; y >= 0; y--) e[y] && (o[g] >= v && (o[g] = 0, u = 1), u > 0 && (o[y]++, u = 0, g = y, v = 1)), v *= m[y];
      if (i) for (y = 0; y <= 6; y++) i && o[y] ? i-- : i || (o[y] = 0);
      return o
    }
  })
}(jQuery), function (t) {
  t.thimContentSlider = function (e, i) {
    function s(e) {
      var i = [e.heading ? "<h4>" + e.heading + "</h4>" : "", e.content ? "<div>" + e.content + "</div>" : ""].join("");
      return t('<li><div class="slide-content" style="margin: ' + y("itemPadding") + 'px;"><img src="' + e.image + '" />' + (i ? '<div class="thumb-content">' + i + "</div>" : "") + "</div></li>")
    }
    
    function n() {
      var e = typeof T.options.items, i = null;
      "string" == e ? i = t(T.options.items) : "object" == e && (i = t(T.options.items).children()), i && (T.options.items = [], i.each(function () {
        var e = t(this), i = e.find("img" + T.options.imageSelector + ":first"), s = i.parent();
        T.options.items.push({
          image: i.attr("src"),
          imageHeading: i.attr("data-heading"),
          imageContent: i.attr("data-content"),
          url: s.is("a") ? s.attr("href") : "",
          content: e.find(T.options.contentSelector)
        })
      }))
    }
    
    function o() {
      var e = ['<div class="slides-wrapper"><ul class="scrollable"></ul></div><a href="prev" class="control-nav prev"></a><a href="next" class="control-nav next"></a>', '<div class="slides-content"></div>'],
        i = t(("top" == T.options.contentPosition ? e.reverse() : e).join("")), n = T.options.items;
      T.$el.html(i), T.$slidesWrapper = T.$el.find(".slides-wrapper"), T.$scrollable = T.$el.find(".scrollable").css({
        marginTop: -y("itemPadding"),
        marginBottom: -y("itemPadding")
      }), T.$slideContent = T.$el.find(".slides-content");
      for (var o = 0, d = n.length; d > o; o++) {
        var h = s({image: n[o].image, heading: n[o].imageHeading, content: n[o].imageContent}),
          u = t('<div class="slide-content" />').append(n[o].content);
        T.$scrollable.append(h), T.$slideContent.append(u)
      }
      T.$items = T.$scrollable.children(), F = y("itemsVisible") <= y("items").length ? y("itemsVisible") : y("items").length, I = Math.floor(F / 2), L = I, D = T.$items.length, O = L, T.$el.on("click", ".control-nav", p).on("click", ".scrollable > li", p), T.options.mouseWheel && T.$el.on("mousewheel", function (t, e, i, s) {
        t.preventDefault(), -1 != e ? m() : g()
      }), T.options.autoPlay && w(), T.options.pauseOnHover && T.$el.hover(function () {
        b()
      }, function () {
        _()
      }), T.$scrollable.bind(B.start, a).bind(B.move, r).bind(B.end, l), c(), T.$slideContent.children().eq(L).css({opacity: 1}).addClass("current").siblings().removeClass("current")
    }
    
    function a() {
    }
    
    function r() {
    }
    
    function l() {
    }
    
    function c() {
      var t = T.$el.find(".control-nav");
      T.$el.hover(function () {
        T.$el.addClass("hover")
      }, function () {
        T.$el.removeClass("hover")
      }), T.$nav = t
    }
    
    function d() {
      var t = T.$nav.height(), e = {top: (W - 2 * y("itemPadding")) / 2, marginTop: -t / 2};
      y("controlNav"), "top" == y("contentPosition") && (e.top += T.$slideContent.outerHeight()), T.$nav.css(e)
    }
    
    function h(t) {
      return t.hasClass("mid-item") ? 0 : T.$items.index(t) - T.$items.index(T.$items.filter(".mid-item"))
    }
    
    function p(e) {
      switch (e.preventDefault(), t(this).attr("href")) {
        case"prev":
          m();
          break;
        case"next":
          g();
          break;
        default:
          var i = t(e.target);
          i.is("li") || (i = i.closest("li")), f(h(i))
      }
    }
    
    function u(e, i) {
      "prev" == e ? T.$items.last().remove() : T.$items.first().remove(), v(), T.$items.eq(I).addClass("mid-item").siblings().removeClass("mid-item"), Q && T.$slideContent.children().eq(O).stop().show().animate({opacity: 1}).siblings().hide(), T.$items.eq(I).find(".thumb-content").show(), T.$scrollable.height(T.$items.eq(I).height()), M = !1, _(), T.$el.hasClass("hover"), d(), t.isFunction(i) && i.apply(T)
    }
    
    function f(t) {
      if (0 == t) return q = "", void(Q = !0);
      Q = 1 == Math.abs(t), q = 250, (0 > t ? m : g).call(this, function () {
        f(0 > t ? t + 1 : t - 1)
      })
    }
    
    function m(t) {
      if (!M) {
        b(), M = !0, T.$slideContent.children().eq(O).stop().animate({opacity: 0}), 0 > --O && (O = D - 1);
        var e = (y("itemPadding"), parseInt((W - j) / 2)), i = T.$items.length, s = 0, n = function () {
          ++s == i && u("prev", t)
        };
        T.$items.last().clone().insertBefore(T.$items.first()).css({left: parseInt(T.$items.first().css("left")) - j}), v(), T.$el.find(".mid-item").removeClass("mid-item"), T.$items.eq(L + 1).addClass("mid-item");
        for (var o = 0; i >= o; o++) {
          var a = {left: R - (L - o) * j, width: j, top: e};
          T.$items.eq(o).find(".thumb-content").hide(), L > o ? a.left -= H : o == L ? (a.left = R, a.top = 0, a.width = W) : o == L + 1 ? (a.left = R + W + H, a.top = e, a.width = j) : a.left += W - j + H, T.$items.eq(o).stop().show().animate(a, q, n)
        }
      }
    }
    
    function g(t) {
      if (!M) {
        b(), M = !0, T.$slideContent.children().eq(O).stop().animate({opacity: 0}), ++O >= D && (O = 0);
        var e = (y("itemPadding"), parseInt((W - j) / 2)), i = T.$items.length, s = 0, n = function () {
          ++s == i && u("next", t)
        };
        T.$items.first().clone().insertAfter(T.$items.last()).css({left: parseInt(T.$items.last().css("left")) + j}), v(), T.$el.find(".mid-item").removeClass("mid-item"), T.$items.eq(L + 1).addClass("mid-item");
        for (var o = 0; i >= o; o++) {
          var a = {left: R - (L - o) * j, width: j, top: e};
          T.$items.eq(o).find(".thumb-content").hide(), L > o ? a.left -= j + H : o == L ? (a.left -= j + H, a.top = e, a.width = j) : o == L + 1 ? (a.left = R, a.top = 0, a.width = W) : a.left = R + W + (o - L - 2) * j + H, T.$items.eq(o).stop().show().animate(a, q, n)
        }
      }
    }
    
    function v() {
      T.$items = T.$scrollable.children()
    }
    
    function y(t) {
      return T.options[t]
    }
    
    function w() {
      P && clearTimeout(P), P = setTimeout(function () {
        w(), g()
      }, y("pauseTime"))
    }
    
    function b() {
      P && clearTimeout(P)
    }
    
    function _() {
      y("autoPlay") && w()
    }
    
    function x(e) {
      if (T.$scrollable.css("width", ""), e = t.extend({
          itemPadding: y("itemPadding"),
          itemMaxWidth: y("itemMaxWidth"),
          itemsVisible: F,
          itemMinWidth: y("itemMinWidth")
        }, e || {}), $ = T.$el.width(), W = parseInt(e.itemMaxWidth + 2 * e.itemPadding), j = parseInt(W / A), (z = j * (e.itemsVisible - 1) + W + 2 * H) > $) {
        var i = (z - $) / (e.itemsVisible + A - 1);
        if (W - i * A < e.itemMinWidth) {
          if (e.itemsVisible - 2 >= 1) return e.itemsVisible -= 2, void x({itemsVisible: e.itemsVisible})
        } else W -= i * A, j -= i;
        z = $
      } else T.$scrollable.width(z);
      R = parseInt((z - W) / 2)
    }
    
    function C() {
      x(), d();
      var t = y("itemPadding");
      T.$scrollable.height(W);
      var e = 0, i = parseInt((W - j) / 2), s = T.$items.length - 1;
      T.$items.hide();
      for (var n = 0; s >= n; n++) T.$items.eq(n).show(), n == L ? (T.$items.eq(n).css({
        left: parseInt(R),
        width: parseInt(W)
      }).addClass("mid-item").find(".slide-content").css({margin: t}), T.$scrollable.height(T.$items.eq(n).height())) : (e = R - (L - n) * j, n > L ? e += W - j + H : e -= H, T.$items.eq(n).css({
        width: parseInt(j),
        left: parseInt(e),
        top: parseInt(i)
      }).removeClass("mid-item"))
    }
    
    function S(t) {
      t ? C() : (E && clearTimeout(E), E = setTimeout(function () {
        C()
      }, 350))
    }
    
    this.$el = t(e).addClass("thim-content-slider"), this.$items = [], this.options = t.extend({}, t.fn.thimContentSlider.defaults, i);
    var T = this, k = t(window), $ = (t(document), t(document.body), 0), E = null, P = null, I = 0, L = 0, z = 0,
      M = !1, O = 0, D = 0, A = this.options.activeItemRatio || 2.5, H = this.options.activeItemPadding, j = 0, W = 0,
      F = this.options.itemsVisible || 7, R = 0, N = "ontouchstart" in window || window.navigator.msMaxTouchPoints,
      B = {start: N ? "touchstart" : "mousedown", move: N ? "touchmove" : "mousemove", end: N ? "touchend" : "mouseup"},
      q = "", Q = !0;
    this.pause = b, this.restart = _, this.prev = m, this.next = g, this.update = C, this.move = f, function () {
      n(), o(), k.on("resize.thim-content-slider", function () {
        S()
      }).trigger("resize.thim-content-slider"), C()
    }()
  }, t.fn.thimContentSlider = function (e) {
    var i = !1, s = [];
    if (arguments.length > 0 && "string" == typeof arguments[0]) {
      i = arguments[0];
      for (var n = 1; n < arguments.length; n++) s[n - 1] = arguments[n]
    }
    return t.each(this, function () {
      var n = t(this), o = n.data("thim-content-slider");
      if (o || (o = new t.thimContentSlider(this, e), n.data("thim-content-slider", o)), i) {
        if (t.isFunction(o[i])) return o[i].apply(o, s);
        throw"Method thimContentSlider." + i + "() does not exists"
      }
      return n
    })
  }, t.fn.thimContentSlider.defaults = {
    items: [{image: "", url: "", html: ""}],
    itemMaxWidth: 200,
    itemMinWidth: 150,
    itemsVisible: 7,
    itemPadding: 10,
    activeItemRatio: 2,
    activeItemPadding: 0,
    mouseWheel: !0,
    autoPlay: !0,
    pauseTime: 3e3,
    pauseOnHover: !0,
    imageSelector: "",
    contentSelector: ".content",
    controlNav: "behind",
    contentPosition: ""
  }
}(jQuery), function () {
  var t = [].indexOf || function (t) {
    for (var e = 0, i = this.length; e < i; e++) if (e in this && this[e] === t) return e;
    return -1
  }, e = [].slice;
  !function (t, e) {
    "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function (i) {
      return e(i, t)
    }) : e(t.jQuery, t)
  }(window, function (i, s) {
    var n, o, a, r, l, c, d, h, p, u, f, m, g, v, y, w;
    return n = i(s), h = t.call(s, "ontouchstart") >= 0, r = {
      horizontal: {},
      vertical: {}
    }, l = 1, d = {}, c = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", g = 1, v = "waypoints-waypoint-ids", y = "waypoint", w = "waypoints", o = function () {
      function t(t) {
        var e = this;
        this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
          x: t.scrollLeft(),
          y: t.scrollTop()
        }, this.waypoints = {
          horizontal: {},
          vertical: {}
        }, this.element[c] = this.id, d[this.id] = this, t.bind(m, function () {
          var t;
          if (!e.didScroll && !h) return e.didScroll = !0, t = function () {
            return e.doScroll(), e.didScroll = !1
          }, s.setTimeout(t, i[w].settings.scrollThrottle)
        }), t.bind(f, function () {
          var t;
          if (!e.didResize) return e.didResize = !0, t = function () {
            return i[w]("refresh"), e.didResize = !1
          }, s.setTimeout(t, i[w].settings.resizeThrottle)
        })
      }
      
      return t.prototype.doScroll = function () {
        var t, e = this;
        return t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {newScroll: this.$element.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up"}
        }, !h || t.vertical.oldScroll && t.vertical.newScroll || i[w]("refresh"), i.each(t, function (t, s) {
          var n, o, a;
          return a = [], o = s.newScroll > s.oldScroll, n = o ? s.forward : s.backward, i.each(e.waypoints[t], function (t, e) {
            var i, n;
            return s.oldScroll < (i = e.offset) && i <= s.newScroll ? a.push(e) : s.newScroll < (n = e.offset) && n <= s.oldScroll ? a.push(e) : void 0
          }), a.sort(function (t, e) {
            return t.offset - e.offset
          }), o || a.reverse(), i.each(a, function (t, e) {
            if (e.options.continuous || t === a.length - 1) return e.trigger([n])
          })
        }), this.oldScroll = {x: t.horizontal.newScroll, y: t.vertical.newScroll}
      }, t.prototype.refresh = function () {
        var t, e, s, n = this;
        return s = i.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
          horizontal: {
            contextOffset: s ? 0 : e.left,
            contextScroll: s ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: s ? 0 : e.top,
            contextScroll: s ? 0 : this.oldScroll.y,
            contextDimension: s ? i[w]("viewportHeight") : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        }, i.each(t, function (t, e) {
          return i.each(n.waypoints[t], function (t, s) {
            var n, o, a, r, l;
            if (n = s.options.offset, a = s.offset, o = i.isWindow(s.element) ? 0 : s.$element.offset()[e.offsetProp], i.isFunction(n) ? n = n.apply(s.element) : "string" == typeof n && (n = parseFloat(n), s.options.offset.indexOf("%") > -1 && (n = Math.ceil(e.contextDimension * n / 100))), s.offset = o - e.contextOffset + e.contextScroll - n, (!s.options.onlyOnScroll || null == a) && s.enabled) return null !== a && a < (r = e.oldScroll) && r <= s.offset ? s.trigger([e.backward]) : null !== a && a > (l = e.oldScroll) && l >= s.offset ? s.trigger([e.forward]) : null === a && e.oldScroll >= s.offset ? s.trigger([e.forward]) : void 0
          })
        })
      }, t.prototype.checkEmpty = function () {
        if (i.isEmptyObject(this.waypoints.horizontal) && i.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([f, m].join(" ")), delete d[this.id]
      }, t
    }(), a = function () {
      function t(t, e, s) {
        var n, o;
        "bottom-in-view" === s.offset && (s.offset = function () {
          var t;
          return t = i[w]("viewportHeight"), i.isWindow(e.element) || (t = e.$element.height()), t - i(this).outerHeight()
        }), this.$element = t, this.element = t[0], this.axis = s.horizontal ? "horizontal" : "vertical", this.callback = s.handler, this.context = e, this.enabled = s.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = s, e.waypoints[this.axis][this.id] = this, r[this.axis][this.id] = this, (n = null != (o = this.element[v]) ? o : []).push(this.id), this.element[v] = n
      }
      
      return t.prototype.trigger = function (t) {
        if (this.enabled) return null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0
      }, t.prototype.disable = function () {
        return this.enabled = !1
      }, t.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0
      }, t.prototype.destroy = function () {
        return delete r[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
      }, t.getWaypointsByElement = function (t) {
        var e, s;
        return (s = t[v]) ? (e = i.extend({}, r.horizontal, r.vertical), i.map(s, function (t) {
          return e[t]
        })) : []
      }, t
    }(), u = {
      init: function (t, e) {
        return e = i.extend({}, i.fn[y].defaults, e), null == e.handler && (e.handler = t), this.each(function () {
          var t, s, n, r;
          return t = i(this), n = null != (r = e.context) ? r : i.fn[y].defaults.context, i.isWindow(n) || (n = t.closest(n)), n = i(n), (s = d[n[0][c]]) || (s = new o(n)), new a(t, s, e)
        }), i[w]("refresh"), this
      }, disable: function () {
        return u._invoke.call(this, "disable")
      }, enable: function () {
        return u._invoke.call(this, "enable")
      }, destroy: function () {
        return u._invoke.call(this, "destroy")
      }, prev: function (t, e) {
        return u._traverse.call(this, t, e, function (t, e, i) {
          if (e > 0) return t.push(i[e - 1])
        })
      }, next: function (t, e) {
        return u._traverse.call(this, t, e, function (t, e, i) {
          if (e < i.length - 1) return t.push(i[e + 1])
        })
      }, _traverse: function (t, e, n) {
        var o, a;
        return null == t && (t = "vertical"), null == e && (e = s), a = p.aggregate(e), o = [], this.each(function () {
          var e;
          return e = i.inArray(this, a[t]), n(o, e, a[t])
        }), this.pushStack(o)
      }, _invoke: function (t) {
        return this.each(function () {
          var e;
          return e = a.getWaypointsByElement(this), i.each(e, function (e, i) {
            return i[t](), !0
          })
        }), this
      }
    }, i.fn[y] = function () {
      var t, s;
      return s = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], u[s] ? u[s].apply(this, t) : i.isFunction(s) ? u.init.apply(this, arguments) : i.isPlainObject(s) ? u.init.apply(this, [null, s]) : s ? i.error("The " + s + " method does not exist in jQuery Waypoints.") : i.error("jQuery Waypoints needs a callback function or handler option.")
    }, i.fn[y].defaults = {
      context: s,
      continuous: !0,
      enabled: !0,
      horizontal: !1,
      offset: 0,
      triggerOnce: !1
    }, p = {
      refresh: function () {
        return i.each(d, function (t, e) {
          return e.refresh()
        })
      }, viewportHeight: function () {
        var t;
        return null != (t = s.innerHeight) ? t : n.height()
      }, aggregate: function (t) {
        var e, s, n;
        return e = r, t && (e = null != (n = d[i(t)[0][c]]) ? n.waypoints : void 0), e ? (s = {
          horizontal: [],
          vertical: []
        }, i.each(s, function (t, n) {
          return i.each(e[t], function (t, e) {
            return n.push(e)
          }), n.sort(function (t, e) {
            return t.offset - e.offset
          }), s[t] = i.map(n, function (t) {
            return t.element
          }), s[t] = i.unique(s[t])
        }), s) : []
      }, above: function (t) {
        return null == t && (t = s), p._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y
        })
      }, below: function (t) {
        return null == t && (t = s), p._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y
        })
      }, left: function (t) {
        return null == t && (t = s), p._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x
        })
      }, right: function (t) {
        return null == t && (t = s), p._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x
        })
      }, enable: function () {
        return p._invoke("enable")
      }, disable: function () {
        return p._invoke("disable")
      }, destroy: function () {
        return p._invoke("destroy")
      }, extendFn: function (t, e) {
        return u[t] = e
      }, _invoke: function (t) {
        var e;
        return e = i.extend({}, r.vertical, r.horizontal), i.each(e, function (e, i) {
          return i[t](), !0
        })
      }, _filter: function (t, e, s) {
        var n, o;
        return (n = d[i(t)[0][c]]) ? (o = [], i.each(n.waypoints[e], function (t, e) {
          if (s(n, e)) return o.push(e)
        }), o.sort(function (t, e) {
          return t.offset - e.offset
        }), i.map(o, function (t) {
          return t.element
        })) : []
      }
    }, i[w] = function () {
      var t, i;
      return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], p[i] ? p[i].apply(null, t) : p.aggregate.call(null, i)
    }, i[w].settings = {resizeThrottle: 100, scrollThrottle: 30}, n.on("load.waypoints", function () {
      return i[w]("refresh")
    })
  })
}.call(this), function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
  function e(t, e) {
    return t.toFixed(e.decimals)
  }
  
  var i = function (e, s) {
    this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, this.dataOptions(), s), this.init()
  };
  i.DEFAULTS = {
    from: 0,
    to: 0,
    speed: 1e3,
    refreshInterval: 100,
    decimals: 0,
    formatter: e,
    onUpdate: null,
    onComplete: null
  }, i.prototype.init = function () {
    this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops
  }, i.prototype.dataOptions = function () {
    var t = {
      from: this.$element.data("from"),
      to: this.$element.data("to"),
      speed: this.$element.data("speed"),
      refreshInterval: this.$element.data("refresh-interval"),
      decimals: this.$element.data("decimals")
    }, e = Object.keys(t);
    for (var i in e) {
      var s = e[i];
      void 0 === t[s] && delete t[s]
    }
    return t
  }, i.prototype.update = function () {
    this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value))
  }, i.prototype.render = function () {
    var t = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(t)
  }, i.prototype.restart = function () {
    this.stop(), this.init(), this.start()
  }, i.prototype.start = function () {
    this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval)
  }, i.prototype.stop = function () {
    this.interval && clearInterval(this.interval)
  }, i.prototype.toggle = function () {
    this.interval ? this.stop() : this.start()
  }, t.fn.countTo = function (e) {
    return this.each(function () {
      var s = t(this), n = s.data("countTo"), o = !n || "object" == typeof e, a = "object" == typeof e ? e : {},
        r = "string" == typeof e ? e : "start";
      o && (n && n.stop(), s.data("countTo", n = new i(this, a))), n[r].call(n)
    })
  }
}), function (t, e, i, s) {
  function n(s, n) {
    this.options = t.extend({}, r, n), this._container = t("#" + this.options.containerID), this._container.length && (this.jQwindow = t(e), this.jQdocument = t(i), this._holder = t(s), this._nav = {}, this._first = t(this.options.first), this._previous = t(this.options.previous), this._next = t(this.options.next), this._last = t(this.options.last), this._items = this._container.children(":visible"), this._itemsShowing = t([]), this._itemsHiding = t([]), this._numPages = Math.ceil(this._items.length / this.options.perPage), this._currentPageNum = this.options.startPage, this._clicked = !1, this._cssAnimSupport = this.getCSSAnimationSupport(), this.init())
  }
  
  var o = "jPages", a = null, r = {
    containerID: "",
    first: !1,
    previous: "← previous",
    next: "next →",
    last: !1,
    links: "numeric",
    startPage: 1,
    perPage: 10,
    midRange: 5,
    startRange: 1,
    endRange: 1,
    keyBrowse: !1,
    scrollBrowse: !1,
    pause: 0,
    clickStop: !1,
    delay: 50,
    direction: "forward",
    animation: "",
    fallback: 400,
    minHeight: !0,
    callback: void 0
  };
  n.prototype = {
    constructor: n, getCSSAnimationSupport: function () {
      var t = !1, e = "Webkit Moz O ms Khtml".split(" "), i = "", s = this._container.get(0);
      if (s.style.animationName && (t = !0), !1 === t) for (var n = 0; n < e.length; n++) if (void 0 !== s.style[e[n] + "AnimationName"]) {
        (i = e[n]) + "Animation", "-" + i.toLowerCase() + "-", t = !0;
        break
      }
      return t
    }, init: function () {
      this.setStyles(), this.setNav(), this.paginate(this._currentPageNum), this.setMinHeight()
    }, setStyles: function () {
      t("<style>.jp-invisible { visibility: hidden !important; } .jp-hidden { display: none !important; }</style>").appendTo("head"), this._cssAnimSupport && this.options.animation.length ? this._items.addClass("animated jp-hidden") : this._items.hide()
    }, setNav: function () {
      var e = this.writeNav();
      this._holder.each(this.bind(function (i, s) {
        var n = t(s);
        n.html(e), this.cacheNavElements(n, i), this.bindNavHandlers(i), this.disableNavSelection(s)
      }, this)), this.options.keyBrowse && this.bindNavKeyBrowse(), this.options.scrollBrowse && this.bindNavScrollBrowse()
    }, writeNav: function () {
      var t, e = 1;
      for (t = this.writeBtn("first") + this.writeBtn("previous"); e <= this._numPages; e++) {
        switch (1 === e && 0 === this.options.startRange && (t += "<span>...</span>"), e > this.options.startRange && e <= this._numPages - this.options.endRange ? t += "<a href='#' class='jp-hidden'>" : t += "<a>", this.options.links) {
          case"numeric":
            t += e;
            break;
          case"blank":
            break;
          case"title":
            var i = this._items.eq(e - 1).attr("data-title");
            t += void 0 !== i ? i : ""
        }
        t += "</a>", e !== this.options.startRange && e !== this._numPages - this.options.endRange || (t += "<span>...</span>")
      }
      return t += this.writeBtn("next") + this.writeBtn("last") + "</div>"
    }, writeBtn: function (e) {
      return !1 === this.options[e] || t(this["_" + e]).length ? "" : "<a class='jp-" + e + "'>" + this.options[e] + "</a>"
    }, cacheNavElements: function (e, i) {
      this._nav[i] = {}, this._nav[i].holder = e, this._nav[i].first = this._first.length ? this._first : this._nav[i].holder.find("a.jp-first"), this._nav[i].previous = this._previous.length ? this._previous : this._nav[i].holder.find("a.jp-previous"), this._nav[i].next = this._next.length ? this._next : this._nav[i].holder.find("a.jp-next"), this._nav[i].last = this._last.length ? this._last : this._nav[i].holder.find("a.jp-last"), this._nav[i].fstBreak = this._nav[i].holder.find("span:first"), this._nav[i].lstBreak = this._nav[i].holder.find("span:last"), this._nav[i].pages = this._nav[i].holder.find("a").not(".jp-first, .jp-previous, .jp-next, .jp-last"), this._nav[i].permPages = this._nav[i].pages.slice(0, this.options.startRange).add(this._nav[i].pages.slice(this._numPages - this.options.endRange, this._numPages)), this._nav[i].pagesShowing = t([]), this._nav[i].currentPage = t([])
    }, bindNavHandlers: function (e) {
      var i = this._nav[e];
      i.holder.bind("click.jPages", this.bind(function (e) {
        var s = this.getNewPage(i, t(e.target));
        this.validNewPage(s) && (this._clicked = !0, this.paginate(s)), e.preventDefault()
      }, this)), this._first.length && this._first.bind("click.jPages", this.bind(function () {
        this.validNewPage(1) && (this._clicked = !0, this.paginate(1))
      }, this)), this._previous.length && this._previous.bind("click.jPages", this.bind(function () {
        var t = this._currentPageNum - 1;
        this.validNewPage(t) && (this._clicked = !0, this.paginate(t))
      }, this)), this._next.length && this._next.bind("click.jPages", this.bind(function () {
        var t = this._currentPageNum + 1;
        this.validNewPage(t) && (this._clicked = !0, this.paginate(t))
      }, this)), this._last.length && this._last.bind("click.jPages", this.bind(function () {
        this.validNewPage(this._numPages) && (this._clicked = !0, this.paginate(this._numPages))
      }, this))
    }, disableNavSelection: function (t) {
      void 0 !== t.onselectstart ? t.onselectstart = function () {
        return !1
      } : void 0 !== t.style.MozUserSelect ? t.style.MozUserSelect = "none" : t.onmousedown = function () {
        return !1
      }
    }, bindNavKeyBrowse: function () {
      this.jQdocument.bind("keydown.jPages", this.bind(function (t) {
        var e = t.target.nodeName.toLowerCase();
        if (this.elemScrolledIntoView() && "input" !== e && "textarea" != e) {
          var i = this._currentPageNum;
          37 == t.which && (i = this._currentPageNum - 1), 39 == t.which && (i = this._currentPageNum + 1), this.validNewPage(i) && (this._clicked = !0, this.paginate(i))
        }
      }, this))
    }, elemScrolledIntoView: function () {
      var t, e, i;
      return t = this.jQwindow.scrollTop(), e = t + this.jQwindow.height(), i = this._container.offset().top, i + this._container.height() >= t && i <= e
    }, bindNavScrollBrowse: function () {
      this._container.bind("mousewheel.jPages DOMMouseScroll.jPages", this.bind(function (t) {
        var e = (t.originalEvent.wheelDelta || -t.originalEvent.detail) > 0 ? this._currentPageNum - 1 : this._currentPageNum + 1;
        return this.validNewPage(e) && (this._clicked = !0, this.paginate(e)), t.preventDefault(), !1
      }, this))
    }, getNewPage: function (t, e) {
      return e.is(t.currentPage) ? this._currentPageNum : e.is(t.pages) ? t.pages.index(e) + 1 : e.is(t.first) ? 1 : e.is(t.last) ? this._numPages : e.is(t.previous) ? t.pages.index(t.currentPage) : e.is(t.next) ? t.pages.index(t.currentPage) + 2 : void 0
    }, validNewPage: function (t) {
      return t !== this._currentPageNum && t > 0 && t <= this._numPages
    }, paginate: function (e) {
      var i, s;
      i = this.updateItems(e), s = this.updatePages(e), this._currentPageNum = e, t.isFunction(this.options.callback) && this.callback(e, i, s), this.updatePause()
    }, updateItems: function (t) {
      var e = this.getItemRange(t);
      return this._itemsHiding = this._itemsShowing, this._itemsShowing = this._items.slice(e.start, e.end), this._cssAnimSupport && this.options.animation.length ? this.cssAnimations(t) : this.jQAnimations(t), e
    }, getItemRange: function (t) {
      var e = {};
      return e.start = (t - 1) * this.options.perPage, e.end = e.start + this.options.perPage, e.end > this._items.length && (e.end = this._items.length), e
    }, cssAnimations: function (t) {
      clearInterval(this._delay), this._itemsHiding.removeClass(this.options.animation + " jp-invisible").addClass("jp-hidden"), this._itemsShowing.removeClass("jp-hidden").addClass("jp-invisible"), this._itemsOriented = this.getDirectedItems(t), this._index = 0, this._delay = setInterval(this.bind(function () {
        this._index === this._itemsOriented.length ? clearInterval(this._delay) : this._itemsOriented.eq(this._index).removeClass("jp-invisible").addClass(this.options.animation), this._index = this._index + 1
      }, this), this.options.delay)
    }, jQAnimations: function (t) {
      clearInterval(this._delay), this._itemsHiding.addClass("jp-hidden"), this._itemsShowing.fadeTo(0, 0).removeClass("jp-hidden"), this._itemsOriented = this.getDirectedItems(t), this._index = 0, this._delay = setInterval(this.bind(function () {
        this._index === this._itemsOriented.length ? clearInterval(this._delay) : this._itemsOriented.eq(this._index).fadeTo(this.options.fallback, 1), this._index = this._index + 1
      }, this), this.options.delay)
    }, getDirectedItems: function (e) {
      var i;
      switch (this.options.direction) {
        case"backwards":
          i = t(this._itemsShowing.get().reverse());
          break;
        case"random":
          i = t(this._itemsShowing.get().sort(function () {
            return Math.round(Math.random()) - .5
          }));
          break;
        case"auto":
          i = e >= this._currentPageNum ? this._itemsShowing : t(this._itemsShowing.get().reverse());
          break;
        default:
          i = this._itemsShowing
      }
      return i
    }, updatePages: function (t) {
      var e, i, s;
      e = this.getInterval(t);
      for (i in this._nav) this._nav.hasOwnProperty(i) && (s = this._nav[i], this.updateBtns(s, t), this.updateCurrentPage(s, t), this.updatePagesShowing(s, e), this.updateBreaks(s, e));
      return e
    }, getInterval: function (t) {
      var e, i, s, n;
      return e = Math.ceil(this.options.midRange / 2), i = this._numPages - this.options.midRange, s = t > e ? Math.max(Math.min(t - e, i), 0) : 0, n = t > e ? Math.min(t + e - (this.options.midRange % 2 > 0 ? 1 : 0), this._numPages) : Math.min(this.options.midRange, this._numPages), {
        start: s,
        end: n
      }
    }, updateBtns: function (t, e) {
      1 === e && (t.first.addClass("jp-disabled"), t.previous.addClass("jp-disabled")), e === this._numPages && (t.next.addClass("jp-disabled"), t.last.addClass("jp-disabled")), 1 === this._currentPageNum && e > 1 && (t.first.removeClass("jp-disabled"), t.previous.removeClass("jp-disabled")), this._currentPageNum === this._numPages && e < this._numPages && (t.next.removeClass("jp-disabled"), t.last.removeClass("jp-disabled"))
    }, updateCurrentPage: function (t, e) {
      t.currentPage.removeClass("jp-current"), t.currentPage = t.pages.eq(e - 1).addClass("jp-current")
    }, updatePagesShowing: function (t, e) {
      var i = t.pages.slice(e.start, e.end).not(t.permPages);
      t.pagesShowing.not(i).addClass("jp-hidden"), i.not(t.pagesShowing).removeClass("jp-hidden"), t.pagesShowing = i
    }, updateBreaks: function (t, e) {
      e.start > this.options.startRange || 0 === this.options.startRange && e.start > 0 ? t.fstBreak.removeClass("jp-hidden") : t.fstBreak.addClass("jp-hidden"), e.end < this._numPages - this.options.endRange ? t.lstBreak.removeClass("jp-hidden") : t.lstBreak.addClass("jp-hidden")
    }, callback: function (t, e, i) {
      var s = {current: t, interval: i, count: this._numPages}, n = {
        showing: this._itemsShowing,
        oncoming: this._items.slice(e.start + this.options.perPage, e.end + this.options.perPage),
        range: e,
        count: this._items.length
      };
      s.interval.start = s.interval.start + 1, n.range.start = n.range.start + 1, this.options.callback(s, n)
    }, updatePause: function () {
      if (this.options.pause && this._numPages > 1) {
        if (clearTimeout(this._pause), this.options.clickStop && this._clicked) return;
        this._pause = setTimeout(this.bind(function () {
          this.paginate(this._currentPageNum !== this._numPages ? this._currentPageNum + 1 : 1)
        }, this), this.options.pause)
      }
    }, setMinHeight: function () {
      this.options.minHeight && !this._container.is("table, tbody") && setTimeout(this.bind(function () {
        this._container.css({"min-height": this._container.css("height")})
      }, this), 1e3)
    }, bind: function (t, e) {
      return function () {
        return t.apply(e, arguments)
      }
    }, destroy: function () {
      this.jQdocument.unbind("keydown.jPages"), this._container.unbind("mousewheel.jPages DOMMouseScroll.jPages"), this.options.minHeight && this._container.css("min-height", ""), this._cssAnimSupport && this.options.animation.length ? this._items.removeClass("animated jp-hidden jp-invisible " + this.options.animation) : this._items.removeClass("jp-hidden").fadeTo(0, 1), this._holder.unbind("click.jPages").empty()
    }
  }, t.fn[o] = function (e) {
    var i = t.type(e);
    return "object" === i ? (this.length && !t.data(this, o) && (a = new n(this, e), this.each(function () {
      t.data(this, o, a)
    })), this) : "string" === i && "destroy" === e ? (a.destroy(), this.each(function () {
      t.removeData(this, o)
    }), this) : "number" === i && e % 1 == 0 ? (a.validNewPage(e) && a.paginate(e), this) : this
  }
}(jQuery, window, document), function (t, e) {
  "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : t.Circles = e()
}(this, function () {
  "use strict";
  var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
    setTimeout(t, 1e3 / 60)
  }, e = function (t) {
    var e = t.id;
    if (this._el = document.getElementById(e), null !== this._el) {
      this._radius = t.radius || 10, this._duration = void 0 === t.duration ? 500 : t.duration, this._value = 0, this._maxValue = t.maxValue || 100, this._text = void 0 === t.text ? function (t) {
        return this.htmlifyNumber(t)
      } : t.text, this._strokeWidth = t.width || 10, this._colors = t.colors || ["#EEE", "#F00"], this._svg = null, this._movingPath = null, this._wrapContainer = null, this._textContainer = null, this._wrpClass = t.wrpClass || "circles-wrp", this._textClass = t.textClass || "circles-text", this._valClass = t.valueStrokeClass || "circles-valueStroke", this._maxValClass = t.maxValueStrokeClass || "circles-maxValueStroke", this._styleWrapper = !1 !== t.styleWrapper, this._styleText = !1 !== t.styleText;
      var i = Math.PI / 180 * 270;
      this._start = -Math.PI / 180 * 90, this._startPrecise = this._precise(this._start), this._circ = i - this._start, this._generate().update(t.value || 0)
    }
  };
  return e.prototype = {
    VERSION: "0.0.6", _generate: function () {
      return this._svgSize = 2 * this._radius, this._radiusAdjusted = this._radius - this._strokeWidth / 2, this._generateSvg()._generateText()._generateWrapper(), this._el.innerHTML = "", this._el.appendChild(this._wrapContainer), this
    }, _setPercentage: function (t) {
      this._movingPath.setAttribute("d", this._calculatePath(t, !0)), this._textContainer.innerHTML = this._getText(this.getValueFromPercent(t))
    }, _generateWrapper: function () {
      return this._wrapContainer = document.createElement("div"), this._wrapContainer.className = this._wrpClass, this._styleWrapper && (this._wrapContainer.style.position = "relative", this._wrapContainer.style.display = "inline-block"), this._wrapContainer.appendChild(this._svg), this._wrapContainer.appendChild(this._textContainer), this
    }, _generateText: function () {
      if (this._textContainer = document.createElement("div"), this._textContainer.className = this._textClass, this._styleText) {
        var t = {
          position: "absolute",
          top: 0,
          left: 0,
          textAlign: "center",
          width: "100%",
          fontSize: .7 * this._radius + "px",
          height: this._svgSize + "px",
          lineHeight: this._svgSize + "px"
        };
        for (var e in t) this._textContainer.style[e] = t[e]
      }
      return this._textContainer.innerHTML = this._getText(0), this
    }, _getText: function (t) {
      return this._text ? (void 0 === t && (t = this._value), t = parseFloat(t.toFixed(2)), "function" == typeof this._text ? this._text.call(this, t) : this._text) : ""
    }, _generateSvg: function () {
      return this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._svg.setAttribute("width", this._svgSize), this._svg.setAttribute("height", this._svgSize), this._generatePath(100, !1, this._colors[0], this._maxValClass)._generatePath(1, !0, this._colors[1], this._valClass), this._movingPath = this._svg.getElementsByTagName("path")[1], this
    }, _generatePath: function (t, e, i, s) {
      var n = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return n.setAttribute("fill", "transparent"), n.setAttribute("stroke", i), n.setAttribute("stroke-width", this._strokeWidth), n.setAttribute("d", this._calculatePath(t, e)), n.setAttribute("class", s), this._svg.appendChild(n), this
    }, _calculatePath: function (t, e) {
      var i = this._start + t / 100 * this._circ, s = this._precise(i);
      return this._arc(s, e)
    }, _arc: function (t, e) {
      var i = t - .001, s = t - this._startPrecise < Math.PI ? 0 : 1;
      return ["M", this._radius + this._radiusAdjusted * Math.cos(this._startPrecise), this._radius + this._radiusAdjusted * Math.sin(this._startPrecise), "A", this._radiusAdjusted, this._radiusAdjusted, 0, s, 1, this._radius + this._radiusAdjusted * Math.cos(i), this._radius + this._radiusAdjusted * Math.sin(i), e ? "" : "Z"].join(" ")
    }, _precise: function (t) {
      return Math.round(1e3 * t) / 1e3
    }, htmlifyNumber: function (t, e, i) {
      e = e || "circles-integer", i = i || "circles-decimals";
      var s = (t + "").split("."), n = '<span class="' + e + '">' + s[0] + "</span>";
      return s.length > 1 && (n += '.<span class="' + i + '">' + s[1].substring(0, 2) + "</span>"), n
    }, updateRadius: function (t) {
      return this._radius = t, this._generate().update(!0)
    }, updateWidth: function (t) {
      return this._strokeWidth = t, this._generate().update(!0)
    }, updateColors: function (t) {
      this._colors = t;
      var e = this._svg.getElementsByTagName("path");
      return e[0].setAttribute("stroke", t[0]), e[1].setAttribute("stroke", t[1]), this
    }, getPercent: function () {
      return 100 * this._value / this._maxValue
    }, getValueFromPercent: function (t) {
      return this._maxValue * t / 100
    }, getValue: function () {
      return this._value
    }, getMaxValue: function () {
      return this._maxValue
    }, update: function (e, i) {
      if (!0 === e) return this._setPercentage(this.getPercent()), this;
      if (this._value == e || isNaN(e)) return this;
      void 0 === i && (i = this._duration);
      var s, n, o, a, r = this, l = r.getPercent(), c = 1;
      return this._value = Math.min(this._maxValue, Math.max(0, e)), i ? (s = r.getPercent(), n = s > l, c += s % 1, o = Math.floor(Math.abs(s - l) / c), a = i / o, function e(i) {
        if (n ? l += c : l -= c, n && l >= s || !n && s >= l) t(function () {
          r._setPercentage(s)
        }); else {
          t(function () {
            r._setPercentage(l)
          });
          var o = Date.now(), d = o - i;
          d >= a ? e(o) : setTimeout(function () {
            e(Date.now())
          }, a - d)
        }
      }(Date.now()), this) : (this._setPercentage(this.getPercent()), this)
    }
  }, e.create = function (t) {
    return new e(t)
  }, e
}), function (t) {
  t.fn.viewportChecker = function (e) {
    var i = {
      classToAdd: "visible",
      classToRemove: "invisible",
      classToAddForFullView: "full-visible",
      removeClassAfterAnimation: !1,
      offset: 100,
      repeat: !1,
      invertBottomOffset: !0,
      callbackFunction: function (t, e) {
      },
      scrollHorizontal: !1,
      scrollBox: window
    };
    t.extend(i, e);
    var s = this, n = {height: t(i.scrollBox).height(), width: t(i.scrollBox).width()},
      o = -1 != navigator.userAgent.toLowerCase().indexOf("webkit") || -1 != navigator.userAgent.toLowerCase().indexOf("windows phone") ? "body" : "html";
    return this.checkElements = function () {
      var e, a;
      i.scrollHorizontal ? (e = t(o).scrollLeft(), a = e + n.width) : (e = t(o).scrollTop(), a = e + n.height), s.each(function () {
        var s = t(this), o = {}, r = {};
        if (s.data("vp-add-class") && (r.classToAdd = s.data("vp-add-class")), s.data("vp-remove-class") && (r.classToRemove = s.data("vp-remove-class")), s.data("vp-add-class-full-view") && (r.classToAddForFullView = s.data("vp-add-class-full-view")), s.data("vp-keep-add-class") && (r.removeClassAfterAnimation = s.data("vp-remove-after-animation")), s.data("vp-offset") && (r.offset = s.data("vp-offset")), s.data("vp-repeat") && (r.repeat = s.data("vp-repeat")), s.data("vp-scrollHorizontal") && (r.scrollHorizontal = s.data("vp-scrollHorizontal")), s.data("vp-invertBottomOffset") && (r.scrollHorizontal = s.data("vp-invertBottomOffset")), t.extend(o, i), t.extend(o, r), !s.data("vp-animated") || o.repeat) {
          String(o.offset).indexOf("%") > 0 && (o.offset = parseInt(o.offset) / 100 * n.height);
          var l = o.scrollHorizontal ? s.offset().left : s.offset().top,
            c = o.scrollHorizontal ? l + s.width() : l + s.height(), d = Math.round(l) + o.offset,
            h = o.scrollHorizontal ? d + s.width() : d + s.height();
          o.invertBottomOffset && (h -= 2 * o.offset), a > d && h > e ? (s.removeClass(o.classToRemove), s.addClass(o.classToAdd), o.callbackFunction(s, "add"), a >= c && l >= e ? s.addClass(o.classToAddForFullView) : s.removeClass(o.classToAddForFullView), s.data("vp-animated", !0), o.removeClassAfterAnimation && s.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            s.removeClass(o.classToAdd)
          })) : s.hasClass(o.classToAdd) && o.repeat && (s.removeClass(o.classToAdd + " " + o.classToAddForFullView), o.callbackFunction(s, "remove"), s.data("vp-animated", !1))
        }
      })
    }, ("ontouchstart" in window || "onmsgesturechange" in window) && t(document).bind("touchmove MSPointerMove pointermove", this.checkElements), t(i.scrollBox).bind("load scroll", this.checkElements), t(window).resize(function (e) {
      n = {height: t(i.scrollBox).height(), width: t(i.scrollBox).width()}, s.checkElements()
    }), this.checkElements(), this
  }
}(jQuery), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
  "use strict";
  
  function i(i, o, r) {
    function l(t, e, s) {
      var n, o = "$()." + i + '("' + e + '")';
      return t.each(function (t, l) {
        var c = r.data(l, i);
        if (c) {
          var d = c[e];
          if (d && "_" != e.charAt(0)) {
            var h = d.apply(c, s);
            n = void 0 === n ? h : n
          } else a(o + " is not a valid method")
        } else a(i + " not initialized. Cannot call methods, i.e. " + o)
      }), void 0 !== n ? n : t
    }
    
    function c(t, e) {
      t.each(function (t, s) {
        var n = r.data(s, i);
        n ? (n.option(e), n._init()) : (n = new o(s, e), r.data(s, i, n))
      })
    }
    
    (r = r || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function (t) {
      r.isPlainObject(t) && (this.options = r.extend(!0, this.options, t))
    }), r.fn[i] = function (t) {
      return "string" == typeof t ? l(this, t, n.call(arguments, 1)) : (c(this, t), this)
    }, s(r))
  }
  
  function s(t) {
    !t || t && t.bridget || (t.bridget = i)
  }
  
  var n = Array.prototype.slice, o = t.console, a = void 0 === o ? function () {
  } : function (t) {
    o.error(t)
  };
  return s(e || t.jQuery), i
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function () {
  function t() {
  }
  
  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {}, s = i[t] = i[t] || [];
      return -1 == s.indexOf(e) && s.push(e), this
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {};
      return (i[t] = i[t] || {})[e] = !0, this
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var s = i.indexOf(e);
      return -1 != s && i.splice(s, 1), this
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var s = 0, n = i[s];
      e = e || [];
      for (var o = this._onceEvents && this._onceEvents[t]; n;) {
        var a = o && o[n];
        a && (this.off(t, n), delete o[n]), n.apply(this, e), n = i[s += a ? 0 : 1]
      }
      return this
    }
  }, t
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
    return e()
  }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
  "use strict";
  
  function t(t) {
    var e = parseFloat(t);
    return -1 == t.indexOf("%") && !isNaN(e) && e
  }
  
  function e() {
  }
  
  function i() {
    for (var t = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    }, e = 0; c > e; e++) t[l[e]] = 0;
    return t
  }
  
  function s(t) {
    var e = getComputedStyle(t);
    return e || r("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
  }
  
  function n() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var n = s(e);
      o.isBoxSizeOuter = a = 200 == t(n.width), i.removeChild(e)
    }
  }
  
  function o(e) {
    if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var o = s(e);
      if ("none" == o.display) return i();
      var r = {};
      r.width = e.offsetWidth, r.height = e.offsetHeight;
      for (var d = r.isBorderBox = "border-box" == o.boxSizing, h = 0; c > h; h++) {
        var p = l[h], u = o[p], f = parseFloat(u);
        r[p] = isNaN(f) ? 0 : f
      }
      var m = r.paddingLeft + r.paddingRight, g = r.paddingTop + r.paddingBottom, v = r.marginLeft + r.marginRight,
        y = r.marginTop + r.marginBottom, w = r.borderLeftWidth + r.borderRightWidth,
        b = r.borderTopWidth + r.borderBottomWidth, _ = d && a, x = t(o.width);
      !1 !== x && (r.width = x + (_ ? 0 : m + w));
      var C = t(o.height);
      return !1 !== C && (r.height = C + (_ ? 0 : g + b)), r.innerWidth = r.width - (m + w), r.innerHeight = r.height - (g + b), r.outerWidth = r.width + v, r.outerHeight = r.height + y, r
    }
  }
  
  var a, r = "undefined" == typeof console ? e : function (t) {
      console.error(t)
    },
    l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
    c = l.length, d = !1;
  return o
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
  "use strict";
  var t = function () {
    var t = Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";
    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var s = e[i] + "MatchesSelector";
      if (t[s]) return s
    }
  }();
  return function (e, i) {
    return e[t](i)
  }
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];
    return t
  }, i.modulo = function (t, e) {
    return (t % e + e) % e
  }, i.makeArray = function (t) {
    var e = [];
    if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
    return e
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    -1 != i && t.splice(i, 1)
  }, i.getParent = function (t, i) {
    for (; t != document.body;) if (t = t.parentNode, e(t, i)) return t
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, i.filterFindElements = function (t, s) {
    var n = [];
    return (t = i.makeArray(t)).forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!s) return void n.push(t);
        e(t, s) && n.push(t);
        for (var i = t.querySelectorAll(s), o = 0; o < i.length; o++) n.push(i[o])
      }
    }), n
  }, i.debounceMethod = function (t, e, i) {
    var s = t.prototype[e], n = e + "Timeout";
    t.prototype[e] = function () {
      var t = this[n];
      t && clearTimeout(t);
      var e = arguments, o = this;
      this[n] = setTimeout(function () {
        s.apply(o, e), delete o[n]
      }, i || 100)
    }
  }, i.docReady = function (t) {
    "complete" == document.readyState ? t() : document.addEventListener("DOMContentLoaded", t)
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i
    }).toLowerCase()
  };
  var s = t.console;
  return i.htmlInit = function (e, n) {
    i.docReady(function () {
      var o = i.toDashed(n), a = "data-" + o, r = document.querySelectorAll("[" + a + "]"),
        l = document.querySelectorAll(".js-" + o), c = i.makeArray(r).concat(i.makeArray(l)), d = a + "-options",
        h = t.jQuery;
      c.forEach(function (t) {
        var i, o = t.getAttribute(a) || t.getAttribute(d);
        try {
          i = o && JSON.parse(o)
        } catch (e) {
          return void(s && s.error("Error parsing " + a + " on " + t.className + ": " + e))
        }
        var r = new e(t, i);
        h && h.data(t, n, r)
      })
    })
  }, i
}), function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
  "use strict";
  
  function i(t) {
    for (var e in t) return !1;
    return null, !0
  }
  
  function s(t, e) {
    t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
  }
  
  var n = document.documentElement.style, o = "string" == typeof n.transition ? "transition" : "WebkitTransition",
    a = "string" == typeof n.transform ? "transform" : "WebkitTransform",
    r = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[o], l = {
      transform: a,
      transition: o,
      transitionDuration: o + "Duration",
      transitionProperty: o + "Property",
      transitionDelay: o + "Delay"
    }, c = s.prototype = Object.create(t.prototype);
  c.constructor = s, c._create = function () {
    this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
  }, c.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, c.getSize = function () {
    this.size = e(this.element)
  }, c.css = function (t) {
    var e = this.element.style;
    for (var i in t) e[l[i] || i] = t[i]
  }, c.getPosition = function () {
    var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
      i = this.layout._getOption("originTop"), s = t[e ? "left" : "right"], n = t[i ? "top" : "bottom"],
      o = this.layout.size, a = -1 != s.indexOf("%") ? parseFloat(s) / 100 * o.width : parseInt(s, 10),
      r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * o.height : parseInt(n, 10);
    a = isNaN(a) ? 0 : a, r = isNaN(r) ? 0 : r, a -= e ? o.paddingLeft : o.paddingRight, r -= i ? o.paddingTop : o.paddingBottom, this.position.x = a, this.position.y = r
  }, c.layoutPosition = function () {
    var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), s = this.layout._getOption("originTop"),
      n = i ? "paddingLeft" : "paddingRight", o = i ? "left" : "right", a = i ? "right" : "left",
      r = this.position.x + t[n];
    e[o] = this.getXValue(r), e[a] = "";
    var l = s ? "paddingTop" : "paddingBottom", c = s ? "top" : "bottom", d = s ? "bottom" : "top",
      h = this.position.y + t[l];
    e[c] = this.getYValue(h), e[d] = "", this.css(e), this.emitEvent("layout", [this])
  }, c.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
  }, c.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
  }, c._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x, s = this.position.y, n = parseInt(t, 10), o = parseInt(e, 10),
      a = n === this.position.x && o === this.position.y;
    if (this.setPosition(t, e), !a || this.isTransitioning) {
      var r = t - i, l = e - s, c = {};
      c.transform = this.getTranslate(r, l), this.transition({
        to: c,
        onTransitionEnd: {transform: this.layoutPosition},
        isCleaning: !0
      })
    } else this.layoutPosition()
  }, c.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"), s = this.layout._getOption("originTop");
    return t = i ? t : -t, e = s ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
  }, c.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition()
  }, c.moveTo = c._transitionTo, c.setPosition = function (t, e) {
    this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
  }, c._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);
    for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
  }, c.transition = function (t) {
    if (parseFloat(this.layout.options.transitionDuration)) {
      var e = this._transn;
      for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
      for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
      if (t.from) {
        this.css(t.from);
        this.element.offsetHeight;
        null
      }
      this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    } else this._nonTransition(t)
  };
  var d = "opacity," + function (t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase()
    })
  }(a);
  c.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: d,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(r, this, !1)
    }
  }, c.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t)
  }, c.onotransitionend = function (t) {
    this.ontransitionend(t)
  };
  var h = {"-webkit-transform": "transform"};
  c.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn, s = h[t.propertyName] || t.propertyName;
      delete e.ingProperties[s], i(e.ingProperties) && this.disableTransition(), s in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[s]), s in e.onEnd && (e.onEnd[s].call(this), delete e.onEnd[s]), this.emitEvent("transitionEnd", [this])
    }
  }, c.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(r, this, !1), this.isTransitioning = !1
  }, c._removeStyles = function (t) {
    var e = {};
    for (var i in t) e[i] = "";
    this.css(e)
  };
  var p = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
  return c.removeTransitionStyles = function () {
    this.css(p)
  }, c.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
  }, c.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
  }, c.remove = function () {
    return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem()
    }), void this.hide()) : void this.removeElem()
  }, c.reveal = function () {
    delete this.isHidden, this.css({display: ""});
    var t = this.layout.options, e = {};
    e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    })
  }, c.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal")
  }, c.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";
    for (var i in e) return i
  }, c.hide = function () {
    this.isHidden = !0, this.css({display: ""});
    var t = this.layout.options, e = {};
    e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    })
  }, c.onHideTransitionEnd = function () {
    this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
  }, c.destroy = function () {
    this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
  }, s
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, s, n, o) {
    return e(t, i, s, n, o)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, s, n) {
  "use strict";
  
  function o(t, e) {
    var i = s.getQueryElement(t);
    if (i) {
      this.element = i, c && (this.$element = c(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(e);
      var n = ++h;
      this.element.outlayerGUID = n, p[n] = this, this._create(), this._getOption("initLayout") && this.layout()
    } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
  }
  
  function a(t) {
    function e() {
      t.apply(this, arguments)
    }
    
    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
  }
  
  function r(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], s = e && e[2];
    return i.length ? (i = parseFloat(i)) * (f[s] || 1) : 0
  }
  
  var l = t.console, c = t.jQuery, d = function () {
  }, h = 0, p = {};
  o.namespace = "outlayer", o.Item = n, o.defaults = {
    containerStyle: {position: "relative"},
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
    visibleStyle: {opacity: 1, transform: "scale(1)"}
  };
  var u = o.prototype;
  s.extend(u, e.prototype), u.option = function (t) {
    s.extend(this.options, t)
  }, u._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
  }, o.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, u._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
  }, u.reloadItems = function () {
    this.items = this._itemize(this.element.children)
  }, u._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, s = [], n = 0; n < e.length; n++) {
      var o = new i(e[n], this);
      s.push(o)
    }
    return s
  }, u._filterFindItemElements = function (t) {
    return s.filterFindElements(t, this.options.itemSelector)
  }, u.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element
    })
  }, u.layout = function () {
    this._resetLayout(), this._manageStamps();
    var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
    this.layoutItems(this.items, e), this._isLayoutInited = !0
  }, u._init = u.layout, u._resetLayout = function () {
    this.getSize()
  }, u.getSize = function () {
    this.size = i(this.element)
  }, u._getMeasurement = function (t, e) {
    var s, n = this.options[t];
    n ? ("string" == typeof n ? s = this.element.querySelector(n) : n instanceof HTMLElement && (s = n), this[t] = s ? i(s)[e] : n) : this[t] = 0
  }, u.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
  }, u._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored
    })
  }, u._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var s = this._getItemLayoutPosition(t);
        s.item = t, s.isInstant = e || t.isLayoutInstant, i.push(s)
      }, this), this._processLayoutQueue(i)
    }
  }, u._getItemLayoutPosition = function () {
    return {x: 0, y: 0}
  }, u._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e)
    }, this)
  }, u.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = r(t), this.stagger)
  }, u._positionItem = function (t, e, i, s, n) {
    s ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
  }, u._postLayout = function () {
    this.resizeContainer()
  }, u.resizeContainer = function () {
    if (this._getOption("resizeContainer")) {
      var t = this._getContainerSize();
      t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
    }
  }, u._getContainerSize = d, u._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
    }
  }, u._emitCompleteOnItems = function (t, e) {
    function i() {
      n.dispatchEvent(t + "Complete", null, [e])
    }
    
    function s() {
      ++a == o && i()
    }
    
    var n = this, o = e.length;
    if (e && o) {
      var a = 0;
      e.forEach(function (e) {
        e.once(t, s)
      })
    } else i()
  }, u.dispatchEvent = function (t, e, i) {
    var s = e ? [e].concat(i) : i;
    if (this.emitEvent(t, s), c) if (this.$element = this.$element || c(this.element), e) {
      var n = c.Event(e);
      n.type = t, this.$element.trigger(n, i)
    } else this.$element.trigger(t, i)
  }, u.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0)
  }, u.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored
  }, u.stamp = function (t) {
    (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
  }, u.unstamp = function (t) {
    (t = this._find(t)) && t.forEach(function (t) {
      s.removeFrom(this.stamps, t), this.unignore(t)
    }, this)
  }, u._find = function (t) {
    return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = s.makeArray(t)) : void 0
  }, u._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
  }, u._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(), e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    }
  }, u._manageStamp = d, u._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(), s = this._boundingRect, n = i(t);
    return {
      left: e.left - s.left - n.marginLeft,
      top: e.top - s.top - n.marginTop,
      right: s.right - e.right - n.marginRight,
      bottom: s.bottom - e.bottom - n.marginBottom
    }
  }, u.handleEvent = s.handleEvent, u.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0
  }, u.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1
  }, u.onresize = function () {
    this.resize()
  }, s.debounceMethod(o, "onresize", 100), u.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout()
  }, u.needsResizeLayout = function () {
    var t = i(this.element);
    return this.size && t && t.innerWidth !== this.size.innerWidth
  }, u.addItems = function (t) {
    var e = this._itemize(t);
    return e.length && (this.items = this.items.concat(e)), e
  }, u.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e))
  }, u.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
    }
  }, u.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal()
      })
    }
  }, u.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide()
      })
    }
  }, u.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e)
  }, u.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e)
  }, u.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i
    }
  }, u.getItems = function (t) {
    var e = [];
    return (t = s.makeArray(t)).forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i)
    }, this), e
  }, u.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), s.removeFrom(this.items, t)
    }, this)
  }, u.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy()
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete p[e], delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
  }, o.data = function (t) {
    var e = (t = s.getQueryElement(t)) && t.outlayerGUID;
    return e && p[e]
  }, o.create = function (t, e) {
    var i = a(o);
    return i.defaults = s.extend({}, o.defaults), s.extend(i.defaults, e), i.compatOptions = s.extend({}, o.compatOptions), i.namespace = t, i.data = o.data, i.Item = a(n), s.htmlInit(i, t), c && c.bridget && c.bridget(t, i), i
  };
  var f = {ms: 1, s: 1e3};
  return o.Item = n, o
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
  "use strict";
  
  function e() {
    t.Item.apply(this, arguments)
  }
  
  var i = e.prototype = Object.create(t.Item.prototype), s = i._create;
  i._create = function () {
    this.id = this.layout.itemGUID++, s.call(this), this.sortData = {}
  }, i.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
      var t = this.layout.options.getSortData, e = this.layout._sorters;
      for (var i in t) {
        var s = e[i];
        this.sortData[i] = s(this.element, this)
      }
    }
  };
  var n = i.destroy;
  return i.destroy = function () {
    n.apply(this, arguments), this.css({display: ""})
  }, e
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
  "use strict";
  
  function i(t) {
    this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
  }
  
  var s = i.prototype;
  return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (t) {
    s[t] = function () {
      return e.prototype[t].apply(this.isotope, arguments)
    }
  }), s.needsVerticalResizeLayout = function () {
    var e = t(this.isotope.element);
    return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
  }, s._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments)
  }, s.getColumnWidth = function () {
    this.getSegmentSize("column", "Width")
  }, s.getRowHeight = function () {
    this.getSegmentSize("row", "Height")
  }, s.getSegmentSize = function (t, e) {
    var i = t + e, s = "outer" + e;
    if (this._getMeasurement(i, s), !this[i]) {
      var n = this.getFirstItemSize();
      this[i] = n && n[s] || this.isotope.size["inner" + e]
    }
  }, s.getFirstItemSize = function () {
    var e = this.isotope.filteredItems[0];
    return e && e.element && t(e.element)
  }, s.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments)
  }, s.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size
  }, i.modes = {}, i.create = function (t, e) {
    function n() {
      i.apply(this, arguments)
    }
    
    return n.prototype = Object.create(s), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
  }, i
}), function (t, e) {
  "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
  var i = t.create("masonry");
  return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
    for (var t = 0; t < this.cols; t++) this.colYs.push(0);
    this.maxY = 0
  }, i.prototype.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0], i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth
    }
    var s = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, o = n / s, a = s - n % s,
      r = a && 1 > a ? "round" : "floor";
    o = Math[r](o), this.cols = Math.max(o, 1)
  }, i.prototype.getContainerWidth = function () {
    var t = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = e(t);
    this.containerWidth = i && i.innerWidth
  }, i.prototype._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
      s = Math[i](t.size.outerWidth / this.columnWidth);
    s = Math.min(s, this.cols);
    for (var n = this._getColGroup(s), o = Math.min.apply(Math, n), a = n.indexOf(o), r = {
      x: this.columnWidth * a,
      y: o
    }, l = o + t.size.outerHeight, c = this.cols + 1 - n.length, d = 0; c > d; d++) this.colYs[a + d] = l;
    return r
  }, i.prototype._getColGroup = function (t) {
    if (2 > t) return this.colYs;
    for (var e = [], i = this.cols + 1 - t, s = 0; i > s; s++) {
      var n = this.colYs.slice(s, s + t);
      e[s] = Math.max.apply(Math, n)
    }
    return e
  }, i.prototype._manageStamp = function (t) {
    var i = e(t), s = this._getElementOffset(t), n = this._getOption("originLeft") ? s.left : s.right,
      o = n + i.outerWidth, a = Math.floor(n / this.columnWidth);
    a = Math.max(0, a);
    var r = Math.floor(o / this.columnWidth);
    r -= o % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
    for (var l = (this._getOption("originTop") ? s.top : s.bottom) + i.outerHeight, c = a; r >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
  }, i.prototype._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {height: this.maxY};
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
  }, i.prototype._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
    return (this.cols - t) * this.columnWidth - this.gutter
  }, i.prototype.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth
  }, i
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
  "use strict";
  var i = t.create("masonry"), s = i.prototype, n = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
  for (var o in e.prototype) n[o] || (s[o] = e.prototype[o]);
  var a = s.measureColumns;
  s.measureColumns = function () {
    this.items = this.isotope.filteredItems, a.call(this)
  };
  var r = s._getOption;
  return s._getOption = function (t) {
    return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : r.apply(this.isotope, arguments)
  }, i
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("fitRows"), i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
    0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
    var s = {x: this.x, y: this.y};
    return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, s
  }, i._getContainerSize = function () {
    return {height: this.maxY}
  }, e
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("vertical", {horizontalAlignment: 0}), i = e.prototype;
  return i._resetLayout = function () {
    this.y = 0
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
    return this.y += t.size.outerHeight, {x: e, y: i}
  }, i._getContainerSize = function () {
    return {height: this.y}
  }, e
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "./item", "./layout-mode", "./layout-modes/masonry", "./layout-modes/fit-rows", "./layout-modes/vertical"], function (i, s, n, o, a, r) {
    return e(t, i, s, n, o, a, r)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, s, n, o, a) {
  function r(t, e) {
    return function (i, s) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n], a = i.sortData[o], r = s.sortData[o];
        if (a > r || r > a) {
          var l = (void 0 !== e[o] ? e[o] : e) ? 1 : -1;
          return (a > r ? 1 : -1) * l
        }
      }
      return 0
    }
  }
  
  var l = t.jQuery, c = String.prototype.trim ? function (t) {
    return t.trim()
  } : function (t) {
    return t.replace(/^\s+|\s+$/g, "")
  }, d = e.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
  d.Item = o, d.LayoutMode = a;
  var h = d.prototype;
  h._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
    for (var t in a.modes) this._initLayoutMode(t)
  }, h.reloadItems = function () {
    this.itemGUID = 0, e.prototype.reloadItems.call(this)
  }, h._itemize = function () {
    for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) t[i].id = this.itemGUID++;
    return this._updateItemsSortData(t), t
  }, h._initLayoutMode = function (t) {
    var e = a.modes[t], i = this.options[t] || {};
    this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
  }, h.layout = function () {
    return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
  }, h._layout = function () {
    var t = this._getIsInstant();
    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
  }, h.arrange = function (t) {
    this.option(t), this._getIsInstant();
    var e = this._filter(this.items);
    this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
  }, h._init = h.arrange, h._hideReveal = function (t) {
    this.reveal(t.needReveal), this.hide(t.needHide)
  }, h._getIsInstant = function () {
    var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
    return this._isInstant = e, e
  }, h._bindArrangeComplete = function () {
    function t() {
      e && i && s && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
    }
    
    var e, i, s, n = this;
    this.once("layoutComplete", function () {
      e = !0, t()
    }), this.once("hideComplete", function () {
      i = !0, t()
    }), this.once("revealComplete", function () {
      s = !0, t()
    })
  }, h._filter = function (t) {
    var e = this.options.filter;
    e = e || "*";
    for (var i = [], s = [], n = [], o = this._getFilterTest(e), a = 0; a < t.length; a++) {
      var r = t[a];
      if (!r.isIgnored) {
        var l = o(r);
        l && i.push(r), l && r.isHidden ? s.push(r) : l || r.isHidden || n.push(r)
      }
    }
    return {matches: i, needReveal: s, needHide: n}
  }, h._getFilterTest = function (t) {
    return l && this.options.isJQueryFiltering ? function (e) {
      return l(e.element).is(t)
    } : "function" == typeof t ? function (e) {
      return t(e.element)
    } : function (e) {
      return s(e.element, t)
    }
  }, h.updateSortData = function (t) {
    var e;
    t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
  }, h._getSorters = function () {
    var t = this.options.getSortData;
    for (var e in t) {
      var i = t[e];
      this._sorters[e] = p(i)
    }
  }, h._updateItemsSortData = function (t) {
    for (var e = t && t.length, i = 0; e && e > i; i++) t[i].updateSortData()
  };
  var p = function () {
    function t(t) {
      if ("string" != typeof t) return t;
      var i = c(t).split(" "), s = i[0], n = s.match(/^\[(.+)\]$/), o = e(n && n[1], s), a = d.sortDataParsers[i[1]];
      return t = a ? function (t) {
        return t && a(o(t))
      } : function (t) {
        return t && o(t)
      }
    }
    
    function e(t, e) {
      return t ? function (e) {
        return e.getAttribute(t)
      } : function (t) {
        var i = t.querySelector(e);
        return i && i.textContent
      }
    }
    
    return t
  }();
  d.sortDataParsers = {
    parseInt: function (t) {
      return parseInt(t, 10)
    }, parseFloat: function (t) {
      return parseFloat(t)
    }
  }, h._sort = function () {
    var t = this.options.sortBy;
    if (t) {
      var e = r([].concat.apply(t, this.sortHistory), this.options.sortAscending);
      this.filteredItems.sort(e), t != this.sortHistory[0] && this.sortHistory.unshift(t)
    }
  }, h._mode = function () {
    var t = this.options.layoutMode, e = this.modes[t];
    if (!e) throw new Error("No layout mode: " + t);
    return e.options = this.options[t], e
  }, h._resetLayout = function () {
    e.prototype._resetLayout.call(this), this._mode()._resetLayout()
  }, h._getItemLayoutPosition = function (t) {
    return this._mode()._getItemLayoutPosition(t)
  }, h._manageStamp = function (t) {
    this._mode()._manageStamp(t)
  }, h._getContainerSize = function () {
    return this._mode()._getContainerSize()
  }, h.needsResizeLayout = function () {
    return this._mode().needsResizeLayout()
  }, h.appended = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i = this._filterRevealAdded(e);
      this.filteredItems = this.filteredItems.concat(i)
    }
  }, h.prepended = function (t) {
    var e = this._itemize(t);
    if (e.length) {
      this._resetLayout(), this._manageStamps();
      var i = this._filterRevealAdded(e);
      this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
    }
  }, h._filterRevealAdded = function (t) {
    var e = this._filter(t);
    return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
  }, h.insert = function (t) {
    var e = this.addItems(t);
    if (e.length) {
      var i, s, n = e.length;
      for (i = 0; n > i; i++) s = e[i], this.element.appendChild(s.element);
      var o = this._filter(e).matches;
      for (i = 0; n > i; i++) e[i].isLayoutInstant = !0;
      for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
      this.reveal(o)
    }
  };
  var u = h.remove;
  return h.remove = function (t) {
    t = n.makeArray(t);
    var e = this.getItems(t);
    u.call(this, t);
    for (var i = e && e.length, s = 0; i && i > s; s++) {
      var o = e[s];
      n.removeFrom(this.filteredItems, o)
    }
  }, h.shuffle = function () {
    for (var t = 0; t < this.items.length; t++) this.items[t].sortData.random = Math.random();
    this.options.sortBy = "random", this._sort(), this._layout()
  }, h._noTransition = function (t, e) {
    var i = this.options.transitionDuration;
    this.options.transitionDuration = 0;
    var s = t.apply(this, e);
    return this.options.transitionDuration = i, s
  }, h.getFilteredItemElements = function () {
    return this.filteredItems.map(function (t) {
      return t.element
    })
  }, d
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("fitColumns"), i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxX = 0
  }, i._getItemLayoutPosition = function (t) {
    t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && (this.y = 0, this.x = this.maxX);
    var e = {x: this.x, y: this.y};
    return this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth), this.y += t.size.outerHeight, e
  }, i._getContainerSize = function () {
    return {width: this.maxX}
  }, i.needsResizeLayout = function () {
    return this.needsVerticalResizeLayout()
  }, e
}), function (t) {
  t.fn.theiaStickySidebar = function (e) {
    function i(e, i) {
      return !0 === e.initialized || !(t("body").width() < e.minWidth) && (s(e, i), !0)
    }
    
    function s(e, i) {
      e.initialized = !0, t("head").append(t('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), i.each(function () {
        function i() {
          n.fixedScrollTop = 0, n.sidebar.css({"min-height": "1px"}), n.stickySidebar.css({
            position: "static",
            width: ""
          })
        }
        
        function s(e) {
          var i = e.height();
          return e.children().each(function () {
            i = Math.max(i, t(this).height())
          }), i
        }
        
        var n = {};
        n.sidebar = t(this), n.options = e || {}, n.container = t(n.options.containerSelector), 0 == n.container.size() && (n.container = n.sidebar.parent()), n.sidebar.parents().css("-webkit-transform", "none"), n.sidebar.css({
          position: "relative",
          overflow: "visible",
          "-webkit-box-sizing": "border-box",
          "-moz-box-sizing": "border-box",
          "box-sizing": "border-box"
        }), n.stickySidebar = n.sidebar.find(".theiaStickySidebar"), 0 == n.stickySidebar.length && (n.sidebar.find("script").remove(), n.stickySidebar = t("<div>").addClass("theiaStickySidebar").append(n.sidebar.children()), n.sidebar.append(n.stickySidebar)), n.marginTop = parseInt(n.sidebar.css("margin-top")), n.marginBottom = parseInt(n.sidebar.css("margin-bottom")), n.paddingTop = parseInt(n.sidebar.css("padding-top")), n.paddingBottom = parseInt(n.sidebar.css("padding-bottom"));
        var o = n.stickySidebar.offset().top, a = n.stickySidebar.outerHeight();
        n.stickySidebar.css("padding-top", 1), n.stickySidebar.css("padding-bottom", 1), o -= n.stickySidebar.offset().top, a = n.stickySidebar.outerHeight() - a - o, 0 == o ? (n.stickySidebar.css("padding-top", 0), n.stickySidebarPaddingTop = 0) : n.stickySidebarPaddingTop = 1, 0 == a ? (n.stickySidebar.css("padding-bottom", 0), n.stickySidebarPaddingBottom = 0) : n.stickySidebarPaddingBottom = 1, n.previousScrollTop = null, n.fixedScrollTop = 0, i(), n.onScroll = function (n) {
          if (n.stickySidebar.is(":visible")) {
            if (t("body").width() < n.options.minWidth) return void i();
            if (n.options.disableOnResponsiveLayouts && n.sidebar.outerWidth("none" == n.sidebar.css("float")) + 50 > n.container.width()) return void i();
            var o = t(document).scrollTop(), a = "static";
            if (o >= n.container.offset().top + (n.paddingTop + n.marginTop - n.options.additionalMarginTop)) {
              var r, l = n.paddingTop + n.marginTop + e.additionalMarginTop,
                c = n.paddingBottom + n.marginBottom + e.additionalMarginBottom, d = n.container.offset().top,
                h = n.container.offset().top + s(n.container), p = 0 + e.additionalMarginTop;
              r = n.stickySidebar.outerHeight() + l + c < t(window).height() ? p + n.stickySidebar.outerHeight() : t(window).height() - n.marginBottom - n.paddingBottom - e.additionalMarginBottom;
              var u = d - o + n.paddingTop + n.marginTop, f = h - o - n.paddingBottom - n.marginBottom,
                m = n.stickySidebar.offset().top - o, g = n.previousScrollTop - o;
              "fixed" == n.stickySidebar.css("position") && "modern" == n.options.sidebarBehavior && (m += g), "stick-to-top" == n.options.sidebarBehavior && (m = e.additionalMarginTop), "stick-to-bottom" == n.options.sidebarBehavior && (m = r - n.stickySidebar.outerHeight()), m = g > 0 ? Math.min(m, p) : Math.max(m, r - n.stickySidebar.outerHeight()), m = Math.max(m, u), m = Math.min(m, f - n.stickySidebar.outerHeight());
              var v = n.container.height() == n.stickySidebar.outerHeight();
              a = !v && m == p || !v && m == r - n.stickySidebar.outerHeight() ? "fixed" : o + m - n.sidebar.offset().top - n.paddingTop <= e.additionalMarginTop ? "static" : "absolute"
            }
            if ("fixed" == a) n.stickySidebar.css({
              position: "fixed",
              width: n.sidebar.width(),
              top: m,
              left: n.sidebar.offset().left + parseInt(n.sidebar.css("padding-left"))
            }); else if ("absolute" == a) {
              var y = {};
              "absolute" != n.stickySidebar.css("position") && (y.position = "absolute", y.top = o + m - n.sidebar.offset().top - n.stickySidebarPaddingTop - n.stickySidebarPaddingBottom), y.width = n.sidebar.width(), y.left = "", n.stickySidebar.css(y)
            } else "static" == a && i();
            "static" != a && 1 == n.options.updateSidebarHeight && n.sidebar.css({"min-height": n.stickySidebar.outerHeight() + n.stickySidebar.offset().top - n.sidebar.offset().top + n.paddingBottom}), n.previousScrollTop = o
          }
        }, n.onScroll(n), t(document).scroll(function (t) {
          return function () {
            t.onScroll(t)
          }
        }(n)), t(window).resize(function (t) {
          return function () {
            t.stickySidebar.css({position: "static"}), t.onScroll(t)
          }
        }(n))
      })
    }
    
    var n = {
      containerSelector: "",
      additionalMarginTop: 0,
      additionalMarginBottom: 0,
      updateSidebarHeight: !0,
      minWidth: 0,
      disableOnResponsiveLayouts: !0,
      sidebarBehavior: "modern"
    };
    (e = t.extend(n, e)).additionalMarginTop = parseInt(e.additionalMarginTop) || 0, e.additionalMarginBottom = parseInt(e.additionalMarginBottom) || 0, function (e, s) {
      i(e, s) || (console.log("TST: Body width smaller than options.minWidth. Init is delayed."), t(document).scroll(function (e, s) {
        return function (n) {
          i(e, s) && t(this).unbind(n)
        }
      }(e, s)), t(window).resize(function (e, s) {
        return function (n) {
          i(e, s) && t(this).unbind(n)
        }
      }(e, s)))
    }(e, this)
  }
}(jQuery), function (t, e) {
  "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
  "use strict";
  var e = t.create("fitColumns"), i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxX = 0
  }, i._getItemLayoutPosition = function (t) {
    t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && (this.y = 0, this.x = this.maxX);
    var e = {x: this.x, y: this.y};
    return this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth), this.y += t.size.outerHeight, e
  }, i._getContainerSize = function () {
    return {width: this.maxX}
  }, i.needsResizeLayout = function () {
    return this.needsVerticalResizeLayout()
  }, e
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function () {
  function t() {
  }
  
  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {}, s = i[t] = i[t] || [];
      return -1 == s.indexOf(e) && s.push(e), this
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {};
      return (i[t] = i[t] || [])[e] = !0, this
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var s = i.indexOf(e);
      return -1 != s && i.splice(s, 1), this
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (i && i.length) {
      var s = 0, n = i[s];
      e = e || [];
      for (var o = this._onceEvents && this._onceEvents[t]; n;) {
        var a = o && o[n];
        a && (this.off(t, n), delete o[n]), n.apply(this, e), n = i[s += a ? 0 : 1]
      }
      return this
    }
  }, t
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
    return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function (t, e) {
  function i(t, e) {
    for (var i in e) t[i] = e[i];
    return t
  }
  
  function s(t) {
    var e = [];
    if (Array.isArray(t)) e = t; else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
    return e
  }
  
  function n(t, e, o) {
    return this instanceof n ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = s(t), this.options = i({}, this.options), "function" == typeof e ? o = e : i(this.options, e), o && this.on("always", o), this.getImages(), r && (this.jqDeferred = new r.Deferred), void setTimeout(function () {
      this.check()
    }.bind(this))) : new n(t, e, o)
  }
  
  function o(t) {
    this.img = t
  }
  
  function a(t, e) {
    this.url = t, this.element = e, this.img = new Image
  }
  
  var r = t.jQuery, l = t.console;
  n.prototype = Object.create(e.prototype), n.prototype.options = {}, n.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this)
  }, n.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
    var e = t.nodeType;
    if (e && c[e]) {
      for (var i = t.querySelectorAll("img"), s = 0; s < i.length; s++) {
        var n = i[s];
        this.addImage(n)
      }
      if ("string" == typeof this.options.background) {
        var o = t.querySelectorAll(this.options.background);
        for (s = 0; s < o.length; s++) {
          var a = o[s];
          this.addElementBackgroundImages(a)
        }
      }
    }
  };
  var c = {1: !0, 9: !0, 11: !0};
  return n.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, s = i.exec(e.backgroundImage); null !== s;) {
      var n = s && s[2];
      n && this.addBackground(n, t), s = i.exec(e.backgroundImage)
    }
  }, n.prototype.addImage = function (t) {
    var e = new o(t);
    this.images.push(e)
  }, n.prototype.addBackground = function (t, e) {
    var i = new a(t, e);
    this.images.push(i)
  }, n.prototype.check = function () {
    function t(t, i, s) {
      setTimeout(function () {
        e.progress(t, i, s)
      })
    }
    
    var e = this;
    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
      e.once("progress", t), e.check()
    }) : void this.complete()
  }, n.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
  }, n.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";
    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this)
    }
  }, o.prototype = Object.create(e.prototype), o.prototype.check = function () {
    return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
  }, o.prototype.getIsImageComplete = function () {
    return this.img.complete && void 0 !== this.img.naturalWidth
  }, o.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
  }, o.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t)
  }, o.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents()
  }, o.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents()
  }, o.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, a.prototype = Object.create(o.prototype), a.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
  }, a.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, a.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
  }, n.makeJQueryPlugin = function (e) {
    (e = e || t.jQuery) && (r = e, r.fn.imagesLoaded = function (t, e) {
      return new n(this, t, e).jqDeferred.promise(r(this))
    })
  }, n.makeJQueryPlugin(), n
}), function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
  "use strict";
  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (i, s) {
      var n, o = this;
      o.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: t(i),
        appendDots: t(i),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, i) {
          return t('<button type="button" />').text(i + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, o.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, t.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = t(i), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, n = t(i).data("slick") || {}, o.options = t.extend({}, o.defaults, s, n), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = t.proxy(o.autoPlay, o), o.autoPlayClear = t.proxy(o.autoPlayClear, o), o.autoPlayIterator = t.proxy(o.autoPlayIterator, o), o.changeSlide = t.proxy(o.changeSlide, o), o.clickHandler = t.proxy(o.clickHandler, o), o.selectHandler = t.proxy(o.selectHandler, o), o.setPosition = t.proxy(o.setPosition, o), o.swipeHandler = t.proxy(o.swipeHandler, o), o.dragHandler = t.proxy(o.dragHandler, o), o.keyHandler = t.proxy(o.keyHandler, o), o.instanceUid = e++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
    }
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, i, s) {
    var n = this;
    if ("boolean" == typeof i) s = i, i = null; else if (i < 0 || i >= n.slideCount) return !1;
    n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : s ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : !0 === s ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function (e, i) {
      t(i).attr("data-slick-index", e)
    }), n.$slidesCache = n.$slides, n.reinit()
  }, e.prototype.animateHeight = function () {
    var t = this;
    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.animate({height: e}, t.options.speed)
    }
  }, e.prototype.animateSlide = function (e, i) {
    var s = {}, n = this;
    n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (e = -e), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({left: e}, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({top: e}, n.options.speed, n.options.easing, i) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), t({animStart: n.currentLeft}).animate({animStart: e}, {
      duration: n.options.speed,
      easing: n.options.easing,
      step: function (t) {
        t = Math.ceil(t), !1 === n.options.vertical ? (s[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(s)) : (s[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(s))
      },
      complete: function () {
        i && i.call()
      }
    })) : (n.applyTransition(), e = Math.ceil(e), !1 === n.options.vertical ? s[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(s), i && setTimeout(function () {
      n.disableTransition(), i.call()
    }, n.options.speed))
  }, e.prototype.getNavTarget = function () {
    var e = this, i = e.options.asNavFor;
    return i && null !== i && (i = t(i).not(e.$slider)), i
  }, e.prototype.asNavFor = function (e) {
    var i = this.getNavTarget();
    null !== i && "object" == typeof i && i.each(function () {
      var i = t(this).slick("getSlick");
      i.unslicked || i.slideHandler(e, !0)
    })
  }, e.prototype.applyTransition = function (t) {
    var e = this, i = {};
    !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.autoPlay = function () {
    var t = this;
    t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
  }, e.prototype.autoPlayClear = function () {
    var t = this;
    t.autoPlayTimer && clearInterval(t.autoPlayTimer)
  }, e.prototype.autoPlayIterator = function () {
    var t = this, e = t.currentSlide + t.options.slidesToScroll;
    t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, e.prototype.buildDots = function () {
    var e, i, s = this;
    if (!0 === s.options.dots) {
      for (s.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(s.options.dotsClass), e = 0; e <= s.getDotCount(); e += 1) i.append(t("<li />").append(s.options.customPaging.call(this, s, e)));
      s.$dots = i.appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active")
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
      t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
  }, e.prototype.buildRows = function () {
    var t, e, i, s, n, o, a, r = this;
    if (s = document.createDocumentFragment(), o = r.$slider.children(), r.options.rows > 1) {
      for (a = r.options.slidesPerRow * r.options.rows, n = Math.ceil(o.length / a), t = 0; t < n; t++) {
        var l = document.createElement("div");
        for (e = 0; e < r.options.rows; e++) {
          var c = document.createElement("div");
          for (i = 0; i < r.options.slidesPerRow; i++) {
            var d = t * a + (e * r.options.slidesPerRow + i);
            o.get(d) && c.appendChild(o.get(d))
          }
          l.appendChild(c)
        }
        s.appendChild(l)
      }
      r.$slider.empty().append(s), r.$slider.children().children().children().css({
        width: 100 / r.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, e.prototype.checkResponsive = function (e, i) {
    var s, n, o, a = this, r = !1, l = a.$slider.width(), c = window.innerWidth || t(window).width();
    if ("window" === a.respondTo ? o = c : "slider" === a.respondTo ? o = l : "min" === a.respondTo && (o = Math.min(c, l)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
      n = null;
      for (s in a.breakpoints) a.breakpoints.hasOwnProperty(s) && (!1 === a.originalSettings.mobileFirst ? o < a.breakpoints[s] && (n = a.breakpoints[s]) : o > a.breakpoints[s] && (n = a.breakpoints[s]));
      null !== n ? null !== a.activeBreakpoint ? (n !== a.activeBreakpoint || i) && (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e), r = n), e || !1 === r || a.$slider.trigger("breakpoint", [a, r])
    }
  }, e.prototype.changeSlide = function (e, i) {
    var s, n, o, a = this, r = t(e.currentTarget);
    switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = a.slideCount % a.options.slidesToScroll != 0, s = o ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, e.data.message) {
      case"previous":
        n = 0 === s ? a.options.slidesToScroll : a.options.slidesToShow - s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - n, !1, i);
        break;
      case"next":
        n = 0 === s ? a.options.slidesToScroll : s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + n, !1, i);
        break;
      case"index":
        var l = 0 === e.data.index ? 0 : e.data.index || r.index() * a.options.slidesToScroll;
        a.slideHandler(a.checkNavigable(l), !1, i), r.children().trigger("focus");
        break;
      default:
        return
    }
  }, e.prototype.checkNavigable = function (t) {
    var e, i;
    if (e = this.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1]; else for (var s in e) {
      if (t < e[s]) {
        t = i;
        break
      }
      i = e[s]
    }
    return t
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.cleanUpRows = function () {
    var t, e = this;
    e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
  }, e.prototype.clickHandler = function (t) {
    !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
  }, e.prototype.destroy = function (e) {
    var i = this;
    i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      t(this).attr("style", t(this).data("originalStyling"))
    }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
  }, e.prototype.disableTransition = function (t) {
    var e = this, i = {};
    i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.fadeSlide = function (t, e) {
    var i = this;
    !1 === i.cssTransitions ? (i.$slides.eq(t).css({zIndex: i.options.zIndex}), i.$slides.eq(t).animate({opacity: 1}, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
      opacity: 1,
      zIndex: i.options.zIndex
    }), e && setTimeout(function () {
      i.disableTransition(t), e.call()
    }, i.options.speed))
  }, e.prototype.fadeSlideOut = function (t) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(t).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }))
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
    var e = this;
    null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (i) {
      i.stopImmediatePropagation();
      var s = t(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = s.is(":focus"), e.autoPlay())
      }, 0)
    })
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide
  }, e.prototype.getDotCount = function () {
    var t = this, e = 0, i = 0, s = 0;
    if (!0 === t.options.infinite) if (t.slideCount <= t.options.slidesToShow) ++s; else for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else if (!0 === t.options.centerMode) s = t.slideCount; else if (t.options.asNavFor) for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else s = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
    return s - 1
  }, e.prototype.getLeft = function (t) {
    var e, i, s, n, o = this, a = 0;
    return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, n = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? n = -1.5 : 1 === o.options.slidesToShow && (n = -2)), a = i * o.options.slidesToShow * n), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, a = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, a = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, a = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, a = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + a, !0 === o.options.variableWidth && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === o.options.centerMode && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (o.$list.width() - s.outerWidth()) / 2)), e
  }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
    return this.options[t]
  }, e.prototype.getNavigableIndexes = function () {
    var t, e = this, i = 0, s = 0, n = [];
    for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) n.push(i), i = s + e.options.slidesToScroll, s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    return n
  }, e.prototype.getSlick = function () {
    return this
  }, e.prototype.getSlideCount = function () {
    var e, i, s = this;
    return i = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function (n, o) {
      if (o.offsetLeft - i + t(o).outerWidth() / 2 > -1 * s.swipeLeft) return e = o, !1
    }), Math.abs(t(e).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
  }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
    this.changeSlide({data: {message: "index", index: parseInt(t)}}, e)
  }, e.prototype.init = function (e) {
    var i = this;
    t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
  }, e.prototype.initADA = function () {
    var e = this, i = Math.ceil(e.slideCount / e.options.slidesToShow),
      s = e.getNavigableIndexes().filter(function (t) {
        return t >= 0 && t < e.slideCount
      });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({tabindex: "-1"}), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
      var n = s.indexOf(i);
      t(this).attr({
        role: "tabpanel",
        id: "slick-slide" + e.instanceUid + i,
        tabindex: -1
      }), -1 !== n && t(this).attr({"aria-describedby": "slick-slide-control" + e.instanceUid + n})
    }), e.$dots.attr("role", "tablist").find("li").each(function (n) {
      var o = s[n];
      t(this).attr({role: "presentation"}), t(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + e.instanceUid + n,
        "aria-controls": "slick-slide" + e.instanceUid + o,
        "aria-label": n + 1 + " of " + i,
        "aria-selected": null,
        tabindex: "-1"
      })
    }).eq(e.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end());
    for (var n = e.currentSlide, o = n + e.options.slidesToShow; n < o; n++) e.$slides.eq(n).attr("tabindex", 0);
    e.activateADA()
  }, e.prototype.initArrowEvents = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
  }, e.prototype.initUI = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
  }, e.prototype.keyHandler = function (t) {
    var e = this;
    t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({data: {message: !0 === e.options.rtl ? "next" : "previous"}}) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({data: {message: !0 === e.options.rtl ? "previous" : "next"}}))
  }, e.prototype.lazyLoad = function () {
    function e(e) {
      t("img[data-lazy]", e).each(function () {
        var e = t(this), i = t(this).attr("data-lazy"), s = t(this).attr("data-srcset"),
          n = t(this).attr("data-sizes") || o.$slider.attr("data-sizes"), a = document.createElement("img");
        a.onload = function () {
          e.animate({opacity: 0}, 100, function () {
            s && (e.attr("srcset", s), n && e.attr("sizes", n)), e.attr("src", i).animate({opacity: 1}, 200, function () {
              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
            }), o.$slider.trigger("lazyLoaded", [o, e, i])
          })
        }, a.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, e, i])
        }, a.src = i
      })
    }
    
    var i, s, n, o = this;
    if (!0 === o.options.centerMode ? !0 === o.options.infinite ? n = (s = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (s = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), n = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (s = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, n = Math.ceil(s + o.options.slidesToShow), !0 === o.options.fade && (s > 0 && s--, n <= o.slideCount && n++)), i = o.$slider.find(".slick-slide").slice(s, n), "anticipated" === o.options.lazyLoad) for (var a = s - 1, r = n, l = o.$slider.find(".slick-slide"), c = 0; c < o.options.slidesToScroll; c++) a < 0 && (a = o.slideCount - 1), i = (i = i.add(l.eq(a))).add(l.eq(r)), a--, r++;
    e(i), o.slideCount <= o.options.slidesToShow ? e(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? e(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && e(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
  }, e.prototype.loadSlider = function () {
    var t = this;
    t.setPosition(), t.$slideTrack.css({opacity: 1}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({data: {message: "next"}})
  }, e.prototype.orientationChange = function () {
    var t = this;
    t.checkResponsive(), t.setPosition()
  }, e.prototype.pause = e.prototype.slickPause = function () {
    var t = this;
    t.autoPlayClear(), t.paused = !0
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var t = this;
    t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
  }, e.prototype.postSlide = function (e) {
    var i = this;
    i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({data: {message: "previous"}})
  }, e.prototype.preventDefault = function (t) {
    t.preventDefault()
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var i, s, n, o, a, r = this, l = t("img[data-lazy]", r.$slider);
    l.length ? (i = l.first(), s = i.attr("data-lazy"), n = i.attr("data-srcset"), o = i.attr("data-sizes") || r.$slider.attr("data-sizes"), (a = document.createElement("img")).onload = function () {
      n && (i.attr("srcset", n), o && i.attr("sizes", o)), i.attr("src", s).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, i, s]), r.progressiveLazyLoad()
    }, a.onerror = function () {
      e < 3 ? setTimeout(function () {
        r.progressiveLazyLoad(e + 1)
      }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, i, s]), r.progressiveLazyLoad())
    }, a.src = s) : r.$slider.trigger("allImagesLoaded", [r])
  }, e.prototype.refresh = function (e) {
    var i, s, n = this;
    s = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > s && (n.currentSlide = s), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {currentSlide: i}), n.init(), e || n.changeSlide({
      data: {
        message: "index",
        index: i
      }
    }, !1)
  }, e.prototype.registerBreakpoints = function () {
    var e, i, s, n = this, o = n.options.responsive || null;
    if ("array" === t.type(o) && o.length) {
      n.respondTo = n.options.respondTo || "window";
      for (e in o) if (s = n.breakpoints.length - 1, o.hasOwnProperty(e)) {
        for (i = o[e].breakpoint; s >= 0;) n.breakpoints[s] && n.breakpoints[s] === i && n.breakpoints.splice(s, 1), s--;
        n.breakpoints.push(i), n.breakpointSettings[i] = o[e].settings
      }
      n.breakpoints.sort(function (t, e) {
        return n.options.mobileFirst ? t - e : e - t
      })
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
  }, e.prototype.resize = function () {
    var e = this;
    t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
    }, 50))
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
    var s = this;
    if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : s.slideCount - 1 : !0 === e ? --t : t, s.slideCount < 1 || t < 0 || t > s.slideCount - 1) return !1;
    s.unload(), !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, s.reinit()
  }, e.prototype.setCSS = function (t) {
    var e, i, s = this, n = {};
    !0 === s.options.rtl && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", n[s.positionProp] = t, !1 === s.transformsEnabled ? s.$slideTrack.css(n) : (n = {}, !1 === s.cssTransitions ? (n[s.animType] = "translate(" + e + ", " + i + ")", s.$slideTrack.css(n)) : (n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack.css(n)))
  }, e.prototype.setDimensions = function () {
    var t = this;
    !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({padding: "0px " + t.options.centerPadding}) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({padding: t.options.centerPadding + " 0px"})), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
    var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
    !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
  }, e.prototype.setFade = function () {
    var e, i = this;
    i.$slides.each(function (s, n) {
      e = i.slideWidth * s * -1, !0 === i.options.rtl ? t(n).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: i.options.zIndex - 2,
        opacity: 0
      }) : t(n).css({position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
    }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
  }, e.prototype.setHeight = function () {
    var t = this;
    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.css("height", e)
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e, i, s, n, o, a = this, r = !1;
    if ("object" === t.type(arguments[0]) ? (s = arguments[0], r = arguments[1], o = "multiple") : "string" === t.type(arguments[0]) && (s = arguments[0], n = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) a.options[s] = n; else if ("multiple" === o) t.each(s, function (t, e) {
      a.options[t] = e
    }); else if ("responsive" === o) for (i in n) if ("array" !== t.type(a.options.responsive)) a.options.responsive = [n[i]]; else {
      for (e = a.options.responsive.length - 1; e >= 0;) a.options.responsive[e].breakpoint === n[i].breakpoint && a.options.responsive.splice(e, 1), e--;
      a.options.responsive.push(n[i])
    }
    r && (a.unload(), a.reinit())
  }, e.prototype.setPosition = function () {
    var t = this;
    t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
  }, e.prototype.setProps = function () {
    var t = this, e = document.body.style;
    t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
  }, e.prototype.setSlideClasses = function (t) {
    var e, i, s, n, o = this;
    if (i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), !0 === o.options.centerMode) {
      var a = o.options.slidesToShow % 2 == 0 ? 1 : 0;
      e = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (t >= e && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e + a, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = o.options.slidesToShow + t, i.slice(s - e + 1 + a, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")
    } else t >= 0 && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, s = !0 === o.options.infinite ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? i.slice(s - (o.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
    "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
  }, e.prototype.setupInfinite = function () {
    var e, i, s, n = this;
    if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (i = null, n.slideCount > n.options.slidesToShow)) {
      for (s = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - s; e -= 1) i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
      for (e = 0; e < s + n.slideCount; e += 1) i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
      n.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        t(this).attr("id", "")
      })
    }
  }, e.prototype.interrupt = function (t) {
    var e = this;
    t || e.autoPlay(), e.interrupted = t
  }, e.prototype.selectHandler = function (e) {
    var i = this, s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
      n = parseInt(s.attr("data-slick-index"));
    n || (n = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(n, !1, !0) : i.slideHandler(n)
  }, e.prototype.slideHandler = function (t, e, i) {
    var s, n, o, a, r, l = null, c = this;
    if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t)) if (!1 === e && c.asNavFor(t), s = t, l = c.getLeft(s), a = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? a : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i ? c.animateSlide(a, function () {
      c.postSlide(s)
    }) : c.postSlide(s)); else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i ? c.animateSlide(a, function () {
      c.postSlide(s)
    }) : c.postSlide(s)); else {
      if (c.options.autoplay && clearInterval(c.autoPlayTimer), n = s < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + s : s >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : s - c.slideCount : s, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, n]), o = c.currentSlide, c.currentSlide = n, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (r = (r = c.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(o), c.fadeSlide(n, function () {
        c.postSlide(n)
      })) : c.postSlide(n), void c.animateHeight();
      !0 !== i ? c.animateSlide(l, function () {
        c.postSlide(n)
      }) : c.postSlide(n)
    }
  }, e.prototype.startLoad = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
  }, e.prototype.swipeDirection = function () {
    var t, e, i, s, n = this;
    return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), (s = Math.round(180 * i / Math.PI)) < 0 && (s = 360 - Math.abs(s)), s <= 45 && s >= 0 ? !1 === n.options.rtl ? "left" : "right" : s <= 360 && s >= 315 ? !1 === n.options.rtl ? "left" : "right" : s >= 135 && s <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? s >= 35 && s <= 135 ? "down" : "up" : "vertical"
  }, e.prototype.swipeEnd = function (t) {
    var e, i, s = this;
    if (s.dragging = !1, s.swiping = !1, s.scrolling) return s.scrolling = !1, !1;
    if (s.interrupted = !1, s.shouldClick = !(s.touchObject.swipeLength > 10), void 0 === s.touchObject.curX) return !1;
    if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe) {
      switch (i = s.swipeDirection()) {
        case"left":
        case"down":
          e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(), s.currentDirection = 0;
          break;
        case"right":
        case"up":
          e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(), s.currentDirection = 1
      }
      "vertical" != i && (s.slideHandler(e), s.touchObject = {}, s.$slider.trigger("swipe", [s, i]))
    } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), s.touchObject = {})
  }, e.prototype.swipeHandler = function (t) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
      case"start":
        e.swipeStart(t);
        break;
      case"move":
        e.swipeMove(t);
        break;
      case"end":
        e.swipeEnd(t)
    }
  }, e.prototype.swipeMove = function (t) {
    var e, i, s, n, o, a, r = this;
    return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || r.scrolling || o && 1 !== o.length) && (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, r.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), a = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), !r.options.verticalSwiping && !r.swiping && a > 4 ? (r.scrolling = !0, !1) : (!0 === r.options.verticalSwiping && (r.touchObject.swipeLength = a), i = r.swipeDirection(), void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && (r.swiping = !0, t.preventDefault()), n = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, !1 === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = e + s * n : r.swipeLeft = e + s * (r.$list.height() / r.listWidth) * n, !0 === r.options.verticalSwiping && (r.swipeLeft = e + s * n), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))))
  }, e.prototype.swipeStart = function (t) {
    var e, i = this;
    if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
    void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var t = this;
    null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
  }, e.prototype.unload = function () {
    var e = this;
    t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, e.prototype.unslick = function (t) {
    var e = this;
    e.$slider.trigger("unslick", [e, t]), e.destroy()
  }, e.prototype.updateArrows = function () {
    var t = this;
    Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, e.prototype.updateDots = function () {
    var t = this;
    null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
  }, e.prototype.visibility = function () {
    var t = this;
    t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
  }, t.fn.slick = function () {
    var t, i, s = this, n = arguments[0], o = Array.prototype.slice.call(arguments, 1), a = s.length;
    for (t = 0; t < a; t++) if ("object" == typeof n || void 0 === n ? s[t].slick = new e(s[t], n) : i = s[t].slick[n].apply(s[t].slick, o), void 0 !== i) return i;
    return s
  }
}), function (t) {
  "use strict";
  t(document).ready(function () {
    e.init()
  }), t(window).load(function () {
    t(".thim-loading").length > 0 && t(".thim-loading").fadeOut(1e3, function () {
      t(".thim-loading").remove(), t("body").removeClass("loading")
    }), e.menuToggle(), e.parallax(), e.blog_masonry()
  });
  var e = {
    init: function () {
      this.popupShare(), this.quickview(), this.back_to_top(), this.contactform7(), this.minicart_remove(), this.searchform(), this.widget_box(), this.footer_bottom(), this.donate_toggle_layout(), this.menuFixed(), this.widget_searchbox(), this.action_toggle(), this.thim_toggle_div(), this.widget_testimonials(), this.widget_client_logo(), this.widget_campaign(), this.widget_team(), this.widget_counter_box(), this.widget_gallery(), this.sidebar_sticky(), this.portfolio_layout(), this.portfolio(), this.post_gallery(), this.donate()
    }, post_gallery: function () {
      t("article.format-gallery .flexslider").flexslider({slideshow: !0, pauseOnHover: !0})
    }, portfolio_layout: function () {
      jQuery(".content_portfolio").each(function () {
        var e, i, s, n, o = jQuery(this);
        i = t(".content_portfolio").attr("data-columns");
        var a = parseInt(t(".content_portfolio").attr("data-gutter"));
        o.css({width: "100%"}), 1 !== (i = o.find(".item_portfolio").hasClass("five-col") ? 5 : o.find(".item_portfolio").hasClass("four-col") ? 4 : o.find(".item_portfolio").hasClass("three-col") ? 3 : o.find(".item_portfolio").hasClass("two-col") ? 2 : 1) && (o.closest(".portfolio_column").width() + a < 768 && o.closest(".portfolio_column").width() + a >= 480 && (i = 2, console.log(1)), o.closest(".portfolio_column").width() + a < 480 && (i = 1, a = 0, console.log(2))), s = Math.floor((parseInt(o.closest(".portfolio_column").width(), 10) - (i - 1) * a) / i), n = Math.floor(parseInt(s / 1.5, 10)), o.find(".item_portfolio").css({width: s}), 1 === i && (n = "auto"), o.closest(".wrapper_portfolio").hasClass("multi_grid") && o.find(".item_portfolio .portfolio-image").css({height: n}), o.closest(".wrapper_portfolio").hasClass("multi_grid") && (o.find(".item_portfolio").hasClass("height_large") && 1 !== i && o.find(".item_portfolio.height_large .portfolio-image").css({height: 2 * n + a}), o.find(".item_portfolio").hasClass("item_large") && 1 !== i && (e = 2 * s + a, o.find(".item_portfolio.item_large").css({width: e}))), o.imagesLoaded(function () {
          o.css({width: parseInt(o.closest(".portfolio_column").width(), 10)}), o.closest(".wrapper_portfolio").hasClass("has_gutter") ? (t(".content_portfolio .element-item").css({"margin-bottom": a + "px"}), o.isotope({
            itemSelector: ".item_portfolio",
            masonry: {columnWidth: s, fitWidth: !0, gutter: a}
          })) : o.isotope({itemSelector: ".item_portfolio", masonry: {columnWidth: s, fitColumn: !0}})
        })
      })
    }, portfolio: function () {
      jQuery(".image-popup-01").magnificPopup({
        type: "image",
        image: {tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'},
        key: "image-key",
        verticalFit: !0,
        mainClass: "image-popup-style",
        tError: '<a href="%url%">The image</a> could not be loaded.',
        gallery: {enabled: !0, tCounter: "%curr% of %total%"},
        callbacks: {
          open: function () {
            this.content.addClass("fadeInLeft")
          }, close: function () {
            this.content.removeClass("fadeInLeft")
          }
        }
      }), jQuery(".video-popup").magnificPopup({
        type: "iframe",
        iframe: {
          patterns: {
            youtube: {index: "youtube.com/", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
            vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
            srcAction: "iframe_src"
          }
        }
      });
      var i = t(".content_portfolio"), s = t(".entry-content-portfolio .entry-content-left").width();
      t(".entry-content-portfolio .entry-content-left iframe").css({height: s / 16 * 9 + "px"}), e.portfolio_layout(), t(".wrapper_portfolio").hasClass("portfolio_filter") && t(".portfolio-tabs").on("click", "button", function () {
        var e = t(this).attr("data-filter");
        t(".portfolio-tabs .filter").removeClass("active"), t(this).addClass("active"), i.isotope({filter: e})
      }), t(".portfolio_carousel").owlCarousel({
        lazyLoad: !0,
        nav: !0,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        navSpeed: 600,
        loop: !0,
        responsiveClass: !0,
        autoHeight: !1,
        responsive: {0: {items: 1}}
      })
    }, sidebar_sticky: function () {
      var e = 30;
      e += t("#wpadminbar").outerHeight(), t("#sidebar").theiaStickySidebar({additionalMarginTop: e})
    }, blog_masonry: function () {
      t(".blog #main .archive-content,.archive.category #main .archive-content").isotope({
        itemSelector: "article",
        percentPosition: !0,
        masonry: {columnWidth: "article", fitWidth: !1}
      })
    }, widget_gallery: function () {
      t(".thim-gallery").each(function () {
        var e = t(this).attr("id") + "_items", i = t(this).data("per_page");
        t(this).find(".gallery-pagination .inner-nav").jPages({
          containerID: e,
          previous: "",
          next: "",
          perPage: i,
          midRange: 3,
          direction: "random",
          animation: "flipInY",
          keyBrowse: !0
        })
      });
      var e = "#" + t(".thim-gallery.source-images").attr("id") + "_items";
      t(e).magnificPopup({
        type: "image", delegate: "a", gallery: {enabled: !0}, image: {
          titleSrc: function (t) {
            return '<div class="title">' + t.el.attr("data-title") + '</div><div class="caption">' + t.el.attr("data-caption") + "</div>"
          }
        }
      }), t(".thim-gallery.source-posts").on("click", ".media", function (e) {
        e.preventDefault();
        var i = t(this), s = {action: "thim_gallery_popup", post_id: i.attr("data-id")};
        i.addClass("loading"), t.post(ajaxurl, s, function (e) {
          i.removeClass("loading"), t(".thim-gallery-show").append(e), t(".thim-gallery-show").magnificPopup({
            mainClass: "my-mfp-zoom-in",
            type: "image",
            delegate: "a",
            gallery: {enabled: !0},
            callbacks: {
              open: function () {
                t.magnificPopup.instance.close = function () {
                  t(".thim-gallery-show").empty(), t.magnificPopup.proto.close.call(this)
                }
              }
            }
          }).magnificPopup("open")
        })
      })
    }, widget_counter_box: function () {
      t(".counter-box").viewportChecker({
        callbackFunction: function (e, i) {
          t(".counter-box .display-percentage").countTo({
            formatter: function (t, e) {
              return t.toFixed(e.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ".")
            }
          })
        }
      })
    }, widget_team: function () {
      jQuery(".thim-our-team.template-carousel .members").owlCarousel({
        lazyLoad: !0,
        nav: !0,
        navText: !1,
        navSpeed: 600,
        loop: !0,
        responsiveClass: !0,
        responsive: {0: {items: 1}, 480: {items: 2}, 768: {items: 3}, 1024: {items: 4}}
      })
    }, widget_campaign: function () {
      jQuery(".thim-campaign.tpl-carousel .campaigns").owlCarousel({
        lazyLoad: !0,
        nav: !0,
        navText: !1,
        responsiveClass: !0,
        responsive: {0: {items: 1}},
        navSpeed: 600,
        onInitialized: function () {
          DONATE_Site.generate_percent()
        }
      })
    }, widget_client_logo: function () {
      t(".thim-client-logo").each(function (e, i) {
        var s = t(this).data("autoplay"), n = t(this).data("items");
        t(i).owlCarousel({
          items: n,
          autoplay: s,
          autoplayHoverPause: !0,
          loop: !0,
          responsiveClass: !0,
          responsive: {0: {items: 1}, 320: {items: 2}, 480: {items: 3}, 768: {items: 4}, 1024: {items: 5}}
        })
      })
    }, widget_testimonials: function () {
      t(".testimonial-slider").each(function () {
        var e = t(this), i = parseInt(e.data("visible")), s = !!e.data("autoplay"), n = !!e.data("mousewheel");
        t(this).thimContentSlider({
          items: e,
          itemsVisible: i,
          mouseWheel: n,
          autoPlay: s,
          itemMaxWidth: 75,
          itemMinWidth: 75,
          activeItemRatio: 1.18,
          activeItemPadding: 0,
          itemPadding: 15,
          contentPosition: "top"
        })
      })
    }, thim_toggle_div: function () {
      t(".thim-toggle-div").on("click", function (e) {
        e.preventDefault();
        var i = t(this).data("div");
        if (!0 === t(this).data("scroll")) {
          var s = t(i).offset().top;
          t(i).find(".inner").slideDown(), t("html,body").animate({scrollTop: s}, 2500)
        } else t(i).find(".inner").slideDown()
      })
    }, action_toggle: function () {
      t(".thim-link-panel").on("click", ".toggle", function (e) {
        e.preventDefault();
        var i = t(this).data("close"), s = t(this).data("open");
        t("#" + i).slideToggle(), t("#" + s).slideToggle()
      })
    }, widget_searchbox: function () {
      t(".thim-search-box").on("click", ".toggle-form", function (e) {
        e.preventDefault(), t("body").toggleClass("thim-active-search");
        var i = t(this).parent();
        setTimeout(function () {
          i.find(".search-field").focus()
        }, 400)
      }), t(".thim-search-box .background-toggle").on("click", function (e) {
        e.preventDefault(), t("body").removeClass("thim-active-search")
      })
    }, donate_toggle_layout: function () {
      t(".thim-layout-search").on("click", ".layouts i", function (e) {
        e.preventDefault();
        var i = t(this).data("layout");
        t(".thim-layout-search .layouts i").removeClass("active"), t(this).addClass("active"), t("#donate_main_content").removeClass().addClass(i);
        var s = {action: "thim_session_donate_layout", layout: i};
        t.ajax({type: "POST", data: s, url: thimpress_donate.ajaxurl, dataType: "json"}).done(function (t) {
        })
      })
    }, footer_bottom: function () {
      var e = t("#footer-bottom"), i = t("footer");
      e.length > 0 && i.css({"margin-bottom": e.height()})
    }, widget_box: function () {
      t(".thim-box .toggle-video").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1
      })
    }, searchform: function () {
      t(".search-form").on("hover", function (e) {
        e.preventDefault(), t(this).find(".search-field").focus()
      }).on("click", ".toggle-search", function (e) {
        e.preventDefault();
        var i = t(this).parents(".search-form"), s = i.find(".search-field");
        "" !== s.val() ? i.submit() : s.focus()
      })
    }, minicart_remove: function () {
      t(".widget_shopping_cart").on("click", ".remove", function (e) {
        e.preventDefault();
        var i = t(this).attr("href");
        t(".mini_cart_item").each(function (e, s) {
          var n = t(s).find("a.remove").attr("href");
          i === n && t(s).addClass("removing")
        });
        var s = {action: "thim_minicart_remove", product_id: i.match("remove_item?=(.*)&")[1]};
        t.ajax({type: "POST", data: s, url: woocommerce_params.ajax_url, dataType: "json"}).done(function (e) {
          t(".mini_cart_item.removing").remove(), t(".widget_shopping_cart .items-number").html(e.count), 0 === e.count ? (t(".widget_shopping_cart_content .cart_list").html('<li class="empty">' + e.message + "</li>"), t(".widget_shopping_cart_content .total,.widget_shopping_cart_content .buttons").remove()) : t(".widget_shopping_cart_content .total .amount").html(e.subtotal)
        })
      })
    }, contactform7: function () {
      t(".wpcf7-submit").on("click", function () {
        t(this).css("opacity", .2), t(this).parents(".wpcf7-form").addClass("processing"), t("input:not([type=submit]), textarea").attr("style", "")
      }), t(document).on("spam.wpcf7", function () {
        t(".wpcf7-submit").css("opacity", 1), t(".wpcf7-form").removeClass("processing")
      }), t(document).on("invalid.wpcf7", function () {
        t(".wpcf7-submit").css("opacity", 1), t(".wpcf7-form").removeClass("processing")
      }), t(document).on("mailsent.wpcf7", function () {
        t(".wpcf7-submit").css("opacity", 1), t(".wpcf7-form").removeClass("processing")
      }), t(document).on("mailfailed.wpcf7", function () {
        t(".wpcf7-submit").css("opacity", 1), t(".wpcf7-form").removeClass("processing")
      }), t("body").on("click", "input:not([type=submit]).wpcf7-not-valid, textarea.wpcf7-not-valid", function () {
        t(this).removeClass("wpcf7-not-valid")
      })
    }, parallax: function () {
      t(".thim-parallax").each(function (e, i) {
        t(i).parallax("50%", .4)
      }), t(window).stellar({horizontalOffset: 0, verticalOffset: 0})
    }, popupShare: function () {
      t(".thim-share-social, .thim-popup-share").on("click", "a", function (e) {
        e.preventDefault();
        var i = t(this).attr("href"), s = (screen.availHeight - 500) / 2, n = (screen.availWidth - 500) / 2;
        window.open(i, "social sharing", "width=550,height=420,left=" + n + ",top=" + s + ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        return !1
      })
    }, menuToggle: function () {
      var e = t(window).width();
      if (t(".menu-toggle .inner, .thim-menu > .close-menu, .thim-toggle-mobile-menu").on("click touchstart", function (i) {
          return i.preventDefault(), t("body").toggleClass("thim-active-menu"), e <= 768 && t("html").toggleClass("thim-mb-active"), !1
        }), e <= 768 || t("body").hasClass("thim_header_default")) {
        var i = ".disable_link";
        (e <= 768 || t("body").hasClass("thim_header_default")) && (i = ".disable_link"), t(".nav .menu-item-has-children").on("click", i, function (e) {
          e.preventDefault();
          var i = t(this).parent();
          return i.find("> .sub-menu").slideToggle("slow"), i.toggleClass("toggle"), !1
        })
      }
      t(document).on("keyup", function (e) {
        t("body").hasClass("thim-active-menu") && 27 == e.keyCode && t("body").toggleClass("thim-active-menu"), t("body").hasClass("thim-active-search") && 27 == e.keyCode && t("body").toggleClass("thim-active-search")
      }), t("#wrapper-container").on("click touchstart", function (i) {
        (t("body").hasClass("thim-active-menu") || e <= 768 && t("body").hasClass("thim-active-menu")) && (t("body").toggleClass("thim-active-menu"), e <= 768 && t("html").toggleClass("thim-mb-active"))
      }), t(".menu-item-has-children > a,.menu-item-has-children > span, .widget_area > span, .widget_area > a").after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>'), jQuery(".navbar-nav>li.menu-item-has-children .icon-toggle").on("click", function () {
        jQuery(this).next("ul.sub-menu").is(":hidden") ? (jQuery(this).next("ul.sub-menu").slideDown(500, "linear"), jQuery(this).html('<i class="fa fa-angle-up"></i>')) : (jQuery(this).next("ul.sub-menu").slideUp(500, "linear"), jQuery(this).html('<i class="fa fa-angle-down"></i>'))
      })
      
    }, quickview: function () {
      t(".quick-view").on("click", function (e) {
        e.preventDefault();
        var i = t(this).parents(".product");
        i.toggleClass("loading"), t(this).toggleClass("loading");
        var s = {action: "jck_quickview", product: t(this).attr("data-prod")};
        t.post(ajaxurl, s, function (e) {
          t.magnificPopup.open({
            mainClass: "my-mfp-zoom-in",
            items: {src: '<div class="mfp-iframe-scaler">' + e + "</div>", type: "inline"}
          }), t(".quick-view").removeClass("loading"), t(".product-card .wrapper").removeClass("animate"), i.toggleClass("loading")
        })
      })
    }, back_to_top: function () {
      t(window).scroll(function () {
        t(this).scrollTop() > 100 ? t("#back-to-top").addClass("scrolldown").removeClass("scrollup") : t("#back-to-top").addClass("scrollup").removeClass("scrolldown")
      }), t("#back-to-top").click(function () {
        return t("html,body").animate({scrollTop: "0px"}, 800), !1
      })
    }, menuFixed: function () {
      var e = t(".site-header"), i = (t(".top-header").outerHeight(), e.outerHeight()), s = 0, n = t(window).width(),
        o = t("#wpadminbar").length > 0 ? t("#wpadminbar").outerHeight() : 0;
      n <= 639 && (o = 0);
      var a = 0, r = t(".toolbar-sidebar"), l = r.length > 0 ? r.outerHeight() : 0, c = a + l + i,
        d = !!t("body").hasClass("thim_header_overlay"), h = "relative";
      t("body").hasClass("thim_fixedmenu") && (t(window).scroll(function () {
        var i = t(this).scrollTop();
        if (t("body").hasClass("thim-active-search") && t("body").removeClass("thim-active-search"), i >= l && i > s) {
          a = o, h = "fixed";
          r = "sticky";
          e.css({
            position: h,
            top: a
          }).addClass(r), i >= c && (e.hasClass("menu-hidden") || e.addClass("menu-hidden").removeClass("menu-show"))
        }
        if (i <= l && i < s) {
          e.hasClass("menu-show") && e.removeClass("menu-show");
          r = "";
          !0 === d ? (h = "fixed", a = l + o, r = "") : (h = "absolute", a = l, r = ""), e.css({
            position: h,
            top: a
          }).addClass(r), "" === r && e.removeClass("sticky");
          var n = setInterval(function () {
            e.removeClass("menu-hidden")
          }, 1e3);
          setTimeout(function () {
            clearInterval(n)
          }, 500)
        } else if (i > c && i < s) {
          e.hasClass("menu-hidden") && e.removeClass("menu-hidden").addClass("menu-show"), a = o, h = "fixed";
          var r = "sticky";
          e.css({position: h, top: a}).addClass(r)
        }
        s = i
      }), !1 === d && t("#main-content").css({"padding-top": i}), setTimeout(function () {
        e.css({top: r.outerHeight()})
      }, 500))
    }, donate: function () {
      t(document).on("change", "#myselect", function (e) {
        "other" === t("select#myselect option").filter(":selected").val() ? t("#myselect").after('<div class="other_donate"><span class="currency">€</span><input type="number" name="donate_input_amount" step="any" class="donate_form_input payment" min="0" id="myinput"/></div>') : t(".other_donate").empty()
      })
    }
  }
}(jQuery);
//# sourceMappingURL=../sourcemaps/main.min.js.map
