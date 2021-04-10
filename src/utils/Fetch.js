// fetch()로 부터 반환되는 Promise 객체는 HTTP error 상태를 reject하지 않습니다. 
// HTTP Statue Code가 404나 500을 반환하더라도요. 
// 대신 ok 상태가 false인 resolve가 반환되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환됩니다.
const Fetch = {
    makeUrl: (url) => {
        let obj = {};
        if (url[0] === '/') {
            obj['external'] = false;

            if (process.env.NODE_ENV === 'development') {
                obj['fullUrl'] = 'http://localhost:8080' + url;
            }
            else if (process.env.NODE_ENV === 'production') {
                obj['fullUrl'] = 'https://staybrella.com' + url;
            }
            else {
                new Error('process.env.NODE_ENV is not on development or production')
            }
            // TODO : add my ec2 path
        } else if (url.startsWith('http')) {
            obj['external'] = true;
            obj['fullUrl'] = url;
        }
        return obj;
    },

    get: function (url, extra_headers = {}, options = {}) {
        if (url === undefined) throw new Error('empty url');

        const { fullUrl, external } = this.makeUrl(url);

        return fetch(fullUrl, {
            method: 'GET',
            headers: this.getHeaders({ extra_headers, external }),
            ...options,
        }).then(response => {
            var contentType = response.headers.get('Content-Type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                throw new TypeError("Response content type is not json!");
            }
            throw new TypeError("Response is not ok!");
        })
    },
    post: function (url, data = {}, extra_headers = {}, options = {}) {
        if (url === undefined) throw new Error('empty url');
        const isFormData = data instanceof FormData;
        const { fullUrl, external } = this.makeUrl(url);
        const cleanedData = (isFormData) ? data : JSON.stringify(this.clean(data))

        return fetch(fullUrl, {
            method: 'POST',
            headers: this.getHeaders({ extra_headers, external, isFormData }),
            body: cleanedData,
            // ...options,
        }).then(response => {
            var contentType = response.headers.get('Content-Type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                }
                throw new TypeError("Response content type is not json!");
            }
            if (contentType && contentType.includes('application/json')) {
                response.json().then(res => this.errorAlert(res))
            }
            throw new TypeError("Response is not ok!");
        })
        // .catch(err=>{
        //     console.error('There has been a problem with your fetch operation: ', err.message)
        // })
    },
}

export { Fetch };