<template>
  <q-page padding>
    <form @submit.prevent="create">
      <div class="q-headline q-ma-lg">Feature Request</div>
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-select
            v-model="repo" :options="repoOptions"
            stack-label="Repository"
            required
        />
      </q-field>
      <q-field helper="Descriptive - Request must be understood without opening the issue!"
               class="q-pa-lg shadow-1 q-ma-lg">
        <q-input v-model="form.title"
                 placeholder="Add support for windows 95"
                 float-label="Title"
                 required
                 prefix="[Feature]"/>
      </q-field>
      <q-field helper="How would developers use this feature?" class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="form.api"
            type="textarea"
            float-label="Propose API"
            required
            placeholder="E.g. <new-component :new-prop /> ..."
            :rows="2"
        />
      </q-field>
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="form.problem"
            type="textarea"
            required
            float-label="Reason add it?"
            placeholder="Convince us..."
            :rows="2"
        />
      </q-field>
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-checkbox v-model="form.canImplement" label="I can implement this."/>
      </q-field>
      <q-btn color="primary" class="float-right q-ma-lg" @submit.prevent="create" type="submit">Create</q-btn>
    </form>
  </q-page>
</template>

<script>
import RequestForm from '../components/forms/RequestForm'
import HintedField from '../components/forms/HintedField'
import { required } from 'vuelidate/lib/validators'
import openGithubIssue from '../utils/open-github-issue'
import { repos } from '../config'

const repoOptions = repos.map(repo => {
  return {label: repo.name, value: repo.id}
})

export default {
  name: 'FeatureRequest',
  components: {HintedField, RequestForm},
  validations: {
    form: {
      title: {
        required
      },
      api: {
        required
      },
      problem: {
        required
      }
    }
  },
  data () {
    return {
      form: {
        title: '',
        api: '',
        problem: '',
        canImplement: false
      },
      doList: [
        'QInput add :random-color prop'
      ],
      dontList: [
        'Add new feature'
      ],
      repoOptions: repoOptions,
      repo: repoOptions[0].value
    }
  },
  methods: {
    buildBody () {
      return '#### Usage\n' +
        this.form.api +
        '\n#### Why?\n' +
        this.form.problem +
        (this.form.canImplement ? '\n\n#### I Can Implement it.' : 'no')
    },
    buildTitle () {
      return '[Feature] ' + this.form.title
    },
    create () {
      let repo = this.repo
      let rawTitle = this.buildTitle()
      let rawBody = this.buildBody()
      openGithubIssue(rawTitle, rawBody, repo)
    }
  }
}
</script>
