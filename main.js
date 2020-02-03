const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        goodsCart: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    watch:{
        searchLine: function(){
            //this.filterGoods(this.searchLine) // если сделать так, то при вводе символов в поиск, страница будет сразу же перерисовываться исходя их значений в input
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
        async fetchGoods() {
            try {
                this.goods = await this.makeGetRequest(`${API_URL}/catalogData.json`);
                this.filteredGoods = [...this.goods];
            } catch (e) {
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
                return regexp.test(good.product_name);
            });
        },
        /*
        * метод добавляет в корзину выбранные товары и считает их там
        * */
        addToCart(good){
            if (this.goodsCart.indexOf(good) == -1) {
                this.goodsCart.push(good);
                good.counts = 1
            }
            else{
                good.counts += 1
            }
        }
    },
    mounted() {
        this.fetchGoods();
    }
});