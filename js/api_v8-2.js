/*!
  hey, [be]Lazy.js - v1.5.2 - 2015.12.01
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (k, f) {
  'function' === typeof define && define.amd
    ? define(f)
    : 'object' === typeof exports
    ? (module.exports = f())
    : (k.Blazy = f());
})(this, function () {
  function k(b) {
    var c = b._util;
    c.elements = v(b.options.selector);
    c.count = c.elements.length;
    c.destroyed &&
      ((c.destroyed = !1),
      b.options.container &&
        h(b.options.container, function (a) {
          l(a, 'scroll', c.validateT);
        }),
      l(window, 'resize', c.saveViewportOffsetT),
      l(window, 'resize', c.validateT),
      l(window, 'scroll', c.validateT));
    f(b);
  }

  function f(b) {
    for (var c = b._util, a = 0; a < c.count; a++) {
      var d = c.elements[a],
        g = d.getBoundingClientRect();
      if (
        (g.right >= e.left && g.bottom >= e.top && g.left <= e.right && g.top <= e.bottom) ||
        n(d, b.options.successClass)
      )
        b.load(d), c.elements.splice(a, 1), c.count--, a--;
    }
    0 === c.count && b.destroy();
  }

  function q(b, c, a) {
    if (
      !n(b, a.successClass) &&
      (c || a.loadInvisible || (0 < b.offsetWidth && 0 < b.offsetHeight))
    )
      if ((c = b.getAttribute(p) || b.getAttribute(a.src))) {
        c = c.split(a.separator);
        var d = c[r && 1 < c.length ? 1 : 0],
          g = 'img' === b.nodeName.toLowerCase();
        h(a.breakpoints, function (a) {
          b.removeAttribute(a.src);
        });
        b.removeAttribute(a.src);
        g || void 0 === b.src
          ? ((c = new Image()),
            (c.onerror = function () {
              a.error && a.error(b, 'invalid');
              b.className = b.className + ' ' + a.errorClass;
            }),
            (c.onload = function () {
              g ? (b.src = d) : (b.style.backgroundImage = 'url("' + d + '")');
              b.className = b.className + ' ' + a.successClass;
              a.success && a.success(b);
            }),
            (c.src = d))
          : ((b.src = d), (b.className = b.className + ' ' + a.successClass));
      } else
        a.error && a.error(b, 'missing'),
          n(b, a.errorClass) || (b.className = b.className + ' ' + a.errorClass);
  }

  function n(b, c) {
    return -1 !== (' ' + b.className + ' ').indexOf(' ' + c + ' ');
  }

  function v(b) {
    var c = [];
    b = document.querySelectorAll(b);
    for (var a = b.length; a--; c.unshift(b[a]));
    return c;
  }

  function t(b) {
    e.bottom = (window.innerHeight || document.documentElement.clientHeight) + b;
    e.right = (window.innerWidth || document.documentElement.clientWidth) + b;
  }

  function l(b, c, a) {
    b.attachEvent ? b.attachEvent && b.attachEvent('on' + c, a) : b.addEventListener(c, a, !1);
  }

  function m(b, c, a) {
    b.detachEvent ? b.detachEvent && b.detachEvent('on' + c, a) : b.removeEventListener(c, a, !1);
  }

  function h(b, c) {
    if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++);
  }

  function u(b, c, a) {
    var d = 0;
    return function () {
      var g = +new Date();
      g - d < c || ((d = g), b.apply(a, arguments));
    };
  }
  var p, e, r;
  return function (b) {
    if (!document.querySelectorAll) {
      var c = document.createStyleSheet();
      document.querySelectorAll = function (a, b, d, e, f) {
        f = document.all;
        b = [];
        a = a.replace(/\[for\b/gi, '[htmlFor').split(',');
        for (d = a.length; d--; ) {
          c.addRule(a[d], 'k:v');
          for (e = f.length; e--; ) f[e].currentStyle.k && b.push(f[e]);
          c.removeRule(0);
        }
        return b;
      };
    }
    var a = this,
      d = (a._util = {});
    d.elements = [];
    d.destroyed = !0;
    a.options = b || {};
    a.options.error = a.options.error || !1;
    a.options.offset = a.options.offset || 100;
    a.options.success = a.options.success || !1;
    a.options.selector = a.options.selector || '.b-lazy';
    a.options.separator = a.options.separator || '|';
    a.options.container = a.options.container ? document.querySelectorAll(a.options.container) : !1;
    a.options.errorClass = a.options.errorClass || 'd-block';
    a.options.breakpoints = a.options.breakpoints || !1;
    a.options.loadInvisible = a.options.loadInvisible || !1;
    a.options.successClass = a.options.successClass || 'd-block';
    a.options.validateDelay = a.options.validateDelay || 25;
    a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50;
    a.options.src = p = a.options.src || 'data-src';
    r = 1 < window.devicePixelRatio;
    e = {};
    e.top = 0 - a.options.offset;
    e.left = 0 - a.options.offset;
    a.revalidate = function () {
      k(this);
    };
    a.load = function (a, b) {
      var c = this.options;
      void 0 === a.length
        ? q(a, b, c)
        : h(a, function (a) {
            q(a, b, c);
          });
    };
    a.destroy = function () {
      var a = this._util;
      this.options.container &&
        h(this.options.container, function (b) {
          m(b, 'scroll', a.validateT);
        });
      m(window, 'scroll', a.validateT);
      m(window, 'resize', a.validateT);
      m(window, 'resize', a.saveViewportOffsetT);
      a.count = 0;
      a.elements.length = 0;
      a.destroyed = !0;
    };
    d.validateT = u(
      function () {
        f(a);
      },
      a.options.validateDelay,
      a
    );
    d.saveViewportOffsetT = u(
      function () {
        t(a.options.offset);
      },
      a.options.saveViewportOffsetDelay,
      a
    );
    t(a.options.offset);
    h(a.options.breakpoints, function (a) {
      if (a.width >= window.screen.width) return (p = a.src), !1;
    });
    k(a);
  };
});
(function ($) {
  var _objPool = {};
  var _objPoolReject = {};
  $.ajaxq = function () {
    return {
      enq: function (pname, opt) {
        _objPoolReject[pname] = false;
        var dff = $.Deferred();
        _objPool[pname] = _objPool[pname] || $.Deferred().resolve();
        _objPool[pname] = _objPool[pname].pipe(function () {
          return $.ajax(opt).pipe(
            function (data) {
              if (_objPoolReject[pname] == true) {
                return $.Deferred().reject();
              }
              dff.resolve(data);
              return $.Deferred().resolve();
            },
            function () {
              if (_objPoolReject[pname] == true) {
                return $.Deferred().reject();
              }
              if (opt.retry) {
                opt.url = opt.getUrl(opt.retry);
                return $.ajax(opt).pipe(
                  function (data) {
                    dff.resolve(data);
                    return $.Deferred().resolve();
                  },
                  function () {
                    dff.reject(opt);
                    return $.Deferred().resolve();
                  }
                );
              } else {
                return $.Deferred().resolve();
              }
            }
          );
        });
        return dff;
      },
      clearq: function (pname) {
        _objPoolReject[pname] = true;
      },
    };
  };
  var oldDeferredFn = jQuery.Deferred;
  $.Deferred = function () {
    var ret = oldDeferredFn.apply(this, arguments);
    $.extend(ret, {
      __promise: function () {
        var promise = this.promise();
        promise.done(function (data) {
          if (promise._cbEach && typeof promise._cbEach == 'function') {
            $.each(data, promise._cbEach);
          }
        }).each = function (cbEach) {
          promise._cbEach = cbEach;
          return promise;
        };
        return promise;
      },
    });
    return ret;
  };
})(jQuery);
var ecshop = (function () {
  var ecshop = {};
  ecshop.apiDomain = {
    get: function (opt) {
      opt = opt || {};
      conf_misc = typeof conf_misc == 'undefined' ? {} : conf_misc;
      if (typeof conf_misc.apiDomain != 'undefined') {
        var domainConf = conf_misc.apiDomain[opt.name];
        if (
          typeof opt.iscdn != 'undefined' &&
          opt.iscdn == 0 &&
          conf_misc.apiDomain[opt.name] == 'domain_hinet'
        ) {
          domainConf = 'domain_ecapi';
        }
        if (
          typeof opt.allowDomainConf != 'undefined' &&
          $.inArray(domainConf, opt.allowDomainConf) == -1
        ) {
          domainConf = 'domain_ecapi';
        }
        switch (domainConf) {
          case 'domain_web':
            return 'https://24h.pchome.com.tw';
          case 'domain_web_m':
            return 'https://24h.m.pchome.com.tw';
          case 'domain_ecapi2':
            return 'https://ecapi2.pchome.com.tw';
          case 'domain_hinet':
            return 'https://ecapi-pchome.cdn.hinet.net';
          case 'domain_ecapi':
          default:
            return 'https://ecapi.pchome.com.tw';
        }
      } else if (opt.isEcapi2 && opt.isEcapi2 == 1) {
        return 'https://ecapi2.pchome.com.tw';
      } else {
        return 'https://ecapi.pchome.com.tw';
      }
    },
  };
  ecshop.category = {
    sign: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.5';
        opt._callback = 'cb_ecshopCategorySign';
        opt.Id = encodeURIComponent(encodeURIComponent(opt.Id));
        opt.lastMod = opt.lastMod ? opt.lastMod : +new Date();
        var _domain = ecshop.apiDomain.get({
          name: 'ecshop_cateapi',
        });
        if (opt.region) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/sign&region=' +
            opt.region +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        } else if (opt.Id) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/sign/' +
            opt.Id +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        return $.ajaxq()
          .enq('sign', {
            url: _domain + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    region: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.5';
        opt._callback = 'cb_ecshopCategoryRegion';
        opt.lastMod = opt.lastMod ? opt.lastMod : +new Date();
        var _domain = ecshop.apiDomain.get({
          name: 'ecshop_cateapi',
        });
        if (opt.sign) {
          opt.sign = encodeURIComponent(encodeURIComponent(opt.sign));
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/region&sign=' +
            opt.sign +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        } else if (opt.region) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/region&region=' +
            opt.region +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        return $.ajaxq()
          .enq('region', {
            url: _domain + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
      underage: {
        get: function (opt) {
          var _domain = ecshop.apiDomain.get({
            name: 'ecshop_cateapi',
          });
          opt._callback = 'cb_ecshopRegionUnderage';
          if (opt.Id) {
            opt._url =
              '/cdn/ecshop/v2/region/isNC17&id=' +
              opt.Id +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
          return $.ajaxq()
            .enq('underage', {
              url: _domain + opt._url,
              dataType: 'jsonp',
              jsonp: '_callback',
              jsonpCallback: opt._callback,
              cache: true,
            })
            .__promise();
        },
      },
      enterprise: {
        get: function (opt) {
          var _domain = ecshop.apiDomain.get({
            name: 'ecshop_cateapi',
          });
          opt = opt ? opt : {};
          opt.ver = opt.ver ? opt.ver : 'v2.1';
          opt._callback = 'cb_ecshopRegionEnterprise';
          if (opt.Id) {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/region/isEntArea&id=' +
              opt.Id +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
          return $.ajaxq()
            .enq('enterprise', {
              url: _domain + opt._url,
              dataType: 'jsonp',
              jsonp: '_callback',
              jsonpCallback: opt._callback,
              cache: true,
            })
            .__promise();
        },
      },
    },
    sitemap: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt._callback = 'cb_ecshopCategorySitemap';
        opt.lastMod = opt.lastMod ? opt.lastMod : +new Date();
        opt._url =
          '/cdn/ecshop/cateapi/v1.5/region&site=shop' +
          '&_callback=' +
          opt._callback +
          '&' +
          opt.lastMod;
        return $.ajaxq()
          .enq('sitemap', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    onsale: {
      get: function (opt) {
        var opt = typeof opt == 'object' ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v4';
        opt.Id = encodeURIComponent(encodeURIComponent(opt.Id));
        opt.site = opt.site ? opt.site : '';
        opt.date = opt.date ? opt.date : 'now';
        strQuery = opt.time ? '&t=' + opt.time : '';
        if (opt.site == 'mall') {
          opt._callback = 'cb_mallCategoryOnsale';
          opt._url =
            '/cdn/ecshop/adapi/' +
            opt.ver +
            '/ad&q=onsale&site=' +
            opt.site +
            '&sign=' +
            opt.Id +
            '&d=' +
            opt.date +
            strQuery +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        } else {
          opt._callback = 'cb_ecshopCategoryOnsale';
          opt._url =
            '/cdn/ecshop/adapi/' +
            opt.ver +
            '/ad&q=onsale&sign=' +
            opt.Id +
            '&d=' +
            opt.date +
            strQuery +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        return $.ajaxq()
          .enq('onsale', {
            url:
              ecshop.apiDomain.get({
                name: 'ecshop_cateapi',
              }) + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    cate: {
      get: function (opt) {
        opt = opt ? opt : {};
        if (opt.region) {
          opt._url =
            '/cdn/ecshop/cateapi/v1.5/region/' +
            opt.region +
            '/cate&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        return $.ajaxq()
          .enq('store', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    store: {
      get: function (opt) {
        opt = opt ? opt : {};
        if (opt.cate) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/store&cate=' +
            opt.cate +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        } else if (opt.Id) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/store&id=' +
            opt.Id +
            '&_callback=' +
            opt._callback;
        }
        if (opt.timeStamp && this.timeStamp != opt.timeStamp) {
          this.timeStamp == '' || this.clearq(this.timeStamp);
          this.timeStamp = opt.timeStamp;
        }
        var _domain = ecshop.apiDomain.get({
          name: 'ecshop_cateapi',
        });
        return $.ajaxq()
          .enq('store' + (opt.timeStamp || ''), {
            url: _domain + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
      timeStamp: '',
      underage: {
        get: function (opt) {
          opt._callback = 'cb_ecshopStoreUnderage';
          if (opt.Id) {
            opt._url =
              '/cdn/ecshop/v2/store/isNC17&id=' +
              opt.Id +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
          return $.ajaxq()
            .enq('underage', {
              url: '//ecapi.pchome.com.tw' + opt._url,
              dataType: 'jsonp',
              jsonp: '_callback',
              jsonpCallback: opt._callback,
              cache: true,
            })
            .__promise();
        },
      },
      enterprise: {
        get: function (opt) {
          opt = opt ? opt : {};
          opt.ver = opt.ver ? opt.ver : 'v2.1';
          opt._callback = 'cb_ecshopStoreEnterprise';
          var _domain = ecshop.apiDomain.get({
            name: 'ecshop',
          });
          if (opt.Id) {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/store/isEntArea&id=' +
              opt.Id +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
          return $.ajaxq()
            .enq('enterprise', {
              url: _domain + opt._url,
              dataType: 'jsonp',
              jsonp: '_callback',
              jsonpCallback: opt._callback,
              cache: true,
            })
            .__promise();
        },
      },
      promote: {
        get: function (opt) {
          opt = opt ? opt : {};
          opt.ver = opt.ver ? opt.ver : 'v1.5';
          opt.lastMod = opt.lastMod ? opt.lastMod : parseInt(new Date().getTime() / 60000);
          if (opt.Id) {
            opt._url =
              '/cdn/ecshop/cateapi/' +
              opt.ver +
              '/store/' +
              opt.Id +
              '/promote&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
          return $.ajaxq()
            .enq('promote', {
              url:
                ecshop.apiDomain.get({
                  name: 'ecshop_cateapi',
                }) + opt._url,
              dataType: 'jsonp',
              jsonp: '_callback',
              jsonpCallback: opt._callback,
              cache: true,
            })
            .__promise();
        },
      },
      clearq: function (qname) {
        $.ajaxq().clearq('store' + qname);
      },
    },
    menu: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.6';
        var _domain = ecshop.apiDomain.get({
          name: 'ecshop_cateapi',
          allowDomainConf: ['domain_ecapi', 'domain_hinet'],
        });
        if (opt.region) {
          opt._url =
            '/cdn/ecshop/cateapi/' +
            opt.ver +
            '/region/' +
            opt.region +
            '/menu&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        return $.ajaxq()
          .enq('store', {
            url: _domain + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    newarrival: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v2';
        if (opt.region) {
          if (opt.site == 'mobile') {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/newarrival&region=' +
              opt.region +
              '&offset=' +
              opt.offset +
              '&limit=10';
          } else if (opt.site == 'book') {
            opt._url =
              '/books/' +
              opt.ver +
              '/newarrival&region=' +
              opt.region +
              '&offset=' +
              opt.offset +
              '&limit=10';
          } else {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/newarrival&region=' +
              opt.region +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
        }
        if (opt.timeStamp && this.timeStamp != opt.timeStamp) {
          this.timeStamp == '' || this.clearq(this.timeStamp);
          this.timeStamp = opt.timeStamp;
        }
        return $.ajaxq()
          .enq('newarrival' + (opt.timeStamp || ''), {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
      timeStamp: '',
      clearq: function (qname) {
        $.ajaxq().clearq('newarrival' + qname);
      },
    },
    salesrank: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v2';
        if (opt.region) {
          if (opt.site == 'mobile') {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/salesrank&region=' +
              opt.region +
              '&offset=' +
              opt.offset +
              '&limit=10';
          } else if (opt.site == 'book') {
            opt._url =
              '/books/' +
              opt.ver +
              '/salesrank&region=' +
              opt.region +
              '&offset=' +
              opt.offset +
              '&limit=10';
          } else {
            opt._url =
              '/cdn/ecshop/' +
              opt.ver +
              '/salesrank&region=' +
              opt.region +
              '&_callback=' +
              opt._callback +
              '&' +
              opt.lastMod;
          }
        } else if (opt.store) {
          opt._url =
            '/cdn/ecshop/' +
            opt.ver +
            '/salesrank&store=' +
            opt.store +
            '&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod;
        }
        if (opt.timeStamp && this.timeStamp != opt.timeStamp) {
          this.timeStamp == '' || this.clearq(this.timeStamp);
          this.timeStamp = opt.timeStamp;
        }
        return $.ajaxq()
          .enq('salesrank' + (opt.timeStamp || ''), {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
      timeStamp: '',
      clearq: function (qname) {
        $.ajaxq().clearq('salesrank' + qname);
      },
    },
  };
  ecshop.region = {
    data: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt._url = '/cdn/ecshop/v1/region/' + opt.Id + '/data';
        return $.ajaxq()
          .enq('regiondata', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
  };
  ecshop.activity = {
    get: function (opt) {
      opt = opt ? opt : {};
      opt.ver = opt.ver ? opt.ver : 'v1.2';
      opt._url =
        '/ecshop/actapi/' + opt.ver + '/activity&id=' + opt.Id + '&_callback=' + opt._callback;
      return $.ajaxq()
        .enq('activity', {
          url: '//ecapi.pchome.com.tw' + opt._url,
          dataType: 'jsonp',
          jsonp: '_callback',
          jsonpCallback: opt._callback,
          cache: true,
        })
        .__promise();
    },
    region: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.1';
        opt.lastMod = opt.lastMod ? opt.lastMod : +new Date();
        opt._url =
          '/cdn/ecshop/actapi/' +
          opt.ver +
          '/activity&region=' +
          opt.Id +
          '&fields=Id,Name&_callback=' +
          opt._callback +
          '&' +
          opt.lastMod;
        return $.ajaxq()
          .enq('activity', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    prod: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.1';
        opt._url = '/cdn/ecshop/actapi/' + opt.ver + '/activity?prod=' + opt.Id + '&fields=Id,Name';
        return $.ajaxq()
          .enq('activity', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
  };
  ecshop.page = {
    prod: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1';
        opt._url =
          '/ecshop/pageapi/' +
          opt.ver +
          '/prod/data/lastModified&id=' +
          opt.Id +
          '&store=' +
          opt.store;
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    store: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1';
        opt._url = '/ecshop/pageapi/' + opt.ver + '/store/data/lastModified&store=' + opt.store;
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    region: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.2';
        opt._url =
          '/ecshop/pageapi/' +
          opt.ver +
          '/region/data/lastModified&region=' +
          opt.region +
          '&_callback=jsonp_pageregion';
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: 'jsonp_pageregion',
            cache: true,
          })
          .__promise();
      },
    },
    sign: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.2';
        opt.id = encodeURIComponent(encodeURIComponent(opt.id));
        opt._url =
          '/ecshop/pageapi/' +
          opt.ver +
          '/sign/data/lastModified&id=' +
          opt.id +
          '&_callback=jsonp_pagesign';
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: 'jsonp_pagesign',
            cache: true,
          })
          .__promise();
      },
    },
    index: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v1.2';
        opt._url =
          '/ecshop/pageapi/' +
          opt.ver +
          '/index/data/lastModified&site=' +
          opt.site +
          '&_callback=jsonp_pageindex';
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: 'jsonp_pageindex',
            cache: true,
          })
          .__promise();
      },
    },
    onsale: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt._callback = 'jsonp_ecshopOnsalePage';
        opt.ver = opt.ver ? opt.ver : 'v1.2';
        opt.site = opt.site ? opt.site : '';
        switch (true) {
          case opt.site == 'mall':
            opt._url =
              '/ecshop/pageapi/' +
              opt.ver +
              '/onsale/data/lastModified&site=mall&_callback=' +
              opt._callback;
            break;
          case opt.site == 'h24':
            opt._url =
              '/ecshop/pageapi/' +
              opt.ver +
              '/onsale/data/lastModified&site=h24&_callback=' +
              opt._callback;
            break;
        }
        return $.ajaxq()
          .enq('pageLastModified', {
            url: '//ecapi.pchome.com.tw' + opt._url,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
  };
  ecshop.recommend = {
    item: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v2';
        opt._url =
          '/cdn/ecshop/recommendapi/' +
          opt.ver +
          '/' +
          opt.type +
          '/itembase/recommendation?q=' +
          opt.Id +
          '&_callback=' +
          opt._callback;
        var _domain = ecshop.apiDomain.get({
          name: 'ecshop_recommendapi',
        });
        return $.ajaxq()
          .enq('ItemRecommend', {
            url: _domain + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
    store: {
      get: function (opt) {
        opt = opt ? opt : {};
        opt.ver = opt.ver ? opt.ver : 'v2';
        opt._url =
          '/cdn/ecshop/recommendapi/' +
          opt.ver +
          '/' +
          opt.type +
          '/storebase/recommendation?q=' +
          opt.Id +
          '&_callback=' +
          opt._callback;
        return $.ajaxq()
          .enq('ItemRecommend', {
            url:
              ecshop.apiDomain.get({
                name: 'ecshop_recommendapi',
              }) + opt._url,
            dataType: 'jsonp',
            jsonp: '_callback',
            jsonpCallback: opt._callback,
            cache: true,
          })
          .__promise();
      },
    },
  };
  ecshop.underage = {
    get: function (opt) {
      opt = opt ? opt : {};
      opt.ver = opt.ver ? opt.ver : 'v2.1';
      var _domain = ecshop.apiDomain.get({
        name: 'ecshop',
      });
      return jQuery
        .ajaxq()
        .enq('underage', {
          url:
            _domain +
            '/cdn/ecshop/' +
            opt.ver +
            '/region,store&isNC17=1&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod,
          dataType: 'jsonp',
          jsonp: '_callback',
          jsonpCallback: opt._callback,
          cache: true,
        })
        .__promise();
    },
  };
  ecshop.enterprise = {
    get: function (opt) {
      opt = opt ? opt : {};
      opt.ver = opt.ver ? opt.ver : 'v2.1';
      var _domain = ecshop.apiDomain.get({
        name: 'ecshop',
      });
      return jQuery
        .ajaxq()
        .enq('enterprise', {
          url:
            _domain +
            '/cdn/ecshop/' +
            opt.ver +
            '/region,store&isEntArea=1&_callback=' +
            opt._callback +
            '&' +
            opt.lastMod,
          dataType: 'jsonp',
          jsonp: '_callback',
          jsonpCallback: opt._callback,
          cache: true,
        })
        .__promise();
    },
  };
  return ecshop;
})();
$(function () {
  $.extend(
    ecshop,
    (function () {
      return {
        db: {
          prod: {
            button: {
              get: function (opt) {
                opt = opt ? opt : {};
                opt.ver = opt.ver ? opt.ver : 'v2';
                if (opt.Id) {
                  opt.fields = opt.fields ? opt.fields : 'Seq,Id,Price,Qty,ButtonType,SaleStatus';
                  opt._url =
                    ecshop.apiDomain.get({
                      name: 'ecshop_prodapi',
                    }) +
                    '/cdn/ecshop/prodapi/v2/prod/button&id=' +
                    opt.Id +
                    '&fields=' +
                    opt.fields +
                    '&_callback=' +
                    opt._callback;
                  return $.ajaxq()
                    .enq('button', {
                      url: opt._url,
                      dataType: 'jsonp',
                      jsonp: '_callback',
                      jsonpCallback: opt._callback,
                      cache: true,
                    })
                    .__promise();
                } else {
                  throw 'parameter error';
                }
              },
            },
          },
        },
      };
    })()
  );
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof (args[number] != 'undefined') ? args[number] : match;
    });
  };
  var strId = location.href.match(/(C\d{9})/)
    ? location.href.match(/(C\d{9})/)[1]
    : $('#Campaign').val();
  var MainSwiperContainer1 = null;
  var MainSwiperContainer2 = null;
  var MobileMainSwiperContainer1 = null;
  var MobileMainSwiperContainer2 = null;
  var MenuSwiperContainer = null;
  var PanelSwiperContainer = null;
  var arrSwiperBlockId = [];
  var isScrollAnimate = false;
  var NowScrollTop = null;
  var intImgIdx = 0;
  var arrProdMapping = [];
  var _getFullImage = function (strImage) {
    var arrImgDomain = ['b', 'c', 'd', 'e', 'f'];
    if (strImage && !strImage.match(/\/activity\/campaign\/v\d\/layout\/img/)) {
      if (strImage.match(/ec1img.pchome.com.tw/) != null) {
        strImage = strImage.replace(/ec1img.pchome.com.tw/, 'a.ecimg.tw');
      } else if (strImage.match(/ecimg.tw/) == null) {
        strImage = '//a.ecimg.tw' + strImage;
      }
    }
    strImage = strImage.replace(
      /a.ecimg.tw/,
      '{0}.ecimg.tw'.format(arrImgDomain[intImgIdx % arrImgDomain.length])
    );
    intImgIdx++;
    return strImage;
  };
  var _versionCompare = function (left, right) {
    if (typeof left + typeof right != 'stringstring') {
      return false;
    }
    var a = left.split('.'),
      b = right.split('.'),
      i = 0,
      len = Math.max(a.length, b.length);
    for (; i < len; i++) {
      if ((a[i] && !b[i] && parseInt(a[i]) > 0) || parseInt(a[i]) > parseInt(b[i])) {
        return 1;
      } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || parseInt(a[i]) < parseInt(b[i])) {
        return -1;
      }
    }
    return 0;
  };
  var setCountdown = function (strStartDate, elCountdown) {
    var objStartDate = new Date(strStartDate);
    var objCurDate = new Date();
    if (objStartDate.getTime() <= objCurDate.getTime()) {
      elCountdown.html(
        '<li><span class="value">0</span>天</li><li><span class="value">0</span>時</li><li><span class="value">0</span>分</li><li><span class="value">0</span>秒</li>'
      );
      return false;
    }
    var intTimer = (objStartDate.getTime() - objCurDate.getTime()) / 1000;
    var intDays = Math.floor(intTimer / (3600 * 24));
    var intHours = Math.floor((intTimer % (3600 * 24)) / 3600);
    var intMinutes = Math.floor(((intTimer % (3600 * 24)) % 3600) / 60);
    var intSeconds = Math.floor(((intTimer % (3600 * 24)) % 3600) % 60);
    var strText =
      '<li><span class="value">{0}</span>天</li><li><span class="value">{1}</span>時</li><li><span class="value">{2}</span>分</li><li><span class="value">{3}</span>秒</li>'.format(
        intDays,
        intHours >= 10 ? intHours : intHours == 0 ? 0 : '0' + intHours,
        intMinutes >= 10 ? intMinutes : intMinutes == 0 ? 0 : '0' + intMinutes,
        intSeconds >= 10 ? intSeconds : intSeconds == 0 ? 0 : '0' + intSeconds
      );
    elCountdown.html(strText);
    var countDown = setInterval(function () {
      var intDays = Math.floor(intTimer / (3600 * 24));
      var intHours = Math.floor((intTimer % (3600 * 24)) / 3600);
      var intMinutes = Math.floor(((intTimer % (3600 * 24)) % 3600) / 60);
      var intSeconds = Math.floor(((intTimer % (3600 * 24)) % 3600) % 60);
      var strText =
        '<li><span class="value">{0}</span>天</li><li><span class="value">{1}</span>時</li><li><span class="value">{2}</span>分</li><li><span class="value">{3}</span>秒</li>'.format(
          intDays,
          intHours >= 10 ? intHours : intHours == 0 ? 0 : '0' + intHours,
          intMinutes >= 10 ? intMinutes : intMinutes == 0 ? 0 : '0' + intMinutes,
          intSeconds >= 10 ? intSeconds : intSeconds == 0 ? 0 : '0' + intSeconds
        );
      elCountdown.html(strText);
      if (--intTimer <= 0) {
        clearInterval(countDown);
      }
    }, 1000);
  };

  function getCookie(strName) {
    var strNameEQ = strName + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      c = c.replace(/^\s+/, '');
      if (c.indexOf(strNameEQ) == 0) {
        return c.substring(strNameEQ.length, c.length);
      }
    }
    return null;
  }
  $.fn.ShowBlock = function (opt) {
    var _promise = $.Deferred();
    var arrDuartionBlock = [
      2, 3, 367, 147, 148, 368, 149, 150, 369, 151, 152, 370, 153, 154, 371, 5, 6, 7, 417, 155, 156,
      157, 418, 158, 159, 160, 419, 161, 162, 163, 420, 164, 165, 166, 421, 9, 10, 11, 422, 167,
      168, 169, 423, 170, 171, 172, 424, 173, 174, 175, 425, 176, 177, 178, 426, 13, 14, 15, 427,
      179, 180, 181, 428, 182, 183, 184, 429, 185, 186, 187, 430, 188, 189, 190, 431, 17, 18, 19,
      432, 191, 192, 193, 433, 194, 195, 196, 434, 197, 198, 199, 435, 200, 201, 202, 436, 21, 203,
      204, 205, 206, 23, 207, 208, 209, 210, 25, 211, 212, 213, 214, 27, 215, 216, 217, 218, 557,
      558, 559, 560, 561, 562, 563, 564, 565, 566, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446,
      447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465,
      466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484,
      485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503,
      504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522,
      523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541,
      542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 31, 32, 33, 34, 35,
      36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 220, 221, 222, 223, 224, 225, 226, 227, 228,
      229, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 246, 247, 248, 249,
      250, 251, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 104, 105, 106, 107,
      108, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 121, 122, 123, 124, 125, 126, 127, 128,
      129, 130, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 300, 301, 302, 303, 304, 305, 306,
      307, 308, 309, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 673, 674, 675, 676, 677, 678,
      679, 680, 681, 682, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 695, 696, 697, 698, 699,
      700, 701, 702, 703, 704, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 717, 718, 719, 720,
      721, 722, 723, 724, 725, 726, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 739, 740, 741,
      742, 743, 744, 745, 746, 747, 748, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 761, 762,
      763, 764, 765, 766, 767, 768, 769, 770, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 783,
      784, 785, 786, 787, 788, 789, 790, 791, 792, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803,
      805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 816, 817, 818, 819, 820, 821, 822, 823, 824,
      825, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 75, 76, 77, 252, 253, 254, 255, 256,
      257, 258, 259, 260, 261, 262, 263, 79, 80, 81, 264, 265, 266, 267, 268, 269, 270, 271, 272,
      273, 274, 275, 83, 84, 85, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 573,
      574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592,
      593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611,
      612, 613, 614, 615, 616, 617, 132, 133, 134, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330,
      331, 332, 136, 137, 138, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 140, 141,
      142, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 618, 619, 620, 621, 622, 623,
      624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642,
      643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661,
      662, 144, 357, 358, 359, 360, 361, 362, 363, 364, 365, 372, 373, 374, 375, 376, 377, 378, 379,
      380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398,
      399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
    ];
    this.each(function () {
      var _this = $(this);
      var arrBlockData = opt.BlockData || [];
      var strAction = opt.Action || '';
      if ($.inArray(strAction, ['show', 'update']) == -1) {
        return false;
      }
      // var tplSlogan = '<span class="slogan" style="color:{1};background-color:{2};">{0}</span>';
      // var tplProdContainer = '<li _pid="{8}"><div class="prod_img"><a href="{0}"><img src="{1}" alt="{2}" data-src="{9}"></a></div>' + '<div class="prod_info">{3}<a class="prod_name">{4}</a>' + '<ul class="price_box">' + '<li>{5}<span class="price">{6}</span>{7}</li>' + '</ul>' + '</div>' + '</li>';
      var tplProdContainer =
        '<li _pid="{8}" class="swiper-slide"><a href="{0}" target="_blank">' +
        '<img src="{1}" alt="{2}" data-src="{9}"">' +
        '{3}<div class="pd_title">{4}</div>' +
        '<div class="price">{5} <small>$</small>{6}{7}</div>' +
        '</a></li>';

      // var tplImg = '<a href="{0}"><img src="" data-src="{1}" alt="{2}" title="{2}" /></a>';
      var tplImg = '<a href="{0}"><img src="" data-src="{1}" alt="{2}" title="{2}" /></a>';
      var tplSwiperImg =
        '<li class="swiper-slide"><a class="" href="{0}"><img src="{1}" alt="{2}" title="{2}" /></a></li>';
      var tplMenuList =
        "<li><a href=\"{0}\" onmouseover=\"this.style.color='{1}';this.style.backgroundColor='{2}';\" onmouseout=\"this.style.color='';this.style.backgroundColor='';\">{3}</a></li>";
      var tplMenuImg =
        '<li><a href="{0}" style="color:{1};background-color:{2};"><img src="" data-src="{3}" alt="{4}" title="{4}" /></a></li>';
      var tplMobileMainNavBar =
        '<a href="{0}" style="color:{1};background-color:{2}";><span class="txt"><span class="ico ico-star"></span>主會場</span></a>';
      var tplMobileSubNavBar =
        '<a href="javascript:void(0);" style="color:{0};background-color:{1};"><span class="txt"><span class="ico ico-menu"></span>分會場</span></a>';
      var tplSubMenuMobile =
        '<li><a href="{0}" style="color:{1};background-color:{2};">{3}</a></li>';
      var tplCountdownDesktop =
        '<div class="countdown s_desktop" style="background-image:url({0});" _url="{1}">' +
        '<dl>' +
        '<dt>倒數：</dt>' +
        '<dd>' +
        '<ul>' +
        '<li><span class="value"></span>天</li>' +
        '<li><span class="value"></span>時</li>' +
        '<li><span class="value"></span>分</li>' +
        '<li><span class="value"></span>秒</li>' +
        '</ul>' +
        '</dd>' +
        '</dl>' +
        '</div>';
      var tplCountdownMobile =
        '<div class="countdown s_mobile" style="background-image:url({0});" _url="{1}">' +
        '<dl>' +
        '<dt>倒數：</dt>' +
        '<dd>' +
        '<ul>' +
        '<li><span class="value"></span>天</li>' +
        '<li><span class="value"></span>時</li>' +
        '<li><span class="value"></span>分</li>' +
        '<li><span class="value"></span>秒</li>' +
        '</ul>' +
        '</dd>' +
        '</dl>' +
        '</div>';
      var tplNoCountdownDesktop =
        '<div class="countdown s_desktop" style="background-image:url({0});" _url="{1}"></div>';
      var tplNoCountdownMobile =
        '<div class="countdown s_mobile" style="background-image:url({0});" _url="{1}"></div>';
      var arrProdId = [];
      $.each(arrBlockData, function (idx, objBlock) {
        if ($.inArray(parseInt(objBlock.BlockId), arrDuartionBlock) >= 0) {
          if (strAction == 'show') {
            $(document).data('IndexBlockId').push(objBlock.BlockId);
          }
          var objSetting = $(document).data('BlockSetting')['Block_' + objBlock.BlockId];
          if (strAction == 'update') {
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [2, 3, 367, 147, 148, 368, 149, 150, 369, 151, 152, 370, 153, 154, 371]
              ) >= 0
            ) {
              $('#MainContainer1')
                .addClass('unblock')
                .find('.s_desktop')
                .empty()
                .end()
                .find('.s_mobile')
                .empty();
              $('#MainContainer2')
                .addClass('unblock')
                .find('.s_desktop .main_banner')
                .empty()
                .end()
                .find('.s_mobile .main_banner')
                .empty()
                .end()
                .find('#MainSwiperContainer1 .swiper-wrapper')
                .empty()
                .end()
                .find('#MobileMainSwiperContainer1 .swiper-wrapper')
                .empty();
              $('#MainContainer3')
                .addClass('unblock')
                .find('#MainSwiperContainer2 .swiper-wrapper')
                .empty()
                .end()
                .find('#MobileMainSwiperContainer2 .swiper-wrapper')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [
                  5, 6, 7, 417, 155, 156, 157, 418, 158, 159, 160, 419, 161, 162, 163, 420, 164,
                  165, 166, 421,
                ]
              ) >= 0
            ) {
              $(
                '.BannerContainer1:eq(0), .BannerContainer1:eq(1), .BannerContainer1:eq(2), .BannerContainer1:eq(3)'
              )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [
                  9, 10, 11, 422, 167, 168, 169, 423, 170, 171, 172, 424, 173, 174, 175, 425, 176,
                  177, 178, 426,
                ]
              ) >= 0
            ) {
              $(
                '.BannerContainer2:eq(0), .BannerContainer2:eq(1), .BannerContainer2:eq(2), .BannerContainer2:eq(3)'
              )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [
                  13, 14, 15, 427, 179, 180, 181, 428, 182, 183, 184, 429, 185, 186, 187, 430, 188,
                  189, 190, 431,
                ]
              ) >= 0
            ) {
              $(
                '.BannerContainer3:eq(0), .BannerContainer3:eq(1), .BannerContainer3:eq(2), .BannerContainer3:eq(3)'
              )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [
                  17, 18, 19, 432, 191, 192, 193, 433, 194, 195, 196, 434, 197, 198, 199, 435, 200,
                  201, 202, 436,
                ]
              ) >= 0
            ) {
              $(
                '.BannerContainer4:eq(0), .BannerContainer4:eq(1), .BannerContainer4:eq(2), .BannerContainer4:eq(3)'
              )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451]
              ) >= 0
            ) {
              $('.BrandContainer1:eq(0), .BrandContainer1:eq(1), .BrandContainer1:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466]
              ) >= 0
            ) {
              $('.BrandContainer2:eq(0), .BrandContainer2:eq(1), .BrandContainer2:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481]
              ) >= 0
            ) {
              $('.BrandContainer3:eq(0), .BrandContainer3:eq(1), .BrandContainer3:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496]
              ) >= 0
            ) {
              $('.BrandContainer4:eq(0), .BrandContainer4:eq(1), .BrandContainer4:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511]
              ) >= 0
            ) {
              $('.BrandContainer5:eq(0), .BrandContainer5:eq(1), .BrandContainer5:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526]
              ) >= 0
            ) {
              $('.BrandContainer6:eq(0), .BrandContainer6:eq(1), .BrandContainer6:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541]
              ) >= 0
            ) {
              $('.BrandContainer7:eq(0), .BrandContainer7:eq(1), .BrandContainer7:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556]
              ) >= 0
            ) {
              $('.BrandContainer8:eq(0), .BrandContainer8:eq(1), .BrandContainer8:eq(2)')
                .addClass('unblock')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [75, 76, 77, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer1:eq(0), .ActivityContainer1:eq(1), .ActivityContainer1:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [79, 80, 81, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer2:eq(0), .ActivityContainer2:eq(1), .ActivityContainer2:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [83, 84, 85, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer3:eq(0), .ActivityContainer3:eq(1), .ActivityContainer3:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer4:eq(0), .ActivityContainer4:eq(1), .ActivityContainer4:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer5:eq(0), .ActivityContainer5:eq(1), .ActivityContainer5:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617]
              ) >= 0
            ) {
              $('#Block30Container')
                .find(
                  '.ActivityContainer6:eq(0), .ActivityContainer6:eq(1), .ActivityContainer6:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [132, 133, 134, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer1:eq(0), .ActivityContainer1:eq(1), .ActivityContainer1:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [136, 137, 138, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer2:eq(0), .ActivityContainer2:eq(1), .ActivityContainer2:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [140, 141, 142, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer3:eq(0), .ActivityContainer3:eq(1), .ActivityContainer3:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer4:eq(0), .ActivityContainer4:eq(1), .ActivityContainer4:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer5:eq(0), .ActivityContainer5:eq(1), .ActivityContainer5:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if (
              $.inArray(
                parseInt(objBlock.BlockId),
                [648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662]
              ) >= 0
            ) {
              $('#Block87Container')
                .find(
                  '.ActivityContainer6:eq(0), .ActivityContainer6:eq(1), .ActivityContainer6:eq(2)'
                )
                .addClass('unblock')
                .find('ul')
                .empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [372, 373, 374, 375, 376]) >= 0) {
              $('#CountdownContainer1').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [377, 378, 379, 380, 381]) >= 0) {
              $('#CountdownContainer2').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [382, 383, 384, 385, 386]) >= 0) {
              $('#CountdownContainer3').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [387, 388, 389, 390, 391]) >= 0) {
              $('#CountdownContainer4').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [392, 393, 394, 395, 396]) >= 0) {
              $('#CountdownContainer5').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [397, 398, 399, 400, 401]) >= 0) {
              $('#CountdownContainer6').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [402, 403, 404, 405, 406]) >= 0) {
              $('#CountdownContainer7').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [407, 408, 409, 410, 411]) >= 0) {
              $('#CountdownContainer8').addClass('unblock').find('ul').empty();
            }
            if ($.inArray(parseInt(objBlock.BlockId), [412, 413, 414, 415, 416]) >= 0) {
              $('#CountdownContainer9').addClass('unblock').find('ul').empty();
            }
          }
          if ($.inArray(parseInt(objBlock.BlockId), [2, 147, 149, 151, 153]) >= 0) {
            var elMainContainer1 = $('#MainContainer1');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [3, 148, 150, 152, 154]) >= 0) {
            var elMainContainer2 = $('#MainContainer2');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [367, 368, 369, 370, 371]) >= 0) {
            var elMainContainer3 = $('#MainContainer3');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [5, 155, 158, 161, 164]) >= 0) {
            var elBannerContainer = $('.BannerContainer1:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [6, 156, 159, 162, 165]) >= 0) {
            var elBannerContainer = $('.BannerContainer1:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [7, 157, 160, 163, 166]) >= 0) {
            var elBannerContainer = $('.BannerContainer1:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [417, 418, 419, 420, 421]) >= 0) {
            var elBannerContainer = $('.BannerContainer1:eq(3)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [9, 167, 170, 173, 176]) >= 0) {
            var elBannerContainer = $('.BannerContainer2:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [10, 168, 171, 174, 177]) >= 0) {
            var elBannerContainer = $('.BannerContainer2:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [11, 169, 172, 175, 178]) >= 0) {
            var elBannerContainer = $('.BannerContainer2:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [422, 423, 424, 425, 426]) >= 0) {
            var elBannerContainer = $('.BannerContainer2:eq(3)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [13, 179, 182, 185, 188]) >= 0) {
            var elBannerContainer = $('.BannerContainer3:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [14, 180, 183, 186, 189]) >= 0) {
            var elBannerContainer = $('.BannerContainer3:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [15, 181, 184, 187, 190]) >= 0) {
            var elBannerContainer = $('.BannerContainer3:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [427, 428, 429, 430, 431]) >= 0) {
            var elBannerContainer = $('.BannerContainer3:eq(3)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [17, 191, 194, 197, 200]) >= 0) {
            var elBannerContainer = $('.BannerContainer4:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [18, 192, 195, 198, 201]) >= 0) {
            var elBannerContainer = $('.BannerContainer4:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [19, 193, 196, 199, 202]) >= 0) {
            var elBannerContainer = $('.BannerContainer4:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [432, 433, 434, 435, 436]) >= 0) {
            var elBannerContainer = $('.BannerContainer4:eq(3)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [437, 440, 443, 446, 449]) >= 0) {
            var elBrandContainer = $('.BrandContainer1:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [438, 441, 444, 447, 450]) >= 0) {
            var elBrandContainer = $('.BrandContainer1:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [439, 442, 445, 448, 451]) >= 0) {
            var elBrandContainer = $('.BrandContainer1:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [452, 455, 458, 461, 464]) >= 0) {
            var elBrandContainer = $('.BrandContainer2:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [453, 456, 459, 462, 465]) >= 0) {
            var elBrandContainer = $('.BrandContainer2:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [454, 457, 460, 463, 466]) >= 0) {
            var elBrandContainer = $('.BrandContainer2:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [467, 470, 473, 476, 479]) >= 0) {
            var elBrandContainer = $('.BrandContainer3:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [468, 471, 474, 477, 480]) >= 0) {
            var elBrandContainer = $('.BrandContainer3:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [469, 472, 475, 478, 481]) >= 0) {
            var elBrandContainer = $('.BrandContainer3:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [482, 485, 488, 491, 494]) >= 0) {
            var elBrandContainer = $('.BrandContainer4:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [483, 486, 489, 492, 495]) >= 0) {
            var elBrandContainer = $('.BrandContainer4:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [484, 487, 490, 493, 496]) >= 0) {
            var elBrandContainer = $('.BrandContainer4:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [497, 500, 503, 506, 509]) >= 0) {
            var elBrandContainer = $('.BrandContainer5:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [498, 501, 504, 507, 510]) >= 0) {
            var elBrandContainer = $('.BrandContainer5:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [499, 502, 505, 508, 511]) >= 0) {
            var elBrandContainer = $('.BrandContainer5:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [512, 515, 518, 521, 524]) >= 0) {
            var elBrandContainer = $('.BrandContainer6:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [513, 516, 519, 522, 525]) >= 0) {
            var elBrandContainer = $('.BrandContainer6:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [514, 517, 520, 523, 526]) >= 0) {
            var elBrandContainer = $('.BrandContainer6:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [527, 530, 533, 536, 539]) >= 0) {
            var elBrandContainer = $('.BrandContainer7:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [528, 531, 534, 537, 540]) >= 0) {
            var elBrandContainer = $('.BrandContainer7:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [529, 532, 535, 538, 541]) >= 0) {
            var elBrandContainer = $('.BrandContainer7:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [542, 545, 548, 551, 554]) >= 0) {
            var elBrandContainer = $('.BrandContainer8:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [543, 546, 549, 552, 555]) >= 0) {
            var elBrandContainer = $('.BrandContainer8:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [544, 547, 550, 553, 556]) >= 0) {
            var elBrandContainer = $('.BrandContainer8:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [361, 362, 363, 364, 365]) >= 0) {
            var elVideoContainer = $('#VideoContainer');
            elVideoContainer.addClass('unblock').find('#YoutubeContainer').removeAttr('src');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [21, 203, 204, 205, 206]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer1');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [23, 207, 208, 209, 210]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer2');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [25, 211, 212, 213, 214]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer3');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [27, 215, 216, 217, 218]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer4');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [557, 558, 559, 560, 561]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer5');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [562, 563, 564, 565, 566]) >= 0) {
            var elBannerFixContainer = $('#BannerFixContainer6');
            elBannerFixContainer.addClass('unblock').find('ul').empty();
          }
          if (
            $.inArray(parseInt(objBlock.BlockId), [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer1');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(parseInt(objBlock.BlockId), [42, 43, 44, 45, 46, 47, 48, 49, 50, 51]) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer2');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(parseInt(objBlock.BlockId), [53, 54, 55, 56, 57, 58, 59, 60, 61, 62]) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer3');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(parseInt(objBlock.BlockId), [64, 65, 66, 67, 68, 69, 70, 71, 72, 73]) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer4');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [220, 221, 222, 223, 224, 225, 226, 227, 228, 229]
            ) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer5');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [231, 232, 233, 234, 235, 236, 237, 238, 239, 240]
            ) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer6');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [242, 243, 244, 245, 246, 247, 248, 249, 250, 251]
            ) >= 0
          ) {
            var elProdContainer = $('#Block30Container').find('#Prod1stContainer7');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(parseInt(objBlock.BlockId), [88, 89, 90, 91, 92, 93, 94, 95, 96, 97]) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer1');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [99, 100, 101, 102, 103, 104, 105, 106, 107, 108]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer2');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [110, 111, 112, 113, 114, 115, 116, 117, 118, 119]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer3');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [121, 122, 123, 124, 125, 126, 127, 128, 129, 130]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer4');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [289, 290, 291, 292, 293, 294, 295, 296, 297, 298]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer5');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [300, 301, 302, 303, 304, 305, 306, 307, 308, 309]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer6');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [311, 312, 313, 314, 315, 316, 317, 318, 319, 320]
            ) >= 0
          ) {
            var elProdContainer = $('#Block87Container').find('#Prod2ndContainer7');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [673, 674, 675, 676, 677, 678, 679, 680, 681, 682]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer1');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [684, 685, 686, 687, 688, 689, 690, 691, 692, 693]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer2');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [695, 696, 697, 698, 699, 700, 701, 702, 703, 704]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer3');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [706, 707, 708, 709, 710, 711, 712, 713, 714, 715]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer4');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [717, 718, 719, 720, 721, 722, 723, 724, 725, 726]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer5');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [728, 729, 730, 731, 732, 733, 734, 735, 736, 737]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer6');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [739, 740, 741, 742, 743, 744, 745, 746, 747, 748]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer7');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [750, 751, 752, 753, 754, 755, 756, 757, 758, 759]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer8');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [761, 762, 763, 764, 765, 766, 767, 768, 769, 770]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer9');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [772, 773, 774, 775, 776, 777, 778, 779, 780, 781]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer10');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [783, 784, 785, 786, 787, 788, 789, 790, 791, 792]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer11');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [794, 795, 796, 797, 798, 799, 800, 801, 802, 803]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer12');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [805, 806, 807, 808, 809, 810, 811, 812, 813, 814]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer13');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [816, 817, 818, 819, 820, 821, 822, 823, 824, 825]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer14');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if (
            $.inArray(
              parseInt(objBlock.BlockId),
              [827, 828, 829, 830, 831, 832, 833, 834, 835, 836]
            ) >= 0
          ) {
            var elProdContainer = $('#Block837Container').find('#Prod3rdContainer15');
            elProdContainer.addClass('unblock').find('ul.site_loop').empty();
          }
          if ($.inArray(parseInt(objBlock.BlockId), [75, 252, 255, 258, 261]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer1:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [76, 253, 256, 259, 262]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer1:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [77, 254, 257, 260, 263]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer1:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [79, 264, 267, 270, 273]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer2:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [80, 265, 268, 271, 274]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer2:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [81, 266, 269, 272, 275]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer2:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [83, 276, 279, 282, 285]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer3:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [84, 277, 280, 283, 286]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer3:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [85, 278, 281, 284, 287]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer3:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [573, 576, 579, 582, 585]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer4:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [574, 577, 580, 583, 586]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer4:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [575, 578, 581, 584, 587]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer4:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [588, 591, 594, 597, 600]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer5:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [589, 592, 595, 598, 601]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer5:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [590, 593, 596, 599, 602]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer5:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [603, 606, 609, 612, 615]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer6:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [604, 607, 610, 613, 616]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer6:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [605, 608, 611, 614, 617]) >= 0) {
            var elActivityContainer = $('#Block30Container').find('.ActivityContainer6:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [132, 321, 324, 327, 330]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer1:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [133, 322, 325, 328, 331]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer1:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [134, 323, 326, 329, 332]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer1:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [136, 333, 336, 339, 342]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer2:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [137, 334, 337, 340, 343]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer2:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [138, 335, 338, 341, 344]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer2:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [140, 345, 348, 351, 354]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer3:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [141, 346, 349, 352, 355]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer3:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [142, 347, 350, 353, 356]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer3:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [618, 621, 624, 627, 630]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer4:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [619, 622, 625, 628, 631]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer4:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [620, 623, 626, 629, 632]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer4:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [633, 636, 639, 642, 645]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer5:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [634, 637, 640, 643, 646]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer5:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [635, 638, 641, 644, 647]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer5:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [648, 651, 654, 657, 660]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer6:eq(0)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [649, 652, 655, 658, 661]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer6:eq(1)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [650, 653, 656, 659, 662]) >= 0) {
            var elActivityContainer = $('#Block87Container').find('.ActivityContainer6:eq(2)');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [372, 373, 374, 375, 376]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer1');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [377, 378, 379, 380, 381]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer2');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [382, 383, 384, 385, 386]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer3');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [387, 388, 389, 390, 391]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer4');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [392, 393, 394, 395, 396]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer5');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [397, 398, 399, 400, 401]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer6');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [402, 403, 404, 405, 406]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer7');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [407, 408, 409, 410, 411]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer8');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [412, 413, 414, 415, 416]) >= 0) {
            var elCountdownContainer = $('#CountdownContainer9');
          }
          if ($.inArray(parseInt(objBlock.BlockId), [144, 357, 358, 359, 360]) >= 0) {
            var elMenuContainer = $('#Menu');
            var elMenuMobileContainer = $('#MenuMobile');
            elMenuContainer
              .addClass('unblock')
              .find('.head')
              .empty()
              .end()
              .find('.menu_list')
              .empty()
              .end()
              .find('.site_evt')
              .empty();
            elMenuMobileContainer.find('a').remove().end().find('#SubMenuMobile ul').empty();
            elMenuMobileContainer
              .find('#SubNavBarMobile')
              .prepend(
                tplMobileSubNavBar.format(
                  objSetting.Nodes[4].FontColor,
                  objSetting.Nodes[4].BackColor
                )
              );
          }
          $.each(objBlock.Nodes, function (idx, objNode) {
            if (idx == 0) {
              return;
            }
            if (typeof elMainContainer1 != 'undefined') {
              if (objNode.Id == 2) {
                elMainContainer1
                  .find('.s_desktop')
                  .append(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  );
              } else if (objNode.Id == 3) {
                elMainContainer1
                  .find('.s_mobile')
                  .append(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  );
              }
            }
            if (typeof elMainContainer2 != 'undefined') {
              if (objNode.Id == 2) {
                elMainContainer2
                  .find('.s_desktop .main_banner')
                  .append(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  );
              } else if ($.inArray(objNode.Id, [3, 4, 5, 6, 12]) >= 0) {
                if (objSetting.Nodes[objNode.Id].isVisible == 1 && $.trim(objNode.Img.Src) != '') {
                  elMainContainer2
                    .find('#MainSwiperContainer1 .swiper-wrapper')
                    .append(
                      tplSwiperImg.format(
                        objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                        _getFullImage(objNode.Img.Src),
                        objNode.Img.Title
                      )
                    );
                }
              } else if (objNode.Id == 7) {
                elMainContainer2
                  .find('.s_mobile .main_banner')
                  .append(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  );
              } else if ($.inArray(objNode.Id, [8, 9, 10, 11, 13]) >= 0) {
                if (objSetting.Nodes[objNode.Id].isVisible == 1 && $.trim(objNode.Img.Src) != '') {
                  elMainContainer2
                    .find('#MobileMainSwiperContainer1 .swiper-wrapper')
                    .append(
                      tplSwiperImg.format(
                        objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                        _getFullImage(objNode.Img.Src),
                        objNode.Img.Title
                      )
                    );
                }
              }
            }
            if (typeof elMainContainer3 != 'undefined') {
              if ($.inArray(objNode.Id, [2, 3, 4, 5, 6]) >= 0) {
                if (objSetting.Nodes[objNode.Id].isVisible == 1 && $.trim(objNode.Img.Src) != '') {
                  elMainContainer3
                    .find('#MainSwiperContainer2 .swiper-wrapper')
                    .append(
                      tplSwiperImg.format(
                        objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                        _getFullImage(objNode.Img.Src),
                        objNode.Img.Title
                      )
                    );
                }
              } else if ($.inArray(objNode.Id, [7, 8, 9, 10, 11]) >= 0) {
                if (objSetting.Nodes[objNode.Id].isVisible == 1 && $.trim(objNode.Img.Src) != '') {
                  elMainContainer3
                    .find('#MobileMainSwiperContainer2 .swiper-wrapper')
                    .append(
                      tplSwiperImg.format(
                        objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                        _getFullImage(objNode.Img.Src),
                        objNode.Img.Title
                      )
                    );
                }
              }
            }
            if (typeof elBannerContainer != 'undefined') {
              elBannerContainer
                .find('ul')
                .append(
                  '<li>{0}</li>'.format(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  )
                );
            }
            if (typeof elBannerFixContainer != 'undefined') {
              elBannerFixContainer
                .find('ul')
                .append(
                  '<li>{0}</li>'.format(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  )
                );
            }
            if (typeof elBrandContainer != 'undefined') {
              elBrandContainer.append(
                '<li>{0}</li>'.format(
                  tplImg.format(
                    objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                    _getFullImage(objNode.Img.Src),
                    objNode.Img.Title
                  )
                )
              );
            }
            if (typeof elActivityContainer != 'undefined') {
              elActivityContainer
                .find('ul')
                .append(
                  '<li>{0}</li>'.format(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  )
                );
            }
            if (objNode.Img.Src && objNode.Link.Url) {
              if (typeof elMenuContainer != 'undefined') {
                if ($.inArray(objNode.Id, [15, 16, 17]) >= 0) {
                  elMenuContainer
                    .find('.site_evt')
                    .append(
                      tplMenuImg.format(
                        objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                        objSetting.Nodes[objNode.Id].FontColor,
                        objSetting.Nodes[objNode.Id].BackColor,
                        _getFullImage(objNode.Img.Src),
                        objNode.Img.Title
                      )
                    );
                  if (objNode.Link.Text) {
                    elMenuMobileContainer
                      .find('#SubMenuMobile ul')
                      .append(
                        tplSubMenuMobile.format(
                          objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                          objSetting.Nodes[objNode.Id].FontColor,
                          objSetting.Nodes[objNode.Id].BackColor,
                          objNode.Link.Text
                        )
                      );
                  }
                }
              }
            }
            if (objNode.Img.Src && objNode.Link.Url && objNode.Link.Text) {
              if (typeof elProdContainer != 'undefined') {
                // elProdContainer.find('ul.site_loop').append(tplProdContainer.format(objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);', '//a.ecimg.tw/css/2016/style/images/v201607/mobile/v1.9/mobile_loading.svg', objNode.Link.Text, objSetting.Slogan.isActive == 1 ? '<span class="slogan">{0}</span>'.format(objNode.Link.Text2) : '', objNode.Link.Text, $.trim(objNode.Link.Text3) != '' ? '<span class="original">${0}</span>'.format(objNode.Link.Text3) : '', (objNode.Link.Text1.match(/^\d+$/) ? '$' : '') + ('<span class="value">{0}</span>').format(objNode.Link.Text1), objSetting.HitoIcon.isActive == 1 ? '<span class="sign">搶購</span>' : '', $.trim(objNode.Link.Text4) != '' ? objNode.Link.Text4 : '', _getFullImage(objNode.Img.Src)));
                elProdContainer
                  .find('ul.site_loop')
                  .append(
                    tplProdContainer.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      '//a.ecimg.tw/css/2016/style/images/v201607/mobile/v1.9/mobile_loading.svg',
                      objNode.Link.Text,
                      objSetting.Slogan.isActive == 1
                        ? '<div class="hotline">{0}</div>'.format(objNode.Link.Text2)
                        : '',
                      objNode.Link.Text,
                      $.trim(objNode.Link.Text3) != ''
                        ? '<i class="original"><small>$</small>{0}</i>'.format(objNode.Link.Text3)
                        : '',
                      objNode.Link.Text1,
                      objSetting.HitoIcon.isActive == 1 ? '' : '',
                      $.trim(objNode.Link.Text4) != '' ? objNode.Link.Text4 : '',
                      _getFullImage(objNode.Img.Src)
                    )
                  );

                if ($.trim(objNode.Link.Text4) != '') {
                  arrProdMapping.push({
                    id: objNode.Link.Text4,
                    price: objNode.Link.Text1,
                    name: objNode.Link.Text,
                    category: objNode.Link.Text4.substr(0, 4),
                  });
                }
              }
            }
            if (objNode.Link.Url && objNode.Link.Text) {
              if (
                typeof elMenuContainer != 'undefined' &&
                $.inArray(objNode.Id, [6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20]) >= 0
              ) {
                elMenuContainer
                  .find('.menu_list')
                  .append(
                    tplMenuList.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      objSetting.Nodes[objNode.Id].FontColor,
                      objSetting.Nodes[objNode.Id].BackColor,
                      objNode.Link.Text
                    )
                  );
                elMenuMobileContainer
                  .find('#SubMenuMobile ul')
                  .append(
                    tplSubMenuMobile.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      objSetting.Nodes[objNode.Id].FontColor,
                      objSetting.Nodes[objNode.Id].BackColor,
                      objNode.Link.Text
                    )
                  );
              }
            }
            if (objNode.Img.Src) {
              if (typeof elMenuContainer != 'undefined' && objNode.Id == 2) {
                elMenuContainer
                  .find('.head')
                  .append(
                    tplImg.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      _getFullImage(objNode.Img.Src),
                      objNode.Img.Title
                    )
                  );
              }
            }
            if (objNode.Link.Url) {
              if (typeof elVideoContainer != 'undefined') {
                elVideoContainer.find('#YoutubeContainer').attr('src', objNode.Link.Url);
              }
              if (typeof elMenuContainer != 'undefined' && objNode.Id == 5) {
                elMenuContainer
                  .find('.s_main dd:eq(1) a')
                  .attr('href', objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);');
                elMenuMobileContainer
                  .find('#MainNavBarMobile')
                  .append(
                    tplMobileMainNavBar.format(
                      objNode.Link.Url != '' ? objNode.Link.Url : 'javascript:void(0);',
                      objSetting.Nodes[3].FontColor,
                      objSetting.Nodes[3].BackColor
                    )
                  );
              }
            }
            if (typeof elCountdownContainer != 'undefined') {
              if (objNode.Id == 2) {
                if (objNode.ExtraData.Duration.EndTime != '') {
                  elCountdownContainer.append(
                    tplCountdownDesktop.format(_getFullImage(objNode.Img.Src), objNode.Link.Url)
                  );
                  setCountdown(
                    objNode.ExtraData.Duration.EndTime,
                    elCountdownContainer.find('.s_desktop ul')
                  );
                } else {
                  elCountdownContainer.append(
                    tplNoCountdownDesktop.format(_getFullImage(objNode.Img.Src), objNode.Link.Url)
                  );
                }
              } else if (objNode.Id == 3) {
                if (objNode.ExtraData.Duration.EndTime != '') {
                  elCountdownContainer.append(
                    tplCountdownMobile.format(_getFullImage(objNode.Img.Src), objNode.Link.Url)
                  );
                  setCountdown(
                    objNode.ExtraData.Duration.EndTime,
                    elCountdownContainer.find('.s_mobile ul')
                  );
                } else {
                  elCountdownContainer.append(
                    tplNoCountdownMobile.format(_getFullImage(objNode.Img.Src), objNode.Link.Url)
                  );
                }
              }
            }
          });
          if (typeof elMainContainer1 != 'undefined') {
            elMainContainer1.removeClass('unblock');
          }
          if (typeof elMainContainer2 != 'undefined') {
            elMainContainer2.removeClass('unblock');
          }
          if (typeof elMainContainer3 != 'undefined') {
            elMainContainer3.removeClass('unblock');
          }
          if (typeof elBannerContainer != 'undefined') {
            elBannerContainer.removeClass('unblock');
          }
          if (typeof elBrandContainer != 'undefined') {
            elBrandContainer.removeClass('unblock');
          }
          if (typeof elVideoContainer != 'undefined') {
            elVideoContainer.removeClass('unblock');
          }
          if (typeof elBannerFixContainer != 'undefined') {
            elBannerFixContainer.removeClass('unblock');
          }
          if (
            typeof elProdContainer != 'undefined' &&
            elProdContainer.find('ul.site_loop').length > 0
          ) {
            if (objSetting.Slogan.FontColor != null) {
              elProdContainer.find('ul.site_loop span.slogan').css({
                // 'color': objSetting.Slogan.FontColor
              });
            }
            if (objSetting.Slogan.BackColor != null) {
              elProdContainer.find('ul.site_loop span.slogan').css({
                // 'background-color': objSetting.Slogan.BackColor
              });
            }
            if (objSetting.HitoIcon.FontColor != null) {
              elProdContainer.find('ul.site_loop span.sign').css({
                // 'color': objSetting.HitoIcon.FontColor
              });
            }
            if (objSetting.HitoIcon.BackColor != null) {
              elProdContainer.find('ul.site_loop span.sign').css({
                // 'background-color': objSetting.HitoIcon.BackColor
              });
            }
            elProdContainer.removeClass('unblock');
            if (isSyncButtonType == 1 && elProdContainer.find('li[_pid]').length > 0) {
              elProdContainer.find('li[_pid]').each(function () {
                if ($(this).attr('_pid') != '') {
                  arrProdId.push($(this).attr('_pid'));
                }
              });
            }
          }
          if (typeof elActivityContainer != 'undefined') {
            elActivityContainer.removeClass('unblock');
          }
          if (typeof elMenuContainer != 'undefined') {
            elMenuContainer.removeClass('unblock');
          }
          if (typeof elMenuMobileContainer != 'undefined') {
            elMenuMobileContainer.removeClass('unblock');
          }
          if (typeof elCountdownContainer != 'undefined') {
            elCountdownContainer.removeClass('unblock');
          }
        }
      });
      $('#Block30Container')
        .find('.grab_box > div, .grab_box > a, .activity_box > div, .activity_box > a')
        .each(function () {
          if (!$(this).hasClass('unblock')) {
            $('#Block30Container').removeClass('unblock');
          }
        });
      $('#Block87Container')
        .find('.grab_box > div, .grab_box > a, .activity_box > div, .activity_box > a')
        .each(function () {
          if (!$(this).hasClass('unblock')) {
            $('#Block87Container').removeClass('unblock');
          }
        });
      $('#Block837Container')
        .find('.grab_box > div, .grab_box > a')
        .each(function () {
          if (!$(this).hasClass('unblock')) {
            $('#Block837Container').removeClass('unblock');
          }
        });
      $('#Block670Container')
        .find('.brand_body > ul, div.countdown')
        .each(function () {
          if (!$(this).hasClass('unblock')) {
            $('#Block670Container').removeClass('unblock');
          }
        });
      $('#Block671Container')
        .find('.brand_body > ul, div.countdown')
        .each(function () {
          if (!$(this).hasClass('unblock')) {
            $('#Block671Container').removeClass('unblock');
          }
        });
      if ($('.s_mobile .back:visible').length == 0 && !navigator.userAgent.match('PChome_APP')) {
        if ($('#MainSwiperContainer1:visible').length > 0) {
          $('#MainSwiperContainer1').trigger('_setSwiper');
        } else if ($('#MainSwiperContainer2:visible').length > 0) {
          $('#MainSwiperContainer2').trigger('_setSwiper');
        }
        $('#MenuSwiperContainer').trigger('_setSwiper');
        $(
          '[id^=ProdContainer] li, #Block25Container li, #Block27Container li, .prod_img, [id^=MainContainer], [class^=BannerContainer], [id^=BannerFixContainer], [class^=ActivityContainer], [class^=BrandContainer]'
        )
          .find('a')
          .attr('target', '_blank');
      } else {
        if ($('#MobileMainSwiperContainer1:visible').length > 0) {
          $('#MobileMainSwiperContainer1').trigger('_setSwiper');
        } else if ($('#MobileMainSwiperContainer2:visible').length > 0) {
          $('#MobileMainSwiperContainer2').trigger('_setSwiper');
        }
        $(
          '[id^=ProdContainer] li, #Block25Container li, #Block27Container li, .prod_img, [id^=MainContainer], [class^=BannerContainer], [id^=BannerFixContainer], [class^=ActivityContainer], [class^=BrandContainer]'
        )
          .find('a')
          .attr('target', '');
      }
      new Blazy({
        selector: 'img[data-src]',
        loadInvisible: true,
        offset: 50000,
      });
      $(document).trigger('_resizeImg');
      _promise.resolve(arrProdId);
    });
    return _promise;
  };
  $.fn.ShowProdButtonType = function (opt) {
    var _promise = $.Deferred();
    this.each(function () {
      var _this = $(this);
      var arrProdId = opt.ProdId || [];
      var strAction = opt.Action || '';
      if ($.inArray(strAction, ['show', 'update']) == -1) {
        return false;
      }
      if (arrProdId.length > 0) {
        arrProdId = $.unique(arrProdId);
        var i,
          j,
          chunk = 30;
        for (i = 0, j = arrProdId.length; i < j; i += chunk) {
          ecshop.db.prod.button
            .get({
              ver: 'v2',
              Id: arrProdId.slice(i, i + chunk).join(','),
              fields: 'Id,Qty,ButtonType',
              _callback: 'jsonp_block_button',
            })
            .done(function (arrData) {
              if ($.isArray(arrData) && arrData.length > 0) {
                $.each(arrData, function (idx, objProd) {
                  if (objProd.Id.substr(-4) == '-000') {
                    var strBtnTypeTpl = '';
                    switch (objProd.ButtonType) {
                      case 'SoldOut':
                        strBtnTypeTpl = '<span class="invalid s_soldout">已售完</span>';
                        break;
                      case 'NotReady':
                        strBtnTypeTpl = '<span class="invalid s_notyet">尚未開賣</span>';
                        break;
                      case 'OrderRefill':
                        strBtnTypeTpl = '<span class="invalid s_replenish">補貨中</span>';
                        break;
                    }
                    if (strBtnTypeTpl != '') {
                      if (strAction == 'update') {
                        $(
                          '#Block30Container .grab_box, #Block87Container, #Block837Container .grab_box'
                        )
                          .find('li[_pid="' + objProd.Id.substr(0, 16) + '"] .prod_img a span')
                          .remove();
                      }
                      $(
                        '#Block30Container .grab_box, #Block87Container, #Block837Container .grab_box'
                      )
                        .find('li[_pid="' + objProd.Id.substr(0, 16) + '"] .prod_img a')
                        .prepend(strBtnTypeTpl);
                    }
                  }
                });
              }
            });
        }
      }
    });
    return _promise;
  };
  $(document).data('LastModified01M', parseInt(new Date().getTime() / 60000));
  $(document)
    .on('_gtm.product-click', function (e, objProd) {
      try {
        dataLayer.push({
          event: 'product-click',
          ecommerce: {
            click: {
              actionField: {
                list: strId,
              },
              products: [objProd],
            },
          },
        });
        dataLayer.push({
          event: undefined,
          ecommerce: undefined,
        });
      } catch (e) {}
    })
    .on('_gtm.exposure', function (e, arrProd) {
      try {
        var _arrProd = $.extend(true, [], arrProd);
        _arrProd.map(function (obj, idx) {
          obj.list = strId;
          return obj;
        });
        dataLayer.push({
          event: 'exposure',
          ecommerce: {
            impressions: _arrProd,
          },
        });
        dataLayer.push({
          event: undefined,
          ecommerce: undefined,
        });
      } catch (e) {}
    })
    .on('click', '[_pid] a', function (e) {
      var elProd = $(this).parents('[_pid]');
      var strId = $(elProd).attr('_pid');
      if (typeof strId == 'string' && strId.length == 16) {
        if (typeof arrProdMapping !== 'undefined') {
          $.each(arrProdMapping, function (idx, objProd) {
            if (objProd.id === strId) {
              objProd.position = idx + 1;
              $(document).trigger('_gtm.product-click', [objProd]);
            }
          });
        }
      }
    })
    .on('mouseover', '.bar_service li:eq(1)', function (e) {
      $('.bar_service li:eq(1) dd').css({
        display: 'block',
        'z-index': 99,
      });
    })
    .on('mouseout', '.bar_service li:eq(1)', function (e) {
      $('.bar_service li:eq(1) dd').css({
        display: 'none',
        'z-index': 1,
      });
    })
    .on('click', '.ui-toolbar .b-arrow-r, .ui-toolbar .b-arrow-l', function (e) {
      $('.ui-toolbar').toggleClass('s_close');
    })
    .on('click', '.ui-sidepanel .b-arrow-r, .ui-sidepanel .b-arrow-l', function (e) {
      $('.ui-sidepanel').toggleClass('s_close');
    })
    .on('click', '.s_mobile ul.swiper-bar li, #Panel ul.menu_list li', function (e) {
      var strBlockId = $(this).attr('blockid');
      if ($('#Block' + strBlockId + 'Container').length > 0) {
        $('.s_mobile ul.swiper-bar li').removeClass('actived');
        $('.s_mobile ul.swiper-bar')
          .find('li[blockid=' + strBlockId + ']')
          .addClass('actived');
        isScrollAnimate = true;
        $('html, body').animate(
          {
            scrollTop: $('#Block' + strBlockId + 'Container').offset().top - 80 + 'px',
          },
          500,
          function () {
            isScrollAnimate = false;
          }
        );
      }
    })
    .on('click', '#SubNavBarMobile a', function (e) {
      $('#SubMenuMobile, .navbar-mask').toggleClass('unblock');
      $('#SubNavBarMobile').toggleClass('actived');
      $('body').toggleClass('no-scroll');
    })
    .on('click', '#btnBack', function (e) {
      e.preventDefault();
      window.history.go(-1);
    })
    .on('click', '#btnMore, .overlay-lightbox .b-close, .overlay-shadow', function (e) {
      if (!$('.overlay_lightbox').hasClass('unblock')) {
        $('body,html').removeClass('no-scroll');
        $(window).scrollTop(NowScrollTop);
        NowScrollTop = null;
        $('.overlay_lightbox, .overlay-shadow').addClass('unblock');
        $('#YoutubeLightbox iframe').removeAttr('src');
      } else if ($('.overlay-lightbox').hasClass('unblock')) {
        $('.overlay-lightbox, .overlay-shadow').removeClass('unblock');
        NowScrollTop = $(window).scrollTop();
        $('body,html').addClass('no-scroll');
      } else {
        $('body,html').removeClass('no-scroll');
        $(window).scrollTop(NowScrollTop);
        NowScrollTop = null;
        $('.overlay-lightbox, .overlay-shadow').addClass('unblock');
      }
    })
    .on('click', '.overlay_lightbox .b_close', function (e) {
      $('body,html').removeClass('no-scroll');
      $(window).scrollTop(NowScrollTop);
      NowScrollTop = null;
      $('.overlay_lightbox, .overlay-shadow').addClass('unblock');
      $('#YoutubeLightbox iframe').removeAttr('src');
    })
    .on('click', '#btnShare', function (e) {
      e.preventDefault();
      $('.bar-share').toggleClass('actived');
    })
    .on('click', '#btnTop, #btnMobileTop', function (e) {
      e.preventDefault();
      isScrollAnimate = true;
      $('html, body').animate(
        {
          scrollTop: 0 + 'px',
        },
        500,
        function () {
          isScrollAnimate = false;
          $('.s_mobile ul.swiper-bar li').removeClass('actived');
        }
      );
    })
    .on('click', '[_cid]', function (e) {
      var _this = $(this);
      var strSubId = _this.attr('_cid');
      switch (strSubId) {
        case 'facebook':
          window.dataLayer &&
            window.dataLayer.push({
              eventCategory: 'social_link',
              eventAction: 'facebook',
              eventLabel: 'shopping',
              event: 'click-ga',
            });
          break;
        case 'instagram':
          window.dataLayer &&
            window.dataLayer.push({
              eventCategory: 'social_link',
              eventAction: 'instagram',
              eventLabel: 'shopping',
              event: 'click-ga',
            });
          break;
        case 'line':
          window.dataLayer &&
            window.dataLayer.push({
              eventCategory: 'social_link',
              eventAction: 'line',
              eventLabel: 'shopping',
              event: 'click-ga',
            });
          break;
      }
      if (!_this.attr('target') && _this.attr('href')) {
        e.preventDefault();
        setTimeout(function () {
          location.href = _this.attr('href');
        }, 50);
      }
    })
    .on('click', '#shareFaceBook', function (e) {
      e.preventDefault();
      var strURL =
        'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(window.location.toString());
      if (navigator.userAgent.match('PChome_APP')) {
        window.location = strURL + '#AppUrlBlank';
      } else {
        window.open(strURL, '_blank');
      }
    })
    .on('click', '#shareLINE', function (e) {
      e.preventDefault();
      var strText = encodeURIComponent(
        '{0} {1}'.format(document.title, window.location.toString())
      );
      var isApp = navigator.userAgent.match(/PChome_APP_(ios|and)/);
      if (isApp) {
        var strURL =
          isApp[1] == 'ios'
            ? 'line://msg/text/' + strText
            : 'intent://msg/text/' +
              strText +
              '#Intent;scheme=line;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=jp.naver.line.android;end';
        window.location = strURL;
      } else {
        window.open('http://line.me/R/msg/text/?' + strText, '_blank');
      }
    })
    .on('click', '#shareLink', function (e) {
      try {
        $(
          '<div id="CopyContainer">{0} {1}</div>'.format(document.title, window.location.toString())
        ).appendTo('body');
        var eleTmp = document.getElementById('CopyContainer');
        var range = document.createRange();
        range.selectNode(eleTmp);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        if (document.execCommand('copy')) {
          if (!$('#PanelSwiperContainer').hasClass('unblock')) {
            $('.copy_box').css({
              top: '80px',
            });
          } else {
            $('.copy_box').css({
              top: '40px',
            });
          }
          $('.copy_box').removeClass('unblock');
          $('#btnShare').click();
          setTimeout(function () {
            $('.copy_box').slideToggle();
            setTimeout(function () {
              $('.copy_box').removeAttr('style').addClass('unblock');
              if (!$('#PanelSwiperContainer').hasClass('unblock')) {
                $('.copy_box').css({
                  top: '80px',
                });
              } else {
                $('.copy_box').css({
                  top: '40px',
                });
              }
            }, 1000);
          }, 2000);
        }
        window.getSelection().removeAllRanges();
        eleTmp.remove();
      } catch (err) {
        eleTmp.remove();
        alert('不支援複製剪貼簿功能');
      }
    })
    .on('click', '.countdown.s_desktop, .countdown.s_mobile', function (e) {
      e.preventDefault();
      var strURL = $(this).attr('_url');
      if (strURL != '') {
        if (navigator.userAgent.match('PChome_APP') || $('.s_mobile .back:visible').length > 0) {
          window.location = strURL;
        } else {
          window.open(strURL, '_blank');
        }
      }
    })
    .on('click', '#CONTENT a', function (e) {
      e.preventDefault();
      var strURL = $(this).attr('href');
      var strTarget = $(this).attr('target');
      if (strURL) {
        if (strURL.match(/youtube/)) {
          $('.overlay_lightbox, .overlay-shadow').removeClass('unblock');
          NowScrollTop = $(window).scrollTop();
          $(window).scrollTop(0);
          $('body,html').addClass('no-scroll');
          $('#YoutubeLightbox iframe').attr('src', strURL);
        } else if (strURL != 'javascript:void(0);') {
          if (strTarget == '_blank') {
            window.open(strURL, '_blank');
          } else {
            window.location = strURL;
          }
        }
      }
    })
    .on('_setSwiper', '#MainSwiperContainer1', function (e) {
      if ($('#MainSwiperContainer1').find('li.swiper-slide').length > 1) {
        $('#MainSwiperContainer1')
          .find('.swiper-button-next, .swiper-button-prev')
          .removeClass('unblock');
        if ($.trim(MainSwiperContainer1) != '') {
          MainSwiperContainer1.destroy(true, false);
        }
        // MainSwiperContainer1 = new Swiper('#MainSwiperContainer1', {
        //   centeredSlides: true,
        //   loop: true,
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev'
        //   }
        // });
      }
    })
    .on('_setSwiper', '#MainSwiperContainer2', function (e) {
      if ($('#MainSwiperContainer2').find('li.swiper-slide').length > 1) {
        $('#MainSwiperContainer2')
          .find('.swiper-button-next, .swiper-button-prev')
          .removeClass('unblock');
        if ($.trim(MainSwiperContainer2) != '') {
          MainSwiperContainer2.destroy(true, false);
        }
        // MainSwiperContainer2 = new Swiper('#MainSwiperContainer2', {
        //   centeredSlides: true,
        //   loop: true,
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev'
        //   }
        // });
      }
    })
    .on('_setSwiper', '#MobileMainSwiperContainer1', function (e) {
      if ($('#MobileMainSwiperContainer1').find('li.swiper-slide').length > 1) {
        $('#MobileMainSwiperContainer1')
          .find('.swiper-button-next, .swiper-button-prev')
          .removeClass('unblock');
        if ($.trim(MobileMainSwiperContainer1) != '') {
          MobileMainSwiperContainer1.destroy(true, false);
        }
        // MobileMainSwiperContainer1 = new Swiper('#MobileMainSwiperContainer1', {
        //   centeredSlides: true,
        //   loop: true,
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev'
        //   }
        // });
      }
    })
    .on('_setSwiper', '#MobileMainSwiperContainer2', function (e) {
      if ($('#MobileMainSwiperContainer2').find('li.swiper-slide').length > 1) {
        $('#MobileMainSwiperContainer2')
          .find('.swiper-button-next, .swiper-button-prev')
          .removeClass('unblock');
        if ($.trim(MobileMainSwiperContainer2) != '') {
          MobileMainSwiperContainer2.destroy(true, false);
        }
        // MobileMainSwiperContainer2 = new Swiper('#MobileMainSwiperContainer2', {
        //   centeredSlides: true,
        //   loop: true,
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev'
        //   }
        // });
      }
    })
    .on('_setSwiper', '#MenuSwiperContainer', function (e) {
      if ($('#MenuSwiperContainer').find('li.swiper-slide').length > 1) {
        if ($.trim(MenuSwiperContainer) != '') {
          MenuSwiperContainer.destroy(true, false);
        }
        // MenuSwiperContainer = new Swiper('#MenuSwiperContainer', {
        //   centeredSlides: true,
        //   loop: true,
        //   autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   }
        // });
      }
    })
    .on('_setSwiper', '#PanelSwiperContainer', function (e) {
      if ($('#PanelSwiperContainer').find('li.swiper-slide').length > 4) {
        // PanelSwiperContainer = new Swiper('#PanelSwiperContainer', {
        //   slidesPerView: 'auto',
        //   slidesOffsetAfter: 10,
        //   centeredSlides: false,
        //   grabCursor: true,
        //   freeMode: true,
        //   freeModeMomentumRatio: 0.5,
        //   freeModeMomentumVelocityRatio: 0.5
        // });
      }
    })
    .on('_resizeImg', function (e) {
      $('[id^=ProdContainer]:visible')
        .find('.prod_img')
        .each(function () {
          var intImgWidth = $(this).find('img').width();
          if (intImgWidth) {
            $(this).find('img').css({
              height: intImgWidth,
            });
          }
        });
    })
    .on('_reloadBlock', function (e, opt) {
      // var intTime = opt.Time ? opt.Time : 1;
      // if (intTime <= 86400) {
      //   setTimeout(function () {
      //     $.getJSON('//ecapi.pchome.com.tw/server/v1/datetime?_callback=?').done(function (data) {
      //       if (data && data.ServerDTM) {
      //         $(document).data('ServerDTM', data.ServerDTM);
      //         $(document).trigger('_updateBlock');
      //       }
      //     });
      //   }, intTime * 1000);
      // }
    })
    .on('_updateBlock', function (e) {
      // if (typeof AutoReloadBlock != 'undefined' && $.isArray(AutoReloadBlock) && AutoReloadBlock.length > 0) {
      //   var strServerDTM = $(document).data('ServerDTM');
      //   $.each(AutoReloadBlock, function (idx, arrBlock) {
      //     var arrDuration = [];
      //     var objDurationBlock = null;
      //     $.each(arrBlock, function () {
      //       if ($.trim(this.Nodes[0].ExtraData.Duration.StartTime) != '') {
      //         arrDuration.push({
      //           BlockId: this.BlockId,
      //           StartTime: this.Nodes[0].ExtraData.Duration.StartTime
      //         });
      //         if (this.Nodes[0].ExtraData.Duration.StartTime <= strServerDTM && strServerDTM <= this.Nodes[0].ExtraData.Duration.EndTime) {
      //           objDurationBlock = this;
      //         }
      //       }
      //     });
      //     arrDuration.sort(function (a, b) {
      //       return a.StartTime > b.StartTime ? 1 : -1;
      //     });
      //     $.each(arrDuration, function (idx, objDuration) {
      //       if (objDuration.StartTime > strServerDTM) {
      //         var dateStart = new Date(objDuration.StartTime);
      //         var dateNow = new Date(strServerDTM);
      //         var intTimeDiff = Math.floor((dateStart - dateNow) / 1000);
      //         if (typeof $(document).data('intTimeDiff') == 'undefined' || $(document).data('intTimeDiff') != intTimeDiff) {
      //           $(document).data('intTimeDiff', intTimeDiff);
      //           $(document).trigger('_reloadBlock', {
      //             Time: (intTimeDiff + 2)
      //           });
      //         }
      //         return false;
      //       }
      //     });
      //     if (objDurationBlock) {
      //       if ($.inArray(objDurationBlock.BlockId, $(document).data('IndexBlockId')) == -1) {
      //         $.ajax({
      //           url: '/activity/campaign/{0}/data/{1}&{2}'.format(strId, objDurationBlock.BlockId, $(document).data('LastModified01M')),
      //           dataType: 'script',
      //           cache: true
      //         }).done(function (script, textStatus, jqXHR) {
      //           if (typeof (BlockData) != 'undefined' && BlockData != null && $.isArray(BlockData) && BlockData.length > 0) {
      //             $(document).ShowBlock({
      //               BlockData: BlockData,
      //               Action: 'update'
      //             }).done(function (arrProdId) {
      //               $(document).ShowProdButtonType({
      //                 ProdId: arrProdId,
      //                 Action: 'update'
      //               });
      //             });
      //           }
      //         });
      //       }
      //     }
      //   });
      // }
    })
    .on('_show', function (e) {
      $(document).data('IndexBlockId', []);
      if (typeof IndexBlock != 'undefined') {
        $(document).data('BlockSetting', []);
        $.each(BlockSetting, function (idx, objSetting) {
          var arrBlockNodeSetting = [];
          if (
            $.inArray(
              parseInt(objSetting.BlockId),
              [144, 357, 358, 359, 360, 3, 367, 148, 368, 150, 369, 152, 370, 154, 371]
            ) >= 0
          ) {
            $.each(objSetting.Nodes, function (idx, objNodeSetting) {
              arrBlockNodeSetting[objNodeSetting.Id] = objNodeSetting;
            });
            objSetting.Nodes = arrBlockNodeSetting;
          }
          $(document).data('BlockSetting')['Block_' + objSetting.BlockId] = objSetting;
        });
        $(document)
          .ShowBlock({
            BlockData: IndexBlock,
            Action: 'show',
          })
          .done(function (arrProdId) {
            $(document).ShowProdButtonType({
              ProdId: arrProdId,
              Action: 'show',
            });
          });
      }
      $(window).trigger('resize');
    })
    .ready(function () {
      $.each($('.s_mobile ul.swiper-bar li'), function (idx, elLi) {
        arrSwiperBlockId.push($(elLi).attr('blockid'));
      });
      if ($('.s_mobile ul.swiper-bar li').length > 0) {
        $('.s_mobile ul.swiper-bar').parent('.ui-panel').removeClass('unblock');
        $('.layout-center').removeClass('no-panel');
        $('#PanelSwiperContainer').trigger('_setSwiper');
      }
      if ($('.overlay-lightbox ul.list_box').find('li').length > 0) {
        $('#btnMore').parent('li').removeClass('unblock');
      }
      $('#WRAPPER').show(0);
      $('.bar_service li:eq(1)').css({
        cursor: 'pointer',
      });
      var dfdServerDTM = $.Deferred();
      // if ($.isArray(AutoReloadBlock) && AutoReloadBlock.length > 0) {
      $.getJSON('//ecapi.pchome.com.tw/server/v1/datetime?_callback=?').done(function (data) {
        dfdServerDTM.resolve(data);
      });
      // } else {
      //   dfdServerDTM.resolve({});
      // }
      dfdServerDTM.done(function (objServerDTM) {
        var strServerDTM =
          typeof objServerDTM.ServerDTM != 'undefined' ? objServerDTM.ServerDTM : null;
        $(document).data('ServerDTM', strServerDTM);
        $(document).trigger('_show').trigger('_updateBlock');
      });
      if ($(window).scrollTop() == 0) window.scrollTo(0, 1);
      if (navigator.userAgent.match('PChome_APP')) {
        var matches = navigator.userAgent.match(/PChome_APP_(\w+)_(.+)/);
        var _strOSType = matches ? matches[1] : '';
        var _strAppVer = matches ? matches[2] : '';
        if (_strAppVer && _versionCompare(_strAppVer, '3.0.0') < 0) {
          $('#HEADER.s_mobile .block_H').removeClass('unblock');
          $('.layout-center').removeClass('no-header');
        } else {
          $('#HEADER.s_mobile .block_H').addClass('unblock');
          $('.layout-center').addClass('no-header');
        }
        $('a[target=_blank]').each(function () {
          var _href = $(this).attr('href');
          if (_href.indexOf('#AppUrlBlank') == -1) {
            $(this).attr('href', _href.trim() + '#AppUrlBlank');
          }
        });
      } else {
        $('#HEADER.s_mobile .block_H').removeClass('unblock');
        $('.layout-center').removeClass('no-header');
      }
      if (
        navigator.userAgent.match(/PChome_APP_ios_.*/) &&
        typeof window.webkit == 'object' &&
        typeof window.webkit.messageHandlers == 'object' &&
        typeof window.webkit.messageHandlers.WebCallApp == 'object' &&
        typeof window.webkit.messageHandlers.WebCallApp.postMessage == 'function'
      ) {
        window.webkit.messageHandlers.WebCallApp.postMessage(
          '{"func":"iosTabbarShow", "input":"hiddenAndResetFrame"}'
        );
      }
    });
  $(window)
    .on('resize', function (e) {
      if ($('.s_mobile .back:visible').length == 0 && !navigator.userAgent.match('PChome_APP')) {
        if ($('#MainSwiperContainer1:visible').length > 0) {
          $('#MainSwiperContainer1').trigger('_setSwiper');
        } else if ($('#MainSwiperContainer2:visible').length > 0) {
          $('#MainSwiperContainer2').trigger('_setSwiper');
        }
        $('#MenuSwiperContainer').trigger('_setSwiper');
        $(
          '[id^=ProdContainer] li, #Block25Container li, #Block27Container li, .prod_img, [id^=MainContainer], [class^=BannerContainer], [id^=BannerFixContainer], [class^=ActivityContainer], [class^=BrandContainer]'
        )
          .find('a')
          .attr('target', '_blank');
      } else {
        if ($('#MobileMainSwiperContainer1:visible').length > 0) {
          $('#MobileMainSwiperContainer1').trigger('_setSwiper');
        } else if ($('#MobileMainSwiperContainer2:visible').length > 0) {
          $('#MobileMainSwiperContainer2').trigger('_setSwiper');
        }
        $(
          '[id^=ProdContainer] li, #Block25Container li, #Block27Container li, .prod_img, [id^=MainContainer], [class^=BannerContainer], [id^=BannerFixContainer], [class^=ActivityContainer], [class^=BrandContainer]'
        )
          .find('a')
          .attr('target', '');
      }
      if ($(window).width() < 932 + 120 * 2) {
        $('.ui-toolbar, .ui-sidepanel').addClass('s_close');
      } else {
        $('.ui-toolbar, .ui-sidepanel').removeClass('s_close');
      }
      setTimeout(function () {
        $(document).trigger('_resizeImg');
      }, 200);
    })
    .on('scroll', function (e) {
      $(window).scrollTop() >= 50
        ? $('#btnMobileTop').fadeIn().show()
        : $('#btnMobileTop').fadeOut().hide();
      if (!isScrollAnimate) {
        if (
          typeof arrSwiperBlockId[0] != 'undefined' &&
          $(window).scrollTop() >= $('#Block' + arrSwiperBlockId[0] + 'Container').offset().top - 80
        ) {
          var strMaxBlockIndex = arrSwiperBlockId.length - 1;
          $.each(arrSwiperBlockId, function (idx, strBlockId) {
            var strNextIndex = idx == strMaxBlockIndex ? strMaxBlockIndex : idx + 1;
            var strThisBlockScrollTop = $('#Block' + strBlockId + 'Container').offset().top - 85;
            var strNextBlockScrollTop =
              $('#Block' + arrSwiperBlockId[strNextIndex] + 'Container').offset().top - 85;
            if ($(window).scrollTop() >= strThisBlockScrollTop) {
              if (idx == strMaxBlockIndex) {
                $('.s_mobile ul.swiper-bar li').removeClass('actived');
                $('.s_mobile ul.swiper-bar')
                  .find('li[blockid=' + strBlockId + ']')
                  .addClass('actived');
                return;
              } else if ($(window).scrollTop() < strNextBlockScrollTop) {
                $('.s_mobile ul.swiper-bar li').removeClass('actived');
                $('.s_mobile ul.swiper-bar')
                  .find('li[blockid=' + strBlockId + ']')
                  .addClass('actived');
                return;
              }
            }
          });
        } else {
          $('.s_mobile ul.swiper-bar li').removeClass('actived');
        }
      }
    })
    .load(function () {
      if (window.location.hostname.match(/shopping/)) {
        window.dataLayer &&
          window.dataLayer.push({
            event: 'custom.event.pageview',
          });
        if (typeof arrProdMapping !== 'undefined') {
          var arrProducts = [];
          var intExposureLength = 1000;
          $.each(arrProdMapping, function (idx, objProd) {
            objProd.position = idx + 1;
            arrProducts.push(objProd);
            intExposureLength += 90 + encodeURIComponent(objProd.name).length;
            if (intExposureLength > 8000) {
              $(document).trigger('_gtm.exposure', [arrProducts]);
              arrProducts = [];
              intExposureLength = 1000;
            }
          });
          if (arrProducts.length > 0) {
            $(document).trigger('_gtm.exposure', [arrProducts]);
          }
        }
        var strDevice = 'pc';
        if (navigator.userAgent.match('PChome_APP')) {
          strDevice = 'mbe';
        } else if ($('.s_mobile .back:visible').length > 0) {
          strDevice = 'mb';
        }
        $.getScript(
          'https://libs.pcloud.tw/js/current/venraaspt.min.js?_=' +
            Math.floor(new Date().getTime() / 86400000)
        ).done(function (data) {
          venraas &&
            venraas.init({
              domainName: '.pchome.com.tw',
              token: 'JeFbL9ypvv',
            });
          venraas &&
            venraas.tracking('pageload|create', {
              uid: getCookie('X') || null,
              cc_session: null,
              cc_guid: null,
              categ_le: null,
              categ_code: null,
              gid: null,
              from_rec: null,
              page_type: 'edm',
              device: strDevice,
              web: null,
            });
        });
      }
    });
});
