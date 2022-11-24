<template>
  <randomPoem v-if="isPoemPage"></randomPoem>
  <randomCongratulation v-else></randomCongratulation>
</template>

<script lang='ts'>
import randomPoem from './pages/random-poem.vue'
import randomCongratulation from './pages/random-congratulation.vue'
import { defineComponent, ref } from 'vue'

const isPoemPage = ref(true)

export default defineComponent({
  components: {
    randomPoem,
    randomCongratulation,
  },
  setup() {
    return {
      isPoemPage
    }
  }
})
</script>

<style>
#app {
  font-family: Arial;
  align-items: start;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  margin: 0 auto;
  justify-content: center;
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
