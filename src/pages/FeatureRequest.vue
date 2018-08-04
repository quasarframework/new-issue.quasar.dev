<template>
  <q-page padding>
    <div class="q-headline">Request a Feature</div>
    <request-form/>
  </q-page>
</template>

<script>
import RequestForm from '../components/forms/RequestForm'
export default {
  name: 'FeatureRequest',
  components: {RequestForm}
}
</script>

<style>
</style>
