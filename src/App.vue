<template>
  <v-app class="v-app">
    <header class="text-center my-3 my-sm-5">
      <router-link :to="{name: 'PokedexExplorer'}" class="text-decoration-none">
        <h1 class="font-weight-bold text-primary heading">Pokedex Explorer</h1>
      </router-link>
      <p class="text-subtitle-1 text-grey-darken-1">Gotta catch 'em all</p>
    </header>
    <v-divider></v-divider>
    <v-main>
      <v-responsive max-width="1000" class="mx-auto">
        <RouterView />
      </v-responsive>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
  @media (max-width: 600px) {
    .heading {
      font-size: 1.5rem;
    }
  }
</style>
