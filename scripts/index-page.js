"user strict";

// (function () {
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

const loadEventListeners = () => {
	const formEl = document.getElementById("comments-form");
	formEl.addEventListener("submit", (e) => {
		e.preventDefault();
		submitCommentHandler(e);
	});
};

const displayComments = (data) => {
	data.forEach((obj) => {
		const commentEl = makeHtmlComment(obj);
		document.querySelector(".comments__list").append(commentEl);
	});
};

const makeCommentObjFromDOMData = () => {
	const nameInputEl = select("#form__name");
	const commentInputEl = select("#form__comment");
	const nameErrorEl = select(".name-error");
	const commentErrorEl = select(".comment-error");

	const nameVal = nameInputEl.value;
	const commentVal = commentInputEl.value;
	const imgSrcVal = select(".form__image").src;

	const dateLong = new Date();
	const enUSFormatter = new Intl.DateTimeFormat("en-US");
	const dateFormatted = enUSFormatter.format(dateLong);
	const hour = dateLong.getHours();
	const min = dateLong.getMinutes();

	if (!nameVal) {
		nameInputEl.classList.add("form__input--error");
		nameErrorEl.classList.add("form__error--show");
	} else {
		nameInputEl.classList.remove("form__input--error");
		nameErrorEl.classList.remove("form__error--show");
	}

	if (!commentVal) {
		commentInputEl.classList.add("form__input--error");
		commentErrorEl.classList.add("form__error--show");
	} else {
		commentInputEl.classList.remove("form__input--error");
		commentErrorEl.classList.remove("form__error--show");
	}

	if (nameVal && commentVal) {
		const commentObj = {
			commentImage: imgSrcVal,
			commentName: nameVal,
			commentDate: dateFormatted,
			commentBody: commentVal,
		};

		nameInputEl.value = "";
		commentInputEl.value = "";

		commentsData.unshift(commentObj);
		return commentObj;
	} else {
		return false;
	}
};

//Make HTML Comment function
const makeHtmlComment = (commentObj) => {
	const commentEl = create("div", "comment", null, { "data-id": 1 });
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
	const commentsListEl = select(".comments__list");
	const commentObj = makeCommentObjFromDOMData(e);
	const commentEl = commentObj && makeHtmlComment(commentObj);
	commentEl && commentsListEl.prepend(commentEl);
};

loadEventListeners();
displayComments(commentsData);
// })();
