<template>
  <q-step name="second" title="Content" subtitle="Compose your issue">

    <div class="row sm-gutter">
      <div class="col">
        <q-field helper="Please choose the repo you want to open the issue for.">
          <q-select
              v-model="repo" :options="repoOptions"
              stack-label="Repository"
              color="tertiary"
              inverted
              required
          />
        </q-field>
      </div>

      <div class="col">
        <q-field helper="What type of issue do you want to open?">
          <q-select
              v-model="type"
              :options="issueTypes"
              stack-label="Issue Type"
              color="tertiary"
              inverted
              required
          />
        </q-field>
      </div>
    </div>

    <q-field helper="One line summary of your issue.">
      <q-input v-model="title" stack-label="Title" color="tertiary" inverted required />
    </q-field>

    <component :is="issueTypeForm"></component>
  </q-step>
</template>

<script>
  import { repos, issueTypes, issueTypeMapping } from '../config'

  import BugForm from './forms/BugForm.vue'
  import RequestForm from './forms/RequestForm.vue'

  export default {
    data () {
      return {
        repo: '',
        type: '',
        title: '',
        repos,
        issueTypes
      }
    },

    computed: {
      issueTypeForm () {
        return issueTypeMapping[this.type] || null
      },

      repoOptions () {
        return this.repos.map(repo => {
          return { label: repo.name, value: repo.id }
        })
      }
    },

    components: {
      BugForm,
      RequestForm
    }
  }
</script>