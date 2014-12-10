ListCtrl = function (listView,footerView,store) {
	var addElementToList = function(ele) {
		listView.addNewElementToList(listView.list,ele);
		store.add(store.data,ele);
	};
	
	var updateFooter = function(data) {
		footerView.updateAllItems(data);
	};

	var updateFooterSelectedItems = function(ele) {
		if(store.checkElements(ele)) {
			ele.className = ele.className + "active_element";
		} else {
			ele.className = ele.className.replace("active_element","");
	}
	footerView.updateActiveItems(store.selectedData.length);
	};

	listView.on("addingElement",addElementToList);
	listView.on("updateFooterSelectedItems",updateFooterSelectedItems);
	store.on("ElementWasAdd",updateFooter);
};

FooterCtrl = function (footerView,store) {
	var update = function() {
		footerView.updateActiveItems(store.selectedData.length);
	};
	footerView.on("updateFooterSelectedItems",update);
};

InputCtrl = function (inputView, listView, footerView, store) {
	var add = function(ele) {
		listView.add(ele);
	};
	inputView.on("addNewElementToList",add);
};
