<template>
<router-view></router-view>
</template>

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
