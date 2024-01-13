<script setup lang="ts">
import {ref, watch, defineProps} from 'vue';

const props = defineProps({
  modelValue: Boolean,
  taskDescription: String
});

const isDialogActive = ref(false);
const emits = defineEmits(['confirm-delete', 'update:modelValue']);

watch(() => props.modelValue, newVal => {
  isDialogActive.value = newVal;
});

const confirmDelete = () => {
  emits('confirm-delete');
  isDialogActive.value = false;
  emits('update:modelValue', false);
};

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogActive" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this task?
        </v-card-title>
        <v-card-text>
          Task Description: {{ props.taskDescription }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red-darken-1"
            variant="text"
            @click="isDialogActive = false;
            emits('update:modelValue', false);">
            Cancel
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="confirmDelete">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
