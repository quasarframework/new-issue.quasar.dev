<template>
  <div>
      <image-aware-input
        refId="api"
        filled
        v-model="formFields.api"
        label="Usage*"
        hintText="How EXACTLY would developers use this feature?"
        placeholder="E.g. <new-component :new-prop /> ..."
        @blur="checkValidity('api')"
        :error="this.v.featureForm.api.$error"
        error-message="Please tell us how this should be used by other developers."
      />
      <image-aware-input
        class="q-mt-lg"
        filled
        refId="problem"
        v-model="formFields.problem"
        hintText="Tell us why this is a good idea."
        label="Reason for adding the feature?*"
        @blur="checkValidity('problem')"
        :error="this.v.featureForm.problem.$error"
        error-message="Please tell us why this is a good idea."
      />
    <q-field class="q-mt-xl" helper="Are you willing to implement this feature yourself?">
      <q-checkbox class="text-grey-6" v-model="canImplement" label="I can implement this."/>
    </q-field>
  </div>
</template>

<script>

import ImageAwareInput from './ImageAwareInput'

export default {
  name: 'FeatureRequest',
  components: { ImageAwareInput },
  props: {
    v: {
      type: Object,
      required: true
    },
    formFields: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      canImplement: false
    }
  },
  methods: {
    buildBody () {
      return '#### Usage\n' +
        this.formFields.api +
        '\n#### Reason?\n' +
        this.formFields.problem +
        (this.canImplement ? '\n\n - [x] I Can Implement it.' : '')
    },
    checkValidity (field) {
      this.$emit('validate', field)
    },
    showInfo (e) {
      const id = e.target.parentElement.id
      this.$emit('showInfo', id)
    }
  }
}
</script>
