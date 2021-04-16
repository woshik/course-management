<template>
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
      <button class="btn btn-primary mb-3 float-right" @click="addStudent">
        Add User
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
        <template v-slot:default="{ rowData }">
          <button class="btn btn-primary btn-sm m-1" @click="showStudentDetails(rowData)">
            <font-awesome-icon icon="address-book" /> Details
          </button>
          <button
            class="btn btn-sm m-1"
            :class="[rowData.active ? 'btn-danger' : 'btn-success']"
            @click="changeStatus(rowData)"
          >
            <font-awesome-icon icon="wrench" /> {{ rowData.active ? "Inactive" : "Active" }} Acount
          </button>
          <button class="btn btn-info btn-sm m-1" @click="resetPassword(rowData)">
            <font-awesome-icon icon="redo" /> Reset Password
          </button>
        </template>
      </vue-table>
    </div>

    <modal-window v-if="showModal.deleteModal" @open="handleModal">
      <template v-slot:title> Delete User </template>
      Do you want to really delete this User?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="deleteRow(null)">Delete</button>
      </template>
    </modal-window>

    <modal-window v-if="showModal.statusModal" @open="handleModal">
      <template v-slot:title> Change Account status </template>
      Do you want to really change this account status?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="changeStatus(null)">Change</button>
      </template>
    </modal-window>

    <modal-window v-if="showModal.resetModal" @open="handleModal">
      <template v-slot:title> Reset Acount Password </template>
      Do you want to really change account passwrd?<br />
      Reset password will be: 123456
      <template v-slot:footer>
        <button class="btn btn-danger" @click="resetPassword(null)">Change</button>
      </template>
    </modal-window>
  </div>
</template>

<script>
import StudentService from '@/services/student.service';
import FromValidation from '@/mixins/FormValidation';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';

export default {
  name: 'Student',
  mixins: [FromValidation],
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
      showModal: {
        deleteModal: false,
        statusModal: false,
        resetModal: false,
      },
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
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    addStudent() {
      this.$router.push({ name: 'AddStudent' });
    },
    editRow(id) {
      this.$router.push({ name: 'EditStudent', params: { id } });
    },
    async deleteRow(id) {
      if (id) {
        this.selectedId = id;
        this.handleModal(true, 'deleteModal');
        return;
      }

      try {
        await this.StudentService.delete(this.selectedId);
        this.callToAPi();
        this.handleModal(false, 'deleteModal');
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    async changeStatus(studentData) {
      if (studentData) {
        this.selectedId = studentData._id;
        this.handleModal(true, 'statusModal');
        return;
      }

      try {
        await this.StudentService.changeStatus(this.selectedId);
        this.callToAPi();
        this.handleModal(false, 'statusModal');
        this.showMessage({
          success: true,
          message: 'Successfully Updated',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    async resetPassword(studentData) {
      if (studentData) {
        this.selectedId = studentData._id;
        this.handleModal(true, 'resetModal');
        return;
      }

      try {
        await this.StudentService.resetPassword(this.selectedId);
        this.callToAPi();
        this.handleModal(false, 'resetModal');
        this.showMessage({
          success: true,
          message: 'Password Successfully Reset. New Password: 123456',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    handleModal(open, modalName) {
      if (modalName) {
        this.showModal[modalName] = open;
      } else {
        this.showModal.deleteModal = open;
        this.showModal.statusModal = open;
        this.showModal.resetModal = open;
      }
    },
    showStudentDetails(studentData) {
      this.$router.push({ name: 'StudentDetails', params: { id: studentData._id } });
    },
  },
};
</script>
