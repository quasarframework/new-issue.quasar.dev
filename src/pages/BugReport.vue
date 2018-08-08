<template>
  <q-page padding>
    <div class="q-headline q-ma-lg">Report a bug</div>
    <form action="" @submit.prevent="submit">
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-select
            v-model="repo" :options="repoOptions"
            stack-label="Repository"
            color="tertiary"
            required
        />
      </q-field>

      <q-field helper="Descriptive - Bug must be understood without opening the issue!"
               class="q-pa-lg shadow-1 q-ma-lg">
        <q-input v-model="title"
                 placeholder="E.g. QInput doesn't show placeholder in electron on windows 8"
                 float-label="Title"
                 prefix="[Bug]"/>
      </q-field>

      <q-field helper="Write a list if possible." class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="reproductionSteps"
            type="textarea"
            float-label="Steps to reproduce"
            :placeholder="'1. ...\n2. ...'"
            rows="2"
            required
        />
      </q-field>

      <q-field helper="What should happen?" class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="expected"
            type="textarea"
            float-label="Expected behaviour"
            color="primary"
            required
        />
      </q-field>

      <q-field helper="What actually happens?" class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="actual"
            type="textarea"
            float-label="Actual behaviour"
            color="primary"
            required
        />
      </q-field>

      <q-field helper="JsFiddle, Codepen or simple project repo." class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="reproductionLink"
            type="url"
            float-label="Minimal Reproduction"
            placeholder="Url..."
        />
      </q-field>
      <q-field helper="Tip: run 'quasar info' and paste the result here" class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="quasarInfo"
            type="textarea"
            float-label="Technical info"
            placeholder="Quasar v0.17.3, Win 95, ..."
            required
            rows="2"
        />
      </q-field>

      <q-btn type="submit" @submit.prevent="submit" class="float-right q-ma-lg">
        Create
      </q-btn>
    </form>
  </q-page>
</template>

<script>
import { repos } from '../config'
import openGithubIssue from '../utils/open-github-issue'

const repoOptions = repos.map(repo => {
  return {label: repo.name, value: repo.id}
})

export default {
  name: 'BugReport',
  components: {},
  data () {
    return {
      title: '',
      reproductionSteps: '',
      expected: '',
      actual: '',
      quasarInfo: '',
      repoOptions: repoOptions,
      repo: repoOptions[0].value,
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
    },
    submit () {
      openGithubIssue(this.buildTitle(), this.buildBody(), this.repo)
    }
  }
}
</script>
