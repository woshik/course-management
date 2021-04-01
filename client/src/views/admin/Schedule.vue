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
        <div v-if="showError" class="alert alert-danger" role="alert">
          Please, fillup the form
        </div>
        <div class="form-group">
          <label for="courseName">Course Name</label>
          <VSelect
            label="courseName"
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
import 'vue-select/dist/vue-select.css';

export default {
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
      showError: false,
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
        this.showError = false;
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
          this.courseData = response.data;
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
      if (this.selectedCourse && this.startTime && this.endTime) {
        this.calendarOptions.events.push([]);
        this.showError = false;
        this.handleModal(false);
      } else {
        this.showError = true;
      }
    },
  },
};
</script>
