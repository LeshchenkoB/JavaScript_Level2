const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

function makeGetRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else  {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText)
            }
        };

        xhr.open('GET', url);
        xhr.send();
    });
}

class GoodsItem {
    constructor(id_product, product_name = 'Без названия', price = 0, img = 'https://via.placeholder.com/200') {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="alt">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="cart-button add-button" type="button">Добавить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {}
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    fetchGoods() {}
    totalSum() {
        let sum = 0;
        for (const good of this.goods) {
            if (good.price) {
                sum += good.price;
            }
        }
        return sum;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}

class GoodsPage extends GoodsList {
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.add-button')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    fetchGoods(callback) {
        makeGetRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
        }).then(()=>{
            callback();
        });
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
    }
}

class Cart extends GoodsList {
    removeFromCart(goodId) {

    }
    cleanCart() {

    }
    updateCartItem() {

    }
}

class CartItem extends GoodsItem {
    constructor(...attrs) {
        super(attrs);
        this.count = 0;
    }
    incCount() {

    }
    decCount() {

    }
}

const list = new GoodsPage('.goods-list');
list.fetchGoods(() => {
    list.render();
    console.log(list.totalSum());
});

const cart = new Cart;
cart.updateCartItem();
