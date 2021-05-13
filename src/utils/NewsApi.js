class Api {
    constructor({baseUrl,options}) {
        this._baseUrl = baseUrl;
        this._options = options;
    }

    date() {
       return new Date(Date.now() - 604800000).toISOString().slice(0, 10)
    }

    async searchArticles(query) {
        const res = await fetch(this._baseUrl + `q=${query}&from=${this.date()}&sortBy=popularity&apiKey=0173040c71cb4aacb566b1afa12e36b2`);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }
}

export default new Api({
    baseUrl: 'https://nomoreparties.co/news/v2/everything?',
    // baseUrl: 'https://newsapi.org/v2/everything?',
})