UAM.Store = function () {
	UAM.EventEmitter.call(this);
	this.dane  = [];
	this.selectedEle = [];
};

UAM.utils.inherits(UAM.EventEmitter, UAM.Store);
 
UAM.Store.prototype.addEleToStore = function (ele) {
	this.dane.push(ele);
	this.emit("elementAdded",ele);
};

UAM.Store.prototype.checkEle = function(ele) {
	if(this.selectedEle.indexOf(ele) < 0) {
		this.selectedEle.push(ele);
		return true;
	} else {
		this.selectedEle.splice(this.selectedEle.indexOf(ele),1);
		return false;
	}
};

UAM.Store.prototype.updateFooter = function (ele) {
	var isEleActive = this.checkEle(ele);
	this.emit("elementChecked",isEleActive,ele);
	this.emit("updateFooterView");
};

