const application = new Vue({
    el: '#sitters',
    data: {
        sitters: {},
        filter: 1
    },
    mounted() {
        $.get('/sitters', (data) => {
            if (data && !data.error) {
                this.sitters = data.sitters;
            }
        });
    },
    methods: {}
});