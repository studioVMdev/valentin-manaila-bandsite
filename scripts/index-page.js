const commentsData = [
	{
		commentImage: "./assets/images/Mohan-muruge.jpg",
		commentName: "Conor Walton ",
		commentDate: "02/17/2021",
		commentBody:
			"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
	},
	{
		commentImage: "./assets/images/Mohan-muruge.jpg",
		commentName: "Emilie Beach",
		commentDate: "01/09/2021",
		commentBody:
			"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
	},
	{
		commentImage: "./assets/images/Mohan-muruge.jpg",
		commentName: "Miles Acosta",
		commentDate: "12/20/2020",
		commentBody:
			"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
	},
];

// DOM manipulation helper functions
// 1. Create Element
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
	element = element.trim();
	if (all) {
		return [...document.querySelectorAll(el)];
	} else {
		return document.querySelector(el);
	}
};

// 3. Add Event Listeners to Elements
const on = (type, element, listener, all = false) => {
	let selectEl = select(element, all);
	if (selectEl) {
		if (all) {
			selectEl.forEach((e) => e.addEventListener(type, listener));
		} else {
			selectEl.addEventListener(type, listener);
		}
	}
};

const displayComments = (data) => {
	data.forEach((comment) => {
		const commentEl = create("div", "comment", null, { "data-idss": 1 });
		const imgEl = create("img", ["comment__icon", "avatar"], commentEl);
		const commentWrapperEl = create("div", "comment__wrapper", commentEl);
		const commentHeadEl = create("div", "comment__head", commentWrapperEl);
		const commentUserNameEl = create(
			"p",
			"comment__user-name",
			commentHeadEl
		);
		commentUserNameEl.innerText = comment.commentName;
		const commentTimeStampEl = create(
			"p",
			"comment__time-stamp",
			commentHeadEl
		);
		commentTimeStampEl.innerText = comment.commentDate;
		const commentBodyEl = create("p", "comment__body", commentWrapperEl);
		commentBodyEl.innerText = comment.commentBody;
		document.querySelector(".comments__wrapper").append(commentEl);
	});
};

displayComments(commentsData);

//

//---------------------------
// console.log(commentEl);
