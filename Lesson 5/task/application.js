window.addEventListener('DOMContentLoaded', function () {
	var store = new UAM.Store();
	var inputView = new UAM.InputView(document.querySelector('#inputContener'));
	var listView = new UAM.ListView(document.querySelector('#list_contener'));
	var footerView = new UAM.FooterView(document.querySelector('#footerContener'));
	new InputCtrl(inputView, listView, store);
	new ListCtrl(listView, footerView, store);
	new FooterCtrl(footerView, store);
});

