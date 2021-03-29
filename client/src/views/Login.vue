<template>
  <user-login :role="role" />
</template>

<script>
import UserLogin from '@/components/Authentication/Login.vue';

export default {
  name: 'Login',
  props: ['role'],
  components: {
    UserLogin,
  },
};
</script>
