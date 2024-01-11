<script setup lang="ts">
import {useTaskNavigation} from '@/composables/useTaskNavigation';
import {ref} from "vue";
import {AxiosError} from "axios";
import {generateTask} from "@/composables/generateTask";
import {TaskCreateRequest} from "@/dtos/taskDto";
import MainBackground from "@/components/MainBackground.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import Navbar from "@/components/Navbar.vue";
import TaskCreateCard from "@/components/TaskCreateCard.vue";


const {handleTaskTypeSelected, logoClicked, navigateToTasksView} = useTaskNavigation();
const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();


const createTask = (request: TaskCreateRequest) => {
  generateTask(request, isLoading, isNetworkError, axiosError, navigateToTasksView);
};

</script>

<template>
  <Navbar @task-type-selected="handleTaskTypeSelected" @logo-clicked="logoClicked"/>
  <MainBackground>
    <TaskCreateCard @create-new-task="createTask"/>
    <LoadingSpinner :is-loading="isLoading"/>
    <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError"/>
  </MainBackground>
</template>

