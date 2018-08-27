<template>
  <div>
    <q-field helper="How EXACTLY would developers use this feature?">
      <image-aware-input
          v-model="form.api"
          type="textarea"
          float-label="Usage"
          required
          placeholder="E.g. <new-component :new-prop /> ..."
          :rows="2"
      />
    </q-field>
    <q-field class="q-mt-lg text-right">
      <image-aware-input
          v-model="form.problem"
          type="textarea"
          required
          float-label="Reason for adding?"
          :rows="2"/>
    </q-field>
    <div class="q-caption text-grey-6">
      <ul>
        <li>What this feature means for your product?</li>
        <li>What will it allow you to do that you can't do today?</li>
        <li>How will it make current workarounds straightforward?</li>
        <li>What potential bugs and edge cases does it help to avoid?</li>
      </ul>
    </div>
    <q-field class="q-mt-xl" helper="Are you willing to implement this feature?">
      <q-checkbox class="text-grey-6" v-model="form.canImplement" label="I can implement this."/>
    </q-field>

  </div>
</template>

<script>

import ImageAwareInput from './ImageAwareInput'

export default {
  name: 'FeatureRequest',
  components: {ImageAwareInput},
  data () {
    return {
      form: {
        api: '',
        problem: '',
        canImplement: false
      }
    }
  },
  methods: {
    buildBody () {
      return '#### Usage\n' +
        this.form.api +
        '\n#### Reason?\n' +
        this.form.problem +
        (this.form.canImplement ? '\n\n#### I Can Implement it.' : '')
    }
  }
}
</script>
