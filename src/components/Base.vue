<template>
  <div class="layout-padding row justify-center">
    <q-stepper class="issue-stepper" color="secondary" ref="stepper" alternative-labels>
      <before-start-step></before-start-step>

      <compose-step></compose-step>

      <preview-step></preview-step>

      <q-stepper-navigation>
        <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
        <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
      </q-stepper-navigation>
    </q-stepper>
  </div>
</template>

<script>
  import BeforeStartStep from './BeforeStartStep.vue'
  import ComposeStep from './ComposeStep.vue'
  import PreviewStep from './PreviewStep.vue'

  export default {
    name: 'base',
    components: {
      BeforeStartStep,
      ComposeStep,
      PreviewStep
    }
  }
</script>

<style lang="stylus">
  .issue-stepper
    width: 80vw
</style>
