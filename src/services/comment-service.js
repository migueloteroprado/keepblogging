import APIService from './API-service';

export class CommentService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'comments';
	}

	async getComments({ article } = { article: 0 }) {
		let queryString = '?_expand=user';
		queryString += article ? `&articleId=${article}` : '';

		const comments = await this.APIServiceInstance.get(this.model + queryString);

		return comments;
	}

	async getComment(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}?_expand=user`);
	}
}

export default CommentService;
