! function() {
    'use strict';

    var ctxes = []
    var evt = 'hashchange'
    var lts = []

    /**
     *  e.g: http://github.com#profile ==> #profile
     */
    function hashFromUrl(url) {
        return (url || '').split('#')[0]
    }

    function emit(ctx) {
        for (var i = 0; i < lts.length; i++) {
            lts(ctx)
        }
    }

    /**
     *  call when hashchange trigger
     */
    function dispatcher(e) {
        var pre = hashFromUrl(e.oldURL)
        var next = hashFromUrl(e.newURL)
        var ctx = ctxes.pop()

        emit(ctx)
        // validate
        // if (ctx && ctx.pre === pre) {}
    }

    function Context(opt) {
        this.type = opt.type // boot | route | forward | back
    }

    function R(ob) {
        lts.push(ob)
    }

    function createCtx(type, next) {
        return function () {
            var ctx = new Context({
                type: 'back',
                pre: window.location.hash.slice(1)
            })
            ctxes.push(ctx)
            next.apply(this, arguments)
        }
    }
    R.back = createCtx('back', function () {
        history.back()
    })
    R.forward = createCtx('forward', function () {
        history.forward()
    })
    R.route = createCtx('route', function (path) {
        window.location.hash = path
    })

    /**
     *  hook to native method
     */
    var natb = window.history.back
    var natf = window.history.forward

    window.history.back = function() {}
    window.history.forward = function() {}


    window.addEventListener ? window.addEventListener(evt, dispatcher, false) : win.attachEvent('on' + evt, dispatcher)


    // AMD/CMD/node/bang
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) module.exports = R
        else exports.Routed = R
    } else this.Routed = R
}();
