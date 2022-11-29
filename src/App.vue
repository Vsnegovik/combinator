<template>
  <!-- из-за специфики работы github pages, нельзя использовать vue-router -->
  <nav>
    <div
      v-for="(navItem, index) in navigation"
      :key="index"
      @click="currentNavItem = navItem.value"
      :class="[`item-${navItem.value}`, { active: currentNavItem === navItem.value }]"
    >
      {{ navItem.title }}
    </div>
  </nav>
  <randomPoem v-if="isPoemPage"></randomPoem>
  <randomCongratulation v-else-if="isCongratulationPage"></randomCongratulation>
</template>

<script lang='ts'>
import randomPoem from './pages/random-poem.vue'
import randomCongratulation from './pages/random-congratulation.vue'
import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'

enum ENavItem {
  CONGRATULATION,
  POEM,
}

const currentNavItem = ref(ENavItem.POEM)
const isPoemPage = computed(() => currentNavItem.value === ENavItem.POEM)
const isCongratulationPage = computed(
  () => currentNavItem.value === ENavItem.CONGRATULATION
)
const navigation = reactive([
  {
    title: 'Поздравление',
    value: ENavItem.CONGRATULATION,
  },
  {
    title: 'Стих',
    value: ENavItem.POEM,
  },
])

export default defineComponent({
  components: {
    randomPoem,
    randomCongratulation,
  },
  setup() {
    return {
      currentNavItem,
      isPoemPage,
      isCongratulationPage,
      navigation,
    }
  },
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

nav {
  grid-column: 1/3;
  display: flex;
  gap: 10px;
}

nav div {
  list-style-type: none;
  padding: 10px 10px 10px 40px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: left 10px center;
  background-color: #eee;
}

nav div.item-0 {
  background-image: url("assets/cake-mono.png");
}
nav div.item-0.active {
  background-image: url("assets/cake-color.png");
}

nav div.item-1 {
  background-image: url("assets/poem-mono.png");
}
nav div.item-1.active {
  background-image: url("assets/poem-color.png");
}

nav div:hover {
  cursor: pointer;
  text-decoration: underline;
}

nav div.active {
  color: white;
  background-color: #8bc858;
}
</style>
