window.addEventListener('DOMContentLoaded', function () {
	var store = new UAM.Store();
	var inputView = new UAM.InputView(document.querySelector('#inputDiv'));
	var listView = new UAM.ListView(document.querySelector('#listUl'));
	var footerView = new UAM.FooterView(document.querySelector('#footDiv'));
	new InputCtrl(inputView, store);
	new ListCtrl(listView, store);
	new FooterCtrl(footerView, store);
});
