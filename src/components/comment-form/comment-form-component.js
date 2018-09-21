import { appendComponent,	reportValidity,	getFormData } from 'utils/utils';
import { getStringDate } from 'utils/date';
import PubSub from 'pubsub-js';
import { CommentService } from '../../services/comment-service';

const addErrorClass = (input) => {
	if (!input.checkValidity()) {
		input.classList.add('error');
	} else {
		input.classList.remove('error');
	}
};


const addCustomValidation = (input) => {

	if (input.id === 'comment-form-name') {
		if (input.value.length === 0) {
			input.setCustomValidity('You must enter your name');
		} else {
			input.setCustomValidity('');
		}
	}	else if (input.id === 'comment-form-email') {
		if (!input.value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
			input.setCustomValidity('You must enter a valid email');
		} else {
			input.setCustomValidity('');
		}
	} else if (input.id === 'comment-form-comment') {
		if (input.value.length === 0) {
			input.setCustomValidity('You must enter your comment');
		} else {
			input.setCustomValidity('');
		}
	}
};


const handleValidation = (formInputs) => {
	for (let i = 0; i < formInputs.length; i += 1) {
		const input = formInputs[i];

		//addCustomValidation(input);

		input.addEventListener('focus', () => {
			input.classList.add('focus');
		});

		input.addEventListener('blur', () => {
			input.classList.remove('focus');
			addCustomValidation(input);
			addErrorClass(input);
		});
	}
};

const handleCommentForm = ({ articleId }) => {
	const commentForm = document.getElementById('comment-form');
	const submitFormButton = document.getElementById('comment-form-submit');
	const formInputs = commentForm.getElementsByClassName('comment-input');
	const notice = document.getElementById('notice');

	handleValidation(formInputs);

	submitFormButton.addEventListener('click', (e) => {
		e.preventDefault();

		const formData = getFormData(formInputs);
		formData.articleId = articleId;
		formData.timestamp = getStringDate(Date.now());
		const commentServiceInstance = new CommentService();
		reportValidity(commentForm);
		if (commentForm.checkValidity()) {
			submitFormButton.disable = true;
			notice.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
			commentServiceInstance.postComment(formData).then((response) => {
				if (response === true) {
					commentForm.reset();
					notice.innerHTML = 'Your comment has been sent';
					PubSub.publish('reload-comments', { articleId });
				} else {
					notice.innerHTML = 'Then was an error sending your comment';
					console.log('Error: ', response.error.message); // eslint-disable-line no-console
				}
				submitFormButton.disable = false;
			});
		}
	});
};

export const createCommentForm = ({ articleId }) => {
	const commentsForm = document.getElementById('comments-form-container');
	const form = document.createElement('div');
	form.innerHTML = `
		<h3>Add a comment...</h3>
		<form id="comment-form">
			<div class="comment-form-field">
				<label for="name">Name*</label>
				<input class="comment-input" type="text" name="name" id="comment-form-name" placeholder="Enter your name" required>
			</div>
			<div class="comment-form-field">
				<label for="email">Email*</label>
				<input class="comment-input" type="email" name="email" id="comment-form-email" placeholder="Enter your email" required>
			</div>
			<div class="comment-form-field comment-textarea">
				<label for="comment">Comment*</label>
				<textarea class="comment-input" name="comment" id="comment-form-comment" maxlength="500" required
					placeholder="Write a comment, maximum 500 characters"></textarea>
			</div>
			<input type="submit" value="Submit" id="comment-form-submit" />
		</form>
		<div id="notice"></div>
	`;

	appendComponent(commentsForm, [form]);

	handleCommentForm({ articleId });
};

export default {
	createCommentForm
};
