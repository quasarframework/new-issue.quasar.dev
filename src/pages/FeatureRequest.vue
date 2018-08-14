<template>
  <div>
    <q-field helper="How would developers use this feature?">
      <q-input
          v-model="form.api"
          type="textarea"
          float-label="Propose API"
          required
          placeholder="E.g. <new-component :new-prop /> ..."
          :rows="2"
      />
    </q-field>
    <q-field>
      <q-input
          v-model="form.problem"
          type="textarea"
          required
          float-label="Reason add it?"
          placeholder="Convince us..."
          :rows="2"
      />
    </q-field>
    <q-field>
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
