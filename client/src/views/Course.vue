<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <button v-if="isAdmin" class="btn btn-primary mb-3 float-right" @click="addCourse">
        Add Activity
      </button>
      <vue-table
        ref="vuetable"
        :fields="tableFields"
        :table-data="tabeleData"
        :total-row="totalRow"
        :action-button-show="isAdmin"
        @edit-row="editRow"
        @delete-row="deleteRow"
        @api-call="callToAPi"
      >
        <template v-slot:default="{ rowData }">
          <button class="btn btn-success btn-sm m-1" @click="assignCourse(rowData)">
            <font-awesome-icon icon="address-book" /> Assign Activity
          </button>
        </template>
      </vue-table>
    </div>
    <modal-window v-if="isAdmin && showModal" @open="handleModal">
      <template v-slot:title> Delete Activity </template>
      You want to really delete this Activity?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="deleteRow(null)">Delete</button>
      </template>
    </modal-window>
  </div>
</template>

<script>
import CourseService from '@/services/course.service';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';
import { mapGetters } from 'vuex';

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
        { name: 'courseName', title: 'Activity Name' },
        { name: 'courseCode', title: 'Activity Code' },
        { name: 'student', title: 'Assigned Activity' },
        { name: 'actions', title: 'Actions', width: '30%' },
      ],
      tabeleData: [],
      totalRow: 0,
      showModal: false,
      selectedId: '',
    };
  },
  methods: {
    async callToAPi(reqData) {
      try {
        const response = await this.CourseService.get(reqData);
        this.tabeleData = response.data;
        this.totalRow = response.total;
        this.$nextTick(() => {
          this.$refs.vuetable.updateTable();
        });
      } catch (error) {
        console.log(error);
      }
    },
    addCourse() {
      this.$router.push({ name: 'AddCourse' });
    },
    editRow(id) {
      this.$router.push({ name: 'EditCourse', params: { id } });
    },
    async deleteRow(id) {
      if (id) {
        this.selectedId = id;
        this.handleModal(true);
        return;
      }

      try {
        await this.CourseService.delete(this.selectedId);
        this.callToAPi();
        this.handleModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    handleModal(open) {
      this.showModal = open;
    },
    assignCourse(courseData) {
      this.$router.push({ name: 'AssignCourse', params: { id: courseData._id } });
    },
  },
  computed: {
    isAdmin() {
      return this.getUserRole === 'admin';
    },
    ...mapGetters('user', ['getUserRole']),
  },
};
</script>
