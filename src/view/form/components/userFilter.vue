<template>
  <div>
    <h1 class="mb-3">Filter</h1>


    <div class="flex gap-2">
      <select class="w-[100px] border border-black" v-model="chekFilter">
        <option disabled hidden value="">Tanlang</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button class="btn" @click="chekFilter = ''">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['filter'])
const chekFilter = ref('')

watch(chekFilter, newVal => {
  emit('filter', newVal)
})
</script>

<style scoped>
.btn {
  background-color: #2196F3;
  padding: 5px 25px;
  border-radius: 10px;
}
</style>
