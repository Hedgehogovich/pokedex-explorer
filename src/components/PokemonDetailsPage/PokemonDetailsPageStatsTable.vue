<template>
  <v-col cols="12" sm="6" class="d-flex flex-column align-sm-center">
    <h3 class="font-weight-bold">
      <slot name="title"></slot>
    </h3>
    <v-list lines="one" tag="ol">
      <v-list-item
        v-for="item in items"
        :key="item.id"
        tag="li"
        class="text-sm-center pa-sm-4 px-0"
      >
        <v-list-item-title tag="p">
          <v-icon icon="mdi-star-four-points-outline" size="x-small" :start="true"></v-icon>
          <slot :item="item"></slot>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-col>
</template>

<script setup lang="ts" generic="T extends {id: any}">
  defineProps<{
    items: T[]
  }>();

  defineSlots<{
    title(): any
    default(props: { item: T }): any
  }>();
</script>
