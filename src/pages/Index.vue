<template>
  <q-page padding class="row justify-center">

    <div class="col col-lg-8 col-md-10">
      <div class="shadow-1 q-pa-sm">
        <strong>The Quasar Framework issue tracker is reserved exclusively for bug reports and feature
          requests.</strong>
        <div>
          Any questions about usage will be closed immediately.
        </div>

        <div>
          <strong>
            To get help:
          </strong>
          <q-btn icon="fab fa-discord"
                 class="q-ma-sm"
                 flat
                 label="Chat on Discord"
                 type="a"
                 href="https://discord.gg/5TDhbDg"
                 target="_blank"
                 rel="nofollow"/>

          <q-btn icon="fa fa-comments"
                 class="q-ma-sm"
                 flat
                 label="Ask the Forum"
                 type="a"
                 href="https://forum.quasar-framework.org/"
                 target="_blank"
                 rel="nofollow"/>
        </div>
      </div>
      <form class="q-mt-md" action="" @submit.prevent="submit">
        <div class="row items-center q-my-sm">
          <q-field class="col-xs-12 col-sm-6">
            <q-select
                v-model="repo" :options="repoOptions"
                stack-label="Repository"
                required
            />
          </q-field>
          <q-field class="col-xs-12 col-sm-6 text-center">
            <q-btn-toggle
                class="q-ma-xs"
                v-model="type"
                toggle-color="primary"
                :options="issueTypes"/>
          </q-field>
        </div>

        <q-field helper="Descriptive - We must understand you without opening the issue!" class="q-my-sm">
          <q-input v-model.trim="title"
                   float-label="Title"
                   :prefix="prefix"/>
        </q-field>
        <div class="q-caption text-right q-mt-lg text-grey-6">
          Note: You can use markdown to format lists and code. <br>
          Paste a link to add a screenshot
        </div>
        <component :is="formComponent" ref="formComponent" :repo="repo" class=""/>
        <div class="row gutter-md q-mt-xs">
          <div class="col-xs-12 col-sm-6">
            <q-field>
              <q-checkbox class="text-grey-6" v-model="patron" label="I am a patron."/>
            </q-field>
            <q-field v-if="patron" class="q-pt-md">
              <q-input type="text"
                       v-model="patronName"
                       float-label="Patreon name"
                       :required="patron"/>
            </q-field>

            <q-field class="q-pt-md" helper="Do you want to offer a reward for solving this issue?">
              <q-input v-model="reward" float-label="Bounty" type="number"
                       prefix="$"/>
            </q-field>
          </div>

        </div>

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
      showPreview: false,
      patron: false,
      patronName: '',
      reward: ''
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
      return `${this.$refs.formComponent.buildBody()}


 ${this.patron ? ` - [x] Patron: ${this.patronName}` : ''}
 ${this.reward > 0 ? ` - [x] Bounty: ${this.reward}` : ''}`
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

  .preview img {
    max-height: 100vh;
    max-width: 50vw;
  }
</style>
