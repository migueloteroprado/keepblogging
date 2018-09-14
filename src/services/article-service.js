import APIService from './API-service';

export class ArticleService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'articles';
	}

	async getArticles(sort = '', order = '', filter = '', start = 0, limit = 0, ) {
		let queryString = '?_expand=category&_expand=user';
		queryString += sort.length > 0 ? `&_sort=${sort}` : '';
		queryString += order.length > 0 ? `&_order=${order}` : '';
		queryString += filter.length > 0 ? `&q=${filter}` : '';
		queryString += start > 0 ? `&_start=${start}` : '';
		queryString += limit > 0 ? `&_limit=${limit}` : '';
		return this.APIServiceInstance.get(this.model + queryString);
	}

	async getArticle(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}`);
	}
}

export default ArticleService;
