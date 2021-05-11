class Api {
    constructor({baseUrl,options}) {
        this._baseUrl = baseUrl;
        this._options = options;
    }

    async getArticles() {
        const res = await fetch(`${this._baseUrl}/articles`, this._options);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }

    async toggleArticle({body = {}, id = '', method = 'POST'}) {
        this._options = {...this._options, method, body: body && JSON.stringify(body)};
        const res = await fetch(`${this._baseUrl}/articles/${id}`, this._options);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }
}

export default Api