<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">{{ formLabel }} Course</h4>
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

        <button type="submit" class="btn btn-primary">{{ formLabel }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';

export default {
  name: 'CourseForm',
  mixins: [FromValidation],
  data() {
    return {
      courseName: '',
      courseCode: '',
      CourseService: new CourseService(),
    };
  },
  formFields: ['courseName', 'courseCode'],
  async mounted() {
    if (this.$route.params.id) {
      const { courseName, courseCode } = await this.CourseService.getById(this.$route.params.id);
      this.courseName = courseName;
      this.courseCode = courseCode;
    }
  },
  methods: {
    async submit() {
      try {
        if (this.$route.params.id) {
          await this.CourseService.update(this.$route.params.id, this.formData);
          this.$router.push({ name: 'Course' });
        } else {
          await this.CourseService.add(this.formData);
          this.resetAll();
          this.showMessage({
            success: true,
            message: 'Course successfully added.',
          });
        }
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
  computed: {
    formLabel() {
      return this.$route.params.id ? 'Edit' : 'Add';
    },
  },
};
</script>
