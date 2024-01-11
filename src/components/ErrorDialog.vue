<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {AxiosError} from "axios";

const props = defineProps({
  axiosError: Object as PropType<AxiosError>,
  modelValue: Boolean,
});

const isDialogActive = ref(false);

const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, newVal => {
  isDialogActive.value = newVal;
});

const closeDialog = () => {
  isDialogActive.value = false;
  emit('update:modelValue', false);
};

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogActive" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">
          An error occurred!
        </v-card-title>
        <v-card-text>
          HTTP Status Code: {{ props.axiosError.response?.status || 'N/A' }}
        </v-card-text>
        <v-card-text>
          Error message: {{ props.axiosError.message || 'No error message available' }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="closeDialog">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
