import Comment from "./Comment.mjs";
import API from "./API.mjs";
export default class UI {
	constructor() {
		this.htmlCommentList = document.querySelector(".comments__list");
	}

	//& Display Comments
	displayComments = (dataArr) => {
		const sortedArray = [...dataArr];
		sortedArray.sort((a, b) => {
			return a.timestamp - b.timestamp;
		});

		sortedArray.forEach((obj) => {
			const comment = new Comment(obj);
			this.htmlCommentList.prepend(comment.render());
		});
	};

	//& Grab values from input fields
	getCommentValues = (e) => {
		console.log(e);
		const nameInputEl = select("#form__name");
		const commentInputEl = select("#form__comment");
		const nameVal = nameInputEl.value;
		const commentVal = commentInputEl.value;
		const commentObj = {
			name: nameVal,
			comment: commentVal,
		};

		// //^ clear input fields
		nameInputEl.value = "";
		commentInputEl.value = "";
		return commentObj;
	};
	//& Handle Submit
	handleSubmit = (e) => {
		const comment = new Comment();
		const api = new API();
		e.preventDefault();
		const commentsListEl = select(".comments__list");
		const commentObj = this.getCommentValues(e);

		//^ Add comment to server and UI using response
		api.addComment(commentObj).then((resObj) => {
			console.log(resObj, "response object");
			const comment = new Comment(resObj);
			commentsListEl.prepend(comment.render());
		});
	};
}
