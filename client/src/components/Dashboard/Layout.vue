<template>
  <div class="wrapper">
    <side-bar>
      <template v-slot:user-type>
        <slot name="user-type">
          Admin
        </slot>
      </template>

      <template v-slot:menu-item>
        <slot name="menu-item" />
      </template>
    </side-bar>

    <div class="content">
      <nav-bar />
      <div class="container-fluid">
        <div class="row">
          <slot name="main-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';

import '@/assets/css/style.css';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: stretch;
}

.content {
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  overflow: hidden;
  width: 100%;
}
</style>
