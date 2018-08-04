<template>
  <q-page padding>
    <div class="q-headline">Report a bug</div>
    <bug-form/>
  </q-page>
</template>

<script>
import BugForm from '../components/forms/BugForm'

export default {
  name: 'BugReport',
  components: {BugForm}
}
</script>

<style>
</style>
