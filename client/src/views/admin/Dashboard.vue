<template>
  <div class="row">
    <div class="col-xl-6 pr-xl-2">
      <div class="row">
        <div class="col-sm-12 pr-sm-2 statistics-grid">
          <div class="card card_border border-primary-top p-4">
            <font-awesome-icon icon="user" />
            <h3 class="text-primary number">{{ studentCount }}</h3>
            <p class="stat-text">Total Student</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 pl-xl-2">
      <div class="row">
        <div class="col-sm-12 pr-sm-2 statistics-grid">
          <div class="card card_border border-primary-top p-4">
            <font-awesome-icon icon="book-open" />
            <h3 class="text-success number">{{ courseCount }}</h3>
            <p class="stat-text">Total Course</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from '@/services/course.service';
import StudentService from '@/services/student.service';

export default {
  name: 'Dashboard',
  data() {
    return {
      StudentService: new StudentService(),
      CourseService: new CourseService(),
      studentCount: 0,
      courseCount: 0,
    };
  },
  mounted() {
    Promise.allSettled([
      new Promise((resolve, reject) => {
        this.StudentService.getTotalCount()
          .then((result) => resolve({ count: result?.count ?? 0, name: 'studentCount' }))
          .catch((err) => reject(err));
      }),
      new Promise((resolve, reject) => {
        this.CourseService.getTotalCount()
          .then((result) => resolve({ count: result?.count ?? 0, name: 'courseCount' }))
          .catch((err) => reject(err));
      }),
    ]).then((result = []) => {
      result.forEach((item) => {
        if (item.status === 'fulfilled') {
          this[item.value.name] = item.value.count;
        }
      });
    });
  },
};
</script>

<style scoped>
.statistics-grid {
  margin-bottom: 18px;
}

.border-primary-top {
  border-top: 2px solid #4755ab !important;
}

.card_border {
  border: none;
  box-shadow: 0 1px 2px 1px rgba(154, 154, 204, 0.22);
}

svg {
  font-size: 50px;
  color: #aaa;
  margin-bottom: 15px;
  transition: 0.3s ease;
  opacity: 0.3;
  position: absolute;

  font-family: Linearicons-Free;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

h3.number {
  font-weight: 800;
  font-size: 28px;
  line-height: 36px;
  text-align: right;
  color: #2c3038;
  transition: 0.3s ease;
  margin-bottom: 0;
}

p.stat-text {
  margin: 0;
  font-size: 15px;
  text-align: right;
  line-height: 25px;
  color: #5d6b71;
}

.card {
  display: block !important;
}

.text-primary {
  color: #4755ab !important;
}

.text-secondary {
  color: #b162ac !important;
}

.text-success {
  color: #03c895 !important;
}

.text-danger {
  color: #ff4f81 !important;
}
</style>
