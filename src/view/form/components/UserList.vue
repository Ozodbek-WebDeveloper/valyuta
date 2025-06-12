<template>
  <div class="flex justify-space-between">
    <div>
      <div class="pa-4">
        <button class="text-h5 bg-blue px-4 py-1 rounded-md
     " @click="create = true">Create User</button>
      </div>
    </div>
  </div>
  <!-- {{ users }} -->
  <div class="w-66 mx-auto">
    <h1 class="text-h5 text-center mb-4">User List</h1>
    <table class=" w-full ">
      <thead class="">
        <tr class="bg-green ">
          <th class="border-r border-black  pa-1 text-center" v-for="item in UserInfo">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2" v-for="(items, idx) in users" :class="{ 'bg-gray-300': (idx + 1) % 2 === 0 }">
          <td class="text-center pa-2" v-for="(item, idx) in items">{{ item }}</td>
          <th>
            <div class="flex gap-2 pa-1 justify-center ">
              <button class="bg-yellow px-2" @click="EditUser(items)">edit</button>
              <button class="bg-red px-2" @click="askDelete(items)">delete</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  <creatUser v-if="create" @save="saved" :user="editData" @cancel="Cancel" />
  <deleteConfirm v-if="isDeleteConfirm" @delete="deleteCon" />
</template>
<!--  -->
<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import creatUser from './creatUser.vue';
import deleteConfirm from './deleteConfirm.vue'
// 
// const chekDelete = ref(false)
const isDeleteConfirm = ref(false)
const deleteUserID = ref(null)
// 
const create = ref(false)
const API = ref('http://localhost:3000/')
const users = ref([])
const editData = ref({})
const UserInfo: String[] = ['id', 'UserName', 'FullName', 'Middle Name', 'Status', 'Information', 'Create data', 'update data', 'control']

interface CreateUser {
  id?: number
  UserName: string,
  fullName: string,
  MiddleName: string,
  Status: boolean,
  information: string,
  create_data: number,
  update_data: number
}

const UserData = ref<CreateUser>({
  UserName: '',
  fullName: '',
  MiddleName: '',
  Status: false,
  information: '',
  create_data: 0,
  update_data: 0
})


function Cancel() {
  create.value = !create.value
  editData.value = []
}
/// save 

async function saved(UserData: CreateUser & { isUpdate: boolean }) {
  const { isUpdate, ...data } = UserData
  // 
  const CreateData = new Date()
  const today = `${CreateData.getDate()}.${CreateData.getMonth() + 1}.${CreateData.getFullYear()}`
  
  if (isUpdate) {
    data.update_data = today
    try {
      const res = await axios.put(`${API.value}users/${UserData.id}`, data)
      console.log(res.data);
      editData.value = []
      getUserlist()
    } catch (error) {
      console.log(error);
    }
  } else {
    data.create_data = today
    data.update_data = 0
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

function askDelete(user: any) {
  isDeleteConfirm.value = true
  deleteUserID.value = user.id
}

async function deleteCon(status) {
  const chekDelete = status
  if (chekDelete) {
    try {
      const res = await axios.delete(`${API.value}users/${deleteUserID.value}`)
      console.log(res.data);
      isDeleteConfirm.value = false
      getUserlist()
    } catch (error) {
      console.log(error);
    }
  } else {
    isDeleteConfirm.value = false
  }
}
// edit
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