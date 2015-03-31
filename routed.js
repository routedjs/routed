/** Routed v0.0.2 by switer **/
! function() {
    'use strict';

    var his = window.history
    var loc = window.location
    var ctxes = [] // Context queue
    var lts = [] // Routed listeners
    var mds = [] // Middlewares
    var evt = 'hashchange'
    var current // Save last context

    /**
     *  Route action type
     */
    var T_BOOT = 'boot'
    var T_MANUAL = 'manual'
    var T_ROUTE = 'route'
    var T_REPLACE = 'replace'
    var T_UNKNOW = 'unknow'
    // var T_BACK = 'back'
    // var T_FORWARD = 'forward'

    /**
     *  private state
     */
    var inited = 0


    /**
     *  Will be called when the first time to call "Routed(observers)"
     */
    function boot() {
        inited = 1
        bindCtx(T_BOOT, function(ctx) {
            ctx.next = hash()
            ctx.curr = ''
            ctx.prev = ''
            dispatch({
                newURL: loc.href
            })
        })()
    }

    /**
     *  Routed API Method
     *  @param ob <Function> "ob" will be called when boot or hash has change
     */
    function R(ob) {
        lts.push(ob)
        if (!inited) boot()
    }
    /**
     *  e.g: http://github.com#profile ==> #profile
     */
    function hashFromUrl(url) {
        return /#/.test(url)? url.split('#')[1] || '' : url
    }
    /**
     *  Remove the start '#' char of hash string
     */
    function hash() {
        return loc.hash.replace(/^#/, '')
    }
    /**
     *  Emit all routed listener
     */
    function emit(ctx) {
        for (var i = 0; i < lts.length; i++) {
            lts[i].call(ctx, ctx)
        }
    }
    /**
     *  Call middleware in sequence and return the final result
     */
    function middleware(r) {
        var result
        for (var i = 0; i < mds.length; i++) {
            result = mds[i](r)
            if (result === false) break
        }
        return result
    }

    function validate(ctx, n, p) {
        return ctx.curr === p && ctx.next === n
    }

    /**
     *  Call when hashchange trigger or initial boot
     */
    function dispatch(e) {
        var prev = hashFromUrl(e.oldURL)
        var next = hashFromUrl(e.newURL)
        var ctx = ctxes[0]
        var legal

        if (!ctx || !(legal = validate(ctx, next, prev))) {
            ctx = new Context({
                type: T_MANUAL, // route without hook through this branch
                prev: prev
            })
        }
        ctx && legal && ctxes.shift()
        ctx.path = next
        delete ctx.next
        delete ctx.curr
        
        current = ctx
        // if any middleware return false, will stop call emit
        if (middleware(ctx) !== false) emit(ctx)
    }

    function Context(opt) {
        this.type = opt.type // boot | route | manual | replace
        this.prev = opt.prev
    }

    /**
     *  Push the context instance to the queue for next dispatch handler to get it
     */
    function bindCtx(t, next) {
        return function() {
            var ctx = new Context({
                type: t,
                prev: hash()
            })
            ctxes.push(ctx)
            var args = [].slice.call(arguments)
            args.unshift(ctx)
            next.apply(this, args)
        }
    }
    R.current = function () {
        return current || middleware({
            type: T_UNKNOW,
            prev: null,
            path: hash()
        })
    }
    R.use = function(md) {
        mds.push(md)
    }

    /**
     *  Need hook to native method
     */
    var ntb = his.back
    var ntf = his.forward
    R.back = his.back = function() {
        ntb.apply(his, arguments)
    }
    R.forward = his.forward = function() {
        ntf.apply(his, arguments)
    }
    R.route = bindCtx(T_ROUTE, function(ctx, p) {
        p = hashFromUrl(p)
        ctx.next = p
        ctx.curr = hash()
        loc.hash = p
    })
    /**
     *  Cannot assign 'replace' of 'Location' in no-inline script
     *  Please use `location.replace = Routed.replace` in inline script
     */
    var ntr = loc.replace
    R.replace = bindCtx(T_REPLACE, function(ctx, p) {
        p = hashFromUrl(p)
        ctx.next = p
        ctx.curr = hash()
        ntr.call(loc, '#' + p)
    })
    /**
     *  Support IE
     */
    window.addEventListener ? window.addEventListener(evt, dispatch, false) : window.attachEvent('on' + evt, dispatch)

    /**
     *  Global namespace is "Routed"
     */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) module.exports = R
        else exports.Routed = R
    } else window.Routed = R

}();