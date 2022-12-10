<template>
  <div class="container" style="max-width: 600px">
    <!-- Heading -->
    <h2 class="text-center mt-5">My Vue Todo App</h2>

    <!-- Input -->
    <form class="d-flex mt-5" @submit.prevent="uploadTodo">
      <input
        type="text"
        v-model="title"
        placeholder="Enter title"
        class="w-100 form-control"
      />
      <input
        type="text"
        v-model="description"
        placeholder="Enter description"
        class="w-100 form-control"
      />
      <button class="btn btn-warning rounded-0" type="submit">
        SUBMIT
      </button>
    </form>

    <!-- Task table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Description</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in allTodos" v-bind:key="task._id">
          <td>
            <span :class="{ 'line-through': task.done == true }">
              {{ task.title }}
            </span>
          </td>
          <td>
            <span :class="{ 'line-through': task.done == true }">
              {{ task.description }}
            </span>
          </td>
          <td>
            <span @click="changeStatus(task)"
              class="pointer noselect"
              :class="{
                'text-danger': task.done == false,
                'text-success line-through': task.done == true,
              }"
            >
            {{getStatusName(task.done)}}
            </span>
          </td>
          <td class="text-center">
            <div @click="deleteTask(task)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => {
      return{
        title: '',
        description: '',
        status: false
      }
    },
    name: "HelloWorld",

    computed: mapGetters(['allTodos']),

    methods: {
      ...mapActions(['getTodos', 'changeStatus', 'deleteTask', 'uploadTask']),

      uploadTodo() {
        this.$store.dispatch('uploadTask', {
          title : this.title,
          description : this.description,
        })
      },

      getStatusName(status) {
        return (status ? 'Done' : 'In progress')
      }
    },
    created() {this.getTodos()}
  };
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.line-through {
  text-decoration: line-through;
}
</style>