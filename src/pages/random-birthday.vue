<script lang="ts">
import previewGrid from '../components/preview-grid.vue'
import { computed, defineComponent, ref } from 'vue'
import json from '../assets/congratulation.json'

export default defineComponent({
  components: {
    previewGrid,
  },
  setup() {
    const name = ref('')
    const output = ref('')
    const congratulation = computed(() =>
      output.value.replace(/^(.+?)\s/, (match, g1) =>
        name.value ? `${g1} ${name.value}, ` : `${g1}, `
      )
    )
    return {
      json,
      output,
      name,
      congratulation,
    }
  },
})
</script>

<template>
  <input placeholder="имя именинницы" v-model="name" />
  <textarea :value="congratulation" rows="6"></textarea>

  <preview-grid :data="json" v-model:output="output" :cols="4" :rows="13"></preview-grid>
</template>

<style scoped>
input {
  grid-column: span 2;
}
</style>
