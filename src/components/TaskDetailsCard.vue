<script setup lang="ts">
import {PropType} from "vue";
import {TaskFetchResponse} from "@/dtos/taskDto";
import {formatDate} from "@/composables/formatDate";

defineProps({
  task: Object as PropType<TaskFetchResponse>
});

const emit = defineEmits(['back-clicked']);

const handleBackClick = () => {
  emit('back-clicked');
};

</script>

<template>
  <v-card class="mx-auto center-card-text">
    <v-list lines="two">
      <v-list-subheader>Task Detail</v-list-subheader>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task ID: </span> {{ task.id }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Description: </span> {{ task.description }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Reminder set: </span> {{ task.isReminderSet }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Task open: </span> {{ task.isTaskOpen }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Created on: </span> {{ formatDate(task.createdOn) }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:subtitle>
          <span class="font-weight-bold">Priority: </span> {{ task.priority }}
        </template>
      </v-list-item>
      <v-divider inset></v-divider>

    </v-list>
  </v-card>

  <br />
  <v-btn block class="clear-btn" @click="handleBackClick">back</v-btn>

</template>

<style scoped>

.center-card-text {
  text-align: center;
}

</style>
