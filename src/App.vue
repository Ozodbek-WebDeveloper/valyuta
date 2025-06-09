<template>
  <div class="w-[500px] mx-auto border mt-4 py-2 px-2 rounded-md">
    <h1 class="text-center text-2xl mb-10">valyuta converter</h1>
    <div class="flex justify-between items-center">
      <div class="w-33">
        <v-select v-model="selectCurrency" label="Select" density="compact" class="h-[40px]"
          :items="currencies"></v-select>
      </div>
      <p><i class="fa-solid fa-right-long"></i></p>
      <div class="w-33">
        <v-select v-model="toCurrency" label="Select" class="h-[40px]" density="compact" :items="currencies"></v-select>
      </div>
    </div>
    <div class=" my-4 w-33 mx-auto">
      <input type="number" v-model="changes" class="outline-none pl-2 w-full" style="border: 1px solid black;">
    </div>
    <div class="flex justify-center gap-3">
      <v-btn @click="result">result</v-btn>
      <v-btn @click="reset">reset</v-btn>
    </div>
    <p class="mt-5">{{ answer }}</p>
  </div>
</template>
<!--  -->
<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from "vue";

const API = ref('https://v6.exchangerate-api.com/v6/067298adf2c71dfaff087355/latest/')
const selectCurrency = ref('')
const toCurrency = ref('')
const currencies = ref(['USD', 'EUR', 'UZS', 'RUB'])
const answer = ref('0')
const changes = ref('')
// 

async function result() {
  if (!selectCurrency.value || !toCurrency.value || !changes.value) return

  try {
    const res = await axios.get(`${API.value}${selectCurrency.value}`)
    const rate = res.data.conversion_rates[toCurrency.value]

    const amount = +changes.value
    answer.value = `${amount} ${selectCurrency.value} =   ${(rate * amount).toFixed(2)} ${toCurrency.value}`
  } catch (error) {
    console.log(error);    
  }

}

function reset() {
  selectCurrency.value = ''
  toCurrency.value = ''
  changes.value = ''
  answer.value = ''
}

watch([selectCurrency, toCurrency,], ([from, to,]) => {
  if (from && to) {
    getCurrency(from, to,)
  }
})

async function getCurrency(from: string, to: string,) {
  try {
    const res = await axios.get(`${API.value}${from}`)
    const rate = res.data.conversion_rates[to]
    answer.value = `1 ${from} = ${rate} ${to}`
  } catch (error) {
    console.log(error)
  }
}


</script>
<!--  -->
<style></style>