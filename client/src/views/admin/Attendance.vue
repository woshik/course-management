<template>
  <div>
    <div class="row">
      <div class="outer-w3-agile col-xl">
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
            <label for="courseName">Course Name</label>
            <VSelect
              :options="courseData"
              :filterable="false"
              placeholder="Select Course"
              @option:selected="selectedData"
              @search="fetchCourseData"
            >
              <template slot="no-options">
                type to search course...
              </template>
            </VSelect>
          </div>
          <div class="form-group">
            <label for="courseName">Attendance Option</label>
            <select
              class="form-control"
              v-model.number="selectedAttendanceOption"
              @change="attendanceOption"
            >
              <option value="">Select Option</option>
              <option value="1">View Attendance Sheet</option>
              <option value="2">Take Attendance </option>
            </select>
          </div>

          <div v-if="selectedAttendanceOption" class="form-group">
            <label>
              {{
                selectedAttendanceOption === 1
                  ? "Select Date Range (Please select 1 month range)"
                  : "Take Attendance "
              }}
            </label>
            <date-picker
              v-if="selectedAttendanceOption === 1"
              v-model="dateRange"
              type="date"
              ref="dateRangePicker"
              format="DD-MM-YYYY"
              input-class="form-control"
              placeholder="Please select 1 month range"
              :popup-style="popupStype"
              @open="datePickerOpen('dateRangePicker')"
              @close="datePickerClose"
              range
            />
            <date-picker
              v-if="selectedAttendanceOption === 2"
              v-model="attendanceDate"
              type="date"
              ref="datePicker"
              format="MMM DD, YYYY"
              input-class="form-control"
              :popup-style="popupStype"
              @open="datePickerOpen('datePicker')"
              @close="datePickerClose"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <div v-if="studentList.length" class="row">
      <div class="outer-w3-agile col-xl mt-3">
        <div v-if="selectedAttendanceOption === 1" class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Student Name</th>
                <th v-for="(date, index) in dateList" :key="index">{{ date }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, studentIndex) in studentList" :key="studentIndex">
                <td>{{ student.fullName }} ({{ student.email }})</td>
                <td v-for="(date, dateIndex) in dateList" :key="dateIndex">
                  <font-awesome-icon
                    v-if="checkDateStudentIdExist(date, student._id)"
                    icon="check"
                  />
                  <font-awesome-icon v-else icon="times" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="selectedAttendanceOption === 2" class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Student Name</th>
                <th v-for="(date, index) in dateList" :key="index">{{ date }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, studentIndex) in studentList"
                :key="studentIndex"
                @click="rowSelected(student._id)"
              >
                <td>{{ student.fullName }} ({{ student.email }})</td>
                <td>
                  <input type="checkbox" :value="student._id" v-model="attendanceList" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" class="btn btn-primary" @click="submitAttendance">
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import VSelect from 'vue-select';
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';
import dayjs from 'dayjs';

import 'vue2-datepicker/index.css';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'Attendance',
  mixins: [FromValidation],
  components: {
    DatePicker,
    VSelect,
  },
  data() {
    return {
      CourseService: new CourseService(),
      courseData: [],
      selectedAttendanceOption: '',
      selectedCourse: null,
      popupStype: {},
      dateRange: '',
      attendanceDate: new Date(),
      studentList: [],
      dateList: [],
      attendanceList: [],
      selectedDateAttendanceList: {},
    };
  },
  methods: {
    checkDateStudentIdExist(date, id) {
      return this.selectedDateAttendanceList[date]?.includes(id);
    },
    selectedData(selectedData) {
      this.resetData();
      this.selectedCourse = selectedData;
    },
    fetchCourseData(search, loading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        try {
          loading(true);
          const response = await this.CourseService.get({ perPage: 5, search_keyword: search });
          this.courseData = response?.data?.map((course) => ({
              ...course,
              label: `${course.courseName} (${course.courseName})`,
            })) ?? [];
          loading(false);
        } catch (e) {
          this.courseData = [];
          loading(false);
        }
      }, 500);
    },
    datePickerOpen(ref) {
      const { left } = this.$refs[ref].$el.getBoundingClientRect();
      this.popupStype = { left: `${left}px` };
    },
    datePickerClose() {
      this.resetData();
    },
    attendanceOption() {
      this.resetData();
      if (!this.selectedCourse) {
        this.showMessage({
          message: 'Please, select a course name',
        });
      }
    },
    formSubmit() {
      if (this.selectedCourse) {
        this.resetData();
        if (this.selectedAttendanceOption === 1) {
          this.generateTimeSheetToShowAttendance();
        } else if (this.selectedAttendanceOption === 2) {
          this.generateTimeSheetToTakeAttendance();
        }
      } else {
        this.showMessage({
          message: 'Please, select a course name',
        });
      }
    },
    resetData() {
      this.studentList = [];
      this.dateList = [];
      this.attendanceList = [];
    },
    async generateTimeSheetToShowAttendance() {
      let startDate = dayjs(this.dateRange[0]);
      const endDate = dayjs(this.dateRange[1]);
      if (endDate.diff(startDate, 'day') < 30) {
        try {
          const student = await this.CourseService.getAssignStudnet(this.selectedCourse._id);
          const attendance = await this.CourseService.getAttendance(this.selectedCourse._id, {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
          });
          this.studentList = student?.student_details ?? [];
          this.selectedDateAttendanceList = attendance;
          for (let i = 0; endDate.diff(startDate, 'day') >= 0; i += 1) {
            this.dateList.push(startDate.format('MMM DD'));
            startDate = startDate.add(1, 'day');
          }
        } catch (error) {
          this.resetData();
        }
      } else {
        this.showMessage({
          message: 'Please select maximum 1 month range',
        });
      }
    },
    async generateTimeSheetToTakeAttendance() {
      try {
        const response = await this.CourseService.getAssignStudnet(this.selectedCourse._id);
        this.studentList = response?.student_details ?? [];
        this.dateList.push(dayjs(this.attendanceDate).format('MMM DD'));
      } catch (error) {
        console.log(error);
        this.resetData();
      }
    },
    rowSelected(id) {
      const position = this.attendanceList.indexOf(id);
      if (position === -1) {
        this.attendanceList.push(id);
      } else {
        this.attendanceList.splice(position, 1);
      }
    },
    async submitAttendance() {
      try {
        const data = {
          date: dayjs(this.attendanceDate).format('YYYY-MM-DD'),
          attendanceList: this.attendanceList,
        };

        await this.CourseService.studentAttendance(this.selectedCourse._id, data);
        this.showMessage({
          success: true,
          message: 'Attendance Successfully Taken',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
};
</script>

<style scoped>
.table td:first-child{
  text-align: left;
}

.table th, .table td {
  text-align: center;
}
</style>
