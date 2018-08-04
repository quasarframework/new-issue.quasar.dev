<template>
  <div>
    <q-field helper="Steps to reproduce the issue.">
      <q-input
          v-model="reproduce"
          type="textarea"
          :min-rows="7"
          stack-label="Reproduction Steps"
          color="tertiary"
          inverted
          required
      />
    </q-field>

    <div class="row sm-gutter">
      <div class="col">
        <q-field helper="What is the expected behaviour?">
          <q-input
              v-model="expected"
              type="textarea"
              :min-rows="7"
              stack-label="Expected Behaviour"
              color="tertiary"
              inverted
              required
          />
        </q-field>
      </div>

      <div class="col">
        <q-field helper="What is the actual behaviour?">
          <q-input
              v-model="actual"
              type="textarea"
              :min-rows="7"
              stack-label="Actual Behaviour"
              color="tertiary"
              inverted
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
