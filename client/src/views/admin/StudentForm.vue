<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">{{ formLabel }} Student</h4>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
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
          <input
            type="text"
            class="form-control"
            id="dob"
            placeholder="Date of Birth"
            autocomplete="off"
            v-model.trim="dob"
            @focus="changeTextFieldToDate"
            @blur="changeDateFieldToText"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder="Email"
            autocomplete="off"
            v-model.trim="email"
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

export default {
  name: 'StudentForm',
  mixins: [FromValidation],
  data() {
    return {
      fullName: '',
      dob: '',
      email: '',
      StudentService: new StudentService(),
    };
  },
  formFields: ['fullName', 'dob', 'email'],
  async mounted() {
    if (this.$route.params.id) {
      const { courseName, courseCode } = await this.StudentService.getById(this.$route.params.id);
      this.courseName = courseName;
      this.courseCode = courseCode;
    }
  },
  methods: {
    async submit() {
      try {
        if (this.$route.params.id) {
          await this.StudentService.update(this.$route.params.id, this.formData);
          this.$router.push({ name: 'Student' });
        } else {
          await this.StudentService.add(this.formData);
          this.$router.push({ name: 'Student' });
        }
      } catch (error) {
        this.showMessage({
          error: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    changeTextFieldToDate(e) {
      e.target.type = 'date';
    },
    changeDateFieldToText(e) {
      e.target.type = 'text';
    },
  },
  computed: {
    formLabel() {
      return this.$route.params.id ? 'Edit' : 'Add';
    },
  },
};
</script>
