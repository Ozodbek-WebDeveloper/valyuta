<template>
  <div>
    <h1>Filter</h1>
    <div class="flex gap-3 items-center">
      <div class="flex items-center gap-2">
        <label for="one">Inactive</label>
        <input type="checkbox" id="one" :value="inactive" :checked="chekFilter === 'inactive'"
          @change="chekFilter = 'inactive', $emit('Filter', 'inactive')" />
      </div>
      <div class="flex items-center gap-2">
        <label for="two">Active</label>
        <input type="checkbox" id="two" :checked="chekFilter === 'active'"
          @change="chekFilter = 'active', $emit('Filter', 'active')" />
      </div>
      <button class="btn" @click="$emit('Filter','all')" >clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const chekFilter = ref<boolean | null>(null) 
</script>

<style scoped >

.btn{
  background-color:#2196F3;
  padding: 5px 25px;
  border-radius: 10px;
}
</style>
