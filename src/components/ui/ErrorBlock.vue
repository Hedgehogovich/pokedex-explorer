<template>
  <v-col cols="12" class="text-center font-weight-bold mt-10 text-h5" tag="p">
    <p class="font-weight-bold mt-5 text-h5">
      Something went wrong. :\ Please, try rebooting the page.
    </p>
    <v-btn
      v-if="showHomeButton"
      :to="{name: 'PokedexExplorer'}"
      class="mt-5"
      color="primary"
    >
      Go home.
    </v-btn>
  </v-col>
</template>

<script setup lang="ts">
  defineProps<{
    showHomeButton: boolean;
  }>();
</script>
