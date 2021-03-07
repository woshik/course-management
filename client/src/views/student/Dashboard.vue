<template>
  <Layout>
    <template v-slot:user-type>
      Student
    </template>
    <template v-slot:menu-item>
      <li class="active">
        <router-link to="#">
          <font-awesome-icon icon="tachometer-alt" />
          Dashboard
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
