<template>
  <q-page padding class="text-center">
    <div class="q-headline">
      Help
    </div>
    <p class="q-ma-md">
      Our experts are here to help you online 24/7
    </p>
    <q-btn icon="fab fa-discord"
           class="q-ma-md"
           label="Ask on Discord chat"
           @click="openURL('https://discord.gg/5TDhbDg')"/>

    <q-btn icon="fa fa-comments"
           class="q-ma-md"
           label="Ask on Forums"
           @click="openURL('http://forum.quasar-framework.org/')"/>
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
