<template>
  <div>
    <div class="flex bg-[#0B1D51] pa-4 rounded-md gap-3 ">


      <router-link v-for="item in link" class="btn cursor-pointer bg-white px-5 py-1 rounded-md "
        :to="{ name: item.href }" :class="{ active: $route.name === item.href }">{{ item.title
        }}</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">

interface Ibtn {
  title: string,
  href: string
}

const link: Ibtn[] = [
  { title: 'Convertor', href: '/' },
  { title: 'users', href: 'form' }
]
</script>
<style>
.btn:hover,
.btn.active {
  background-color: #4DA8DA !important;
  color: white !important;
  transition: 0.5s;
}
</style>