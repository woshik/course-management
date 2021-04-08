<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Course Schedule</h4>
      <FullCalendar ref="fullCalender" :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid';
import CourseService from '@/services/course.service';

import 'vue-select/dist/vue-select.css';

export default {
  name: 'Schedule',
  components: {
    FullCalendar,
  },
  data() {
    return {
      CourseService: new CourseService(),
      calendarOptions: {
        plugins: [timeGridPlugin],
        handleWindowResize: true,
        headerToolbar: {
          left: '',
          center: '',
          right: '',
        },
        defaultView: 'agendaWeek',
        dayHeaderFormat: { weekday: 'short' },
        events: [],
        allDaySlot: false,
      },
    };
  },
  async mounted() {
    try {
      const events = await this.CourseService.getEventsForStudent();
      events.forEach((event) => {
        this.calendarOptions.events.push({
          title: event.title,
          startTime: event.startTime,
          endTime: event.endTime,
          daysOfWeek: [event.daysOfWeek],
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
