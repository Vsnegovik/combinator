<script lang="ts">
import previewGrid from '../components/preview-grid.vue'
import { computed, defineComponent, ref } from 'vue'
import data from '../assets/data.json'

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
      data,
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

  <preview-grid :data="data" v-model:output="output"></preview-grid>
</template>

<style scoped>
input {
  grid-column: span 2;
}

textarea {
  resize: vertical;
  min-height: 100px;
}
textarea,
input {
  font-family: Arial;
}
</style>