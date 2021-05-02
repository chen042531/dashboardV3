import Login from './components/Login.vue';
import Home from './components/Home.vue';

export const routes = [
  {
    path: '/Home',
    name:"Home",
    component: Home,
    props: true
  },
  {
    path: '/',
    name:"Login",
    component: Login,
    props: true
  }
];