<template>
  <v-text-field
    v-model="search"
    label="Search the Pokemon"
    variant="outlined"
    color="primary"
    prepend-inner-icon="mdi-search-web"
    density="compact"
    :hide-details="true"
  ></v-text-field>
</template>

<script setup lang="ts">
  import { ref, unref, watch } from 'vue';

  import debounce from '../../utils/debounce';

  const props = defineProps<{
    debounceTime: number
  }>();

  const search = ref('');
  const emit = defineEmits<{
    change: [value: string]
  }>();

  const debouncedChangeEmit = debounce(
    () => emit('change', unref(search)),
    props.debounceTime,
  );

  watch(search, debouncedChangeEmit);
</script>
