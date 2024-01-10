// Composables
import {createRouter, createWebHistory} from 'vue-router'
import Tasks from "@/pages/Tasks.vue";
import {HOME_VIEW} from "@/constants/appConstants";


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: "",
        name: HOME_VIEW,
        component: Tasks,
        props: true
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
