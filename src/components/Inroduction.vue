<template>
  <v-stepper-content :step="step">
    <v-card class="mb-10 pt-2" flat>
      <h3>Introduction</h3>
      <p class="mt-3">
        Please follow the steps to check your Github profile information.
      </p>
    </v-card>
  </v-stepper-content>
</template>

<script>
export default {
  name: "Introduction",
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  methods: {
    isStepValid() {
      return true
    },
  },
};
</script>