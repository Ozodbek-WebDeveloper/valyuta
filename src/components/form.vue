<template>
  <div class="flex justify-space-between">
    <div class="pa-4">
      <button class="text-h5" @click="$router.push('/')">home</button>
    </div>

    <div>
      <div class="pa-4">
        <button class="text-h5 bg-blue px-4 py-1 rounded-md
     " @click="create = true">Create User</button>
      </div>
    </div>
  </div>
  <!-- {{ users }} -->
  <div class="w-50 mx-auto">
    <h1 class="text-h5 text-center mb-4">User List</h1>
    <table class="border-1 w-full ">
      <thead class="border-1">
        <tr>
          <th class="border-r  text-center" v-for="item in UserInfo">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-1" v-for="(user, idx) in users">
          <td class="border-r text-center" v-for="(item, idx) in user">{{ item }}</td>
          <th>
            <div class="flex gap-2 pa-1 justify-center ">
              <button class="bg-yellow px-2" @click="Edit(user)">edit</button>
              <button class="bg-red px-2" @click="deleteUser(user)">delete</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  <creatUser v-if="create" @save="saved" :user="user" />


</template>
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import creatUser from './creatUser.vue';

const create = ref(false)
const API = ref('http://localhost:3000/')
const users = ref([])

const UserInfo: String[] = ['id', 'UserName', 'FullName', 'Middle Name', 'Status', 'Information', 'control']

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

const user = ref<creatUser[]>([])

async function saved(UserData: CreateUser) {
  try {
    const res = await axios.post(`${API.value}users`, UserData)
    user.value = res.data
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  create.value = !create.value
  console.log(UserData.fullName);
}

async function deleteUser(idx: any) {
  try {
    const res = await axios.delete(`${API.value}users/${idx.id}`)
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function Edit(edit: any) {
  try {
    const res = await axios.get(`${API.value}users/${edit.id}`)
    user.value = res.data
    console.log(res.data);
    create.value = !create.value
  } catch (error) {
    console.log(error);
  }
}

async function getUserlist() {
  try {
    const res = axios.get(`${API.value}users`)
    users.value = (await res).data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUserlist()
})
</script>
<style>
/* table,thead,th {
  border: 1px solid black;
} */
</style>