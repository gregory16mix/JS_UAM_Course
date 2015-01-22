UAM.Http = {
	request: function (url, method, requestData, callback) {
		var httpRequest = new XMLHttpRequest();

		httpRequest.onreadystatechange = function handleResult () {
			if (httpRequest.readyState !== 4 ) {
				return;
			}

			var err = false;

			if (200 <= httpRequest.status && httpRequest.status < 300) {
				var data = JSON.parse(httpRequest.responseText);
				callback(err,data);
			} else {
				err = true;
				callback(err,data);
			}

		}

		httpRequest.open(method, url);
		if(method === "POST") {
			httpRequest.setRequestHeader("Content-Type", "application/json");
			httpRequest.send(requestData);
		} else {
			httpRequest.send();
		}
	}
};
