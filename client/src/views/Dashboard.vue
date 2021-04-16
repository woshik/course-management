<template>
  <component :is="dynamicLoad" />
</template>

<script>
import { mapGetters } from 'vuex';
import Schedule from '@/views/Schedule.vue';
import adminDashboard from '@/views/admin/Dashboard.vue';

export default {
  name: 'Dashboard',
  computed: {
    dynamicLoad() {
      return this.getUserRole === 'admin' ? adminDashboard : Schedule;
    },
    ...mapGetters('user', ['getUserRole']),
  },
};
</script>
