<template>
  <v-stepper alt-labels flat tile v-model="currentStep">
    <v-stepper-header class="shadow-0">
      <template v-for="(step, index) in steps">
        <v-stepper-step
          :key="index"
          :complete="currentStep > index + 1"
          :step="index + 1"
        >
          <div class="text-center">{{ step }}</div>
        </v-stepper-step>
        <v-divider v-if="index < steps.length - 1" :key="step"></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <Inroduction ref="step_1" :step="1" />
      <BasicInformation ref="step_2" :step="2" />

      <TermsOfService ref="step_3" :step="3" />

      <Profile ref="step_4" :step="4" />

      <div class="d-flex" v-if="currentStep != steps.length">
        <v-btn
          v-if="currentStep !== 1"
          @click="currentStep = currentStep - 1"
          outlined
        >
          Back
        </v-btn>
        <v-btn
          color="primary"
          @click="goToNextStep(currentStep)"
          class="ml-auto"
        >
          Continue
        </v-btn>
      </div>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicInformation from "./BasicInformation.vue";
import Inroduction from "./Inroduction.vue";
import Profile from "./Profile.vue";
import TermsOfService from "./TermsOfService.vue";
export default {
  components: { Inroduction, BasicInformation, TermsOfService, Profile },
  name: "Stepper",
  data() {
    return {
      currentStep: 1,
      formHasErrors: false,
      loading: false,
      steps: [
        "Introduction",
        "User Information",
        "Terms and conditions",
        "Profile",
      ],
    };
  },
  methods: {
    goToNextStep(currentStep) {
      if (this.$refs[`step_${currentStep}`].isStepValid())
        this.currentStep += 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.shadow-0 {
  box-shadow: none !important;
}
::v-deep {
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding-left: 0px;
  }
  @media only screen and (max-width: 959px) {
    .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
      display: flex !important;
      text-align: center;
    }
  }
}
</style>