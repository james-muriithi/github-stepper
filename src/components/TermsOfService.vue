<template>
  <v-stepper-content :step="step">
    <v-card class="mb-4 pt-2" flat>
      <h3>Terms and conditions</h3>
      <div class="mt-5">
        <v-text-field
          v-model="form.email"
          label="Email"
          outlined
          dense
          ref="email"
          :rules="[rules.required, rules.email]"
          clearable
        />
        <v-checkbox
          v-model="form.tos"
          label="Do you accept the terms and conditions?"
          class="mt-0"
          :rules="[rules.required]"
          ref="tos"
        />
      </div>
    </v-card>
  </v-stepper-content>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TermsOfService",
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
        email: "",
        tos: false
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