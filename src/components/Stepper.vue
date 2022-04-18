<template>
  <v-stepper alt-labels flat tile v-model="currentStep">
    <v-stepper-header class="shadow-0">
      <template v-for="({ title }, index) in steps">
        <v-stepper-step
          :key="index"
          :complete="currentStep > index + 1"
          :step="index + 1"
        >
          <div class="text-center">{{ title }}</div>
        </v-stepper-step>
        <v-divider v-if="index < steps.length - 1" :key="title"></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-10 pt-2" flat>
          <h3>Introduction</h3>
          <p class="mt-3">
            Please follow the steps to check your Github profile information.
          </p>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-4 pt-2" flat ref="form">
          <h3>Basic Information</h3>
          <div class="mt-5">
            <v-text-field
              v-model="firstName"
              label="First name"
              outlined
              dense
              ref="firstName"
              :rules="[rules.required]"
              clearable
            />
            <v-text-field
              v-model="lastName"
              label="Last name"
              outlined
              :rules="[rules.required]"
              dense
              ref="lastName"
              clearable
            />
            <v-text-field
              v-model="username"
              label="Github username"
              outlined
              :rules="[rules.required]"
              dense
              ref="username"
              clearable
              :loading="loading"
            />
          </div>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-4 pt-2" flat>
          <h3>Terms and conditions</h3>
          <div class="mt-5">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
              ref="email"
              :rules="[rules.required, rules.email]"
              clearable
            />
            <v-checkbox
              v-model="tos"
              label="Do you accept the terms and conditions?"
              class="mt-0"
              :rules="[rules.required]"
              ref="tos"
            />
          </div>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="mb-4 pt-2" flat>
          <v-row no-gutters>
            <div class="">
              <v-avatar color="primary" size="56">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </div>
            <div class="ml-3">
              <h3>{{ firstName }} {{ lastName }}</h3>
              <v-btn
                :href="`mailto:${email}`"
                text
                class="pl-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ email }}
              </v-btn>
            </div>
            <div class="ml-sm-auto">
              <v-btn href="#" target="_blank" text>
                <span class="mr-2">view profile</span>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </v-row>
          <div class="text-center mt-5">
            <v-btn color="primary" @click="currentStep = 1" outlined> go to home </v-btn>
          </div>
        </v-card>
      </v-stepper-content>

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
export default {
  name: "Stepper",
  data() {
    return {
      currentStep: 2,
      firstName: "John",
      lastName: "Doe",
      username: "john",
      tos: false,
      email: "john@gmail.com",
      formHasErrors: false,
      loading: false,
      steps: [
        {
          title: "Introduction",
          fields: [],
        },
        {
          title: "User Information",
          fields: ["firstName", "lastName", "username"],
        },
        {
          title: "Terms and conditions",
          fields: ["email", "tos"],
        },
        {
          title: "Profile",
          fields: [],
        },
      ],
      rules: {
        required: (value) => !!value || "Field is Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    isValidStep(stepIndex) {
      this.formHasErrors = false;
      this.steps[stepIndex]["fields"].forEach((f) => {
        if (!this.$refs[f].valid) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
    },
    goToNextStep(currentStep) {
      this.isValidStep(currentStep - 1);
      if (!this.formHasErrors) this.currentStep = currentStep + 1;
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