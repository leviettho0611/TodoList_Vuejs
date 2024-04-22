<template>
  <div class="container">
    <h2 class="text-center">TO DO LIST</h2>
    <div class="d-flex">
      <input v-model="task" type="text" class="form-control my-3" placeholder="" aria-label="" aria-describedby="basic-addon1">
      <button @click="addTask" type="button" class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1">Add</button>
    </div>
    <!-- table-striped: kẻ sọc bảng -->
    <table class="table table-striped table-dark ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Task</th>
          <th scope="col" style="text-center">Edit</th>
          <th scope="col" style="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in tasks" :key="index" :class="{ 'selected-task': selectedTasks.includes(index) }">
          <td><input type="checkbox" v-model="selectedTasks" :value="index"></td>
          <th>{{ value.task }}</th>
          <td class="text-center">
            <div>
              <button @click="editTask(index)" type="button" class="btn btn-warning">Edit</button>
            </div>
          </td>
          <td class="text-center">
            <div>
              <button @click="deleteTask(index)" type="button" class="btn btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="deleteSelectedTasks" type="button" class="btn btn-danger m-3">Delete Selected</button>
    <button @click="deleteAllTasks" type="button" class="btn btn-danger m-3">Delete All</button>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  props: {
    msg: String,
  },
  data() {
    return {
      task: "",
      editTaskIndex: null,
      tasks: [],
      selectedTasks: []
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      try {
        const response = await fetch('https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task',{
          method: 'GET',
          
          // mode: "no-cors",
        });
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      if (this.task.length === 0) 
        return;
      try {
        if (this.editTaskIndex != null) {
          const response = await fetch(`https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task/${this.tasks[this.editTaskIndex].id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: this.task })
          });
          if (response.ok) {
            this.tasks[this.editTaskIndex].task = this.task;
            this.editTaskIndex = null;
          }
        } else {
          const response = await fetch('https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: this.task })
          });
          if (response.ok) {
            const data = await response.json();
            this.tasks.push(data);
          }
        }
        this.task = "";
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async editTask(index) {
      this.task = this.tasks[index].task;
      this.editTaskIndex = index;
    },
    async deleteTask(index){
      try{
        const response = await fetch(`https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task/${this.tasks[index].id}`,{
          method: 'DELETE'
        });
        if(response.ok){
          this.tasks.splice(index,1);
        }
      }catch(error){
        console.error('Error deleting task:', error);
      }
    },
    async deleteSelectedTasks(){
      try{
        this.selectedTasks.sort((a, b) => b - a);
        for (const index of this.selectedTasks){
          const response = await fetch(`https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task/${this.tasks[index].id}`,{
            method: 'DELETE'
          });
          if(response.ok){
            this.tasks.splice(index, 1);
          }
        }
        this.selectedTasks = [];
      }catch(error){
        console.error('Error delete selected tasks:', error);
      }
    },
    async deleteAllTasks() {
      try {
        for (const task of this.tasks) {
          const response = await fetch(`https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task/${task.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            this.tasks = [];
          }
        }
      } catch (error) {
        console.error('Error deleting all tasks:', error);
      }
    }
  }

  // data() {
  //   return {
  //     task: "",
  //     editTaskIndex: null,
  //     tasks: [
  //       { name: "do exercise", selected: false },
  //       { name: "cook dinner", selected: false }
  //     ],
  //     selectedTasks: []
  //   };
  // },
  // mounted() {
  //   this.getData();
  // },
  // methods: {
  //   async getData() {
  //     try {
  //       const response = await fetch('https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       this.tasks = data;
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   },
  //   // addTask() {
  //   //   if (this.task.length === 0) 
  //   //     return;
  //   //   if (this.editTaskIndex != null) {
  //   //     this.tasks[this.editTaskIndex].name = this.task;
  //   //     this.editTaskIndex = null;
  //   //   } else {
  //   //     this.tasks.push({ name: this.task, selected: false });
  //   //   }
  //   //   this.task = "";
  //   // },
  //   editTask(index) {
  //     this.task = this.tasks[index].name;
  //     this.editTaskIndex = index;
  //   },
  //   // deleteTask(index) {
  //   //   this.tasks.splice(index, 1);
  //   // },
  //   deleteSelectedTasks() {
  //     this.selectedTasks.sort((a, b) => b - a);
  //     this.selectedTasks.forEach(index => {
  //       this.tasks.splice(index, 1);
  //     });
  //     this.selectedTasks = [];
  //   },
  //   deleteAllTasks() {
  //     this.tasks = [];
  //   }
  // }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  background-color: #f0f0f0;
}

.selected-task {
  text-decoration: line-through;
}
</style>
