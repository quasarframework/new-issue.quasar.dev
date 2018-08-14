<template>
  <div>
    <q-field helper="How EXACTLY would developers use this feature?">
      <q-input
          v-model="form.api"
          type="textarea"
          float-label="Propose API"
          required
          placeholder="E.g. <new-component :new-prop /> ..."
          :rows="2"
      />
    </q-field>
    <q-field class="q-mt-lg">
      <q-input
          v-model="form.problem"
          type="textarea"
          required
          float-label="Reason add it?"
          placeholder=" You can use markdown to format lists and code."
          :rows="2"
      />

    </q-field>
    <div class="caption">
      What this feature means for your product?
      What will it allow you to do that you can't do today?
      How will it make current workarounds straightforward?
      What potential bugs and edge cases does it help to avoid?
    </div>
    <q-field class="q-mt-xl" helper="Are you willing to implement this feature?">
      <q-checkbox v-model="form.canImplement" label="I can implement this."/>
    </q-field>

  </div>
</template>

<script>

export default {
  name: 'FeatureRequest',
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
        '\n#### Why?\n' +
        this.form.problem +
        (this.form.canImplement ? '\n\n#### I Can Implement it.' : 'no')
    }
  }
}
</script>
