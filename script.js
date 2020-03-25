new Vue({
    el: '#wrapper',
    data: {
        topMenu: [
            { code: 'people', text: 'Person', selected: true },
            { code: 'planets', text: 'Planet', selected: false },
            { code: 'starships', text: 'Starship', selected: false },
        ],
    },
    created: function() {
        // console.log(this.topMenu);
    },
    methods: {
        changeMenu(event) {
            for (const [i, item] of this.topMenu.entries()) {
                item.selected = false;
                if (event.target.dataset.code === item.code) {
                    this.topMenu[i].selected = true;
                }
            }
        },
    },
});

