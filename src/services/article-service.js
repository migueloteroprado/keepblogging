
import APIService from './API-service';

export class ArticleService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'articles';
	}

	async getArticles({ category, filter } = { category: undefined, filter: '' }) {
		let queryString = '?_expand=category&_expand=user';
		queryString += category ? `&categoryId=${category}` : '';
		queryString += filter && filter.length > 0 ? `&q=${filter}` : '';

		const articles = await this.APIServiceInstance.get(this.model + queryString);

		return articles;
	}

	async getCommentsNumber(id) {
		const comments = await this.APIServiceInstance.get(`${this.model}/${id}/comments`);
		return comments.length;
	}

	async getArticle(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}?_expand=user`);
	}
}

export default ArticleService;
