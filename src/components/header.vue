<template>
  <div class="border w-33 mx-auto mt-5 pa-2">
    <h1 class="text-center text-h5">tesk one</h1>
    <div class="flex bg-[#0B1D51] pa-4 rounded-md gap-3 ">
      <button class="btn cursor-pointer bg-white px-5 py-1 rounded-md  "
        @click="$router.push({ name: 'converter' })">Valyuta</button>
      <button class="cursor-pointer btn bg-white px-3 rounded-md " @click="$router.push({ name: 'form' })">Forma 1</button>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped >
.btn:hover{
  background-color: #4DA8DA !important;
  color: white !important; 
  transition: 0.5s;
}
</style>