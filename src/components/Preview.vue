<template>
    <div v-if="issueType === 'bug'">

      <div class="text-h6">Steps to Reproduce</div>
      <pre>{{ formFields.reproductionSteps }}</pre>

      <div class="text-h6">Expected Behavior</div>
      <pre>{{ this.formFields.expected }} </pre>

      <div class="text-h6">Actual Behavior</div>
      <pre>{{ this.formFields.actual }}</pre>

      <div v-if="reproductionLink" class="text-h6">Reproduction Link</div>
      <div>{{ reproductionLink }}</div>

    </div>
</template>
<script>
export default {
  name: 'preview',
  props: {
    issueType: {
      type: String
    },
    formFields: {
      type: Object
    },
    repoName: {
      type: String
    }
  }
}
</script>
