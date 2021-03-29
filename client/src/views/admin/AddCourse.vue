<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Add Course</h4>
       <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="courseName">Course Name</label>
          <input
            type="text"
            class="form-control"
            id="courseName"
            placeholder="Course Name"
            autocomplete="off"
            v-model.trim="courseName"
          />
        </div>

        <div class="form-group">
          <label for="courseCode">Course Code</label>
          <input
            type="text"
            class="form-control"
            id="courseCode"
            placeholder="Course Code"
            autocomplete="off"
            v-model.trim="courseCode"
          />
        </div>

        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';

export default {
  name: 'AddCourse',
  mixins: [FromValidation],
  data() {
    return {
      courseName: '',
      courseCode: '',
      CourseService: new CourseService(),
    };
  },
  formFields: ['courseName', 'courseCode'],
  methods: {
    async submit() {
      try {
        await this.CourseService.add(this.formData);
        this.$router.push({ name: 'Course' });
      } catch (error) {
        this.showMessage({
          error: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
};
</script>
