(function (global) {
	var EE;

	if (!global.UAM) {
		global.UAM = {};
	}

EE = function () {
        // store the listeners somewhere
        // there can be more than one event with same name
        // listeners[eventNames][actualEvents]
        this.listeners = Array();
    };

    EE.prototype.on = function (eventName, listener, context) {
        
        if (this.listeners[eventName] == undefined) {
            this.listeners[eventName] = Array();
		}
        
		//dodanie funkcji listenera do tablicy
        var eventFunc = listener.bind(context);
        this.listeners[eventName].push(eventFunc);
        
		//usunięcie event z tablicy
        var removeArray = this.listeners[eventName];
        
        return function () {            
            for (i = 0; i < removeArray.length; i++) {
                if (removeArray[i] == eventFunc) {
                    removeArray.splice(i, 1);
                }
            }
        };
    };
    
    EE.prototype.emit = function (eventName) {
        //podpowiedział kolega 
        var argumenty = Array.prototype.slice.call(arguments, 0);
        
        argumenty.shift(); //usuwa pierwszy argument z listy

		// dla każdego eventu o zadanej nazwie, dodaj argument
        for (i = 0; i < this.listeners[eventName].length; i++) {
            this.listeners[eventName][i].apply(this, argumenty);
        }
    };

//	var ee = new EE();
//
//	var removeListener = ee.on('test', function (arg1, arg2) {
//		console.log(arg1, arg2, this.key);
//	}, { key: 'value' });
//
//	ee.emit('test', 1, 2); // 1, 2 value
//
//	removeListener(); //removes my listener from the event emitter;
//
//	ee.emit('test'); //nothing will execute

	global.UAM.EventEmitter = EE;

}(window));
