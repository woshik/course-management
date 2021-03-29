// import { validationMixin } from 'vuelidate';

const FormValidation = {
  // ...validationMixin,
  data() {
    return {
      errorMessage: '',
      successMessage: '',
      timer: null,
      success: false,
    };
  },
  methods: {
    //   handleFieldBlur(e) {
    //     const fieldName = e.target.name;
    //     if (
    //       this.$v[fieldName].$dirty
    //       && this.$v[fieldName].$error
    //       && !this.$v[fieldName].fieldError
    //     ) {
    //       this.$v[fieldName].fieldError = true;
    //       console.log(this.$v[fieldName].fieldError);
    //     } else {
    //       this.$v[fieldName].fieldError = false;
    //     }

    //     if (this.$v[fieldName].$dirty && !this.$v[fieldName].CanErrorShow) {
    //       this.$v[fieldName].CanErrorShow = true;
    //     }

    //     console.log('blur');
    //   },
    //   handleFieldInput(e) {
    //     const fieldName = e.target.name;

    //     if (this.$v[fieldName].CanErrorShow && this.$v[fieldName].$error) {
    //       this.$v[fieldName].fieldError = true;
    //     } else {
    //       this.$v[fieldName].fieldError = false;
    //     }

    //     console.log('input');
    //   },
    // },
    showMessage(messageObj, time = 5000) {
      this.successMessage = messageObj.success;
      this.errorMessage = messageObj.error;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
      }, time);
    },
  },
  computed: {
    formData() {
      const data = {};
      this.$options.formFields.forEach((key) => {
        data[key] = this.$data[key];
      });
      return data;
    },
  },
};

export default FormValidation;
