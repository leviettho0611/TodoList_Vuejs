<template>
  <div class="background">
    <div class="container py-5 h-100 rounded-1">
      <div class="card">
        <div class="card-body p-5">
          <h2 class="text-center">Project Page</h2>
          <div class="d-flex">
            <input v-model="project_name" type="text" class="form-control my-3" placeholder="" aria-label=""
              aria-describedby="basic-addon1" />
            <button @click="addProject" type="button"
              class="btn btn-default rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
              Add
            </button>
          </div>
          <div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" @click="checkAll ? uncheckAll() : toggleCheckAll()" />
                </th>
                <th scope="col">Project</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in searchQuery ? searchedprojects : projects" :key="project.id"
                :class="{ 'selected-task': selectedProjects.includes(project.id) }">
                <td>
                  <input type="checkbox" v-model="selectedProjects" :value="project.id" />
                </td>
                <td>{{ project.project_name }}</td>
                <td>
                  <button @click="editProject(project.id)" type="button"
                    class="btn btn-outline-primary rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary"
                    data-bs-toggle="modal" data-bs-target="#exampleEdit">
                    Edit
                  </button>
                </td>
                <td>
                  <button @click="deleteTask(project.id)" type="button"
                    class="btn btn-outline-danger rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
                    Delete
                  </button>
                </td>
                <td>
                  <button @click="getdetail(project.id)" type="button"
                    class="btn btn-outline-danger rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
                    Detail
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
                      <label for="project_name">Task Name</label>
                      <input v-model="editedProject.project_name" type="text" class="form-control" id="task_name"
                        placeholder="Enter task name" />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button @click="saveEditedProject" type="button" class="btn btn-outline-success" data-bs-dismiss="modal">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button @click="deleteselectedProjects" type="button"
            class="btn btn-outline-danger m-3 rounded-0 my-3 shadow-sm bg-body rounded-1 text-secondary">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const editedProject = ref({ deadline: '' });
const project_name = ref("");
const projects = ref([]);
const selectedProjects = ref([]);
const accessToken = localStorage.getItem("accessToken");
const searchQuery = ref('');
const searchedProjects = ref([]);
const checkAll = ref(false);
const router = useRouter();

onMounted(async () => {
  getproject();
});

const getproject = async () => {
  try {
    const response = await axios.get('project/');
    projects.value = response.data;
  } catch (error) {
    console.error("Error axios projects:", error);
  }
};
const addProject = async () => {
      try {
        const response = await axios.post("project/", { project_name: project_name.value, },
        );
        projects.value.push(response.data);
        project_name.value = "";
      } catch (error) {
        console.error(error);
      }
    };
const getdetail = async (projectId) => {
  try {
    const response = await axios.get(
      `project/${projectId}`,
    );
    if (response.status === 200) {
      const projectId = response.data.id;
      router.push({ name: 'TodoApp', params: { projectId }});
    }
  } catch (error) {
    console.error("Error getting task detail:", error);
  }
};

const editProject = (projectId) => {
  editedProject.value = { ...projects.value.find((project) => project.id === projectId) };
};

const saveEditedProject = async () => {
  try {
    const response = await axios.put(
      `project/${editedProject.value.id}`,editedProject.value,
    );
    const index = projects.value.findIndex(
      (project) => project.id === editedProject.value.id
    );
    projects.value.splice(index, 1, response.data);
    editedProject.value = {};
  } catch (error) {
    console.error("Error saving edited task:", error);
  }
};

// const handleChangeFile = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       editedTask.value.file = reader.result;
//     };
//     reader.readAsDataURL(file);
//   } else {
//     editedTask.value.file = null;
//   }
// };

const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `project/${taskId}`,
    );
    if (response.status === 200) {
      const index = projects.value.findIndex((task) => task.id === taskId);
      projects.value.splice(index, 1);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const deleteselectedProjects = async () => {
  try {
    selectedProjects.value.sort((a, b) => b - a);
    for (const taskId of selectedProjects.value) {
      const response = await axios.delete(
        `project/${taskId}`,
      );
      if (response.status === 200) {
        const index = projects.value.findIndex((task) => task.id === taskId);
        projects.value.splice(index, 1);
      }
    }
    selectedProjects.value = [];
  } catch (error) {
    console.error("Error delete selected projects:", error);
  }
};

watch(searchQuery, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    searchprojects();
  }
});

const searchprojects = async () => {
  try {
    const response = await axios.get(
      `https://662e6c86a7dda1fa378cebbe.mockapi.io/task?search=${searchQuery.value}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    searchedProjects.value = response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
  }
};
const toggleCheckAll = () => {
  if (checkAll.value) {
    selectedProjects.value = [];
  } else {
    selectedProjects.value = projects.value.map(task => task.id);
  }
  checkAll.value = !checkAll.value;
};
const uncheckAll = () => {
  selectedProjects.value = [];
  checkAll.value = false;
};
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
