(function (global) {

    if (!global.UAM) {
        global.UAM = {};
    }


    EE = function () {
        //store the listeners somewhere
        this.listeners = {};
    };
    //EE.listeners = {};
    EE.prototype.on = function (eventName, listener, context) {

        if(!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        var currentListener = {
            func: listener,
            ctx: context || window
        };

        this.listeners[eventName].push(currentListener);
        var scope = this;
        return function() {
            var idx = scope.listeners[eventName].indexOf(currentListener);
            if(idx !== -1) {
                scope.listeners[eventName].splice(idx,1);
            }
        }

    };

    EE.prototype.emit = function (eventName) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.listeners[eventName].forEach(function (data) {
            data.func.apply(data.ctx,args);
        });

    };

    global.UAM.EventEmitter = EE;

}(window));