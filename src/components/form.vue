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
        <tr class="border-1" v-for="(items, idx) in users">
          <td class="border-r text-center" v-for="(item, idx) in items">{{ item }}</td>
          <th>
            <div class="flex gap-2 pa-1 justify-center ">
              <button class="bg-yellow px-2" @click="EditUser(items)">edit</button>
              <button class="bg-red px-2" @click="deleteUser(items)">delete</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  <creatUser v-if="create" @save="saved" :user="editData" @cancel="Cancel" />
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import creatUser from './creatUser.vue';

const create = ref(false)
const API = ref('http://localhost:3000/')
const users = ref([])
const editData = ref({})
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


function Cancel() {
  create.value = !create.value
  editData.value = []
}
/// save 

// async function createID(data: any) {
//   try {

//   } catch (error) {

//   }
// }

async function saved(UserData: CreateUser & { isUpdate: boolean }) {
  const { isUpdate, ...data } = UserData
  if (isUpdate) {
    try {


      const res = await axios.put(`${API.value}users/${UserData.id}`, data)
      console.log(res.data);
      editData.value = []
      getUserlist()
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const Id = await axios.get(`${API.value}users`)
      const req = Id.data

      const lastId = String(req.length + 1)

      const newdata = {
        ...data,
        id: lastId
      }

      const res = await axios.post(`${API.value}users`, newdata)
      console.log(res.data);
      editData.value = []
      getUserlist()
    } catch (error) {
      console.log(error);
    }
  }
  create.value = !create.value
}
// delete
async function deleteUser(user: any) {
  try {
    const res = await axios.delete(`${API.value}users/${user.id}`)
    console.log(res.data);
    getUserlist()
  } catch (error) {
    console.log(error);

  }
}
// put

async function EditUser(user: any) {
  try {
    const res = await axios.get(`${API.value}users/${user.id}`)
    editData.value = res.data
    create.value = true
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

// get
async function getUserlist() {
  try {
    const res = await axios.get(`${API.value}users`)
    users.value = res.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUserlist()
})
</script>
<style></style>