<template>
  <q-page padding>
    <form @submit.prevent="create">

      <div class="q-headline q-ma-lg">Feature Request</div>
      <q-field helper="Descriptive - Request must be understood without opening the issue!"
               class="q-pa-lg shadow-1 q-ma-lg">
        <q-input v-model="form.title"
                 placeholder="Add support for windows 95"
                 float-label="Title"
                 prefix="[Feature]"/>
      </q-field>
      <q-field helper="Proposed API" class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="form.api"
            type="textarea"
            float-label="How to use it?"
            placeholder="E.g. <new-component :new-prop /> ..."
            :rows="2"
        />
      </q-field>
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-input
            v-model="form.problem"
            type="textarea"
            float-label="Reason add it?"
            placeholder="Convince us..."
            :rows="2"
        />
      </q-field>
      <q-field class="q-pa-lg shadow-1 q-ma-lg">
        <q-checkbox v-model="form.canImplement" label="I can implement this."/>
      </q-field>
      <q-btn color="primary" class="float-right q-ma-lg" @click="create" type="submit">Create</q-btn>
    </form>
  </q-page>
</template>

<script>
import RequestForm from '../components/forms/RequestForm'
import HintedField from '../components/forms/HintedField'
import { required } from 'vuelidate/lib/validators'
import openGithubIssue from '../utils/open-github-issue'

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
      repo: 'panstromek/new-issue.quasar-framework.org',
      doList: [
        'QInput add :random-color prop'
      ],
      dontList: [
        'Add new feature'
      ]
    }
  },
  methods: {
    buildBody () {
      return this.api + this.problem
    },
    buildTitle () {
      return '[Feature] ' + this.title
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
