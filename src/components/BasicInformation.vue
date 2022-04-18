<template>
  <v-stepper-content :step="step">
    <v-form class="mb-4 pt-2" ref="form">
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
          :error-messages="githubErrors"
          dense
          ref="username"
          clearable
          :loading="loading"
        />
      </div>
    </v-form>
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
      githubProfile: {},
      githubErrors: [],
    };
  },
  watch: {
    username(newValue) {
      if (newValue) this.fetchUserDebounced();
    },
  },
  computed: {
    ...mapGetters("steps", ["rules"]),
    username() {
      return this.form.username;
    },
  },
  methods: {
    isStepValid() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f].hasError) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        this.$store.dispatch("steps/setUserData", this.form);
        this.$store.dispatch("steps/setGithubProfile", this.githubProfile);
      }

      return !this.formHasErrors;
    },
    validateProfile() {
      return (
        Object.keys(this.githubProfile).length > 0 ||
        "Github user does not exist"
      );
    },
    reset(){
      this.$refs.form.reset()
    },
    fetchUserDebounced() {
      // cancel pending call
      clearTimeout(this._timerId);
      this.loading = false;
      this.formHasErrors = false;
      this.githubProfile = {};
      this.githubErrors = [];

      // delay new call 1000ms
      this._timerId = setTimeout(async () => {
        try {
          this.loading = true;
          this.githubProfile = (await this.fetchUserDetails()).data;
        } catch (error) {
          this.$refs["username"].valid = false;
          this.githubErrors = ["Github user does not exist"];
        }
        this.loading = false;
      }, 1000);
    },
    fetchUserDetails() {
      return this.$axios.get(`/users/${this.username}`);
    },
  },
};
</script>