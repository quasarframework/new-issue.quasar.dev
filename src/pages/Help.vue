<template>
  <q-page padding class="text-center">
    <div class="q-headline">
      Help
    </div>
    <p class="q-ma-md q-caption">
      Our experts are here to help you online 24/7
    </p>
    <q-btn icon="fab fa-discord"
           class="q-ma-md"
           label="Chat on Discord"
           @click="openURL('https://discord.gg/5TDhbDg')"/>

    <q-btn icon="fa fa-comments"
           class="q-ma-md"
           label="Ask the Forum"
           @click="openURL('https://forum.quasar-framework.org/')"/>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Help',
  methods: {
    openURL
  }
}
</script>

<style>
</style>
