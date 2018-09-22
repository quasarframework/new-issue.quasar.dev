<template>
  <div>
    <q-field 
      helper="How EXACTLY would developers use this feature?"
      :error="this.v.featureForm.api.$error"
      error-label="Please tell us how this should be used by other developers."
    >
      <image-aware-input
        id="api"
        v-model="formFields.api"
        type="textarea"
        float-label="Usage*"
        required
        placeholder="E.g. <new-component :new-prop /> ..."
        :rows="4"
        @blur="checkValidity('api')"
        :after="[{ icon: 'info_outline', handler: showInfo }]"
      />
    </q-field>
    <q-field
      helper="Tell us why this is a good idea." 
      class="q-mt-lg"
      :error="this.v.featureForm.problem.$error"
      error-label="Please tell why this is a good idea."
    >
      <image-aware-input
        id="problem"
        v-model="formFields.problem"
        type="textarea"
        required
        float-label="Reason for adding?*"
        :rows="4"           
        @blur="checkValidity('problem')"
        :after="[{ icon: 'info_outline', handler: showInfo }]"
      />
    </q-field>
    <q-field class="q-mt-xl" helper="Are you willing to implement this feature yourself?">
      <q-checkbox class="text-grey-6" v-model="canImplement" label="I can implement this."/>
    </q-field>
  </div>
</template>

<script>

import ImageAwareInput from './ImageAwareInput'
import formatMarkdown from '../utils/format-markdown'

export default {
  name: 'FeatureRequest',
  components: {ImageAwareInput},
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
    showInfo(e) {
      const id = e.target.parentElement.id
      this.$emit('showInfo', id)
    }
  }
}
</script>
