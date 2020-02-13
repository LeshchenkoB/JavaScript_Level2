
const cartGoods = [];

function debounce(callback, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) callback.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            callback.apply(context, args)
        }
    }
}

Vue.component('goods-search',{
    data:()=>({
        searchLine: '',
    }),
    template:`
        <form id="searchForm" action="">
                <input type="search" class="search-button" @input="$emit('input', $event.target.value)"  >
        </form>
    `
});

Vue.component('goods-item', {
    props: ['good'],
    methods: {
        addToCart(){
            return this.$emit('add', this.good);
        }
    },
    template: `
        <div class="goods-item" >
           <img :src="good.img" alt="alt">
           <h3>{{ good.name }}</h3>
           <p>{{ good.price }}</p>
           <button @click="addToCart">Добавить</button>
        </div>
    `
});

Vue.component('goods-list', {
    props: ['goods'],
    computed: {
        isFilteredGoodsEmpty() {
            return this.goods.length === 0;
        },
    },
    methods: {
        addToCart(good){
            return this.$emit('add', good);
        }
    },
    template: `
        <div class="goods-list" v-if="!isFilteredGoodsEmpty">
            <goods-item v-for="good in goods" @add="addToCart"
                        :key="good.id" :good="good"></goods-item>
        </div>
        <div class="goods-not-found" v-else>
            <h3>Товаров для отображения нет!</h3>
        </div>
    `
});
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        goodsCart: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    computed: {
        filteredGoodsHandler() {
            return debounce((event) => {
                /*const regexp = new RegExp(event.target.value.trim(), 'i');*/
                const regexp = new RegExp(this.searchLine.trim(), 'i');
                this.filteredGoods = this.goods.filter((good) => {
                    return regexp.test(good.product_name);
                });
            }, 300)
        }
    },
    methods: {
        makeGetRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest(); // readyState = 1
                } else  {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
                }

                xhr.onreadystatechange = function () { // xhr changed
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            reject(xhr.responseText);
                            return
                        }
                        const body = JSON.parse(xhr.responseText);
                        resolve(body)
                    }
                };

                xhr.onerror = function (err) {
                    reject(err)
                };

                xhr.open('GET', url);
                xhr.send(); // readyState 2
            });
        },
        makePostRequest(url, data) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest(); // readyState = 1
                } else  {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
                }

                xhr.onreadystatechange = function () { // xhr changed
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            reject(xhr.responseText);
                            return
                        }
                        const body = JSON.parse(xhr.responseText);
                        resolve(body)
                    }
                };

                xhr.onerror = function (err) {
                    reject(err)
                };

                xhr.open('POST', url);
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data)); // readyState 2
            });
        },
        async fetchGoods() {
            try {
                this.goods = await this.makeGetRequest(`/api/goods`);
                this.filteredGoods = [...this.goods];
            } catch (e) {
                console.error(e);
            }
        },
        async addToCart(good){
            try{
                this.makePostRequest('/api/cart', good);
            }catch (e) {
                console.error(e);
            }
        },
        /*
        * метод отображает/скрывает содержимое корзины при нажатии на кнопку "корзина"
        * */
        visibleCart(){
            if(this.isVisibleCart){
                this.isVisibleCart = false
            } else{
                this.isVisibleCart = true
            }
        },
        /*
        * метод фильтрует товары по значению из поиска
        * */
        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter((good) => {
                return regexp.test(good.name);
            });
        },
    },
    mounted() {
        this.fetchGoods();
    }
});