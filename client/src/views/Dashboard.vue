<template>
  <component :is="dynamicLoad" />
</template>

<script>
import { mapGetters } from 'vuex';
import studentDashboard from '@/views/student/Dashboard.vue';
import adminDashboard from '@/views/admin/Dashboard.vue';

export default {
  name: 'Dashboard',
  computed: {
    dynamicLoad() {
      return this.getUserRole === 'admin' ? adminDashboard : studentDashboard;
    },
    ...mapGetters('user', ['getUserRole']),
  },
};
</script>
