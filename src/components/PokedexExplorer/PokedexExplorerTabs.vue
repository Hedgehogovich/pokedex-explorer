<template>
  <v-tabs
    v-model="currentTab"
    align-tabs="center"
    color="secondary"
  >
    <v-tab :value="TabTypes.ALL_TAB">All</v-tab>
    <v-tab :value="TabTypes.FAVOURITES_TAB">Favourites</v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
  import { TabTypes } from '../../enums/TabTypes';

  const currentTab = defineModel<TabTypes>();
</script>
