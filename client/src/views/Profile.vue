<template>
  <div>
    <div class="row">
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
            <date-picker
              v-model="dob"
              ref="datePicker"
              format="DD-MM-YYYY"
              input-class="form-control"
              placeholder="Date of Birth"
              :popup-style="popupStype"
              @open="datePickerOpen"
            >
            </date-picker>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Update</button>
        </form>
      </div>
    </div>
    <div class="row">
      <password-form />
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
import FromValidation from '@/mixins/FormValidation';
import PasswordForm from '@/components/PasswordForm.vue';
import DatePicker from 'vue2-datepicker';
import { mapGetters } from 'vuex';

import 'vue2-datepicker/index.css';

export default {
  name: 'Profile',
  mixins: [FromValidation],
  components: {
    DatePicker,
    PasswordForm,
  },
  data() {
    return {
      UserService: new UserService(),
      fullName: '',
      dob: '',
      popupStype: {},
    };
  },
  formFields: ['fullName', 'dob'],
  mounted() {
    this.fullName = this.getUserFullName;
    this.email = this.getUserEmail;
    if (this.getUserRole === 'student') {
      this.dob = new Date(this.getUserDob);
    }
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
    datePickerOpen() {
      const { left } = this.$refs.datePicker.$el.getBoundingClientRect();
      this.popupStype = { left: `${left}px` };
    },
  },
  computed: {
    ...mapGetters('user', ['getUserFullName', 'getUserEmail', 'getUserDob', 'getUserRole']),
  },
};
</script>
