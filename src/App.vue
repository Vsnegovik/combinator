<template>
  <!-- из-за специфики работы github pages, нельзя использовать vue-router -->
  <nav>
    <div
      v-for="navItem in navigation"
      :key="navItem.value"
      @click="currentNavItem = navItem.value"
      :class="[`item-${navItem.value}`, { active: currentNavItem === navItem.value }]"
    >
      {{ navItem.title }}
    </div>
  </nav>
  <randomPoem v-if="isPoemPage"></randomPoem>
  <randomBirthdayCongratulation v-else-if="isCongratulationPage"></randomBirthdayCongratulation>
  <randomNewYearCongratulation v-else-if="isNeyYearCongratulationPage"></randomNewYearCongratulation>
</template>

<script lang='ts'>
import randomPoem from './pages/random-poem.vue'
import randomBirthdayCongratulation from './pages/random-birthday.vue'
import randomNewYearCongratulation from './pages/random-new-year.vue'
import { defineComponent, reactive, ref, computed } from 'vue'

enum ENavItem {
  BIRTHDAY,
  POEM,
  NEW_YEAR
}

const currentNavItem = ref(ENavItem.POEM)
const isPoemPage = computed(() => currentNavItem.value === ENavItem.POEM)
const isCongratulationPage = computed(
  () => currentNavItem.value === ENavItem.BIRTHDAY
)
const isNeyYearCongratulationPage = computed(
  () => currentNavItem.value === ENavItem.NEW_YEAR
)
const navigation = reactive([
  {
    title: 'С днем рождения',
    value: ENavItem.BIRTHDAY,
  },
  {
    title: 'Стих',
    value: ENavItem.POEM,
  },
  {
    title: 'С Новым годом',
    value: ENavItem.NEW_YEAR,
  },
])

export default defineComponent({
  components: {
    randomPoem,
    randomBirthdayCongratulation,
    randomNewYearCongratulation
  },
  setup() {
    return {
      currentNavItem,
      isPoemPage,
      isCongratulationPage,
      isNeyYearCongratulationPage,
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
  background-repeat: no-repeat;
  background-position: left 10px center;
  background-color: #eee;
  background-size: auto 60% ;
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

nav div.item-2 {
  background-image: url("assets/santa-mono.svg");
}
nav div.item-2.active {
  background-image: url("assets/santa-color.svg");
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
