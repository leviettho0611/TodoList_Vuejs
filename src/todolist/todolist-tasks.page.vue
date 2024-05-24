<template>
  <div class="background">
  <div class="container py-5 h-100 rounded-1">
    <div class="card">
      <div class="card-body p-5">
        <h2 class="text-center">TO DO LIST</h2>
        <div class="d-flex">
          <input v-model="taskName" type="text" class="form-control my-3" placeholder="" aria-label=""
            aria-describedby="basic-addon1" />
          <button @click="addTask" type="button"
            class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
            Add
          </button>
        </div>
        <div>
          <div class="input-group">
            <input v-model="searchQuery" type="search" class="form-control rounded " placeholder="Search"
              aria-label="Search" aria-describedby="search-addon" />
            <!-- <button @click="searchTasks" type="button" class="btn btn-primary">Search</button> -->
          </div>
          <button type="button" class="btn btn-default rounded-0 my-2 shadow-sm bg-body rounded-1 me-2 text-secondary">
            Assign tasks
          </button>
          <router-link to="/MyTasks">
            <button type="button" class="btn btn-default rounded-0 my-2 shadow-sm bg-body rounded-1 text-secondary">
              My Task
            </button>
          </router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" @click="checkAll ? uncheckAll() : toggleCheckAll()" />{{ checkAll }}
              </th>
              <th scope="col">Task</th>
              <th scope="col">Completed</th>
              <th scope="col">Level</th>
              <th scope="col">Status</th>
              <th scope="col">File</th>
              <th scope="col">TargetDate</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in searchQuery ? searchedTasks : tasks" :key="task.id"
              :class="{ 'selected-task': selectedTasks.includes(task.id) }">
              <td>
                <input type="checkbox" v-model="selectedTasks" :value="task.id" />
              </td>
              <td>{{ task.task_name }}</td>
              <td>{{ task.completed }}</td>
              <td :style="{ color: getlevel(task.level) }">
                <div v-if="task.level == 0">
                  High
                </div>
                <div v-else-if="task.level == 1">
                  Medium
                </div>
                <div v-else>
                  Low
                </div>

              </td>

              <td>
                <div v-if="task.status == 0">
                  Public
                </div>
                <div v-else>
                  Private
                </div>
              </td>
              <td>
                <img :src="task.file" class="img" alt="">
              </td>
              <td>{{ task.targetDate }}</td>
              <td>
                <button @click="editTask(task.id)" type="button"
                  class="btn btn-outline-primary rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary"
                  data-bs-toggle="modal" data-bs-target="#exampleEdit">
                  Edit
                </button>
              </td>
              <td>
                <button @click="deleteTask(task.id)" type="button"
                  class="btn btn-outline-danger rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="modal fade" id="exampleEdit" tabindex="-1" aria-labelledby="exampleEditLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleEditLabel">Edit</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card">
                  <div class="card-body">
                    <label for="task_name">Task Name</label>
                    <input v-model="editedTask.task_name" type="text" class="form-control" id="task_name"
                      placeholder="Enter task name" />
                    <label for="completed">Completed</label>
                    <select v-model="editedTask.completed" class="form-control" id="completed">
                      <option disabled value="">Please select one</option>
                      <option value="100%">100%</option>
                      <option value="90%">90%</option>
                      <option value="80%">80%</option>
                      <option value="70%">70%</option>
                      <option value="60%">60%</option>
                      <option value="50%">50%</option>
                      <option value="40%">40%</option>
                      <option value="30%">30%</option>
                      <option value="20%">20%</option>
                      <option value="10%">10%</option>
                      <option value="0%">0%</option>
                    </select>
                    <label for="level">Level</label>
                    <select v-model="editedTask.level" class="form-control" name="" id="level">
                      <option disabled value="">Please select one</option>
                      <option value="0">High</option>
                      <option value="1">Medium</option>
                      <option value="2">Low</option>
                    </select>
                    <!-- <label for="is_delete">is_delete</label>
                <select v-model="editedTask.is_delete" class="form-control" name="" id="is_delete">
                  <option disabled value="">Please select one</option>
                  <option value="0">Yes</option>
                  <option value="1">No</option>
                </select> -->
                    <label for="status">status</label>
                    <select v-model="editedTask.status" class="form-control" name="" id="status">
                      <option disabled value="">Please select one</option>
                      <option value="0">Public</option>
                      <option value="1">Private</option>
                    </select>
                    <label for="status">file</label>
                    <label for="task_file">File</label>
                    <input @change="handleChangeFile" type="file" class="form-control" id="task_file" />
                    <label for="deadline">Deadline</label>
                    <input v-model="editedTask.targetDate" type="datetime-local" class="form-control" id="deadline" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button @click="saveEditedTask" type="button" class="btn btn-outline-success" data-bs-dismiss="modal">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <button @click="deleteSelectedTasks" type="button"
          class="btn btn-outline-danger m-3 rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
          Delete Selected
        </button>
        <!-- <button @click="deleteAllTasks" type="button" class="btn btn-danger m-3">
      Delete All
    </button> -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';

