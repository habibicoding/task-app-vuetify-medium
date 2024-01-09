<script setup lang="ts">
import router from "@/router";
import {computed, ref} from 'vue'
import {useDisplay} from 'vuetify'
import {ALL_TASKS, CLOSED_TASKS, OPEN_TASKS, TASK_CREATE_VIEW} from "@/constants/appConstants";

const display = useDisplay()

const isMobileDevice = computed(() => {
  return display.mobile
})

const links: string[] = [OPEN_TASKS, CLOSED_TASKS, ALL_TASKS]
const drawer = ref(false);
const selectedLink = ref('');

const emit = defineEmits(['task-type-selected', 'logo-clicked']);

const selectTaskType = (taskType: string) => {
  selectedLink.value = taskType;
  emit('task-type-selected', taskType);
  drawer.value = false;
};

const logoClicked = () => {
  emit('logo-clicked');
};

const createTask = () => {
  router.push({name: TASK_CREATE_VIEW}).then();
  drawer.value = false;
};

</script>

<template>
  <v-app-bar flat>
    <!-- Container for logo and menu items -->
    <v-container class="d-flex align-center justify-center">
      <!-- Logo -->
      <v-app-bar-title>
        <v-img src="../assets/logo.png" max-height="70" max-width="70" @click="logoClicked"></v-img>
      </v-app-bar-title>

      <!-- Menu items for desktop view -->
      <template v-if="!isMobileDevice.value">
        <v-btn
          v-for="link in links"
          :key="link"
          @click="selectTaskType(link)"
          :text="link"
          variant="text"
          :class="{ 'selected-link': link === selectedLink }">
          {{ link }}
        </v-btn>

        <v-spacer/>

        <v-btn
          class="text-none text-subtitle-1"
          color="#05B990"
          size="small"
          variant="outlined"
          @click="createTask">
          Create Task
        </v-btn>
      </template>

      <!-- Hamburger icon for mobile view -->
      <v-app-bar-nav-icon v-if="isMobileDevice.value" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <!-- Navigation drawer for mobile view -->
  <v-navigation-drawer v-model="drawer" temporary v-if="isMobileDevice.value">
    <v-list>
      <v-list-item
        v-for="link in links"
        :key="link"
        @click="selectTaskType(link)"
        :class="{ 'selected-link': link === selectedLink }">
        <v-list-item-title>{{ link }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="createTask">
        <v-list-item-title>Create Task</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

.selected-link {
  color: green !important;
}

</style>
