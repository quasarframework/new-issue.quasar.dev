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

    <div class="row sm-gutter">
      <div class="col">
        <q-field helper="What is the expected behaviour?">
          <q-input
              v-model="expected"
              type="textarea"
              float-label="Expected Behaviour"
              color="primary"
              required
          />
        </q-field>
      </div>

      <div class="col">
        <q-field helper="What is the actual behaviour?">
          <q-input
              v-model="actual"
              type="textarea"
              float-label="Actual Behaviour"
              color="primary"
              required
          />
        </q-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BugForm',
  data () {
    return {
      reproduce: '',
      expected: '',
      actual: ''
    }
  }
}
</script>
