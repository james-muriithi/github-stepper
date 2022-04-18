<template>
  <v-stepper-content :step="step">
    <v-card class="mb-4 pt-2" flat ref="form">
      <h3>Basic Information</h3>
      <div class="mt-5">
        <v-text-field
          v-model="form.firstName"
          label="First name"
          outlined
          dense
          ref="firstName"
          :rules="[rules.required]"
          clearable
        />
        <v-text-field
          v-model="form.lastName"
          label="Last name"
          outlined
          :rules="[rules.required]"
          dense
          ref="lastName"
          clearable
        />
        <v-text-field
          v-model="form.username"
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BasicInformation",
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      formHasErrors: false,
      form: {
        firstName: "",
        lastName: "",
        username: "",
      },
    };
  },
  computed: {
    ...mapGetters("steps", ["rules"]),
  },
  methods: {
    isStepValid() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.$refs[f].valid) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) this.$store.dispatch("steps/setUserData", this.form);

      return !this.formHasErrors;
    },
  },
};
</script>