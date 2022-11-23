<template>
  <form @submit.prevent="getCongratulation">
    <input placeholder="имя именинницы" v-model="name" />
    <textarea :value="output" rows="6"></textarea>
    <button type="submit"></button>
  </form>
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
          @click="updateCongratulation(groupIndex, index)"
          :key="item"
          :class="[
            `group-${groupIndex + 1}`,
            { active: congratulations[groupIndex] === index },
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
          @click="updateCongratulation(groupIndex, index)"
          :key="item"
          :class="[
            `group-${groupIndex + 1}`,
            { active: congratulations[groupIndex] === index },
          ]"
        ></div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { headers, body } from "../assets/data.json";
import { random } from "lodash";
import { Ref, ref } from "vue";

const fixGrammar = (text: string) => {
  return text.replaceAll(/([!?.;] .)/g, (match, g1) => {
    return g1.toUpperCase();
  });
};
const name = ref("");
const getCongratulation = () => {
  congratulations.value = body.map((group) => random(0, group.length - 1));
  output.value = getOutput();
};
const updateCongratulation = (groupIndex: number, itemIndex: number) => {
  congratulations.value[groupIndex] = itemIndex;
  output.value = getOutput();
};
const getOutput = () => {
  return fixGrammar(
    congratulations.value
      .map((item, index) => {
        let firstname = !index && name.value ? ` ${name.value}` : "";
        if (!index) firstname += ','

        return `${headers[index]}${firstname} ${body[index][item]}`;
      })
      .join(" ")
  );
};
let congratulations: Ref<number[]> = ref([]);
const output = ref(getOutput());
getCongratulation();

export default {
  setup() {
    return {
      name,
      output,
      headers,
      body,
      congratulations,
      updateCongratulation,
      getCongratulation
    }
  }
}
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

form {
  grid-column: span 2;
  display: grid;
  grid-gap: 10px;
  align-content: start;
  grid-template-columns: 1fr auto;
}
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