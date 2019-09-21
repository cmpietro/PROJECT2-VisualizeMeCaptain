

var url = 'https://newsapi.org/v2/everything?' +
    'q=gun AND violence&' +
    'from=2019-08-30&' +
    'language=en&' +
    'sortBy=relevancy&' +
    'apiKey=75f26c6d9c014691bb58eb5f40530378';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());

    })
    