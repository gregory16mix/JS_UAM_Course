
InputCtrl = function (inputView, store) {

    var addEleToStore = function(ele) {
        store.addEleToStore(ele);
    };
	
    inputView.on("addElement",addEleToStore);
};

ListCtrl = function (listView, store) {

    var getCB = function (err, response) {
		console.log(response);
		var newEle = document.createElement("li");
		newEle.textContent = response[0].key;
		store.addEleToStore(newEle);
    };
	
    var getDataFromServer = function() {
        UAM.Http.request('/api/todos', 'GET',null,getCB);
    };
 
    var addEleToList = function(ele) {
        var array = JSON.stringify(
            [
                {
                    key: ele.textContent
                }
            ]
        );

        var postCB = function(err, response) {
			listView.addElement(ele);
			setTimeout(function() {UAM.Messages.clear();},1500);
        };
        UAM.Http.request('/api/todos', 'POST',array,postCB);
    };

    var updateFooter = function(ele) {
        store.updateFooter(ele);
    };

    var updateActiveEle = function(active,ele) {
        listView.toogleEle(active,ele);
    };
	
    getDataFromServer();
    store.on("elementAdded", addEleToList);
    store.on("elementChecked",updateActiveEle);
    listView.on("updateFooterCounters", updateFooter);
};

FooterCtrl = function (footerView,store) {

    var update = function() {
        footerView.updateSelectEle(store.selectedEle.length);
    };

    var updateAllEleOnFooter = function() {
        footerView.updateAllEle(store.dane.length);
    };
	
    store.on("elementAdded",updateAllEleOnFooter);
	store.on("updateFooterView",update);
};
