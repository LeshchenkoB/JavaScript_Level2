<template>
  <div>
    <header>
      <goods-search @input="filteredGoodsHandler" v-model="searchLine"></goods-search>
      <div class="cart">
        <button class="cart-button" @click="visibleCart">Корзина</button>
        <div class="cart-container" :class="{ visibleCart: !isVisibleCart }">
          <cart></cart>
        </div>
      </div>
    </header>
    <main>
      <goods-list :goods="filteredGoods" @add="addToCart"/>
    </main>
  </div>
</template>

<script>
  import goodList from'./good-list.vue';
  import goodItem from './goods-item.vue';
  import goodSearch from './goods-search.vue'
    export default {
        data() {
            return{
                goods: [],
                goodsCart: [],
                filteredGoods: [],
                searchLine: '',
                isVisibleCart: false
            }
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
        },
        components:{
            goodList,
            goodItem,
            goodSearch
        }
    }
</script>


