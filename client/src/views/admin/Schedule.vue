<template>
  <div>
    <div class="row">
      <div class="outer-w3-agile col-xl mt-3">
        <div
          v-if="messageDisplay"
          class="alert"
          :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
          role="alert"
        >
          {{ messageDisplay }}
        </div>
        <div>
          <button class="btn btn-success m-1 float-right" @click="saveEvents">
            Save Events
          </button>
          <button class="btn btn-primary m-1 float-right" @click="handleModal">
            Add Course Schedule
          </button>
          <div class="clearfix"></div>
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
            <label for="fullName">Select Day</label>
            <select class="form-control" v-model.number="selectedDay">
              <option v-for="(day, index) in days" :key="index" :value="day.value">
                {{ day.label }}
              </option>
            </select>
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
          <template v-slot:footer>
            <button class="btn btn-primary" @click="addCourseSchedule">Add</button>
          </template>
        </modal-window>
      </div>
    </div>
    <PopOver v-model="showPopover" :position-left="positionX" :position-top="positionY">
      <button class="btn btn-sm custom-btn" @click="deleteEvent">
        Delete
      </button>
    </PopOver>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CourseService from '@/services/course.service';
import FromValidation from '@/mixins/FormValidation';
import { days } from '@/assets/static';

import dayjs from 'dayjs';

import 'vue-select/dist/vue-select.css';

export default {
  name: 'Schedule',
  mixins: [FromValidation],
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    ModalWindow: () => import('@/components/Modal.vue'),
    VSelect: () => import('vue-select'),
    PopOver: () => import('@/components/PopOver'),
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
      selectedDay: '',
      calendarApi: null,
      clickEvent: null,
      showPopover: false,
      positionX: 0,
      positionY: 0,
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
        droppable: true,
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: true,
        },
        eventClick: this.handleClick,
        eventDragStart: this.handleDrage,
        allDaySlot: false,
      },
      days,
    };
  },
  formFields: ['startTime', 'endTime', 'selectedCourse', 'selectedDay'],
  async mounted() {
    window.addEventListener('resize', this.closePopOver);
    this.calendarApi = this.$refs.fullCalender.getApi();

    try {
      const events = await this.CourseService.getEvents();
      events.forEach((event) => {
        if (Array.isArray(event.events)) {
          event.events.forEach((item) => {
            this.calendarOptions.events.push({
              title: item.title,
              startTime: item.startTime,
              endTime: item.endTime,
              daysOfWeek: [item.daysOfWeek],
              classNames: [event._id],
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.closePopOver);
  },
  methods: {
    handleModal(open) {
      this.showModal = open;
    },
    openPopOver() {
      this.showPopover = true;
    },
    closePopOver() {
      this.showPopover = false;
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
      if (
        this.selectedCourse
        && this.startTime
        && this.endTime
        && Number.isInteger(this.selectedDay)
      ) {
        this.calendarApi.addEvent({
          title: this.selectedCourse.label,
          startTime: this.startTime,
          endTime: this.endTime,
          daysOfWeek: [this.selectedDay],
          classNames: [this.selectedCourse._id],
        });

        this.handleModal(false);
        this.resetAll();
      } else {
        this.showMessage({
          message: 'Please, fillup the form',
        });
      }
    },
    async saveEvents() {
      const events = this.calendarApi.getEvents();

      const allEvent = events.map((event) => ({
        id: event.classNames[0],
        title: event.title,
        startTime: dayjs(event.start).format('HH:mm'),
        endTime: dayjs(event.end).format('HH:mm'),
        daysOfWeek: dayjs(event.start).day(),
      }));

      try {
        await this.CourseService.addEvents({ data: allEvent });
        this.showMessage({
          success: true,
          message: 'Course events successfully updated.',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    handleClick(info) {
      this.openPopOver();
      this.positionX = info.jsEvent.clientX;
      this.positionY = info.jsEvent.clientY;
      this.clickEvent = info;
    },
    deleteEvent() {
      if (this.clickEvent) {
        this.clickEvent.event.remove();
        this.closePopOver();
      }
    },
    handleDrage() {
      this.closePopOver();
    },
  },
};
</script>

<style scoped>
.custom-btn {
  color: white;
  outline: unset;
  border: unset;
}
</style>
