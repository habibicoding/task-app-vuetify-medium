<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});

</script>

<template>
  <div class="loading-container" v-if="isLoading">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<style scoped>

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

</style>
