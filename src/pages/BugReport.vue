<template>

  <div>

    <q-field helper="Write a list if possible.">
      <q-input
          v-model="reproductionSteps"
          type="textarea"
          float-label="Steps to reproduce"
          :placeholder="'1. ...\n2. ...'"
          rows="2"
          required
      />
    </q-field>
    <div class="row">

      <q-field helper="What should happen?" class="col-6">
        <q-input
            v-model="expected"
            type="textarea"
            float-label="Expected behaviour"
            color="primary"
            required
        />
      </q-field>

      <q-field helper="What actually happens?" class="col-6">
        <q-input
            v-model="actual"
            type="textarea"
            float-label="Actual behaviour"
            color="primary"
            required
        />
      </q-field>
    </div>
    <div class="row">

      <q-field class="col-6">
        <q-input
            v-model="version"
            type="url"
            float-label="Version"
            placeholder="0.17.9"
        />
      </q-field>

      <q-field class="col-6" helper="JsFiddle, Codepen or simple project repo.">
        <q-input
            v-model="reproductionLink"
            type="url"
            float-label="Minimal Reproduction"
            placeholder="Url..."
        />
      </q-field>
    </div>

    <q-field class="col-6" helper="Tip: run 'quasar info' and paste the result here">
      <q-input
          v-model="quasarInfo"
          type="textarea"
          float-label="Technical info"
          placeholder="Quasar v0.17.3, Win 95, ..."
          required
          rows="2"
      />
    </q-field>

  </div>
</template>

<script>

export default {
  name: 'BugReport',
  components: {},
  data () {
    return {
      title: '',
      reproductionSteps: '',
      expected: '',
      actual: '',
      version: '',
      quasarInfo: '',
      reproductionLink: ''
    }
  },
  methods: {
    buildTitle () {
      return `[Bug] ${this.title}`
    },
    buildBody () {
      return `#### Steps
${this.reproductionSteps}
#### Expected
${this.expected}
#### Actual
${this.actual}

${this.reproductionLink ? `#### Reproduction link
${this.reproductionLink}` : ''}

#### Info
\`\`\`
${this.quasarInfo}
\`\`\`
`
    }

  }
}
</script>
