<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Assign Activity</h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="courseName">Select User</label>
          <VSelect
            multiple
            :options="studentData"
            :filterable="false"
            v-model="selectedValue"
            @search="fetchStudentData"
          >
            <template slot="no-options">
              type to search user...
            </template>
          </VSelect>
        </div>
        <button class="btn btn-primary">Assign</button>
      </form>
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/student.service';
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CourseAssign',
  mixins: [FromValidation],
  components: {
    VSelect: () => import('vue-select'),
  },
  data() {
    return {
      studentData: [],
      selectedValue: [],
      StudentService: new StudentService(),
      CourseService: new CourseService(),
      timer: null,
    };
  },
  async mounted() {
    try {
      const response = await this.CourseService.getAssignStudnet(this.$route.params.id);
      this.selectedValue = response?.student_details?.map((student) => ({
        _id: student._id,
        label: `${student.fullName} (${student.email})`,
        email: student.email,
      })) ?? [];
    } catch (error) {
      this.selectedValue = [];
    }
  },
  methods: {
    fetchStudentData(search, loading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        try {
          loading(true);
          const response = await this.StudentService.get({ perPage: 5, search_keyword: search });
          this.studentData = response.data.map((item) => ({
            _id: item._id,
            label: `${item.fullName} (${item.email})`,
            email: item.email,
          })) ?? [];
          loading(false);
        } catch (error) {
          this.studentData = [];
          loading(false);
        }
      }, 500);
    },
    async submitForm() {
      try {
        const ids = this.selectedValue.map((i) => i._id);
        await this.CourseService.assignCourse(this.$route.params.id, { ids });
        this.showMessage({
          success: true,
          message: 'Students Successfully Assigned',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
      console.log(this.selectedValue);
    },
  },
};
</script>
