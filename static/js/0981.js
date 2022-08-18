(function(op) {
    var effect1 = function() {
        var head = $('#xg_header');
        var an = function() {
            if (document.documentElement.scrollTop + document.body.scrollTop > head.height()) {
                head.css('opacity', 0);
            } else {
                head.css('opacity', 1);
            }
        }
        head.hover(function() {
            head.css('opacity', 1);
        }, an);
        page.scroll(an);
        head.on('mousemove', function() {
            $(this).css('opacity', 1);
        });
        $(an);
    }
    if (page.currentDevice() == 1) {
        if (op.pcEffect == 2) {
            effect1();
        }
    } else {}
}
)({
    'pcEffect': 0,
    'mobileEffect': 0
});
var menu = function(obj) {
    var nid = parseInt(util.queryString('nid'));
    if (isNaN(nid)) {
        nid = 0;
    }
    if (nid > 0) {
        var navi = obj.find('li[data-nid=' + nid + ']');
        var tid = parseInt(util.queryString('typeid'));
        if (isNaN(tid)) {
            tid = parseInt(util.queryString('tid'));
        }
        var li = obj.children('.xg_menuUl').children('li[data-tid=' + tid + ']');
        if (li.length > 0) {
            li.addClass(li.attr('class').split(' ')[0] + '-select');
        } else if (navi.length > 0) {
            navi.addClass(navi.attr('class').split(' ')[0] + '-select');
            if (tid > 0) {
                var li = navi.find('li[data-tid=' + tid + ']');
                if (li.length > 0) {
                    li.addClass(li.attr('class').split(' ')[0] + '-select');
                    li.parentsUntil('.xg_menu', 'li').each(function() {
                        $(this).addClass($(this).attr('class').split(' ')[0] + '-select');
                        actived = true;
                        return false;
                    });
                }
            }
        }
    } else {
        var url = util.createUrl();
        if (url.replace(document.location.host, '').indexOf('.') == -1 || url.indexOf('index.aspx') > 0) {
            var home = obj.find('li[home=1]');
            if (home.length > 0)
                home.addClass(home.attr('class').split(' ')[0] + '-select');
        }
    }
    var showType = obj.data('mobileshoweffect');
    obj.find('.xg_menuMobile .xg_memu_btn').on('click', function() {
        if (util.isNullOrEmpty($('body').attr('style')) || (!util.isNullOrEmpty($('body').attr('style') && $('body').attr('style').indexOf('overflow-y') == -1))) {
            $('body').css('overflow-y', 'hidden');
            $('body').attr('data-overflow', true);
        } else {
            $('body').attr('data-overflow', false);
        }
        if (showType == 0 || showType == 2) {
            $(this).next().css({
                'left': '0px'
            });
        } else if (showType == 1 || showType == 3) {
            $(this).next().css({
                'top': '0px'
            });
        }
        setTimeout(function() {
            obj.find('img').lazyload();
        }, 300);
    });
    obj.find('.xg_menuShade').on('click', function() {
        if ($('body').data('overflow')) {
            $('body').css('overflow-y', '');
        }
        $('body').removeAttr('data-overflow');
        var css = {};
        if (showType == 0) {
            css = {
                'left': '-100%'
            };
        } else if (showType == 1) {
            css = {
                'top': '-100%'
            };
        } else if (showType == 2) {
            css = {
                'left': '100%'
            };
        } else if (showType == 3) {
            css = {
                'top': '100%'
            };
        }
        $(this).parent().css(css);
    });
    var design = util.inDesign();
    if (design) {
        if (obj.find('.xg_menutop').children().length == 0) {
            obj.find('.xg_menutop').html('<div class="no_content_add"><span class="no_content_add_span">可拖动行到此</span></div>');
        }
        if (obj.find('.xg_menubottom').children().length == 0) {
            obj.find('.xg_menubottom').html('<div class="no_content_add"><span class="no_content_add_span">可拖动行到此</span></div>');
        }
    }
    var device = page.currentDevice();
    if (device == 2 && obj.data('mobilelisttype') == 2) {
        var mobile = obj.find('.xg_menuMobile');
        mobile.children('.xg_menuPanel').find('ul').show();
        mobile.find('.xg_menuUl').css({
            'height': '100%',
            'overflow-y': 'auto'
        });
        return;
    }
    obj.children('.xg_menuMobile').find('.xg_menuTitle1,.xg_menuTitle2,.xg_menuTitle3,.xg_menuTitle4').on('click', function(e) {
        var ul = $(this).next();
        if (ul.length == 0) {
            return true;
        }
        ul.slideToggle();
        return true;
    });
    if (device == 1 && obj.data('droptype') == '1') {
        var ul = obj.children('.xg_menuUl');
        var needEffect = obj.data('effect');
        if (!needEffect) {
            needEffect = 0;
        }
        var menulis = ul.children('li');
        var droplist = obj.children('.xg_dropdownlist');
        if (design) {
            var html = '';
            if (droplist.length == 0) {
                html = '<div class=\'xg_dropdownlist\'>';
            }
            obj.children('.xg_menuUl').children('li').each(function() {
                var id = $(this).data('nid');
                var type = 'n';
                if (!id) {
                    id = $(this).data('tid');
                    type = 't';
                }
                if ($(this).attr('home') || droplist.children('div[data-rid=' + id + ']').length > 0) {
                    return;
                }
                html += '<div class=\'xg_navi_template\' data-rid=\'' + id + '\' data-type=\'element\' data-tag=\'NavigateItem\' client-index=\'{"clientIndex":"' + obj.attr('client-index') + '","cmd":1,"dataType":"' + type + '","nid":' + id + '}\'><div class=\'no_content_add\'><span>当前下拉菜单中无内容，访客访问将不显示当前下拉菜单</span></div></div>';
            });
            if (droplist.length == 0) {
                html += '</div>';
                obj.append(html);
                droplist = obj.children('.xg_dropdownlist');
            } else {
                droplist.append(html);
            }
            menulis.on('click', function() {
                var _this = $(this);
                setTimeout(function() {
                    if (!selector._element.innerSelect) {
                        return;
                    }
                    var id = _this.data('nid');
                    if (!id) {
                        id = _this.data('tid');
                    }
                    if (!id) {
                        return;
                    }
                    var mWidth = $(this).parents('.container').width();
                    droplist.css({
                        'width': document.documentElement.clientWidth + 'px',
                        'height': 'auto',
                        'display': 'block',
                        'min-width': mWidth + 'px',
                        'position': 'absolute',
                        'top': ul.height() + 'px'
                    });
                    if (droplist.offset().left != 0) {
                        var mLeft = parseInt(droplist.css('margin-left'));
                        isNaN(mLeft) && (mLeft = 0);
                        var left = mLeft - droplist.offset().left;
                        droplist.css({
                            'margin-left': left + 'px'
                        });
                    }
                    var list = droplist.children('[data-rid=' + id + ']');
                    if (list.length == 0) {
                        return;
                    }
                    if (list.css('display') == 'block') {
                        list.hide();
                    } else {
                        list.show().siblings().hide();
                    }
                }, 150);
            });
        } else if (droplist.length > 0) {
            menulis.hover(function() {
                clearTimeout($(this).data('menuHide'));
                var id = $(this).data('nid');
                if (!id) {
                    id = $(this).data('tid');
                }
                if (!id) {
                    return;
                }
                var mWidth = $(this).parents('.container').width();
                droplist.css({
                    'width': document.documentElement.clientWidth + 'px',
                    'height': 'auto',
                    'display': 'block',
                    'min-width': mWidth + 'px',
                    'position': 'absolute',
                    'top': ul.height() + 'px'
                });
                if (droplist.offset().left != 0) {
                    var mLeft = parseInt(droplist.css('margin-left'));
                    isNaN(mLeft) && (mLeft = 0);
                    var left = mLeft - droplist.offset().left;
                    droplist.css({
                        'margin-left': left + 'px'
                    });
                }
                var list = droplist.children('[data-rid=' + id + ']');
                if (list.length == 0) {
                    return;
                }
                list.siblings().hide();
                if (needEffect == 0) {
                    list.show();
                } else {
                    list.stop().slideDown('fast');
                }
            }, function() {
                var _this = $(this);
                var id = _this.data('nid');
                if (!id) {
                    id = _this.data('tid');
                }
                if (!id) {
                    return;
                }
                var list = droplist.children('[data-rid=' + id + ']');
                if (list.length == 0) {
                    return;
                }
                clearTimeout(_this.data('menuHide'));
                _this.data('menuHide', setTimeout(function() {
                    if (needEffect == 0) {
                        list.hide();
                    } else {
                        list.stop().slideUp('fast');
                    }
                }, 120));
            });
            droplist.children('div').hover(function() {
                var id = $(this).data('rid');
                menulis.each(function() {
                    var _that = $(this);
                    var mid = _that.data('nid');
                    if (!mid) {
                        mid = _that.data('tid');
                    }
                    if (mid == id || mid == id) {
                        clearTimeout(_that.data('menuHide'));
                    }
                });
            }, function() {
                if (needEffect == 0) {
                    $(this).hide();
                } else {
                    $(this).stop().slideUp('fast');
                }
            });
        }
    }
}
var banner = {
    init: function(panel) {
        banner.autoChange(panel);
        var adaptive = panel.data('adaptive');
        var firstImg = panel.find('img:first');
        firstImg.addClass('lazyload');
        firstImg.one('animationend webkitAnimationEnd oAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            firstImg.removeClass('lazyload');
        });
        firstImg.one('load', function(e) {
            var maxWidth = e && e.target ? e.target.width : 0;
            var op = banner.getOptions(panel);
            op.onAfterChange = banner.afterChange;
            op.centerPadding = '0px';
            op.index = 0;
            op.pcMouseTouch = true;
            if (typeof op.animaType == 'undefined' || op.animaType == 1) {
                if (typeof myBannerOption != 'undefined') {
                    op = myBannerOption(op);
                }
                var sc = panel.slick(op);
                panel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    slick.$slides.eq(currentSlide).find('[data-eventid]').trigger('screenout');
                    if (typeof myBannerBeforeChange != 'undefined') {
                        myBannerBeforeChange(slick, currentSlide, nextSlide);
                    }
                });
                panel.on('afterChange', function(event, slick, currentSlide, nextSlide) {
                    var container = slick.$slides.eq(currentSlide);
                    var device = page.currentDevice();
                    var hideClass = (device == 1 ? 'pc_an_hide' : 'mobile_an_hide');
                    setTimeout(function() {
                        container.find('[data-anids]').each(function() {
                            var ok = false;
                            String($(this).data('anids')).split(',').forEach(function(item) {
                                if (!ok && animation.anFindEvent(item)) {
                                    ok = true;
                                }
                            });
                            if (ok) {
                                $(this).removeClass(hideClass);
                            }
                        });
                    }, 17);
                    container.find('[data-eventid]').trigger('screenin');
                    container.siblings().find('[data-anids]').each(function() {
                        animation.removeAllAn($(this));
                        var ok = false;
                        String($(this).data('anids')).split(',').forEach(function(item) {
                            if (!ok && animation.anFindEvent(item)) {
                                ok = true;
                            }
                        });
                        if (ok) {
                            $(this).removeClass(hideClass).addClass(hideClass);
                        }
                    });
                    if (typeof myBannerAfterChange != 'undefined') {
                        myBannerAfterChange(slick, currentSlide, nextSlide);
                    }
                });
                $(function() {
                    setTimeout(function() {
                        setTimeout(function() {
                            sc.find('.slick-current').find('[data-anids]').each(function() {
                                $(this).removeClass(hideClass);
                            });
                        }, 17);
                        sc.find('.slick-current').find('[data-eventid]').trigger('screenin');
                    }, 100);
                });
            } else {
                var relwidth = panel.data('width');
                var relheight = panel.data('height');
                var width = panel.width();
                var height = panel.height();
                if (width > relwidth) {
                    width = relwidth;
                    op.Width = relwidth;
                }
                if (height > relheight) {
                    height = relheight;
                    op.Height = relheight;
                }
                if (typeof myBannerOption != 'undefined') {
                    op = myBannerOption(op);
                }
                banner.initshutter(op);
                panel.find('.xg_banner_item').addClass('xg_banner_show');
                if (width > relwidth) {
                    panel.find('.shutter').css({
                        'width': width + 'px',
                        'height': height + 'px',
                        'margin-left': 'auto',
                        'margin-right': 'auto',
                        'overflow': 'hidden'
                    });
                }
            }
            var maxWidthFun = function() {
                if (maxWidth > 0 && screen.width > maxWidth) {
                    panel.find('.xg_banner_item').css({
                        'maxWidth': maxWidth + 'px',
                        'overflow': 'hidden',
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    });
                    panel.find('.xg_banner_img img').css({
                        'maxWidth': maxWidth + 'px'
                    });
                }
            }
            maxWidthFun();
            var hideClass = (page.currentDevice() == 1 ? 'pc_an_hide' : 'mobile_an_hide');
            var ans = [];
            panel.find('[data-anids]').each(function() {
                var ok = false;
                String($(this).data('anids')).split(',').forEach(function(item) {
                    if (!ok && animation.anFindEvent(item)) {
                        ok = true;
                    }
                });
                if (ok) {
                    $(this).addClass(hideClass);
                    ans.push($(this));
                }
            });
            panel.find('.container').click(function(e) {
                if (util.inDesign()) {
                    return;
                }
                var a = $(this).prev().find('a');
                util.openUrl(a.attr('href'), a.attr('target'));
                e.stopPropagation();
            });
        });
        panel.find('img').each(function() {
            banner.loadImage($(this));
        });
    },
    imgSrc: function(img) {
        var data = $(img).data('src');
        if (data) {
            var src = data.split(',');
            if (src.length == 1) {
                return src[0].split(' ')[0];
            }
            if (page.currentDevice() == 1) {
                return src[0].split(' ')[0];
            } else {
                return src[1].split(' ')[0];
            }
        } else {
            return $(img).data('src');
        }
    },
    afterChange: function() {},
    loadImage: function(obj) {
        var src = banner.imgSrc(obj);
        if (!src)
            return;
        if (banner.imgCached(src)) {
            $(obj).attr('src', src);
        } else {
            setTimeout(function() {
                $(obj).attr('src', src);
            }, 0);
        }
    },
    imgCached: function(src) {
        var img = new Image();
        img.src = src;
        if (img.complete) {
            return true;
        }
        return false;
    },
    getOptions: function(panel) {
        if (!panel) {
            typeof console == 'undefined' && console.log('banner不存在');
            return;
        }
        var op = {};
        var data = panel.data('autoplay');
        if (data) {
            op.autoplay = true;
            op.autoplaySpeed = data;
        }
        if (!util.inDesign()) {
            op.pauseOnHover = false;
        }
        data = panel.data('loop');
        data && (op.infinite = data == '1' ? true : false);
        data = panel.data('dots');
        if (data == '1') {
            op.dots = true;
        } else {
            op.dots = false;
        }
        data = panel.data('arrows');
        if (data == '1') {
            op.arrows = true;
        } else {
            op.arrows = false;
        }
        data = panel.data('effect');
        op.animaType = data;
        op.speed = panel.data('speed') * 1000 == 0 ? 1000 : panel.data('speed') * 1000;
        if (typeof data == 'undefined' || data == '1') {
            op.fade = false;
            op.cssEase = 'ease';
        }
        op.variableWidth = true;
        op.centerMode = true;
        op.responsive = [{
            breakpoint: page.splitMobileWidth,
            settings: {
                arrows: false,
                variableWidth: false,
                centerMode: false
            }
        }];
        data = panel.data('mobilarrow');
        if (data == '1') {
            op.responsive[0].settings.arrows = true;
            op.mobilarrow = true;
        }
        data = panel.data('width');
        if (typeof data == 'undefined') {
            op.Width = 1920;
        } else {
            op.Width = data;
        }
        data = panel.data('height');
        if (typeof data == 'undefined') {
            op.Height = 600;
        } else {
            op.Height = data;
        }
        return op;
    },
    autoChangeWidth: function(container) {
        var device = page.currentDevice();
        if (device == 2 && util.inDesign()) {
            $('html').addClass('xg_scrollwidth');
        }
        if (parent != window) {
            if (device == 2) {
                container.css({
                    'width': container.parent().width() + 'px'
                });
            } else {
                container.css({
                    'width': ''
                });
            }
        } else if (page.currentDevice() == 1) {
            container.css({
                'width': ''
            });
        }
    },
    resize: function(container) {
        var device = page.currentDevice();
        var relwidth = container.data('width');
        var relheight = container.data('height');
        var width = container.width();
        var height = container.height();
        if (device == 2) {
            relwidth = width;
            height = relheight = container.width() / (parseInt(container.data('scalheight')) / 100);
        } else {
            if (typeof relwidth == 'undefined') {
                relwidth = 1920;
            }
            if (typeof relheight == 'undefined') {
                relheight = 600;
            }
        }
        if (width > relwidth) {
            width = relwidth;
        }
        var screenWidth = banner.getWidth(container);
        if (width < screenWidth) {
            width = screenWidth;
            if (container.parents('#xg_banner').length > 0) {
                $('#xg_banner').css('min-width', width + 'px');
            }
            if (device == 2) {
                height = width / (parseInt(container.data('scalheight')) / 100);
            }
        }
        if (height > relheight) {
            height = relheight;
        }
        container.find('.xg_banner_item').css({
            'width': width,
            'height': height,
            'max-width': width,
            'max-height': height,
            'min-width': width,
            'min-height': height
        });
        if (parent.$('#preview_page').length > 0) {
            setTimeout(function() {
                container.find('.xg_banner_item').css({
                    'width': width,
                    'height': height,
                    'max-width': width,
                    'max-height': height,
                    'min-width': width,
                    'min-height': height
                });
            }, 40);
        }
        var adaptive = container.data('adaptive');
        if (device == 1) {
            if (container.data('effect') == 1) {
                container.find('.slick-list').css({
                    'width': width + 'px',
                    'height': height + 'px',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                    'overflow': 'hidden'
                });
                if (adaptive) {
                    container.find('.xg_banner_img img').css({
                        'width': '',
                        'height': '',
                        'min-width': '',
                        'min-height': '',
                        'left': '',
                        'margin-left': '',
                        'top': '',
                        'margin-top': ''
                    });
                } else {
                    container.find('.xg_banner_img img').css({
                        'width': relwidth + 'px',
                        'height': relheight + 'px',
                        'min-width': relwidth + 'px',
                        'min-height': relheight + 'px',
                        'left': '50%',
                        'position': 'relative',
                        'margin-left': (-1 * relwidth / 2) + 'px'
                    });
                }
            } else if (adaptive) {
                container.find('.xg_banner_img img').css({
                    'width': '100%',
                    'height': '100%',
                    'position': 'relative',
                    'min-width': '',
                    'min-height': '',
                    'left': '',
                    'margin-left': '',
                    'top': '',
                    'margin-top': ''
                });
            } else {
                container.find('.xg_banner_img img').css({
                    'width': relwidth + 'px',
                    'height': relheight + 'px',
                    'min-width': relwidth + 'px',
                    'min-height': relheight + 'px',
                    'left': '50%',
                    'top': '50%',
                    'position': 'relative',
                    'margin-left': (-1 * relwidth / 2) + 'px',
                    'margin-top': (-1 * relheight / 2) + 'px'
                });
            }
        } else {
            container.find('.xg_banner_img img').css({
                'width': '100%',
                'height': '100%',
                'position': 'relative',
                'min-width': '',
                'min-height': '',
                'left': '',
                'margin-left': '',
                'top': '',
                'margin-top': ''
            });
        }
    },
    autoChange: function(container) {
        var pcAdaptive = container.data('adaptive');
        if (parent != window && page.currentDevice() == 2 && container.parent().width() == banner.getWidth(container)) {
            var width = container.parent().width();
            width = screen.width < width ? screen.width : width;
            container.css({
                'width': width + 'px',
            });
        }
        container.data('device', page.currentDevice());
        var resize = function() {
            banner.autoChangeWidth(container);
            var deivce = page.currentDevice();
            if (!pcAdaptive && deivce == 1) {
                container.css('height', '');
            } else {
                mobileHeight = container.width() / (parseInt(container.data('scalheight')) / 100)
                pcHeight = container.data('height') / container.data('width') * container.width();
                if (deivce == 2) {
                    container.css('height', mobileHeight + 'px');
                } else {
                    container.css('height', pcHeight + 'px');
                }
            }
            banner.resize(container);
            if (deivce == container.data('device')) {
                return;
            }
            container.data('device', page.currentDevice());
            container.find('.xg_banner_img img').each(function(i) {
                banner.loadImage($(this));
            });
        }
        $(window).on('resize', function() {
            setTimeout(function() {
                resize()
            }, 17)
        });
        resize();
    },
    getWidth: function(container) {
        if (page.currentDevice() == 2) {
            return document.documentElement.clientWidth;
        }
        if (container.parents('#xg_banner').length == 0) {
            var w = container.parent().width();
            var swh = screen.width - util.getScrollBarWidth();
            if (w > swh) {
                return swh;
            }
            return w;
        } else {
            var width = document.documentElement.clientWidth;
            if ($('#xg_header').width() > width) {
                width = $('#xg_header').width();
            } else if ($('#xg_content').width() > width) {
                width = $('#xg_content').width();
            } else if ($('#xg_footer').width() > width) {
                width = $('#xg_footer').width();
            }
            var swh = screen.width - util.getScrollBarWidth();
            if (width > swh) {
                return swh;
            }
            return width;
        }
    },
    initshutter: function(option) {
        option.shutterW = option.Width;
        option.shutterH = option.Height;
        option.isAutoPlay = option.autoplay;
        option.playInterval = option.autoplaySpeed;
        option.curDisplay = 0;
        option.fullPage = false;
        option.dotsNav = option.dots;
        option.arrows = option.arrows;
        option.animaType = option.animaType;
        option.duration = option.speed;
        option.mobilarrow = option.mobilarrow;
        option.currentDevice = page.currentDevice();
        $('.shutter').shutter(option);
    }
}

