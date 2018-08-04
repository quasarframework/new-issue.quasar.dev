<template>
  <div>
    <q-field helper="What problem does this feature solve?">
      <q-input
          v-model="problem"
          type="textarea"
          :min-rows="7"
          stack-label="Problem"
          color="tertiary"
          inverted
          requried
      />
    </q-field>

    <div class="row sm-gutter">
      <div class="col">
        <q-field helper="What does the proposed API look like?">
          <q-input
              v-model="api"
              type="textarea"
              :min-rows="7"
              stack-label="Proposed API"
              color="tertiary"
              inverted
              requried
          />
        </q-field>
      </div>
    </div>
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
