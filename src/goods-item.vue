<template>
  <div class="goods-item" >
    <img :src="good.img" alt="alt">
    <h3>{{ good.name }}</h3>
    <p>{{ good.price }}</p>
    <button @click="addToCart">Добавить</button>
  </div>
</template>
<script>
  export default {
      props: ['good'],
      methods: {
          addToCart(){
              return this.$emit('add', this.good);
          }
      },
  }
</script>
