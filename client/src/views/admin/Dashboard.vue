<template>
  <Layout>
    <template v-slot:menu-item>
      <li class="active">
        <router-link to="#">
          <font-awesome-icon icon="tachometer-alt" />
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <font-awesome-icon icon="tachometer-alt" />
          Manage Course
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <font-awesome-icon icon="tachometer-alt" />
          Manage Student
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <font-awesome-icon icon="tachometer-alt" />
          Manage Schedule
        </router-link>
      </li>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Dashboard/Layout.vue';

export default {
  name: 'Dashboard',
  components: {
    Layout,
  },
};
</script>
