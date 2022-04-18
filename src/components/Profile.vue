<template>
    <v-stepper-content :step="step">
        <v-card class="mb-4 pt-2" flat>
          <v-row no-gutters>
            <div class="">
              <v-avatar color="primary" size="56">
                <img
                  :src="github.avatar_url"
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
              <v-btn :href="github.html_url" target="_blank" text>
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Profile",
    props: {
    step: {
      type: Number,
      required: true,
    },
  },
  computed: {
      ...mapGetters('steps', ['email', 'firstName', 'lastName', 'github'])
  },
  methods: {
    isStepValid() {
      return true
    },
  },
}
</script>