<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Course Schedule</h4>
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FromValidation from '@/mixins/FormValidation';

import 'vue-select/dist/vue-select.css';

export default {
  name: 'Schedule',
  mixins: [FromValidation],
  components: {
    FullCalendar,
  },
  data() {
    return {
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
};
</script>
