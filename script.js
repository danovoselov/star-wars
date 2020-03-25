let app = new Vue({
    el: '#wrapper',
    data: {
        topMenu: [
            { code: 'people', text: 'Person', selected: true },
            { code: 'planets', text: 'Planet', selected: false },
            { code: 'starships', text: 'Starship', selected: false },
        ],
        leftMenu: [],
        apiUrl: 'https://swapi.co/api/',
        requestUrl: '',
        response: '',
        defaultRequestUrl: 'https://swapi.co/api/people/',
        object: 'people',
        people: [],
        planets: [],
        starships: [],
    },
    created: function() {
        axios.get(this.defaultRequestUrl).then((response) => {
            this.setDataResults(response.data.results);
        });
    },
    methods: {
        changeTopMenu(event) {
            for (let [i, item] of this.topMenu.entries()) {
                item.selected = false;
                if (event.target.dataset.code === item.code) {
                    this.topMenu[i].selected = true;
                }
            }
            this.object = event.target.dataset.code;
            this.getData(event.target.dataset.code);
        },
        changeLeftMenu(event, index) {
            this.requestUrl = this.getRequestUrl(this.object) + '/' + event.target.dataset.id;
            axios.get(this.requestUrl).then((response) => {
                this.setData(response.data);
            });
            for (let [i, item] of this.leftMenu.entries()) {
                item.selected = false;
            }
            this.leftMenu[index].selected = true;
        },
        getRequestUrl(method) {
            return this.apiUrl + method;
        },
        getData(method) {
            this.requestUrl = this.getRequestUrl(method);
            axios.get(this.requestUrl).then((response) => {
                this.setDataResults(response.data.results);
            });
        },
        setDataResults(results, index = 0) {
            this.leftMenu = [];
            for (let [i, item] of results.entries()) {
                item.id = Number(item.url.replace(/\D+/g,''));
                if (i === index) {
                    item.selected = true;
                    switch (this.object) {
                        case 'people':
                            this.people = item;
                            break;
                        case 'planets':
                            this.planets = item;
                            break;
                        case 'starships':
                            this.starships = item;
                            break;
                    }
                }
                this.leftMenu.push(item);
            }
        },
        setData(data) {
            switch (this.object) {
                case 'people':
                    this.people = data;
                    break;
                case 'planets':
                    this.planets = data;
                    break;
                case 'starships':
                    this.starships = data;
                    break;
            }
        },
    },
});

