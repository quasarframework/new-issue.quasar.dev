<template>
  <q-page padding class="row justify-center">

    <div class="col col-lg-8 col-md-10">
      <q-slide-transition>
      <div v-if="showHeaderInfo" class="shadow-1 q-pa-sm">
        <q-btn icon="clear" flat style="float: right" no-ripple @click="showHeaderInfo = false"></q-btn>
        <strong><p>Thanks for contributing to Quasar!</p>
        <p>Issues created for any Quasar Framework repository are reserved exclusively for bug reports and feature requests.</p></strong> 
        <div>
          <strong>Important!</strong>
            <ul>
              <li>Bug reports that we cannot reproduce cannot be fixed.</li>
              <li>Giving us reproduction steps speeds up the fix process.</li>
              <li>Demonstrating the issue with reproduction code (fiddle, codepen, repo) is even better.</li>
              <li>Be minimal - include ONLY what is needed to make the bug happen</li>
              <li>Any questions about usage or issues written in any langauge other than English will be closed immediately.</li>
            </ul>
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
                 label="Ask in the Forum"
                 type="a"
                 href="https://forum.quasar-framework.org/"
                 target="_blank"
                 rel="nofollow"/>
        </div>
      </div>
      </q-slide-transition>
      <form class="q-mt-md" action="" @submit.prevent="submit" ref="form">
        <div class="row items-center q-my-sm">
          <q-field class="col-xs-12 col-sm-6">
            <q-select
                v-model="repo" :options="repoOptions"
                stack-label="Repository"
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

        <q-field 
          helper="Be descriptive - We must understand the issue before even opening it!" 
          class="q-my-sm"
          :error="$v.title.$error"
          error-label="The Title field must be filled in."
          >
          <q-input
            id="title" 
            v-model="title"
            float-label="Title*"
            :prefix="prefix"
            @blur="$v.title.$touch()"
                   />
        </q-field>
        <component 
          :is="formComponent" 
          ref="formComponent" 
          :repo="repo" 
          :v="$v" 
          @validate="checkValidation"
          @showInfo="showInfo"
          :formFields="formFields" class=""/>
        <div class="row gutter-md q-mt-xs">
          <div class="col-xs-12 col-sm-6">
            <q-field>
              <q-checkbox class="text-grey-6" v-model="patron" label="I am a patron."/>
            </q-field>
            <q-field v-if="patron" class="q-pt-md">
              <q-input type="text"
                       v-model="patronName"
                       float-label="Patreon name"
                       :required="patron"
              />
            </q-field>

            <q-field class="q-pt-md" helper="Do you want to offer a reward for solving this issue?">
              <q-input v-model="reward" float-label="Bounty" type="number"
                       prefix="$"/>
            </q-field>
          </div>

        </div>

        <div class="float-right q-ma-lg">

          <q-btn id="preview" @click="updatePreview('preview')" color="primary">
            Preview
          </q-btn>
        </div>
        <q-modal 
          v-model="showPreview"
          content-classes="q-pa-md round-borders"
          content-css="{minWidth: '80vw', minHeight: '80vh'}"
          >
          <div>
            <div v-html="preview" class="preview">

            </div>
            <q-btn v-close-overlay class="">
              Close
            </q-btn>
            <q-btn v-close-overlay class="on-right" @click="submitFromModal" color="primary">
              Post
            </q-btn>
          </div>
        </q-modal>
        <q-modal 
          v-model="showInfoModal"
          content-classes="q-pa-md round-borders"
          content-css="{minWidth: '80vw', minHeight: '80vh'}"
        >
          <div v-html="this.infoModal.title" class="preview">
          </div>
          <div v-html="this.infoModal.message" class="preview">
          </div>
          <q-btn v-close-overlay class="">
            Close
          </q-btn>
        </q-modal>
      </form>

    </div>
  </q-page>
</template>
<script>
import { issueTypeForms, issueTypes, repos, modalText } from '../config'
import BugReport from '../components/BugReport'
import FeatureRequest from '../components/FeatureRequest'
import openGithubIssue from '../utils/open-github-issue'
import formatMarkdown from '../utils/format-markdown'
import { required } from 'vuelidate/lib/validators'

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
      bugForm:{
         reproductionSteps: '',
         expected: '',
         actual: '',
         version: '',
         buildMode: []
      },
      featureForm: {
        api: '',
        problem: ''
      },
      issueTypes: issueTypes.map(type => (
        {
          label: type.name,
          value: type
        }
      )),
      showInfoModal: false,
      infoModal: {
        title: '',
        message: ''
      },
      type: issueTypes[0],
      repoOptions: repoOptions,
      repo: {},
      preview: '',
      showPreview: false,
      patron: false,
      patronName: '',
      reward: '',
      showHeaderInfo: true
    }
  },
  validations () {
    if (this.type.id === 'bug') {
      return {
        title: { required },
        bugForm: {
          reproductionSteps: { required },
          expected: { required },
          actual: { required },
          version: { required },
          buildMode: { required }
        }
      }
    } 
    else {
      return {
         title: { required },
         featureForm: { 
          api: { required },
          problem: { required }
        }
      }
    }
  },
  computed: {
    prefix () {
      return this.type.prefix
    },
    formComponent () {
      return issueTypeForms[this.type.id]
    },
    formFields () {
      this.$v.$reset()
      if (this.type.id === 'bug') {
        return this.bugForm
      }
      else {
        return this.featureForm
      }
    }
  },
  methods: {
    submitFromModal () {
      // This timeout is here to postpone validation check after modal is closed,
      // otherwise native validation reporting is not triggered
      setTimeout(() => {
        if (this.$refs.form.reportValidity()) {
          this.submit()
        }
      }, 0)
    },
    updatePreview () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        const id = 'previeErrorText'
        this.showInfo(id)
        return
      }
      this.preview = formatMarkdown(this.buildBody())
      this.showPreview = true
    },
    buildTitle () {
      return `${this.prefix} - ${this.title}`
    },
    buildBody () {
      return `#### Title
 ${this.buildTitle()}
 ${this.$refs.formComponent.buildBody()}


 ${this.patron ? ` - [x] Patron: ${this.patronName}` : ''}
 ${this.reward > 0 ? ` - [x] Bounty: ${this.reward}` : ''}`
    },
    submit () {
      openGithubIssue(this.buildTitle(), this.buildBody(), this.repo.id)   
    },
    checkValidation (field) {
      if(!this.$v){ return }
      if (this.type.id === 'bug') {
        this.$v.bugForm[field].$touch()
      }
      else {
        this.$v.featureForm[field].$touch()
      }
    },
    showInfo (id) {
      this.infoModal.title = formatMarkdown(modalText[id].title),
      this.infoModal.message= formatMarkdown(modalText[id].message)
      this.showInfoModal = true
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
    this.repo = repoOptions[0].value
  }
}

</script>

<style>
  .preview h4 {
    font-size: large;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 0;
  }

  .preview img {
    max-height: 100vh;
    max-width: 50vw;
  }
</style>
