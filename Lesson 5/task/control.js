UAM.FooterView = function (footerView) {
	UAM.EventEmitter.call(this);
	this.allElements = 0;
	this.activeItems = 0;
	this.updateFooterView = function() {
		footerView.textContent = this.activeItems + '/' + this.allElements;
	}
	this.updateFooterView.bind(this);
	this.updateFooterView();
	this.updateAllItems = function(data) {
		this.allElements = data.length;
		this.updateFooterView();
	};
	this.updateActiveItems = function(activeItems) {
		this.activeItems = activeItems;
		this.updateFooterView();
	}
};
UAM.utils.inherits(UAM.EventEmitter, UAM.FooterView);

UAM.InputView = function (inputView) {
	UAM.EventEmitter.call(this);
	this.addButton = document.querySelector('#button');
	this.inputEle = document.querySelector('#inputValue');
	this.add = function() {
		var contentEle = this.inputEle.value;
		if(contentEle) {
			var liEle = document.createElement("li");
			liEle.textContent = contentEle;
			this.inputEle.value = "";
			this.emit("addNewElementToList",liEle);
		}
	};
	this.addButton.addEventListener("click",this.add.bind(this));
};
UAM.utils.inherits(UAM.EventEmitter, UAM.InputView);

UAM.ListView = function (listView) {
	UAM.EventEmitter.call(this);
	this.list = listView;
	this.add = function(ele) {
		this.emit("addingElement",ele); //Dodawanie elementu do listy, event przekazywany do ListCtrl
	}

	this.add.bind(this);
	this.clickInEle = function(event) {
		var clickedEle = event.target;
		while(clickedEle.tagName !== "LI") {
			clickedEle = clickedEle.parent;
		}
		this.emit("updateFooterSelectedItems",clickedEle);
	};
	this.list.addEventListener("click",this.clickInEle.bind(this)); //Klikniecie w element listy
};
UAM.utils.inherits(UAM.EventEmitter, UAM.ListView);

UAM.ListView.prototype.addNewElementToList = function (list,ele) {
	list.appendChild(ele);
};