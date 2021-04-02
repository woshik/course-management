<template>
  <div>
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Update Profile</h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <form @submit.prevent="formSubmit">
        <div class="form-group">
          <label for="exampleFormControlInput1">Full Name</label>
          <input type="text" v-model="fullName" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Email</label>
          <input type="text" :value="getUserEmail" class="form-control" disabled />
        </div>

        <div class="form-group" v-if="getUserRole === 'student'">
          <label for="exampleFormControlInput1">Date of Birth</label>
          <input type="text" class="form-control" v-model="dob" />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Update</button>
      </form>
    </div>
    <password-form />
  </div>
</template>

<script>
import UserService from '@/services/user.service';
import FromValidation from '@/mixins/FormValidation';
import PasswordForm from '@/components/PasswordForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  mixins: [FromValidation],
  components: {
    PasswordForm,
  },
  data() {
    return {
      UserService: new UserService(),
      fullName: '',
      dob: '',
    };
  },
  formFields: ['fullName', 'dob'],
  mounted() {
    this.fullName = this.getUserFullName;
    this.dob = this.getUserDob;
    this.email = this.getUserEmail;
  },
  methods: {
    async formSubmit() {
      if (this.fullName === this.getUserFullName && this.dob === this.getUserDob) {
        return;
      }

      try {
        await this.UserService.userUpdate(this.formData);
        this.$store.dispatch('user/updateUserData', this.formData);
        this.showMessage({
          success: true,
          message: 'Successfully updated.',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
  computed: {
    ...mapGetters('user', ['getUserFullName', 'getUserEmail', 'getUserDob', 'getUserRole']),
  },
};
</script>