$(function() {
    menu($('#if17850861169c11453cc8d'))
});
;(function(root) {
    //header固定在屏幕顶部
    root.find('div').parents('.xg_section').css({
        'background-color': 'transparent',
        'z-index': '999',
        'position': 'fixed',
        'width': '100%'
    })
    $(function() {
        window.onscroll = function() {
            var Y = window.scrollY;
            var h = 80 - Y;
            if (Y > 80) {
                root.find('div').parents('.xg_section').css({
                    'background-color': 'rgba(0, 0, 0, 0.6)'
                })
            } else {
                root.find('div').parents('.xg_section').css({
                    'background-color': 'transparent'
                })
            }
        }
    })
}
)($('#rf1785_00b1844e9d6b22e07'));
banner.init($('#i6d4bef526313b8fa'));
$(function() {
    var ptitle = $(".xg_prevnext_ptitle").html();
    var ntitle = $(".xg_prevnext_ntitle").html();
    if (ptitle && ptitle.length > 30) {
        var ptitle = $(".xg_prevnext_ptitle").html().substring(0, 30) + "...";
        $(".xg_prevnext_ptitle").attr("title", $(".xg_prevnext_ptitle").html());
        $(".xg_prevnext_ptitle").html(ptitle);
    }
    if (ntitle && ntitle.length > 30) {
        var ntitle = $(".xg_prevnext_ntitle").html().substring(0, 30) + "...";
        $(".xg_prevnext_ntitle").attr("title", $(".xg_prevnext_ntitle").html());
        $(".xg_prevnext_ntitle").html(ntitle);
    }
});
animation.config['an258'] = {
    "id": "258",
    "clientIndex": "bb5e7294f4833cb2",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "258_资讯中心年份_鼠标移入",
    "anName": "an_tran_258",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an259'] = {
    "id": "259",
    "clientIndex": "bb5e7294f4833cb2",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "259_资讯中心年份_鼠标移出",
    "anName": "an_tran_259",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an252'] = {
    "id": "252",
    "clientIndex": "dc3f1cefdb4b660d",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "252_资讯中心时间_鼠标移入",
    "anName": "an_tran_252",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an253'] = {
    "id": "253",
    "clientIndex": "dc3f1cefdb4b660d",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "253_资讯中心时间_鼠标移出",
    "anName": "an_tran_253",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an256'] = {
    "id": "256",
    "clientIndex": "9936477e7cb223f7",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "256_资讯中心标题_鼠标移入",
    "anName": "an_tran_256",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an257'] = {
    "id": "257",
    "clientIndex": "9936477e7cb223f7",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "257_资讯中心标题_鼠标移出",
    "anName": "an_tran_257",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an254'] = {
    "id": "254",
    "clientIndex": "ba44b41d2c238801",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "254_资讯中心_鼠标移入",
    "anName": "an_tran_254",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an255'] = {
    "id": "255",
    "clientIndex": "ba44b41d2c238801",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "255_资讯中心_鼠标移出",
    "anName": "an_tran_255",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.regist($("[data-eventid='ba44b41d2c238801']"), [{
    "name": "鼠标悬停",
    "id": 132,
    "event": "mouseenter",
    "an": [{
        "id": 252,
        "anName": "an_tran_252",
        "device": 1
    }, {
        "id": 258,
        "anName": "an_tran_258",
        "device": 1
    }, {
        "id": 254,
        "anName": "an_tran_254",
        "device": 1
    }, {
        "id": 256,
        "anName": "an_tran_256",
        "device": 1
    }],
    "device": 1,
    "doCount": 0,
    "count": 0
}, {
    "name": "鼠标移出",
    "id": 133,
    "event": "mouseleave",
    "an": [{
        "id": 257,
        "anName": "an_tran_257",
        "device": 1
    }, {
        "id": 255,
        "anName": "an_tran_255",
        "device": 1
    }, {
        "id": 259,
        "anName": "an_tran_259",
        "device": 1
    }, {
        "id": 253,
        "anName": "an_tran_253",
        "device": 1
    }],
    "device": 1,
    "doCount": 0,
    "count": 0
}]);
animation.config['an270'] = {
    "id": "270",
    "clientIndex": "1ff3b73954e5273e",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "270_资讯中心年份_鼠标移入",
    "anName": "an_tran_270",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an271'] = {
    "id": "271",
    "clientIndex": "1ff3b73954e5273e",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "271_资讯中心年份_鼠标移出",
    "anName": "an_tran_271",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an272'] = {
    "id": "272",
    "clientIndex": "6af5acff44574ecb",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "272_资讯中心时间_鼠标移入",
    "anName": "an_tran_272",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an273'] = {
    "id": "273",
    "clientIndex": "6af5acff44574ecb",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "273_资讯中心时间_鼠标移出",
    "anName": "an_tran_273",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an268'] = {
    "id": "268",
    "clientIndex": "fba3d4a7e5458dff",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "268_资讯中心标题_鼠标移入",
    "anName": "an_tran_268",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an269'] = {
    "id": "269",
    "clientIndex": "fba3d4a7e5458dff",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "269_资讯中心标题_鼠标移出",
    "anName": "an_tran_269",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an274'] = {
    "id": "274",
    "clientIndex": "2393a5db27d7da53",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "274_资讯中心_鼠标移入",
    "anName": "an_tran_274",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
animation.config['an275'] = {
    "id": "275",
    "clientIndex": "2393a5db27d7da53",
    "timingFunction": "",
    "duration": "1",
    "delay": "0",
    "type": 10,
    "name": "275_资讯中心_鼠标移出",
    "anName": "an_tran_275",
    "library": "",
    "device": 1,
    "loop": 1,
    "resume": 0,
    "clear": 1
};
;(function(root) {
    root.find(".xg_menuLi1").eq(0).before("<li class='xg_menuLi1'><a href='/'>网站首页</a></li>");
    root.find(".xg_menuLi1:nth-child(3n)").css("margin-right", "0");
}
)($('#rf1794_0a904198c4952bbc9'));
