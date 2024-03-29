const FormValidation = {
  data() {
    return {
      isSuccessful: false,
      messageDisplay: '',
      timer: null,
      success: false,
    };
  },
  methods: {
    showMessage(messageObj, time = 3000) {
      this.isSuccessful = messageObj.success;
      this.messageDisplay = messageObj.message;
      const { ref } = messageObj;

      if (ref) {
        this.$refs[ref].style.display = 'block';
      }
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.isSuccessful = false;
        this.messageDisplay = '';
        if (ref) {
          this.$refs[ref].style.display = 'none';
        }
      }, time);
    },

    resetAll() {
      this.$options.formFields.forEach((key) => {
        this.$data[key] = '';
      });
    },
  },
  computed: {
    formData() {
      const data = {};
      this.$options.formFields.forEach((key) => {
        if (this.$data[key]) {
          data[key] = this.$data[key];
        }
      });
      return data;
    },
  },
};

export default FormValidation;
