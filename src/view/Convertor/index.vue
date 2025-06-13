<template>

  <div class="container w-75 mx-auto">
    <div class="w-[500px] mx-auto border mt-4 py-2 px-2 rounded-md">
      <h1 class="text-center text-2xl mb-10">valyuta converter</h1>
      <div class="flex justify-between items-center">
        <!--  -->
        <div class="w-33">
          <select class="w-full border px-2" v-model="selectCurrency">
            <option value="" disabled selected hidden>select</option>
            <option :value="item" v-for="item in currencies">{{ item }}</option>
          </select>
        </div>
        <!--  -->
        <p><i class="fa-solid fa-right-long"></i></p>
        <!--  -->
        <div class="w-33">
          <select class="w-full border px-2" v-model="toCurrency">
            <option value="" disabled selected hidden>select</option>
            <option :value="item" v-for="item in currencies">{{ item }}</option>
          </select>
        </div>
        <!--  -->
      </div>
      <div class=" my-4 w-33 mx-auto">
        <input type="number" v-model="changes" class="outline-none pl-2 w-full" style="border: 1px solid black;">
      </div>
      <!--  -->
      <div class="flex justify-center gap-3">
        <button style="background-color: green;" :class="{ 'disabled': activeBtn }"
          class="btn text-white px-5 py-1 rounded-md" @click="result">result</button>
        <button style="background-color: yellow;" class="text-black px-5 py-1 rounded-md" @click="reset">reset</button>
      </div>
      <!--  -->
      <p class="mt-5">{{ answer }}</p>
    </div>
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
const activeBtn = ref(true)
// 

async function result() {
  if (!activeBtn) return
  if (!selectCurrency.value || !toCurrency.value || !changes.value) return

  try {
    const res = await axios.get(`${API.value}${selectCurrency.value}`)
    const rate = res.data.conversion_rates[toCurrency.value]

    const amount = +changes.value
    answer.value = `${amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} ${selectCurrency.value} = ${(rate * amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} ${toCurrency.value}`
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

watch([selectCurrency, toCurrency, changes], ([select, to, change]) => {
  activeBtn.value = !(select && to && change);
})


watch([selectCurrency, toCurrency,], ([from, to,]) => {
  if (from && to) {
    getCurrency(from, to,)
  }
})

async function getCurrency(from: string, to: string,) {
  try {
    const res = await axios.get(`${API.value}${from}`)
    const rate = res.data.conversion_rates[to]
    answer.value = `1 ${from} = ${rate.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} ${to}`
  } catch (error) {
    console.log(error)
  }
}


</script>
<!--  -->
<style>
.btn.disabled {
  opacity: 0.6;
  cursor: no-drop;
}
</style>