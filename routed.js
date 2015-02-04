! function() {
    'use strict';

    var ctxes = []
    var evt = 'hashchange'
    var lts = []


    function dispatcher(e) {

    }

    function Context(opt) {
        this.type = opt.type // boot | route | forward | back
    }

    function R(ob) {
        lts.push(ob)
    }

    R.back = function() {

    }
    R.forward = function() {

    }
    R.route = function() {

    }

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
        if (typeof module !== 'undefined' && module.exports) exports = module.exports = R

        exports.Routed = R
    } else this.Routed = R

}();
