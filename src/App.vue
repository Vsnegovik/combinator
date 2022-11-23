<script lang="ts">
import previewGrid from './components/preview-grid.vue'

export default {
  components: {
    previewGrid
  }
}
</script>

<template>
<previewGrid></previewGrid>
</template>

<style>
#app {
  font-family: Arial;
  align-items: start;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  max-width: 900px;
  margin: 0 auto;
}
</style>
