<template>
  <q-layout view="lHr LpR lfr">
    <q-layout-header>
      <q-toolbar color="primary" class="q-py-sm">
        <img src="~assets/quasar-logo.svg" alt="Quasar Framework Logo" width="50px" height="50px">
        <q-toolbar-title>
          New Issue Helper
        </q-toolbar-title>

        <q-btn v-for="link in links" :key="link.link"
               flat size="lg" class="q-pa-sm"
               :href="link.link" target="_blank" rel="nofollow" type="a"
               :icon="link.icon">
          <q-tooltip>{{link.label}}</q-tooltip>
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
  name: 'MyLayout',
  data () {
    return {
      links: [
        {
          link: 'https://quasar-framework.org/guide/',
          label: 'Documentation',
          icon: 'fa fa-book'
        },
        {
          link: 'https://discord.gg/5TDhbDg',
          label: 'Discord',
          icon: 'fab fa-discord'
        },
        {
          link: 'https://forum.quasar-framework.org/',
          label: 'Forum',
          icon: 'fa fa-comments'
        },
        {
          link: 'https://github.com/quasarframework',
          label: 'GitHub',
          icon: 'fab fa-github'
        }
      ]
    }
  }
}
</script>
