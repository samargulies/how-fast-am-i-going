<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>
<script>
import '@/assets/css/style.scss';

export default {};
</script>
