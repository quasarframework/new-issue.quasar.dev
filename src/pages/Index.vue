<template>
  <q-page padding>

    <div class="shadow-1 q-pa-sm">
      <strong class="q-headline">Issue list is reserved exclusively for bug reports and feature requests.</strong>
      <p>
        Any usage questions will be closed immediately
      </p>

      <p>
        <strong>
          To get help:
        </strong>
        <q-btn icon="fab fa-discord"
               class="q-ma-md"
               flat
               label="Ask on Discord chat"
               @click="openURL('https://discord.gg/5TDhbDg')"/>

        <q-btn icon="fa fa-comments"
               class="q-ma-md"
               flat
               label="Ask on Forums"
               @click="openURL('http://forum.quasar-framework.org/')"/>
      </p>

    </div>

    <form class="q-mt-xl" action="" @submit.prevent="submit">
      <div class="row">
        <q-field class="col-6">
          <q-select
              v-model="repo" :options="repoOptions"
              stack-label="Repository"
              color="tertiary"
              required
          />
        </q-field>
        <q-field class="col-6">
          <q-btn-toggle
              v-model="type"
              toggle-color="primary"
              :options="issueTypes"/>
        </q-field>
      </div>

      <q-field helper="Descriptive - Must be understood without opening the issue!">
        <q-input v-model="title"
                 float-label="Title"
                 :prefix="prefix"/>
      </q-field>
      <component :is="formComponent" ref="formComponent" :repo="repo"/>

      <q-btn type="submit" @submit.prevent="submit" class="float-right q-ma-lg">
        Create
      </q-btn>
    </form>
  </q-page>
</template>
<script>
import { issueTypeForms, issueTypes, repos } from '../config'
import BugReport from './BugReport'
import FeatureRequest from './FeatureRequest'
import openGithubIssue from '../utils/open-github-issue'

const repoOptions = repos.map(repo => {
  return {label: repo.name, value: repo}
})
export default {
  components: {
    BugReport,
    FeatureRequest
  },
  data () {
    return {
      title: '',
      issueTypes: issueTypes.map(type => (
        {
          label: type.name,
          value: type
        }
      )),
      type: issueTypes[0],
      repoOptions: repoOptions,
      repo: repoOptions[0].value
    }
  },
  computed: {
    prefix () {
      return this.type.prefix
    },
    formComponent () {
      return issueTypeForms[this.type.id]
    }
  },
  methods: {
    buildTitle () {
      return `${this.prefix} ${this.title}`
    },
    buildBody () {
      return this.$refs.formComponent.buildBody()
    },
    submit () {
      openGithubIssue(this.buildTitle(), this.buildBody(), this.repo.id)
    }
  }
}

</script>
