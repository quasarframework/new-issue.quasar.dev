<template>
  <div>
    <q-field helper="What problem does this feature solve?">
      <q-input
          v-model="problem"
          type="textarea"
          float-label="Problem"
          color="tertiary"
          requried
      />
    </q-field>
    <q-field helper="What does the proposed API look like?">
      <q-input
          v-model="api"
          type="textarea"
          float-label="Proposed API"
          color="tertiary"
          requried
      />
    </q-field>
  </div>
</template>

<script>
export default {
  name: 'RequestForm',
  data () {
    return {
      problem: '',
      api: ''
    }
  }
}
</script>
