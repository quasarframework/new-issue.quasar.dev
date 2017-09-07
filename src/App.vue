<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="lHr LpR lFr">
      <!-- Header toolbar -->
      <q-toolbar slot="header" color="primary">
        <q-toolbar-title class="row items-center group">
          <img src="~assets/quasar-logo.svg" alt="Quasar Framework Logo" width="50px" height="50px">
          <span>Issue Helper</span>
        </q-toolbar-title>

        <q-btn flat @click="openExternal('http://quasar-framework.org/guide/')">
          <q-icon name="fa-book">
            <q-tooltip>Documentation</q-tooltip>
          </q-icon>
        </q-btn>

        <q-btn flat @click="openExternal('http://forum.quasar-framework.org/')">
          <q-icon name="fa-comments">
            <q-tooltip>Forum</q-tooltip>
          </q-icon>
        </q-btn>

        <q-btn flat @click="openExternal('https://github.com/quasarframework')">
          <q-icon name="fa-github">
            <q-tooltip>GitHub</q-tooltip>
          </q-icon>
        </q-btn>
      </q-toolbar>

      <!-- Routes get injected here -->
      <router-view></router-view>
    </q-layout>
  </div>
</template>

<script>
import { openURL } from 'quasar'

export default {
  methods: {
    openExternal (url) {
      openURL(url)
    }
  }
}
</script>

