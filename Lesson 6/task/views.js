/////////////////////////////////////////////////////////////////////////////////////////
//	InputView	InputView	InputView	InputView	InputView	InputView	InputView	
UAM.InputView = function (inputView) {
    UAM.EventEmitter.call(this);

    this.addButton = document.querySelector('#inputBatton');
    this.inputEle = document.querySelector('#inputValue');

    var add = function() {
        var value = this.inputEle.value;
		//weryfikacja zawartosci zmiennej!
        if(value) { 
            var newLiEle = document.createElement("li");
			//dodanie wartosci na strone
            newLiEle.textContent = value;
            this.emit("addElement",newLiEle);
        }
    };
    this.addButton.addEventListener("click",add.bind(this));
};
//zachowanie lancucha prototypowego
UAM.utils.inherits(UAM.EventEmitter, UAM.InputView);

/////////////////////////////////////////////////////////////////////////////////////////
// ListView		ListView		ListView		ListView		ListView		ListView	
UAM.ListView = function (listView) {
	//przypisanie kontektu
    UAM.EventEmitter.call(this);
    this.list = listView;

    this.eleClicked = function(event) {
        var clickedEle = event.target;
        if(clickedEle.tagName !== undefined) {
            while(clickedEle.tagName !== "LI") {
                clickedEle = clickedEle.parent;
            }
            this.emit("updateFooterCounters",clickedEle);
        }
    };
    this.list.addEventListener("click",this.eleClicked.bind(this)); //Klikniecie w element listy
};

UAM.utils.inherits(UAM.EventEmitter, UAM.ListView);

//dodanie ele do listy na ekranie
UAM.ListView.prototype.addElement = function (ele) {
    this.list.appendChild(ele);
};
//zmiana widoku zaznaczonego elementu
UAM.ListView.prototype.toogleEle = function(eleAdded,ele) {
  if(eleAdded) {
    ele.className = ele.className + " active_ele";
  } else {
    ele.className = ele.className.replace("active_ele","");
  }
};

/////////////////////////////////////////////////////////////////////////////////////////
// footerView		footerView		footerView		footerView		footerView
UAM.FooterView = function (footerView) {
    UAM.EventEmitter.call(this);
    this.sumEle = 0;
    this.selectEle = 0;

    this.updateFooter = function() {
        footerView.textContent = 'Wykonano ' + this.selectEle + ' z ' + this.sumEle + ' zadań.';
    };

    this.updateFooter();
};

UAM.utils.inherits(UAM.EventEmitter, UAM.FooterView);

UAM.FooterView.prototype.updateSelectEle = function (selectEle) {
    this.selectEle = selectEle;
    this.updateFooter();
};

UAM.FooterView.prototype.updateAllEle = function (allEle) {
    this.sumEle = allEle;
    this.updateFooter();
};
