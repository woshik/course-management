<template>
  <student-login role="student" />
</template>

<script>
import StudentLogin from '@/components/Authentication/Login.vue';

export default {
  name: 'Login',
  components: {
    StudentLogin,
  },
};
</script>
