<template>
  <q-layout view="lHr LpR lfr">
    <q-header>
      <q-toolbar color="primary" class="q-py-sm">
        <img src="~assets/quasar-logo-full.svg" alt="Quasar Framework Logo" width="50px" height="50px">
        <q-toolbar-title>
          New Issue Helper
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer color="primary">
      <q-btn type="a"
             href="https://github.com/quasarframework/new-issue.quasar-framework.org"
             target="_blank"
             rel="nofollow"
             size="xs"
             class="q-pa-xs q-ma-sm"
             flat
             icon-right="fab fa-github"
             label="Source"/>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout'
}
</script>