export default {
  setup() {
    const editedTask = ref({ deadline: '' });
    const taskName = ref("");
    const tasks = ref([]);
    const selectedTasks = ref([]);
    const accessToken = localStorage.getItem("accessToken");
    const searchQuery = ref('');
    const searchedTasks = ref([]);
    const checkAll = ref(false);
    const route = useRoute();
    const projectId = route.params.projectId;
    onMounted(async () => {
      // getTasks();
      if (projectId) {
        await getTasks(projectId);
    }
    });
//     onMounted(async () => {
//   const {projectId} = route.params
//   getproject(projectId);
// });
    const getTasks = async () => {
      try {
        const response = await axios.get(`tasks/`);
        // const response = await axios.get('tasks/');
        tasks.value = response.data;
      } catch (error) {
        console.error("Error axios tasks:", error);
      }
    };
    const addTask = async () => {
      try {
        const response = await axios.post("tasks/", { task_name: taskName.value, },
        );
        tasks.value.push(response.data);
        taskName.value = "";
      } catch (error) {
        console.error(error);
      }
    };
    const editTask = (taskId) => {
      editedTask.value = { ...tasks.value.find((task) => task.id === taskId) };
    };
    const saveEditedTask = async () => {
      try {
        const response = await axios.put(
          `tasks/${editedTask.value.id}`,editedTask.value,
        );
        const index = tasks.value.findIndex(
          (task) => task.id === editedTask.value.id
        );
        tasks.value.splice(index, 1, response.data);
        editedTask.value = {};
      } catch (error) {
        console.error("Error saving edited task:", error);
      }
    };
    const handleChangeFile = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          editedTask.value.file = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        editedTask.value.file = null;
      }
    };
    const deleteTask = async (taskId) => {
      try {
        const response = await axios.delete(
          `tasks/${taskId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          const index = tasks.value.findIndex((task) => task.id === taskId);
          tasks.value.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
    const deleteSelectedTasks = async () => {
      try {
        selectedTasks.value.sort((a, b) => b - a);
        for (const taskId of selectedTasks.value) {
          const response = await axios.delete(
            `tasks/${taskId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            const index = tasks.value.findIndex((task) => task.id === taskId);
            tasks.value.splice(index, 1);
          }
        }
        selectedTasks.value = [];
      } catch (error) {
        console.error("Error delete selected tasks:", error);
      }
    };

    watch(searchQuery, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        searchTasks();
      }
    });

    const searchTasks = async () => {
      try {
        const response = await axios.get(
          `tasks/?search=${searchQuery.value}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        searchedTasks.value = response.data;
      } catch (error) {
        console.error("Error searching tasks:", error);
      }
    };

    const getlevel = (level) => {
      if (level == 0) {
        return "red";
      } else if (level == 1) {
        return "blue";
      } else {
        return "green";
      }
    };

    const toggleCheckAll = () => {
      if (checkAll.value) {
        selectedTasks.value = [];
      } else {
        selectedTasks.value = tasks.value.map(task => task.id);
      }
      checkAll.value = !checkAll.value;
    };
    const uncheckAll = () => {
      selectedTasks.value = [];
      checkAll.value = false;
    };
    return {
      taskName,
      tasks,
      getTasks,
      selectedTasks,
      addTask,
      editTask,
      deleteTask,
      saveEditedTask,
      deleteSelectedTasks,
      editedTask,
      handleChangeFile,
      searchQuery,
      searchedTasks,
      searchTasks,
      getlevel,
      toggleCheckAll,
      uncheckAll
    };
  },

}
</script>
<style scoped>
.container {
  max-width: 900px;
}
.background {
  background-color:rgb(76, 83, 84);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.selected-task {
  text-decoration: line-through;
}
.img {
  width: 50px;
  height: 50px;
}
th, td {
    border: 1px solid #dddddd;
    text-align: center;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}
th, td {
    width: calc(100% / 9); 
}
td{
    line-height: 4;
    font-weight: 400;
}
th{
    line-height: 3;
    background-color: #009970 !important;
    color: white !important;
}
</style>
