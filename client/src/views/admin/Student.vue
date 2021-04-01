<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <button class="btn btn-primary mb-3 float-right" @click="addStudent">
        Add Student
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
        <button
          class="btn btn-primary btn-sm m-1"
          @click="assignCourse(rowData)"
        >
          <font-awesome-icon icon="address-book" /> Details
        </button>
        <button
          class="btn btn-primary btn-sm m-1"
          @click="assignCourse(rowData)"
        >
          <font-awesome-icon icon="address-book" /> Active Acount
        </button>
      </vue-table>
    </div>
    <modal-window v-if="showModal" @open="handleModal">
      <template v-slot:title> Delete Course </template>
      You want to really delete this course?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="deleteRow(null)">Delete</button>
      </template>
    </modal-window>
  </div>
</template>

<script>
import StudentService from '@/services/student.service';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';

export default {
  name: 'Student',
  components: {
    VueTable,
    ModalWindow: () => import('@/components/Modal.vue'),
  },

  data() {
    return {
      index: 1,
      StudentService: new StudentService(),
      tableFields: [
        { name: VuetableFieldSequence, title: 'No.' },
        { name: 'fullName', title: 'Full Name' },
        {
          name: 'dob',
          title: 'Date of Birth',
          formatter(value) {
            const d = new Date(value);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
          },
        },
        { name: 'email', title: 'Email' },
        {
          name: 'active',
          title: 'Active',
          formatter(value) {
            return value ? 'Active' : 'Inactive';
          },
        },
        {
          name: 'actions',
          title: 'Actions',

        },
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
        const response = await this.StudentService.get(reqData);
        this.tabeleData = response.data;
        this.totalRow = response.total;
        this.$nextTick(() => {
          this.$refs.vuetable.updateTable();
        });
      } catch (error) {
        console.log(error);
      }
    },
    addStudent() {
      this.$router.push({ name: 'AddStudent' });
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
        await this.StudentService.delete(this.selectedId);
        this.callToAPi();
        this.handleModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    handleModal(open) {
      this.showModal = open;
    },
  },
};
</script>
