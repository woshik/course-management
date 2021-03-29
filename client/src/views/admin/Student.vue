<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="['Course Name', 'Course Code']"
      ></vuetable>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2';

export default {
  name: 'Student',
  components: {
    Vuetable,
  },
};
</script>
