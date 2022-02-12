"user strict";

// const commentsData = [
// 	{
// 		commentImage: "https://i.pravatar.cc/150?img=3",
// 		commentName: "Conor Walton ",
// 		commentDate: "02/17/2021",
// 		commentBody:
// 			"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
// 		id: 1,
// 	},
// 	{
// 		commentImage: "https://i.pravatar.cc/150?img=5",
// 		commentName: "
// 		commentDate: "01/09/2021",
// 		commentBody:
// 			"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
// 		id: 2,
// 	},
// 	{
// 		commentImage: "https://i.pravatar.cc/150?img=6",
// 		commentName: "Miles Acosta",
// 		commentDate: "12/20/2020",
// 		commentBody:
// 			"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
// 		id: 3,
// 	},
// ];

let testData = [];

(function () {
// ===START of IIFE
const loadEventListeners = () => {
	const formEl = document.getElementById("comments-form");
	// const formBtn = document.querySelector(".form__button");
	formEl.addEventListener("submit", (e) => {
		// formBtn.addEventListener("mouseover", (e) => {
		e.preventDefault();
		commentIsValid() && submitCommentHandler(e);
	});
};

loadEventListeners();

const displayComments = (data) => {
	data.forEach((obj) => {
		const commentEl = makeHtmlCommentFromDbObject(obj);
		document.querySelector(".comments__list").prepend(commentEl);
	});
};

const makeCommentObjFromDOMData = () => {
	const nameInputEl = select("#form__name");
	const commentInputEl = select("#form__comment");
	const nameVal = nameInputEl.value;
	const commentVal = commentInputEl.value;

	const imgSrcVal = select(".form__image").src;

	const dateLong = new Date();
	const enUSFormatter = new Intl.DateTimeFormat("en-US");
	const dateFormatted = enUSFormatter.format(dateLong);
	const hour = dateLong.getHours();
	const min = dateLong.getMinutes();

	console.log("comment is being converted to obj");

	const commentObj = {
		commentImage: imgSrcVal,
		commentName: nameVal,
		commentDate: dateFormatted,
		commentBody: commentVal,
	};

	nameInputEl.value = "";
	commentInputEl.value = "";
	return commentObj;
};

// Check if both inputs have values
const commentIsValid = () => {
	const nameInputEl = select("#form__name");
	const commentInputEl = select("#form__comment");
	const nameVal = nameInputEl.value;
	const commentVal = commentInputEl.value;
	const nameErrorEl = select(".name-error");
	const commentErrorEl = select(".comment-error");

	if (!nameVal) {
		nameInputEl.classList.add("form__input--error");
		nameErrorEl.classList.add("form__error--show");
		console.log("name input is empty");
		// return false;
	} else {
		nameInputEl.classList.remove("form__input--error");
		nameErrorEl.classList.remove("form__error--show");
	}

	if (!commentVal) {
		commentInputEl.classList.add("form__input--error");
		commentErrorEl.classList.add("form__error--show");
		console.log("comment input is empty");
		// return false;
	} else {
		commentInputEl.classList.remove("form__input--error");
		commentErrorEl.classList.remove("form__error--show");
	}

	if (nameVal && commentVal) {
		console.log("comment is valid");
		return true;
	} else {
		console.log("comment is invalid");
		return false;
	}
};

//Make HTML Comment function
const makeHtmlCommentFromDbObject = (commentObj) => {
	const commentEl = create("div", "comment", null, {
		"data-id": commentObj.id,
	});
	const imgEl = create("img", ["comment__icon", "avatar"], commentEl);
	imgEl.setAttribute("src", commentObj.commentImage);
	const commentWrapperEl = create("div", "comment__wrapper", commentEl);
	const commentHeadEl = create("div", "comment__head", commentWrapperEl);
	const commentUserNameEl = create("p", "comment__user-name", commentHeadEl);
	commentUserNameEl.innerText = commentObj.commentName;
	const commentTimeStampEl = create("p", "comment__time-stamp", commentHeadEl);
	commentTimeStampEl.innerText = commentObj.commentDate;
	const commentBodyEl = create("p", "comment__body", commentWrapperEl);
	commentBodyEl.innerText = commentObj.commentBody;

	return commentEl;
};

// Submit Comment
const submitCommentHandler = (e) => {
	e.preventDefault();
	const commentsListEl = select(".comments__list");

	const commentObj = makeCommentObjFromDOMData(e);
	console.log(commentObj);

	// Can confirm that the page does not reload due tu form button submit behaviour - I think it's either JSON-server or
	//--------------------------
	// testData.push(commentObj)
	// console.log(testData);
	//--------------------------

	// No page reload on submit via POST to jsoplaceholder
	//--------------------------
	// addComment("https://jsonplaceholder.typicode.com/comments", commentObj).then(
	//   (data) => {
	//     console.log(data);
	//   }
	// );
	//--------------------------

	addComment("http://localhost:3000/comments", commentObj).then((data) => {
		console.log(data);
	});

	commentsListEl.prepend(makeHtmlCommentFromDbObject(commentObj));
};

// Get comments on page load from JSON-Server Database and paint to UI.
getComments("http://localhost:3000/comments").then((data) => {
	console.log(data);
	displayComments(data);
});

// ===END of IIFE
})();
