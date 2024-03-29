<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">{{ formLabel }} User</h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            class="form-control"
            id="fullName"
            placeholder="Full Name"
            autocomplete="off"
            v-model.trim="fullName"
          />
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <date-picker
            v-model="dob"
            ref="datePicker"
            input-class="form-control"
            format="DD-MM-YYYY"
            placeholder="Date of Birth"
            :popup-style="popupStype"
            @open="datePickerOpen"
          />
        </div>

        <div v-if="!isEditPage" class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder="Email"
            autocomplete="off"
            v-model.trim="email"
            :disabled="isEditPage"
          />
        </div>

        <div v-if="!isEditPage" class="form-group">
          <label for="password">Password</label>
          <input
            type="text"
            class="form-control"
            id="password"
            value="123456"
            autocomplete="off"
            disabled
          />
        </div>

        <button type="submit" class="btn btn-primary">{{ formLabel }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/student.service';
import FromValidation from '@/mixins/FormValidation';
import DatePicker from 'vue2-datepicker';

import 'vue2-datepicker/index.css';

export default {
  name: 'StudentForm',
  mixins: [FromValidation],
  components: {
    DatePicker,
  },
  data() {
    return {
      fullName: '',
      dob: '',
      email: '',
      popupStype: {},
      StudentService: new StudentService(),
    };
  },
  formFields: ['fullName', 'dob', 'email'],
  async mounted() {
    if (this.isEditPage) {
      try {
        const { fullName, dob } = await this.StudentService.getById(this.$route.params.id);
        this.fullName = fullName;
        this.dob = new Date(dob);
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    async submit() {
      try {
        if (this.isEditPage) {
          await this.StudentService.update(this.$route.params.id, this.formData);
          this.$router.push({ name: 'Student' });
        } else {
          await this.StudentService.add(this.formData);
          this.resetAll();
          this.showMessage({
            success: true,
            message: 'Student successfully added.',
          });
        }
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    changeTextFieldToDate(e) {
      e.target.type = 'date';
    },
    changeDateFieldToText(e) {
      e.target.type = 'text';
    },
    datePickerOpen() {
      const { left } = this.$refs.datePicker.$el.getBoundingClientRect();
      this.popupStype = { left: `${left}px` };
    },
  },
  computed: {
    formLabel() {
      return this.$route.params.id ? 'Edit' : 'Add';
    },
    isEditPage() {
      return !!this.$route.params.id;
    },
  },
};
</script>
