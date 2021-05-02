import Login from './components/Login.vue';
import Home from './components/Home.vue';

export const routes = [
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/',
    component: Login
  }
];