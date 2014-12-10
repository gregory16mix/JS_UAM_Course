UAM.Store = function () {
	UAM.EventEmitter.call(this); // przypisanie do store funkcji event emitera
	this.data = []; 
	this.selectedData = [];
	this.add = function (data,ele) {
		this.data.push(ele);
		this.emit("ElementWasAdd",this.data);
	};
	this.add.bind(this); //przypisanie kontekstu do funkcji aby mógł zostać wykonany emit - add funkcja z control
	//true gdy element zostal dodany, false gdy usuniety
	this.checkElements = function(element) {
		if(this.selectedData.indexOf(element) < 0) {
			this.selectedData.push(element); //dodanie elementu do kolekcji
			return true;
		} else {
			this.selectedData.splice(this.selectedData.indexOf(element),1); //usuniecie elementu z kolekcji danych
			return false;
		}
	};
	this.checkElements.bind(this);
};

UAM.utils.inherits(UAM.EventEmitter, UAM.Store);
UAM.Store.prototype.update = function (id, data) {};
