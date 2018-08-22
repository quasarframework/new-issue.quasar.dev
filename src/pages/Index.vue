<template>
  <q-page padding class="row justify-center">

    <div class="col col-lg-8 col-md-10">
      <div class="shadow-1 q-pa-sm">
        <strong>Issue list is reserved exclusively for bug reports and feature requests.</strong>
        <div>
          Any usage questions will be closed immediately
        </div>

        <div>
          <strong>
            To get help:
          </strong>
          <q-btn icon="fab fa-discord"
                 class="q-ma-sm"
                 flat
                 label="Ask on Discord chat"
                 @click="openURL('https://discord.gg/5TDhbDg')"/>

          <q-btn icon="fa fa-comments"
                 class="q-ma-sm"
                 flat
                 label="Ask on Forums"
                 @click="openURL('http://forum.quasar-framework.org/')"/>
        </div>
      </div>
      <form class="q-mt-md" action="" @submit.prevent="submit">
        <div class="row items-center q-my-sm">
          <q-field class="col-6">
            <q-select
                v-model="repo" :options="repoOptions"
                stack-label="Repository"
                required
            />
          </q-field>
          <q-field class="col-6 text-center">
            <q-btn-toggle
                class="q-ma-xs"
                v-model="type"
                toggle-color="primary"
                :options="issueTypes"/>
          </q-field>
        </div>

        <q-field helper="Descriptive - Must be understood without opening the issue!" class="q-my-sm">
          <q-input v-model.trim="title"
                   float-label="Title"
                   :prefix="prefix"/>
        </q-field>
        <component :is="formComponent" ref="formComponent" :repo="repo" class="q-my-sm"/>
        <div class="float-right q-ma-lg">

          <q-btn @click="updatePreview">
            Preview
          </q-btn>
          <q-btn class="on-right" type="submit" @submit.prevent="submit" color="primary">
            Post
          </q-btn>
        </div>
      </form>
      <q-modal v-model="showPreview" content-classes="q-pa-md round-borders">
        <div>
          <div v-html="preview" class="preview">

          </div>
          <q-btn v-close-overlay class="float-right">
            Close
          </q-btn>
        </div>
      </q-modal>
    </div>
  </q-page>
</template>
<script>
import { issueTypeForms, issueTypes, repos } from '../config'
import BugReport from '../components/BugReport'
import FeatureRequest from '../components/FeatureRequest'
import openGithubIssue from '../utils/open-github-issue'
import createPreview from '../utils/create-preview'

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
      repo: repoOptions[0].value,
      preview: '',
      showPreview: false
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
    updatePreview () {
      this.preview = createPreview(this.buildBody())
      this.showPreview = true
    },
    buildTitle () {
      return `${this.prefix} ${this.title}`
    },
    buildBody () {
      return this.$refs.formComponent.buildBody()
    },
    submit () {
      openGithubIssue(this.buildTitle(), this.buildBody(), this.repo.id)
    }
  },
  created () {
    // if the repo is written in url params, set it as initial option for repo selection
    let repoParam = this.$route.params.repo
    if (repoParam) {
      let ownerParam = this.$route.params.owner

      let fullRepoName
      if (ownerParam) {
        fullRepoName = `${ownerParam}/${repoParam}`
      } else {
        fullRepoName = repoParam
      }

      let repoOption = repoOptions.find(option => option.value.id === fullRepoName)
      if (repoOption) {
        this.repo = repoOption.value
      }
    }
  }
}

</script>

<style>
  .preview h4 {
    font-size: x-large;
    margin-top: 5px;
    margin-bottom: 0;
  }
</style>
