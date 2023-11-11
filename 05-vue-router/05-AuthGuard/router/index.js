import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      name: 'index',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      name: 'create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      name: 'meetup',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});
router.beforeEach((to, from) => {
  if (isAuthenticated() && to.meta.requireGuest) {
      return {name: 'index'}
    } else {
      if(!isAuthenticated() && to.meta.requireAuth) {
        return { name: 'login', query: {from: to.path} }
      }
  } 
})

export { router };
