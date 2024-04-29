<template>

  <div class="container">
    
   
    <h2 class="text-center">TO DO LIST</h2>
    <div class="d-flex">
      <input v-model="taskName" type="text" class="form-control my-3" placeholder="" aria-label=""
        aria-describedby="basic-addon1">
      <button @click="addTask" type="button"
        class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1">Add</button>
    </div>
    <table class="table table-striped table-dark ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Task</th>
          <th scope="col">Completed</th>
          <th scope="col">Level</th>
          <th scope="col">is_delete</th>
          <th scope="col">status</th>
          <th scope="col">File</th>
          <th scope="col">Deadline</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
          <!-- <th scope="col">Delete</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task) in tasks" :key="task.id" :class="{ 'selected-task': selectedTasks.includes(task.id) }">
          <th><input type="checkbox" v-model="selectedTasks" :value="task.id"></th>
          <th>{{ task.task_name }}</th>
          <th>{{ task.completed }}</th>
          <th>{{ task.level }}</th>
          <th>{{ task.is_delete }}</th>
          <th>{{ task.status }}</th>
          <th>{{ task.file }}</th>
          <th>{{ task.targetDate }}</th>
          <th>{{ task }}</th>

          <td>
            <div>

              <!-- <button @click="editTask(index)" type="button" class="btn btn-warning">Edit</button> -->
            </div>
          </td>
          <td>
            <div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleEdit">Edit</button>

              <!-- <button @click="openEditModal(index)" type="button" class="btn btn-warning">Edit</button> -->

              <button @click="deleteTask(task.id)" type="button" class="btn btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="exampleEdit" tabindex="-1" aria-labelledby="exampleEditLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleEdit">Edit</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body" v-for="(value) in taskFormData" :key="value.id">
                <label for="task_name">Task Name</label>
                <input v-model="value.task_name" type="text" class="form-control" id="task_name"
                  placeholder="Enter task name">

                <label for="completed">Completed</label>
                <select v-model="value.completed" class="form-select" id="completed">
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                  <option value="50%">50%</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                  <option value="80%">80%</option>
                  <option value="90%">90%</option>
                  <option value="100%">100%</option>
                </select>

                <label for="level">Level</label>
                <input v-model="value.level" type="date" class="form-control" id="level">

                <label for="is_delete">Is Deleted</label>
                <input v-model="value.is_delete" type="text" class="form-control" id="is_delete"
                  placeholder="Enter deletion status">

                <label for="status">Status</label>
                <input v-model="value.status" type="text" class="form-control" id="status" placeholder="Enter status">

                <label for="file">File</label>
                <input v-model="value.file" type="text" class="form-control" id="file" placeholder="Enter file path">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button @click="editTask(task.id)" type="button" class="btn btn-outline-success"
              data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="deleteSelectedTasks" type="button" class="btn btn-danger m-3">Delete Selected</button>
    <button @click="deleteAllTasks" type="button" class="btn btn-danger m-3">Delete All</button>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {

  setup() {

    // const store = useStore();
    const taskName = ref('');
    const tasks = ref([]);
    const selectedTasks = ref([]);
    const editTaskIndex = ref(null);
    const taskFormData = ref({
      task_name: '',
      completed: '',
      level: '',
      is_delete: '',
      status: '',
      file: '',
      targetDate: ''
    });
    const accessToken = localStorage.getItem('accessToken');
    // const taskName = ref("");
    // const editTaskIndex = ref(null);
    // const tasks = ref([]);
    // const selectedTasks = ref([]);
    // const accessToken = localStorage.getItem('accessToken');
    onMounted(async () => {
      getTasks();
    });

    const getTasks = async () => {
      try {

        const response = await axios.get('http://10.20.14.45:8080/api/tasks/', {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });
        tasks.value = response.data;
      } catch (error) {
        console.error('Error axios tasks:', error);
      }
    };
    // const getTask = async (id) => {
    //   try {

    //     const response = await axios.get(`http://10.20.14.45:8080/api/tasks/${id}`, {
    //       headers: {
    //         "content-type": "application/json",
    //         "Authorization": `Bearer ${accessToken}`
    //       },
    //     });
    //     // tasks.value = response.data;
    //   } catch (error) {
    //     console.error('Error axios tasks:', error);
    //   }
    // };
    const addTask = async () => {
      try {

        const response = await axios.post('http://10.20.14.45:8080/api/tasks/', {
          task_name: taskName.value
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        tasks.value.push(response.data);
        taskName.value = '';

      } catch (error) {
        console.error(error);

      }
    };

    const editTask = async (taskId) => {
      // const index = tasks.value.find(task => task.id === taskId).get;
      console.log(taskId);
      try {
        // if (editTaskIndex.value === null) {
        //   console.error('No task selected for editing');
        //   return;
        // }
        const response = await axios.put(`http://10.20.14.45:8080/api/tasks/${taskId}`, taskFormData.value, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        tasks.value.splice(editTaskIndex.value, 1, response.data);

      } catch (error) {
        console.error(error);

      }
    };
    const deleteTask = async (taskId) => {
      console.log(taskId);
      try {
        const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${taskId}`,
          {
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            }
          });
        if (response.status === 200) {
          const index = tasks.value.findIndex(task => task.id === taskId);
          // console(index);

          tasks.value.splice(index, 1);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
    // const addTask = async () => {
    //   // const accessToken = localStorage.getItem('accessToken');
    //   if (taskName.value.length === 0)
    //     return;
    //   try {
    //     if (editTaskIndex.value !== null) {
    //       const response = await axios.put(`http://10.20.14.45:8080/api/tasks/${tasks.value[editTaskIndex.value].id}`, {
    //         task_name: taskName.value
    //       },
    //         {
    //           headers: {
    //             "content-type": "application/json",
    //             "Authorization": `Bearer ${accessToken}`,
    //           }
    //         });
    //       if (response.status === 200) {
    //         tasks.value[editTaskIndex.value].task_name = taskName.value;
    //         editTaskIndex.value = null;
    //       }
    //       console.log(accessToken);
    //     } else {
    //       const response = await axios.post('http://10.20.14.45:8080/api/tasks/', { task_name: taskName.value },
    //         {
    //           headers: {
    //             "content-type": "application/json",
    //             "Authorization": `Bearer ${accessToken}`,
    //           }
    //         });
    //       if (response.status === 201) { {{console.log(response.data)}}
    //         tasks.value.push(response.data
    //           // {

    //           //   task_name: taskName.value
    //           // },
    //       );

    //       }
    //     }
    //     taskName.value = "";
    //   } catch (error) {
    //     console.error('Error adding task:', error);
    //   }
    // };

    // const editTask = (index) => {
    //   taskName.value = tasks.value[index].task_name;
    //   editTaskIndex.value = index;
    // };



    const deleteSelectedTasks = async () => {
      try {
        selectedTasks.value.sort((a, b) => b - a);
        for (const taskId of selectedTasks.value) {
          const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${taskId}`,
            {
              headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
              }
            });
          if (response.status === 200) {
            const index = tasks.value.findIndex(task => task.id === taskId);
            tasks.value.splice(index, 1);
          }
        }
        selectedTasks.value = [];
      } catch (error) {
        console.error('Error delete selected tasks:', error);
      }
    };

    const deleteAllTasks = async () => {
      try {
        for (const task of tasks.value) {
          const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${task.id}`,
            {
              headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
              }
            });
          if (response.status === 200) {
            tasks.value = [];
          }
        }
      } catch (error) {
        console.error('Error deleting all tasks:', error);
      }
    };

    return {
      taskName,
      tasks,
      getTasks,
      selectedTasks,
      addTask,
      editTask,
      deleteTask,
      deleteSelectedTasks,
      deleteAllTasks
    };
  }
}
</script>
export default {
data() {
return {
taskName: '',
tasks: [],
selectedTasks: [],
editedTaskIndex: null,
editedTask: {},
};
},
methods: {
addTask() {
if (this.taskName.trim() !== '') {
this.tasks.push({
task_name: this.taskName,
completed: false,
level: '', // Thêm các trường dữ liệu khác nếu cần
is_delete: false,
status: '',
file: '',
targetDate: '',
});
this.taskName = ''; // Xóa nội dung của input
}
},
editTask(index) {
this.editedTaskIndex = index;
this.editedTask = { ...this.tasks[index] }; // Copy thông tin của task vào biến editedTask
},
saveEditedTask() {
if (this.editedTaskIndex !== null) {
this.$set(this.tasks, this.editedTaskIndex, this.editedTask); // Cập nhật thông tin của task trong mảng tasks
this.editedTaskIndex = null;
this.editedTask = {};
}
},
},
<style scoped>
.container {
  max-width: 800px;
  background-color: #f0f0f0;
}

.selected-task {
  text-decoration: line-through;
}
</style>
