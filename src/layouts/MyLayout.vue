<template>
  <q-layout view="lHr LpR lfr">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title class="row items-center group">
          <img src="~assets/quasar-logo.svg" alt="Quasar Framework Logo" width="50px" height="50px">
          <span>New Issue Helper</span>
        </q-toolbar-title>

        <q-btn flat href="https://quasar-framework.org/guide/" target="_blank" rel="nofollow" type="a"
               icon="fa fa-book">
          <q-tooltip>Documentation</q-tooltip>
        </q-btn>
        <q-btn flat href="https://discord.gg/5TDhbDg" target="_blank" rel="nofollow" type="a" icon="fab fa-discord">
          <q-tooltip>Discord</q-tooltip>
        </q-btn>

        <q-btn flat href="https://forum.quasar-framework.org/" target="_blank" rel="nofollow" type="a"
               icon="fa fa-comments">
          <q-tooltip>Forum</q-tooltip>
        </q-btn>

        <q-btn flat href="https://github.com/quasarframework" target="_blank" rel="nofollow" type="a"
               icon="fab fa-github">
          <q-tooltip>GitHub</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-layout-footer color="primary">
      <q-btn type="a"
             href="https://github.com/quasarframework/new-issue.quasar-framework.org"
             target="_blank"
             rel="nofollow"
             size="xs"
             class="q-pa-xs q-ma-sm"
             flat
             icon-right="fab fa-github"
             label="Source"/>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout'
}
</script>
