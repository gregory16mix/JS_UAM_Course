<!-- InputView -->
UAM.InputView = function (inputView) {
    UAM.EventEmitter.call(this);

    this.buttonAdd = document.querySelector('#btn');
    this.inputElement = document.querySelector('#inputValue');

    var add = function() {
        var content = this.inputElement.value;
        if(content) {
            var liElement = document.createElement("li");
            liElement.textContent = content;
            this.inputElement.value = "";
            this.emit("addElement",liElement);
        }
    };

    this.buttonAdd.addEventListener("click",add.bind(this));
};

UAM.utils.inherits(UAM.EventEmitter, UAM.InputView);

<!-- ListView -->
UAM.ListView = function (listView) {

    UAM.EventEmitter.call(this);
    this.list = listView;

    this.elementClicked = function(event) {
        var clickedElement = event.target;
        if(clickedElement.tagName !== undefined) {
            while(clickedElement.tagName !== "LI") {
                clickedElement = clickedElement.parent;
            }
            this.emit("updateFooterSelectedItems",clickedElement);
        }
    };

    this.list.addEventListener("click",this.elementClicked.bind(this)); //Klikniecie w element listy
};

UAM.utils.inherits(UAM.EventEmitter, UAM.ListView);

UAM.ListView.prototype.addElement = function (element) {
    this.list.appendChild(element);
};

UAM.ListView.prototype.toogleElement = function(elementAdded,element) {
  if(elementAdded) {
    element.className = element.className + " active_element";
  } else {
    element.className = element.className.replace("active_element","");
  }
};

<!-- FooterView -->
UAM.FooterView = function (footerView) {
    UAM.EventEmitter.call(this);
    this.allElements = 0;
    this.selectedItems = 0;

    this.updateFooterView = function() {
        footerView.textContent = this.selectedItems + '/' + this.allElements;
    };

    this.updateFooterView();
};

UAM.utils.inherits(UAM.EventEmitter, UAM.FooterView);

UAM.FooterView.prototype.updateSelectedItems = function (selectedItems) {
    this.selectedItems = selectedItems;
    this.updateFooterView();
};

UAM.FooterView.prototype.updateAllItems = function (allItems) {
    this.allElements = allItems;
    this.updateFooterView();
};