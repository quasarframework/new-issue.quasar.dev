<template>
  <q-layout view="lHr LpR lFr">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title class="row items-center group">
          <img src="~assets/quasar-logo.svg" alt="Quasar Framework Logo" width="50px" height="50px">
          <span>Issue Helper</span>
        </q-toolbar-title>

        <q-btn flat @click="openExternal('http://quasar-framework.org/guide/')">
          <q-icon name="fa fa-book">
            <q-tooltip>Documentation</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn flat @click="openExternal('https://discord.gg/5TDhbDg')">
          <q-icon name="fab fa-discord">
            <q-tooltip>Discord</q-tooltip>
          </q-icon>
        </q-btn>

        <q-btn flat @click="openExternal('http://forum.quasar-framework.org/')">
          <q-icon name="fa fa-comments">
            <q-tooltip>Forum</q-tooltip>
          </q-icon>
        </q-btn>

        <q-btn flat @click="openExternal('https://github.com/quasarframework')">
          <q-icon name="fab fa-github">
            <q-tooltip>GitHub</q-tooltip>
          </q-icon>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    openExternal (url) {
      openURL(url)
    }
  }
}
</script>

<style>
</style>
