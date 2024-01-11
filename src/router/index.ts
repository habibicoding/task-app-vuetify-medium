// Composables
import {createRouter, createWebHistory} from 'vue-router'
import {HOME_VIEW, TASK_CREATE_VIEW} from "@/constants/appConstants";
import TaskCreatePage from "@/pages/TaskCreatePage.vue";
import TasksOverviewPage from "@/pages/TasksOverviewPage.vue";


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: "",
        name: HOME_VIEW,
        component: TasksOverviewPage,
        props: true
      },
      {
        path: 'new-task',
        name: TASK_CREATE_VIEW,
        component: TaskCreatePage,
        props: true
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
