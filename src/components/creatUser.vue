<template>
  <div class="create">
    <form @click.prevent>
      <input type="text" placeholder="UserName" v-model="UserData.UserName">
      <input type="text" placeholder="FullName" v-model="UserData.fullName">
      <input type="text" placeholder="Middle Name" v-model="UserData.MiddleName">
      <select name="" id="" v-model="UserData.Status">
        <option :value="true">active</option>
        <option :value="false">disActive</option>
      </select>
      <input type="text" placeholder="Information" v-model="UserData.information">
      <div class="flex flex-column gap-2">
        <button class="bg-green px-4" @click="saved">
          save
        </button>
        <button class="bg-yellow">
          clear
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const emit = defineEmits(['save'])

const props = defineProps<{ user: CreateUser }>()

interface CreateUser {
  id?: number
  UserName: string,
  fullName: string,
  MiddleName: string,
  Status: boolean,
  information: string
}

const UserData = ref<CreateUser>({
  UserName: '',
  fullName: '',
  MiddleName: '',
  Status: false,
  information: ''
})


function saved() {
  emit('save', UserData.value)
}
</script>
<style>
.create {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.265);
  display: flex;
  flex-direction: column;

}

.create form {
  width: 500px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 40px;
  border-radius: 20px;
}

input {
  border: 1px solid black;
  padding-left: 10px;
  border-radius: 5px;
  outline: none;
}
</style>