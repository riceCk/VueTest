import Vue from 'vue';

let filters = {
    thousands (value) {
        return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
}

for (let i in filters) {
    Vue.filter(i, filters[i]);
}

export default filters