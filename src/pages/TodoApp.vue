<template>
  <div class="container">
    <h2 class="text-center">TO DO LIST</h2>
    <div class="d-flex">
      <input v-model="taskName" type="text" class="form-control my-3" placeholder="" aria-label="" aria-describedby="basic-addon1">
      <button @click="addTask" type="button" class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1">Add</button>
    </div>
    <table class="table table-striped table-dark ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Task</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id" :class="{ 'selected-task': selectedTasks.includes(task.id) }">
          <td><input type="checkbox" v-model="selectedTasks" :value="task.id"></td>
          <th>{{ task.task_name }}</th>
          <td>
            <div>
              <button @click="editTask(index)" type="button" class="btn btn-warning">Edit</button>
            </div>
          </td>
          <td>
            <div>
              <button @click="deleteTask(task.id)" type="button" class="btn btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="deleteSelectedTasks" type="button" class="btn btn-danger m-3">Delete Selected</button>
    <button @click="deleteAllTasks" type="button" class="btn btn-danger m-3">Delete All</button>
  </div>
</template>

<!-- <script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const taskName = ref("");
    const editTaskIndex = ref(null);
    const tasks = ref([]);
    const selectedTasks = ref([]);

    onMounted(async () => {
       getTasks();
    });

    const getTasks = async () => {
      try {
        const response = await axios('https://6621d86427fcd16fa6c80deb.mockapi.io/api/todo/task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        tasks.value = data;
      } catch (error) {
        console.error('Error axios tasks:', error);
      }
    };

    const addTask = async () => {
      if (taskName.value.length === 0) 
        return;
      try {
        if (editTaskIndex.value !== null) {
          const response = await axios(`http://10.20.14.45:8080/api/tasks/${tasks.value[editTaskIndex.value].id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task_name: taskName.value })
          });
          if (response.ok) {
            tasks.value[editTaskIndex.value].task_name = taskName.value;
            editTaskIndex.value = null;
          }
        } else {
          const response = await axios('http://10.20.14.45:8080/api/tasks/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task_name: taskName.value })
          });
          if (response.ok) {
            const data = await response.json();
            tasks.value.push(data);
          }
        }
        taskName.value = "";
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

    const editTask = (index) => {
      taskName.value = tasks.value[index].task_name;
      editTaskIndex.value = index;
    };

    const deleteTask = async (taskId) => {
      try {
        const response = await axios(`http://10.20.14.45:8080/api/tasks/${taskId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const index = tasks.value.findIndex(task => task.id === taskId);
          tasks.value.splice(index, 1);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const deleteSelectedTasks = async () => {
      try {
        selectedTasks.value.sort((a, b) => b - a);
        for (const taskId of selectedTasks.value) {
          const response = await axios(`http://10.20.14.45:8080/api/tasks/${taskId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
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
          const response = await axios(`http://10.20.14.45:8080/api/tasks/${task.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
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
      selectedTasks,
      addTask,
      editTask,
      deleteTask,
      deleteSelectedTasks,
      deleteAllTasks
    };
  }
}
</script> -->
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const taskName = ref("");
    const editTaskIndex = ref(null);
    const tasks = ref([]);
    const selectedTasks = ref([]);

    onMounted(async () => {
       getTasks();
    });

    const getTasks = async () => {
      try {
        const response = await axios.get('http://10.20.14.45:8080/api/tasks/');
        tasks.value = response.data;
      } catch (error) {
        console.error('Error axios tasks:', error);
      }
    };

    const addTask = async () => {
      if (taskName.value.length === 0) 
        return;
      try {
        if (editTaskIndex.value !== null) {
          const response = await axios.put(`http://10.20.14.45:8080/api/tasks/${tasks.value[editTaskIndex.value].id}`, { task_name: taskName.value });
          if (response.status === 200) {
            tasks.value[editTaskIndex.value].task_name = taskName.value;
            editTaskIndex.value = null;
          }
        } else {
          const response = await axios.post('http://10.20.14.45:8080/api/tasks/', { task_name: taskName.value });
          if (response.status === 200) {
            tasks.value.push(response.data);
          }
        }
        taskName.value = "";
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

    const editTask = (index) => {
      taskName.value = tasks.value[index].task_name;
      editTaskIndex.value = index;
    };

    const deleteTask = async (taskId) => {
      try {
        const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${taskId}`);
        if (response.status === 200) {
          const index = tasks.value.findIndex(task => task.id === taskId);
          tasks.value.splice(index, 1);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const deleteSelectedTasks = async () => {
      try {
        selectedTasks.value.sort((a, b) => b - a);
        for (const taskId of selectedTasks.value) {
          const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${taskId}`);
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
          const response = await axios.delete(`http://10.20.14.45:8080/api/tasks/${task.id}`);
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

<style scoped>
.container {
  max-width: 600px;
  background-color: #f0f0f0;
}

.selected-task {
  text-decoration: line-through;
}
</style>
