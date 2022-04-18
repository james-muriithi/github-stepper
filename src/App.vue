<template>
  <v-app>
    <Navbar />
    <v-main class="grey lighten-5">
      <v-row justify="center" align="center" class="h-100 px-2 px-md-0">
        <v-col lg="6" md="7" sm="10">
          <v-card class="pa-6 shadow">
            <Stepper />
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Stepper from "./components/Stepper.vue";

export default {
  name: "App",

  components: {
    Navbar,
    Stepper,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
.shadow {
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}
</style>