<template>
  <v-row justify="center">
    <v-col>
      <v-img
        aspect-ratio="16/9"
        height="218px"
        width="480px"
        src="@/assets/obi-wan.gif"
        alt="There is nothing here"
        class="mx-auto"
        cover
      ></v-img>
    </v-col>
    <v-col cols="12" class="text-center">
      <p class="font-weight-bold mt-5 text-h5">You are not looking for any Pokemons.</p>
      <v-btn
        :to="{name: 'PokedexExplorer'}"
        class="mt-5"
        color="primary"
      >
        Go home.
      </v-btn>
    </v-col>
  </v-row>
</template>
