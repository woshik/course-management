<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <div class="clearfix">
        <button class="btn btn-primary mb-3 float-right" @click="handleModal">
          Add Course Schedule
        </button>
      </div>
      <FullCalendar ref="fullCalender" :options="calendarOptions" />

      <modal-window v-if="showModal" @open="handleModal">
        <template v-slot:title> Add Schedule </template>
        <div
          v-if="messageDisplay"
          class="alert"
          :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
          role="alert"
        >
          {{ messageDisplay }}
        </div>
        <div class="form-group">
          <label for="courseName">Course Name</label>
          <VSelect
            :options="courseData"
            :filterable="false"
            @option:selected="selectedData"
            @search="fetchCourseData"
          >
            <template slot="no-options">
              type to search course...
            </template>
          </VSelect>
        </div>
        <div class="form-group">
          <label for="fullName">Start Time</label>
          <input
            type="time"
            class="form-control"
            id="fullName"
            v-model.trim="startTime"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="fullName">End Time</label>
          <input
            type="time"
            class="form-control"
            id="fullName"
            v-model.trim="endTime"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label for="fullName">Description</label>
          <textarea class="form-control" v-model.trim="description" />
        </div>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="addCourseSchedule">Add</button>
        </template>
      </modal-window>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';

import 'vue-select/dist/vue-select.css';

export default {
  name: 'Schedule',
  mixins: [FromValidation],
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    ModalWindow: () => import('@/components/Modal.vue'),
    VSelect: () => import('vue-select'),
  },
  data() {
    return {
      showModal: false,
      CourseService: new CourseService(),
      courseData: [],
      timer: null,
      selectedCourse: null,
      startTime: '',
      endTime: '',
      description: '',
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        handleWindowResize: true,
        headerToolbar: {
          left: '',
          center: '',
          right: '',
        },
        defaultView: 'agendaWeek',
        dayHeaderFormat: { weekday: 'short' },
        editable: true,
        events: [],
      },
    };
  },
  methods: {
    handleModal(open) {
      this.showModal = open;
      if (open === false) {
        this.selectedCourse = null;
        this.startTime = null;
        this.endTime = null;
        this.description = null;
      }
    },
    fetchCourseData(search, loading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        try {
          loading(true);
          const response = await this.CourseService.get({ perPage: 5, search_keyword: search });
          this.courseData = response?.data?.map((course) => ({
            ...course,
            label: `${course.courseName } (${ course.courseName })`,
          })) ?? [];
          loading(false);
        } catch (error) {
          this.courseData = [];
          loading(false);
        }
      }, 500);
    },
    selectedData(selectedData) {
      this.selectedCourse = selectedData;
    },
    addCourseSchedule() {
      console.log(this.startTime, this.endTime);
      if (this.selectedCourse && this.startTime && this.endTime) {
        this.calendarOptions.events.push({
          title: this.selectedCourse.label,
          startTime: this.startTime,
          endTime: this.endTime,
          daysOfWeek: [0],
          description: this.description ?? '',
          editable: true,
        });
        this.handleModal(false);
      } else {
        this.showMessage({
          message: 'Please, fillup the form',
        });
      }
    },
  },
};
</script>
