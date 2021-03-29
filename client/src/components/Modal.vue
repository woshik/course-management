<template>
  <div
    class="modal fade"
    :class="{ show: openModal }"
    tabindex="-1"
    role="dialog"
    :style="{ display: openModal ? 'block' : 'none' }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><slot name="title">Modal title</slot></h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
