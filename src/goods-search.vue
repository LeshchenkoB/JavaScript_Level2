<template>
  <form id="searchForm" action="">
    <input type="search" class="search-button" @input="$emit('input', $event.target.value)"  >
  </form>
</template>
<script>
  export default{
      data:()=>({
          searchLine: '',
      }),
  }
</script>
