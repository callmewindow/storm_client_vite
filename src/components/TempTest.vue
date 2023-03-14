<template>
  <v-app>
    <v-card class="mx-auto" width="400" prepend-icon="mdi-home">
      <template v-slot:title>
        This is a title
      </template>

      <v-card-text>
        This is content
      </v-card-text>
    </v-card>
    <v-card>
      123
      <v-icon :icon="mdiAccount" />
      <!-- <v-icon icon="$account" /> -->
    </v-card>
  </v-app>
</template>

<script>
import { mdiAccount } from '@mdi/js'

export default {
  data: () => ({
    mdiAccount
  }),
}
</script>
