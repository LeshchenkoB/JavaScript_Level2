<template>
  <div class="goods-list" v-if="!isFilteredGoodsEmpty">
    <goods-item v-for="good in goods" @add="addToCart"
                :key="good.id" :good="good"></goods-item>
  </div>
  <div class="goods-not-found" v-else>
    <h3>Товаров для отображения нет!</h3>
  </div>
</template>
<script>
  export default {
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
  }
</script>
