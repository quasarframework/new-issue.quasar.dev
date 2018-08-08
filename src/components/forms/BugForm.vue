<template>
  <div>
    <q-field helper="Steps to reproduce the issue.">
      <q-input
          v-model="reproduce"
          type="textarea"
          float-label="Reproduction Steps"
          color="tertiary"
          required
      />
    </q-field>

    <q-field helper="What should happen?">
      <q-input
          v-model="expected"
          type="textarea"
          float-label="Expected Behaviour"
          color="primary"
          required
      />
    </q-field>
    <q-field helper="What actually happens?">
      <q-input
          v-model="actual"
          type="textarea"
          float-label="Actual Behaviour"
          color="primary"
          required
      />
    </q-field>
  </div>
</template>

<script>
export default {
  name: 'BugForm',
  data () {
    return {
      reproductionSteps: '',
      expected: '',
      actual: ''
    }
  }
}
</script>
