<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <button class="btn btn-primary mb-3 float-right" @click="addCourse">
        Add Course
      </button>
      <vue-table
        ref="vuetable"
        :fields="tableFields"
        :table-data="tabeleData"
        :total-row="totalRow"
        @edit-row="editRow"
        @delete-row="deleteRow"
        @api-call="callToAPi"
      >
        <button class="btn btn-success btn-sm m-1" @click="assignCourse(rowData)">
          <font-awesome-icon icon="address-book" /> Assign Course
        </button>
      </vue-table>
    </div>
    <modal-window :openModal="showModal" />
  </div>
</template>

<script>
import CourseService from '@/services/course.service';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';

export default {
  name: 'Course',
  components: {
    VueTable,
    ModalWindow: () => import('@/components/Modal.vue'),
  },

  data() {
    return {
      index: 1,
      CourseService: new CourseService(),
      tableFields: [
        { name: VuetableFieldSequence, title: 'No.' },
        { name: 'courseName', title: 'Course Name' },
        { name: 'courseCode', title: 'Course Code' },
        { name: 'actions', title: 'Actions', width: '30%' },
      ],
      tabeleData: [],
      totalRow: 0,
      showModal: false,
    };
  },
  methods: {
    async callToAPi(reqData) {
      const response = await this.CourseService.get(reqData);
      this.tabeleData = response.data;
      this.totalRow = response.total;
      this.$nextTick(() => {
        this.$refs.vuetable.updateTable();
      });
    },
    addCourse() {
      this.$router.push({ name: 'AddCourse' });
    },
    editRow(id) {
      console.log(id);
    },
    deleteRow(id) {
      this.showModal = true;
      console.log(this.showModal);
      console.log(id, 'delete');
    },
  },
};
</script>
