<template>
  <q-page padding class="row justify-center">

    <div class="q-pa-md page-body">
      <q-slide-transition>
        <q-card v-if="showHeaderInfo">
          <q-card-section class="row">
            <div class="text-h6 col-10">Thanks for contributing to Quasar!</div>
            <q-btn class="col-1 q-pr-lg q-pt-lg absolute-top-right" icon="clear" flat no-ripple @click="showHeaderInfo = false"></q-btn>
          </q-card-section>
          <q-card-section>
             <strong><p>Issues created for any Quasar Framework repository are reserved exclusively for bug reports and feature requests.</p></strong>
            <strong>Important!</strong>
              <ul>
                <li>Bug reports that we cannot reproduce cannot be fixed.</li>
                <li>Giving us reproduction steps speeds up the fix process.</li>
                <li>Demonstrating the issue with reproduction code (fiddle, codepen, repo) is even better.</li>
                <li>Be minimal - include ONLY what is needed to make the bug happen</li>
                <li>Any questions about usage or issues written in any langauge other than English will be closed immediately.</li>
              </ul>
          </q-card-section>
          <q-card-section class="row">
            <div class="col-12">
              <strong>
              To get help:
              </strong>
            </div>
            <q-btn
              icon="fab fa-discord"
              class="q-ma-sm"
              flat
              label="Chat on Discord"
              type="a"
              href="https://discord.gg/5TDhbDg"
              target="_blank"
              rel="nofollow"
            />
            <q-btn
              icon="fa fa-comments"
              class="q-ma-sm"
              flat
              label="Ask in the Forum"
              type="a"
              href="https://forum.quasar-framework.org/"
              target="_blank"
              rel="nofollow"
            />
          </q-card-section>
        </q-card>
      </q-slide-transition>
      <form action="" @submit.prevent="submit" autocomplete="off" ref="form">
        <div class="row q-col-gutter-md q-mt-xs items-center">
          <div class="col-sm-5 col-xs-12 text-center">
            <q-btn-toggle
            v-model="type"
            toggle-color="primary"
            :options="issueTypes"
            />
          </div>
          <div class="col-sm-7 col-xs-12 q-mt-xs">
            <q-select
              filled
              expand-besides
              v-model="repo"
              :options="repoOptions"
              label="Repository / Package"
              emit-value
              :display-value="repo.name"
            />
          </div>
        </div>
        <div class="row q-my-sm q-mt-lg">
          <q-input
            id="title"
            class="col"
            filled
            v-model="title"
            label="Title*"
            :prefix="prefix"
            @blur="$v.title.$touch()"
            :error="$v.title.$error"
            error-message="The Title field must be filled in."
            hint="Be descriptive - We must understand the issue before even seeing the details!"
          />
        </div>
        <component
          :is="formComponent"
          ref="formComponent"
          :repo="repo"
          :v="$v"
          @setVersionsRequired="setVersionsRequired"
          @validate="checkValidation"
          :formFields="formFields" class=""
        />
        <div class="row q-gutter-md q-mt-xs">
          <div class="col-xs-12 col-sm-6">
            <q-checkbox class="text-grey-6" v-model="patron" label="I am a patron."/>
            <q-input
              v-if="patron"
              class="q-pt-md"
              type="text"
              v-model="patronName"
              label="Patreon name"
              :required="patron"
            />
            <q-input
              v-if="patron"
              v-model="reward"
              class="q-pt-md"
              label="Bounty"
              type="number"
              hint="Do you want to offer a reward for solving this issue?"
              prefix="$"/>
          </div>
        </div>

        <div class="float-right q-ma-lg">
          <q-btn @click="updatePreview" color="primary">
            Preview
          </q-btn>
        </div>

        <q-dialog
          v-model="showPreview"
        >
          <q-card style="width: 600px">
            <q-card-section>
              <div class="text-h6">Title</div>
              <div>[{{ formFields.version.label }} - Bug] - {{ title }}</div>
              <preview :formFields="formFields" :issueType="type.id" />
              <div class="text-h6">General Info</div>
              <div>{{ repo.name }} Version: {{ formFields.version.label}}</div>
              <div>Build Modes: {{ formFields.buildModes.map(mode => ` ${mode}`) }} </div>
              <div class="text-h6">System Info:</div>
              <pre>{{ formFields.quasarInfo }} </pre>
            </q-card-section>
            <q-card-actions class="on-right">
              <q-btn v-close-dialog>
                Close
              </q-btn>
              <q-btn v-close-dialog @click="submitFromDialog" color="primary">
                Post
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </form>
    </div>
  </q-page>
</template>
<script>
import { issueTypeForms, issueTypes, repos } from '../config'
import BugReport from '../components/BugReport'
import FeatureRequest from '../components/FeatureRequest'
import Preview from '../components/Preview'
import openGithubIssue from '../utils/open-github-issue'
import { required, requiredIf, url } from 'vuelidate/lib/validators'

const repoOptions = repos.map(repo => {
  return { label: repo.name, value: repo }
})

export default {
  components: {
    BugReport,
    FeatureRequest,
    Preview
  },
  data () {
    return {
      title: '',
      bugForm: {
        reproductionSteps: '',
        expected: '',
        actual: '',
        version: '',
        buildModes: [],
        reproductionLink: '',
        quasarInfo: ''
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
      type: issueTypes[0],
      repoOptions: repoOptions,
      repo: {},
      preview: '',
      showPreview: false,
      patron: false,
      patronName: '',
      reward: '',
      showHeaderInfo: true,
      versionsRequired: false
    }
  },
  validations () {
    if (this.type.id === 'bug') {
      return { // bug form
        title: { required },
        bugForm: {
          reproductionSteps: { required },
          expected: { required },
          actual: { required },
          version: {
            required: requiredIf(() => {
              return this.versionsRequired
            })
          },
          buildModes: { required },
          reproductionLink: { url }
        }
      }
    } else {
      return { // feature form
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
      return `[${this.type.prefix}]`
    },
    formComponent () {
      return issueTypeForms[this.type.id]
    },
    formFields () {
      this.$v.$reset()
      if (this.type.id === 'bug') {
        return this.bugForm
      } else {
        return this.featureForm
      }
    }
  },
  methods: {
    submitFromDialog () {
      // This timeout is here to postpone validation check after dialog is closed,
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
        return
      }
      this.preview = this.buildBody()
      this.showPreview = true
    },
    buildTitle () {
      let version = '',
        repoName = ''
      if (this.versionRequired) {
        version = this.bugForm.version + ' - '
      }
      if (this.repo.dataFilter[0] === '1') {
        repoName = this.repo.name + ' - '
      }
      return `[${repoName}${version}${this.type.prefix}] - ${this.title}`
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
      if (!this.$v) return
      this.type.id === 'bug'
        ? this.$v.bugForm[field].$touch()
        : this.$v.featureForm[field].$touch()
    },
    setVersionsRequired (versionsRequired) {
      this.versionsRequired = versionsRequired
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

<style lang="stylus">
  .q-dialog__inner--minimized>div {
    max-width 600px
  }
  .page-body {
    width 800px
  }
  .header-info {
    background #FEFEFE
  }
  .preview img {
    max-height 100vh
    max-width 50vw
  }
  .q-field--filled .q-field__control {
    background #FEFEFE
  }
  .q-field--filled .q-field__control:hover  {
    background #E1E1E1
  }
  .q-field--filled.q-field--focused .q-field__control:before {
    background #E1E1E1
  }
  h4 {
    font-size 1.4rem
    margin-block-start 1.5rem
    margin-block-end 1.5rem
  }
</style>
