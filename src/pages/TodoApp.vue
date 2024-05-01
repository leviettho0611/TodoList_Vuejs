<template>
  <div class="container">
    <h2 class="text-center">TO DO LIST</h2>
    <div class="d-flex">
      <input
        v-model="taskName"
        type="text"
        class="form-control my-3"
        placeholder=""
        aria-label=""
        aria-describedby="basic-addon1"
      />
      <button
        @click="addTask"
        type="button"
        class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1"
      >
        Add
      </button>
    </div>
    <table class="table table-striped table-dark">
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.id"
          :class="{ 'selected-task': selectedTasks.includes(task.id) }"
        >
          <th>
            <input type="checkbox" v-model="selectedTasks" :value="task.id" />
          </th>
          <th>{{ task.task_name }}</th>
          <th>{{ task.completed }}</th>
          <th>{{ task.level }}</th>
          <th>{{ task.is_delete }}</th>
          <th>{{ task.status }}</th>
          <th>{{ task.file }}</th>
          <th>{{ task.targetDate }}</th>
          <th>
            <button
              @click="editTask(task.id)"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleEdit"
            >
              Edit
            </button>
          </th>
          <td>
            <button
              @click="deleteTask(task.id)"
              type="button"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="exampleEdit"
      tabindex="-1"
      aria-labelledby="exampleEditLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleEditLabel">Edit</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <label for="task_name">Task Name</label>
                <input
                  v-model="editedTask.task_name"
                  type="text"
                  class="form-control"
                  id="task_name"
                  placeholder="Enter task name"
                />

                <!-- Thêm các trường thông tin khác của task ở đây -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="saveEditedTask"
              type="button"
              class="btn btn-outline-success"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="deleteSelectedTasks"
      type="button"
      class="btn btn-danger m-3"
    >
      Delete Selected
    </button>
    <button @click="deleteAllTasks" type="button" class="btn btn-danger m-3">
      Delete All
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const editedTask = ref({});
    const taskName = ref("");
    const tasks = ref([]);
    const selectedTasks = ref([]);
    const accessToken = localStorage.getItem("accessToken");

    onMounted(async () => {
      getTasks();
    });

    const getTasks = async () => {
      try {
        const response = await axios.get(
          "https://662e6c86a7dda1fa378cebbe.mockapi.io/task/",
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        tasks.value = response.data;
      } catch (error) {
        console.error("Error axios tasks:", error);
      }
    };

    const addTask = async () => {
      try {
        const response = await axios.post(
          "https://662e6c86a7dda1fa378cebbe.mockapi.io/task/",
          {
            task_name: taskName.value,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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
          `https://662e6c86a7dda1fa378cebbe.mockapi.io/task/${editedTask.value.id}`,
          editedTask.value,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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

    const deleteTask = async (taskId) => {
      try {
        const response = await axios.delete(
          `https://662e6c86a7dda1fa378cebbe.mockapi.io/task/${taskId}`,
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
            `https://662e6c86a7dda1fa378cebbe.mockapi.io/task/${taskId}`,
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

    const deleteAllTasks = async () => {
      try {
        for (const task of tasks.value) {
          const response = await axios.delete(
            `https://662e6c86a7dda1fa378cebbe.mockapi.io/task/${task.id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            tasks.value = [];
          }
        }
      } catch (error) {
        console.error("Error deleting all tasks:", error);
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
      saveEditedTask,
      deleteSelectedTasks,
      deleteAllTasks,
      editedTask, // Đảm bảo trả về editedTask
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  background-color: #f0f0f0;
}

.selected-task {
  text-decoration: line-through;
}
</style>
