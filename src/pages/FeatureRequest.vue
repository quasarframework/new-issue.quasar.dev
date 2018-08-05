<template>
  <q-page padding>
    <div class="q-headline q-ma-lg">Request a Feature</div>
    <q-stepper label="Feature request" ref="stepper">
      <q-step title="Summary">
        <title-form/>
      </q-step>
      <q-step title="Details">
        <request-form/>
      </q-step>
      <q-step title="Finish">

      </q-step>

      <q-stepper-navigation>
        <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
        <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
      </q-stepper-navigation>
    </q-stepper>
  </q-page>
</template>

<script>
import RequestForm from '../components/forms/RequestForm'
import TitleForm from '../components/forms/TitleForm'

export default {
  name: 'FeatureRequest',
  components: {TitleForm, RequestForm}
}
</script>

<style>
</style>
