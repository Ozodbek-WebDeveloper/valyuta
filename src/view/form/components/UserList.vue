<template>
  <div class="flex justify-space-between">
    <div>
      <div class="pa-4">
        <button class="text-h5 bg-blue px-4 py-1 rounded-md
        " @click="create = true">Create User</button>
      </div>
    </div>
  </div>
  <div class="container w-75 mx-auto ">
    
    <!-- {{ users }} -->
    <div class="w-full">
      <h1 class="text-h5 text-center mb-4">User List</h1>
      <userFilter class="mb-4"  @Filter="filter" />
      <table class=" w-full ">
        <thead class="">
          <tr class="bg-green ">
            <th class="border-r border-black  pa-1 text-center" v-for="item in UserInfo">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b-2" v-for="(items, idx) in users" :class="{ 'bg-gray-300': (idx + 1) % 2 === 0 }">
            <th>{{ idx + 1 }}</th>
            <td class="text-center pa-2" v-for="(item, index) in Object.values(items).slice(1)">{{ item }}</td>
            <!-- {{ items }} -->
            <th>
              <div class="flex gap-2 pa-1 justify-center ">
                <button type="button" class="bg-yellow px-2" @click="EditUser(items)">edit</button>
                <button type="button" class="bg-red px-2" @click="askDelete(items)">delete</button>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
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
import userFilter from './userFilter.vue'
// 
const isDeleteConfirm = ref(false)
const deleteUserID = ref(null)
// 
const create = ref(false)
const API = ref('http://localhost:3000/')
const users = ref([])
const editData = ref({})
const UserInfo: String[] = ['id', 'UserName', 'FullName', 'Middle Name', 'Status', 'Information', 'Create data', 'update data', 'control']

interface CreateUser {
  UserName: string,
  fullName: string,
  MiddleName: string,
  Status: boolean,
  information: string,
  create_data: string,
  update_data: string
}

async function filter(status: any) {
  await getUserlist()
  console.log(status);

  if (status === '') return

  const filtered = users.value.filter(user => user.Status === status)
  console.log(filtered)
  users.value = filtered
  console.log(users);

}


function Cancel() {
  create.value = !create.value
  editData.value = []
}
/// save 

async function saved(UserData: CreateUser & { isUpdate: boolean }) {
  const { isUpdate, ...newData } = UserData
  // 
  const CreateData = new Date()
  const today = `${CreateData.getDate()}.${CreateData.getMonth() + 1}.${CreateData.getFullYear()}`

  if (isUpdate) {
    newData.update_data = today
    try {
      const res = await axios.put(`${API.value}users/${UserData.id}`, newData)
      editData.value = []
      getUserlist()
    } catch (error) {
      console.log(error);
    }
  } else {
    newData.create_data = today
    newData.update_data = '0'
    try {
      const res = await axios.post(`${API.value}users`, newData)
      editData.value = {}
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

async function deleteCon(status: any) {
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
    users.value = res.data.sort((a: any, b: any) => a.UserName.localeCompare(b.UserName))
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUserlist()
})
</script>
<style></style>