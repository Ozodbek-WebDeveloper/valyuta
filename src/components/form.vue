<template>
  <div class="pa-4">
    <button class="text-h5" @click="$router.push('/')">home</button>
  </div>

  <div class="w-50 mx-auto">
    <h1 class="text-h5 text-center mb-4">User List</h1>
    <table class="border w-full ">
      <thead class="border-b">
        <tr>
          <th class="border-l  text-center">id</th>
          <th>name</th>
          <th>fullName</th>
          <th>Middle Name</th>
          <th>status</th>
          <th>Information</th>
          <th>control</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border-l text-center">1</td>
          <td>John</td>
          <td>John Smith</td>
          <td>Michael</td>
          <td>Active</td>
          <td>Some info</td>
          <th>
            <div class="flex gap-2 pa-1 justify-center ">
              <button class="bg-yellow px-2">edit</button>
              <button class="bg-red px-2">delete</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup  lang="ts"  > 



</script>
<style>
/* table,thead,th {
  border: 1px solid black;
} */
</style>