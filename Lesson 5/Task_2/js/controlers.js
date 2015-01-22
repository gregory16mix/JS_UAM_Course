InputCtrl = function (inputView, store) {

    var add = function(element) {
        store.add(element);

    };
    inputView.on("addElement",add);

};

ListCtrl = function (listView, store) {

    var getCallback = function (err, response) {
        if (err) {
            UAM.Messages.newMessage("Something went wrong. Error: " + err);
            setTimeout(function() {UAM.Messages.clear();},15000);
        } else {
            console.log(response);
            var newElement = document.createElement("li");
            newElement.textContent = response[0].key;
            store.add(newElement);
        }
    };

    var getDataFromServer = function() {
        UAM.Http.request('/api/todos', 'GET',null,getCallback);
    };

    getDataFromServer();

    var addElementToList = function(el) {
        var array = JSON.stringify(
            [
                {
                    key: el.textContent
                }
            ]
        );

        var postCallback = function(err, response) {
            if (err) {
                UAM.Messages.newMessage("Something went wrong. Error: " + err);
                setTimeout(function() {UAM.Messages.clear();},15000);
            } else {
                listView.addElement(el);
                UAM.Messages.newMessage("Element added");
                setTimeout(function() {UAM.Messages.clear();},1500);
            }
        };

        UAM.Http.request('/api/todos', 'POST',array,postCallback);
        UAM.Messages.newMessage("Adding new element");

    };

    var updateFooter = function(element) {
        store.updateFooter(element);
    };

    var updateActiveElement = function(active,element) {
        listView.toogleElement(active,element);
    };

    store.on("elementAdded", addElementToList);
    store.on("elementChecked",updateActiveElement);
    listView.on("updateFooterSelectedItems", updateFooter);

};


FooterCtrl = function (footerView,store) {

    var update = function() {
        footerView.updateSelectedItems(store.selectedItems.length);
    };
    store.on("updateFooterView",update);

    var updateAllItemsOnFooter = function() {
        footerView.updateAllItems(store.data.length);
    };
    store.on("elementAdded",updateAllItemsOnFooter);
};
