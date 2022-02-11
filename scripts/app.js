"use strict";

// DOM manipulation helper functions
// 1. Create Element (element, classnames, parent, atrivbutes)
const create = (element, classNames, parentEl, attributesObj) => {
	let htmlElement = document.createElement(element);

	typeof classNames == "string"
		? htmlElement.classList.add(classNames)
		: classNames.forEach((classs) => {
				htmlElement.classList.add(classs);
		  });

	parentEl && parentEl.appendChild(htmlElement);

	if (attributesObj) {
		for (const [attr, val] of Object.entries(attributesObj)) {
			const htmlAttribute = document.createAttribute(attr);
			htmlAttribute.value = val;
			htmlElement.setAttributeNode(htmlAttribute);
		}
	}
	return htmlElement;
};

// 2. Select Elements
const select = (element, all = false) => {
	if (all) {
		return [...document.querySelectorAll(element)];
	} else {
		return document.querySelector(element);
	}
};

// 3. Add Event Listeners to Elements
const on = (type, element, handler, all = false) => {
	let selectEl = select(element, all);

	if (selectEl) {
		if (all) {
			selectEl.forEach((e) => e.addEventListener(type, handler));
		} else {
			selectEl.addEventListener(type, handler);
		}
	}
};

(function () {
	// Create a vertical banner that appears on screen when screen resolution is above a certain width.

	// 1. Create Elements and add classes and content

	// a. Screen-Size Banner
	const screenSizeEl = document.createElement("div");
	screenSizeEl.classList.add("screen-size");
	// b. Screen-Size Message
	const screenSizeMsg = document.createElement("p");
	screenSizeMsg.classList.add("screen-size__message");
	screenSizeMsg.innerHTML =
		"Nice! &#127881; You are viewing this page on a high resolution screen. &#128187;";

	// 2. Append elements to DOM
	document.body.appendChild(screenSizeEl);
	screenSizeEl.appendChild(screenSizeMsg);

	// 3. Create a function to check for screen width and toggle 'show' class on the Banner

	function checkScreenSize() {
		window.innerWidth >= 1380
			? screenSizeEl.classList.add("screen-size--show")
			: screenSizeEl.classList.remove("screen-size--show");
	}

	// 4. Run function on page load to show (or not) the banner according to the initial load resolution.
	window.addEventListener("DOMContentLoaded", checkScreenSize);

	// 5. Set Event listener to run the function on window resize
	window.addEventListener("resize", checkScreenSize);
})();
