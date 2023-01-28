<script lang="ts">
import previewGrid from '../components/preview-grid.vue'
import { defineComponent, ref, computed } from 'vue'
import json from '../assets/new-year.json'

export default defineComponent({
  components: {
    previewGrid,
  },
  setup() {
    const output = ref('')
    const congratulation = computed(() =>
      output.value
        .replace(/(.+?)\s(?:чтобы)/, (match, g1) => `${g1}, чтобы`)
        .replace(/([.!])\s(?:и пусть)/, (match, g1) => `${g1} И пусть`)
        .replace(/([^.!])\s(?:и пусть)/, (match, g1) => `${g1}, и пусть`)
    )
    return {
      json,
      output,
      congratulation
    }
  },
})
</script>

<template>
  <textarea :value="congratulation" rows="6"></textarea>
  <preview-grid :data="json" v-model:output="output" :cols="3" :rows="7"></preview-grid>
</template>