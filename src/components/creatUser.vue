<template>
  <div class="create" @click="$emit('cancel')">
    <form @click.prevent.stop>
      <input type="text" placeholder="UserName" v-model="UserData.UserName">
      <input type="text" placeholder="FullName" v-model="UserData.fullName">
      <input type="text" placeholder="Middle Name" v-model="UserData.MiddleName">
      <select style="border: 1px solid black; padding: 5;"  class="border-1" v-model="UserData.Status">
        <option value="active" class="pa-2" >active</option>
        <option value="inactive">inactive</option>
      </select>
      <input type="text" placeholder="Information" v-model="UserData.information">
      <div class="flex flex-column gap-2">
        <button class="savebtn   bg-green px-4" :class="{ active: isInvalid }" :disabled="isInvalid" @click="saved">
          save
        </button>
        <button class="bg-yellow savebtn" @click="clear" :disabled="isInvalid" :class="{ active: isInvalid }">
          clear
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const emit = defineEmits(['save', 'cancel'])

const props = defineProps<{ user: CreateUser }>()

const isInvalid = ref(true)

interface CreateUser {
  id?: string
  UserName: string,
  fullName: string,
  MiddleName: string,
  Status: string,
  information: string
}

const UserData = ref<CreateUser>({
  UserName: '',
  fullName: '',
  MiddleName: '',
  Status: 'inactive',
  information: ''
})


function saved() {
  if (UserData.value.id) {
    emit('save', { ...UserData.value, isUpdate: true })
  } else {
    emit('save', { ...UserData.value, isUpdate: false })
  }
}

function clear() {
  UserData.value = {
    UserName: '',
    fullName: '',
    MiddleName: '',
    Status: false,
    information: ''
  }
}


watch(UserData, (newVal) => {
  isInvalid.value = !(
    newVal.UserName.trim() !== '' &&
    newVal.fullName.trim() !== '' &&
    newVal.MiddleName.trim() !== '' &&
    newVal.information.trim() !== ''
  )
}, { deep: true, immediate: true })

watch(() => props.user, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    UserData.value = { ...newVal }
    console.log('new valll',newVal);
  }
}, { immediate: true })

</script>
<style>
.savebtn.active {
  opacity: 0.6 !important;
  cursor: no-drop;
}

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