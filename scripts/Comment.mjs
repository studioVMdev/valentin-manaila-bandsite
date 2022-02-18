import API from "./API.mjs";

const api = new API();
export default class Comment {
	constructor(commentObj) {
		this.commentObj = commentObj;
	}

	render = () => {
		const commentEl = create("div", "comment", null, {
			"data-id": this.commentObj.id,
		});
		const imgEl = create("img", ["comment__icon", "avatar"], commentEl);
		//todo Image Source
		imgEl.setAttribute(
			"src",
			`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
		);
		const commentWrapperEl = create("div", "comment__wrapper", commentEl);
		const commentHeadEl = create("div", "comment__head", commentWrapperEl);
		const commentUserNameEl = create(
			"p",
			"comment__user-name",
			commentHeadEl
		);
		commentUserNameEl.innerText = this.commentObj.name;
		const commentTimeStampEl = create(
			"p",
			"comment__time-stamp",
			commentHeadEl
		);
		commentTimeStampEl.innerText = api.convertUnixComments(
			this.commentObj.timestamp
		);

		const commentBodyEl = create("p", "comment__body", commentWrapperEl);
		commentBodyEl.innerText = this.commentObj.comment;

		const commentControlsEl = create(
			"div",
			"comment__controls",
			commentWrapperEl
		);

		const likesWrapper = create(
			"div",
			"comment__likes-wrapper",
			commentControlsEl
		);

		const commentLikeBtn = create(
			"img",
			["comment__like-button"],
			likesWrapper,
			{ src: "/assets/icons/SVG/icon-like.svg" }
		);
		commentLikeBtn.addEventListener("click", this.handleLike);

		const commentLikesCount = create(
			"p",
			"comment__likes-count",
			likesWrapper
		);
		commentLikesCount.innerText = this.commentObj.likes
			? `${this.commentObj.likes}`
			: ` 0`;

		const commentDeleteBtn = create(
			"img",
			["comment__delete-button", "fa-solid", "fa-trash-can"],
			commentControlsEl,
			{ src: "/assets/icons/SVG/icon-delete.svg" }
		);
		commentDeleteBtn.addEventListener("click", this.handleDelete);

		return commentEl;
	};

	//! Handle Delete
	handleDelete(e) {
		const commentId =
			e.target.parentElement.parentElement.parentElement.dataset.id;
		api.deleteComment(commentId).then((data) => {
			e.target.parentElement.parentElement.parentElement.remove();
		});
	}
	//! Handle Like
	handleLike = (e) => {
		const commentId =
			e.target.parentElement.parentElement.parentElement.parentElement
				.dataset.id;
		api.incrementLike(commentId).then((data) => {
			e.target.nextElementSibling.innerText = data.likes;
		});
	};
}
