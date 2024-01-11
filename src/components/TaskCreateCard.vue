<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useField, useForm} from 'vee-validate'
import {MIN_TASK_DESCRIPTION} from "@/constants/appConstants";
import {Priority, TaskCreateRequest} from "@/dtos/taskDto";

const {handleSubmit, handleReset} = useForm({
  validationSchema: {
    description(value) {
      if (value?.length >= MIN_TASK_DESCRIPTION) return true
      return 'Description needs to be at least 3 characters.'
    },
    select(value) {
      if (value) return true
      return 'Select a priority!.'
    },
  },
})

const description = useField('description')
const select = useField('select')
const isReminderSet = useField('isReminderSet')

const priority = ref([
  Priority[Priority.LOW],
  Priority[Priority.MEDIUM],
  Priority[Priority.HIGH],
])

const request = reactive<TaskCreateRequest>({
  description: description.value.value,
  isReminderSet: isReminderSet.value.value,
  isTaskOpen: true,
  priority: select.value.value,
});

const emit = defineEmits(['create-new-task']);

const submit = handleSubmit(values => {
  request.description = values.description;
  request.isReminderSet = values.isReminderSet !== undefined;
  request.priority = values.select;
  emit('create-new-task', request);
})

</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="description.value.value"
      :counter="10"
      :error-messages="description.errorMessage.value"
      label="Description"
    />

    <v-checkbox
      v-model="isReminderSet.value.value"
      :error-messages="isReminderSet.errorMessage.value"
      value="1"
      label="Reminder"
      type="checkbox"
    />

    <v-select
      v-model="select.value.value"
      :items="priority"
      :error-messages="select.errorMessage.value"
      label="Priority"
    />

    <v-btn class="mb-4 clear-btn" @click="handleReset">clear</v-btn>

    <v-btn class="mb-4 submit-btn" type="submit">submit</v-btn>
  </form>
</template>
