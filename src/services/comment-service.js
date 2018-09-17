import APIService from './API-service';

export class CommentService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'comments';
	}

	async getComments({ article } = { article: 0 }) {
		const queryString = article ? `?articleId=${article}` : '';
		const comments = await this.APIServiceInstance.get(this.model + queryString);
		return comments;
	}

	async getComment(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}?_expand=user`);
	}

	async postComment(comment) {
		return this.APIServiceInstance.post(comment, this.model);
	}
}

export default CommentService;
