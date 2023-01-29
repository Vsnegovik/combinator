<script lang="ts" setup>
import previewGrid from '../components/preview-grid.vue'
import { defineComponent, ref } from 'vue'
import json from '../assets/speech.json'

defineComponent(previewGrid)
const output = ref('')
</script>

<template>
  <div class="output" contenteditable="true">{{ output }}</div>

  <preview-grid :data="json" v-model:outputInfinite="output" :cols="4" :rows="6" isInfinite></preview-grid>
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
  font-size: 20px;
}
</style>