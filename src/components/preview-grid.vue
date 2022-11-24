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
import { defineComponent, Ref, ref, computed } from 'vue'

const fixGrammar = (text: string) => {
  return text
    .replaceAll(/([!?.;] .)/g, (match, g1) => {
      return g1.toUpperCase()
    })
    .replace(/\s+/, ' ')
}

let bodyItemsIndices: Ref<number[]> = ref([])

export default defineComponent({
  props: {
    data: {
      type: Object as () => { headers: string[]; body: string[][] },
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
  },

  inheritAttrs: false,
  emits: ['update:output', 'update:outputRaw'],
  setup(props, context) {
    const { headers, body } = { ...props.data }
    const outputRaw = computed(() => {
      return bodyItemsIndices.value
        .map(
          (groupIndex, index) => `${headers[index]} ${body[index][groupIndex]}`
        )
    })
    const output = computed(() => fixGrammar(outputRaw.value.join(' ')))
    const randomizeBodyItemsIndices = () => {
      bodyItemsIndices.value = body.map((group) => random(0, group.length - 1))
      context.emit('update:output', output.value)
      context.emit('update:outputRaw', outputRaw.value)
    }
    const updateBodyItemIndex = (groupIndex: number, itemIndex: number) => {
      bodyItemsIndices.value[groupIndex] = itemIndex
      context.emit('update:output', output.value)
      context.emit('update:outputRaw', outputRaw.value)
    }

    randomizeBodyItemsIndices()

    return {
      headers,
      body,
      output,
      bodyItemsIndices,
      updateBodyItemIndex,
      randomizeBodyItemsIndices,
      cssCols: props.cols,
      cssRows: props.rows,
    }
  },
})
</script>

<style>
.component-preview {
  --color1: #fff4ce;
  --color2: #cce1e5;
  --color3: #f5d2dd;
  --color4: #d1ebd2;
  display: grid;
  grid-template-columns: repeat(v-bind(cssCols), max-content);
  grid-template-rows: repeat(calc(v-bind(cssRows) + 1), auto);
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
.group-5 {
  background-color: var(--color1);
}
.group-6 {
  background-color: var(--color2);
}
.group-7 {
  background-color: var(--color3);
}
.group-8 {
  background-color: var(--color4);
}
.group-9 {
  background-color: var(--color3);
}
.group-10 {
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
.title:nth-child(5) {
  grid-column: 5;
}
.title:nth-child(6) {
  grid-column: 6;
}
.title:nth-child(7) {
  grid-column: 7;
}
.title:nth-child(8) {
  grid-column: 8;
}
.title:nth-child(9) {
  grid-column: 9;
}
.title:nth-child(10) {
  grid-column: 10;
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