window.onload = function()
{
	var input = document.querySelector("input");
	var buttonAdd = document.querySelector("button.add_button");
	var list = document.querySelector("ul");

	
	buttonAdd.addEventListener('click', function () {
		var value = input.value;
		if(value) {
			var newLi = document.createElement("li");
			newLi.textContent = value;
			newLi.appendChild(createDelButton());
			list.appendChild(newLi);
			input.value = "";
		}
	});
	
	var createDelButton = function() {
		var delButton = document.createElement("button");
		delButton.id = "remove";
		delButton.textContent = "Delete";
		delButton.addEventListener('click', removeElement, event);
		return delButton;
	}
	
	var removeElement = function(event) {
		var elementToRemove = RemovedLiElement(event.target);
		list.removeChild(elementToRemove);
		console.log("");
	}
	
	var RemovedLiElement = function(Element) {
		var tempElement = Element
		while(tempElement.tagName != "LI") {
			tempElement = tempElement.parentNode;
		}
		return tempElement;
	}
	
};
