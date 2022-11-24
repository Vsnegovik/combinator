<script lang="ts">
import previewGrid from '../components/preview-grid.vue'
import { computed, defineComponent, ref } from 'vue'
import json from '../assets/poem.json'

const toUpperFirst = (text?: string) => {

  return `${text?.charAt(0).toUpperCase()}${text?.slice(1)}` ?? text
}

export default defineComponent({
  components: {
    previewGrid,
  },
  setup() {
    const outputRaw = ref<string[]>([])
    const poem = computed(() => {
      const [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10] = outputRaw.value.map(
        (item) => item.replace(/^\s/, '').replace(/\s+/, ' ')
      )
      return `${toUpperFirst(w1)} ${w2} ${w3}:\n${toUpperFirst(w4)} ${w5},\n${toUpperFirst(w6)} ${w7},\n${toUpperFirst(w8)} ${w9} ${w10}.`
    })

    return {
      json,
      outputRaw,
      poem,
    }
  },
})
</script>

<template>
  <pre class="output" contenteditable="true">{{ poem }}</pre>

  <preview-grid
    :data="json"
    v-model:outputRaw="outputRaw"
    :cols="10"
    :rows="10"
  ></preview-grid>
</template>

<style scoped>
.output {
  border-image-slice: 360 376 373 357;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("../assets/poem.jpg");
  border-style: solid;
  display: grid;
  align-content: center;
  background-color: #f9f0e5;
  justify-content: center;
  padding: 50px 50px;
  justify-self: self-start;
  font-size: 20px;
}
</style>