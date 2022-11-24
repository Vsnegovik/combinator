<template>
  <button @click="randomizeBodyItemsIndices"></button>
  <section class="component-preview">
    <header>
      <div
        :class="['title', `group-${index + 1}`]"
        :key="index"
        v-for="(header, index) in headers"
      >
        {{ header }}
      </div>
    </header>
    <div class="content">
      <template v-for="(group, groupIndex) in body" :key="groupIndex">
        <div
          v-for="(item, index) in group"
          @click="updateBodyItemIndex(groupIndex, index)"
          :key="item"
          :class="[
            `group-${groupIndex + 1}`,
            { active: bodyItemsIndices[groupIndex] === index },
          ]"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </section>
  <section class="component-preview compact">
    <header>
      <div
        :class="['title', `group-${index + 1}`]"
        :key="index"
        v-for="(header, index) in headers"
      ></div>
    </header>
    <div class="content">
      <template v-for="(group, groupIndex) in body" :key="groupIndex">
        <div
          v-for="(item, index) in group"
          @click="updateBodyItemIndex(groupIndex, index)"
          :key="item"
          :class="[
            `group-${groupIndex + 1}`,
            { active: bodyItemsIndices[groupIndex] === index },
          ]"
        ></div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { random } from 'lodash'
import { defineComponent, Ref, ref, computed, toRefs } from 'vue'

const fixGrammar = (text: string) => {
  return text.replaceAll(/([!?.;] .)/g, (match, g1) => {
    return g1.toUpperCase()
  })
}

let bodyItemsIndices: Ref<number[]> = ref([])

export default defineComponent({
  props: {
    data: {
      type: Object as () => { headers: string[]; body: string[][] },
      required: true,
    },
  },

  inheritAttrs: false,
  emits: ['update:output'],
  setup(props, context) {
    const { headers, body } = { ...props.data }
    const output = computed(() => {
      const result = bodyItemsIndices.value
        .map(
          (groupIndex, index) => `${headers[index]} ${body[index][groupIndex]}`
        )
        .join(' ')
      return fixGrammar(result)
    })
    const randomizeBodyItemsIndices = () => {
      bodyItemsIndices.value = body.map((group) => random(0, group.length - 1))
      context.emit('update:output', output.value)
    }
    const updateBodyItemIndex = (groupIndex: number, itemIndex: number) => {
      bodyItemsIndices.value[groupIndex] = itemIndex
      context.emit('update:output', output.value)
    }

    randomizeBodyItemsIndices()

    return {
      headers,
      body,
      output,
      bodyItemsIndices,
      updateBodyItemIndex,
      randomizeBodyItemsIndices,
    }
  },
})
</script>

<style scoped>
.component-preview {
  --color1: #fff4ce;
  --color2: #cce1e5;
  --color3: #f5d2dd;
  --color4: #d1ebd2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(14, auto);
  align-items: stretch;
  text-align: center;
  gap: 1px;
  grid-auto-flow: column;
}

.component-preview.compact div {
  height: 10px;
  width: 10px;
  overflow: hidden;
  content-visibility: hidden;
}
.component-preview div {
  padding: 8px;
  outline: 1px solid;
}
.group-1 {
  background-color: var(--color1);
}
.group-2 {
  background-color: var(--color2);
}
.group-3 {
  background-color: var(--color3);
}
.group-4 {
  background-color: var(--color4);
}

.content div {
  filter: grayscale(75%);
  cursor: pointer;
}
.content div:not(.active):hover {
  filter: grayscale(0);
}
.content .active {
  filter: grayscale(0) saturate(3);
}

.title {
  filter: saturate(3);
}

.title:nth-child(1) {
  grid-column: 1;
}
.title:nth-child(2) {
  grid-column: 2;
}
.title:nth-child(3) {
  grid-column: 3;
}
.title:nth-child(4) {
  grid-column: 4;
}
header,
.content {
  display: contents;
}
button {
  background-image: url("../assets/loader.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #8bc858;
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

button:active {
  animation: rotate 300ms;
}

@keyframes rotate {
  0% {
    background-size: 100%;
    transform: rotate(-35deg);
  }
  10% {
    transform: rotate(25deg);
  }
  20% {
    transform: rotate(-35deg);
  }
  30% {
    transform: rotate(25deg);
  }
  40% {
    transform: rotate(-35deg);
  }
  50% {
    transform: rotate(25deg);
  }

  80% {
    transform: rotate(-35deg);
  }
  90% {
    transform: rotate(25deg);
  }
  100% {
    background-size: 110%;
    transform: rotate(-15deg);
  }
}

button,
label {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}
</style>