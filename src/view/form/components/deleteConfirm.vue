<template>
  <div class="deleteConfirm" @click="$emit('delete', false)">
    <div class="bg-white rounded-md mx-auto w-[600px] pa-4" @click.stop style="margin-top: 200px;">
      <div class="flex flex-col">
        <span class="text-2xl font-bold">Do you really want to delete it?</span>
        <span class="text-sm text-gray-500">Information cannot be restored once it is deleted.</span>
      </div>
      <div class="flex gap-2 justify-end mt-10">
        <button class="border hover:border-2 px-8 py-2 rounded-md" @click="$emit('delete', false)">Cancel</button>
        <button class="bg-red px-8 py-2 rounded-md" @click="$emit('delete', true)">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style>
.deleteConfirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.265);
  display: flex;
  flex-direction: column;
}
</style>