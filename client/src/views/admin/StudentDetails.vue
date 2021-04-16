<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">User Details</h4>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" class="form-control" :value="fullName" disabled />
        </div>

        <div class="form-group">
          <label>Date of Birth</label>
          <input type="text" class="form-control" :value="dob" disabled />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" :value="email" disabled />
        </div>

        <div class="form-group">
          <label>Activity Assigned</label>
          <select multiple class="form-control" disabled>
            <option v-for="(course, index) in courses" :key="index">{{ course }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/student.service';

export default {
  name: 'StudentDetails',
  data() {
    return {
      fullName: '',
      dob: '',
      email: '',
      courses: [],
      StudentService: new StudentService(),
    };
  },
  async mounted() {
    try {
      const response = await this.StudentService.getStudentAndCourseDataById(this.$route.params.id);
      const date = new Date(response.dob);
      this.fullName = response.fullName;
      this.dob = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      this.email = response.email;
      this.courses = response?.courses_details?.map(
        (course) => `${course.courseName } (${ course.courseName })`,
      ) ?? [];
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
