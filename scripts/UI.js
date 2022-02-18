export default class UI {
  class UI {
		constructor() {
			this.htmlCommentList = document.querySelector(".comments__list");
		}

		//& Display Shows
		displayShows = (dataArr) => {
			let showsWrapperEl = document.querySelector(".shows__wrapper");
			let shows = [];

			dataArr.forEach((show) => {
				const showEl = create("div", "show", showsWrapperEl);
				showEl.setAttribute("data-id", show.id);
				showEl.addEventListener("click", () => {
					showEl.classList.toggle("show--active");
				});
				// console.log("🚀 ~ loadShows ~ showEl", showEl);

				//First Cell - DATE
				const dateWrapperEl = create("div", [
					"show__wrapper",
					"date__wrapper",
				]);

				const dateLabelEl = create(
					"h4",
					["show__label", "date__label"],
					dateWrapperEl
				);
				dateLabelEl.innerText = "DATE";

				const dateInfoEl = create(
					"h4",
					["show__info", "date__info"],
					dateWrapperEl
				);
				dateInfoEl.innerText = api.convertUnixShows(show.date);
				console.log(show.date);
				// new Date(Number(show.timestamp)).getDay();

				showEl.appendChild(dateWrapperEl);

				//Second Cell - VENUE
				const venueWrapperEl = create("div", [
					"show__wrapper",
					"venue__wrapper",
				]);
				const venueLabelEl = create(
					"h4",
					["show__label", "venue__label"],
					venueWrapperEl
				);
				venueLabelEl.innerText = "VENUE";

				const venueInfoEl = create(
					"h4",
					["show__info", "venue__info"],
					venueWrapperEl
				);
				venueInfoEl.innerText = show.place;

				showEl.appendChild(venueWrapperEl);

				//Third Cell - LOCATION
				const locationWrapperEl = create("div", [
					"show__wrapper",
					"location__wrapper",
				]);

				const locationLabelEl = create(
					"h4",
					["show__label", "location__label"],
					locationWrapperEl
				);
				locationLabelEl.innerText = "LOCATION";

				const locationInfoEl = create(
					"h4",
					["show__info", "location__info"],
					locationWrapperEl
				);
				locationInfoEl.innerText = show.location;

				showEl.appendChild(locationWrapperEl);
				//Fourth Cell - BUTTON
				const buyButton = create(
					"button",
					["show__button", "button", "buy__button"],
					showEl
				);
				buyButton.innerText = "BUY TICKETS";

				shows.push(showEl);
			});

			showsWrapperEl.appendChild(shows);
		};

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
			e.preventDefault();
			const commentsListEl = select(".comments__list");
			const commentObj = ui.getCommentValues(e);

			//^ Add comment to server and UI using response
			api.addComment(commentObj).then((resObj) => {
				console.log(resObj, "response object");
				const comment = new Comment(resObj);
				commentsListEl.prepend(comment.render());
			});
		};
	}
}
