<template>

  <div>
    <q-field 
      helper="Describe the steps needed to reproduce your issue."
      :error="this.v.bugForm.reproductionSteps.$error"
      error-label="You must explain some reproduction steps."
    >
      <image-aware-input
          id="reproductionSteps"
          v-model="formFields.reproductionSteps"
          type="textarea"
          float-label="Steps to reproduce*"
          :placeholder="'1. ...\n2. ...'"
          :rows="4"
          @blur="checkValidity('reproductionSteps')"
          :after="[{ icon: 'info_outline', handler: showInfo }]"
      />
    </q-field>
    <div class="row gutter-sm q-my-sm">

      <q-field 
        helper="What did you expect to happen after doing the above?" 
        class="col-xs-12 col-sm-6"
        :error="this.v.bugForm.expected.$error"
        error-label="You must explain what you expected."
      >
        <image-aware-input
            id="expected"
            v-model="formFields.expected"
            type="textarea"
            float-label="Expected behaviour*"
            color="primary"
            required
            rows="4"
            @blur="checkValidity('expected')"
            :after="[{ icon: 'info_outline', handler: showInfo }]"
        />
      </q-field>
      <q-field 
        helper="What actually happens?" 
        class="col-xs-12 col-sm-6"
        :error="this.v.bugForm.actual.$error"
        error-label="You must explain what actually happened."
      >
        <image-aware-input
            id="actual"
            v-model="formFields.actual"
            type="textarea"
            float-label="Actual behaviour*"
            color="primary"
            required
            rows="4"
            @blur="checkValidity('actual')"
            :after="[{ icon: 'info_outline', handler: showInfo }]"
        />
      </q-field>
    </div>
    <div class="row gutter-md q-my-sm">

      <div class="col-xs-12 col-sm-6">
        <q-field
          :error="this.v.bugForm.version.$error"
          error-label="You must select a version."
        >
          <q-input
            @focus="fetchVersions"
            v-model.trim="formFields.version"
            type="text"
            :float-label="`${repo.name} Version*`"
            @blur="checkValidity('version')"
          >
            <!--
            There is a reason why this field is not plain Select but Input with Autocomplete
           As noted on original Vue new issue repo, Github API seems to sometimes not catching up so fast and new version is missing

            Also user might be using some beta version which is not listed on Github
            or the maintainer didn't put release tag on Github
            -->
            <q-autocomplete :static-data="versions"
                            :min-characters="0"
                            :max-results="100"
                            max-height="15em"
                            value-field="version">

            </q-autocomplete>
          </q-input>
        </q-field>
        <div class="q-caption q-mt-sm text-grey-6">
          Please have a look to see if the issue hasn't already been resolved in the latest version or in dev branch.
        </div>
        <q-field 
          helper="Select the build modes you are using."
          class="q-pt-lg"
          :error="this.v.bugForm.buildMode.$error"
          error-label="You must select the build modes you are using."
        >
          <q-select v-model="formFields.buildMode"
                    :options="buildModeOptions"
                    float-label="Build Mode*"
                    multiple
                    @blur="checkValidity('buildMode')"
                    />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-field helper="JsFiddle, Codepen or minimal project repo.">
          <q-input
              v-model.trim="reproductionLink"
              type="url"
              float-label="Minimal Reproduction"
              placeholder="Url..."
          />
        </q-field>
        <div class="q-mt-md q-caption text-grey-6">
          <strong>You can fork and edit one of these.</strong>
          <ul>
            <li><a href="https://jsfiddle.net/rstoenescu/waugrryy" target="_blank" rel="noopener noreferrer">
              jsFiddle Material theme
            </a></li>
            <li><a href="https://jsfiddle.net/rstoenescu/7gu065yg" target="_blank" rel="noopener noreferrer">
              jsFiddle iOS theme
            </a></li>
            <li><a href="https://codepen.io/rstoenescu/pen/KQRZJg" target="_blank" rel="noopener noreferrer">
              Codepen - Material theme
            </a></li>
            <li><a href="https://codepen.io/rstoenescu/pen/paVpBN" target="_blank" rel="noopener noreferrer">
              Codepen - iOS theme
            </a></li>
          </ul>
        </div>
      </div>
    </div>
    <q-field 
      class="col-xs-12 col-sm-6"
      helper="Tip: In a Quasar-CLI based project you can run 'quasar info' and paste the result here"
    >
      <q-input
          v-model="quasarInfo"
          type="textarea"
          float-label="System info"
          placeholder="Win 95, Firefox 11, ..."
          :rows="4"
      />
    </q-field>

  </div>
</template>

<script>
import ImageAwareInput from './ImageAwareInput'
import { buildModes } from '../config'
import formatMarkdown from '../utils/format-markdown'

const buildModeOptions = buildModes.map(mode => ({label: mode, value: mode}))

export default {
  name: 'BugReport',
  components: {ImageAwareInput},
  props: {
    repo: {
      type: Object,
      default: () => ({name: ''})
    },
    v: {
      type: Object,
      required: true
    },
    formFields: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      quasarInfo: '',
      reproductionLink: '',
      buildModeOptions,
      versions: {
        // Property name that will be used by filter() to filter the array of objects below.
        field: 'version',
        list: []
      }
    }
  },
  methods: {
    buildTitle () {
      return `[Bug] - ${this.title}`
    },
    buildBody () {
      return `#### Steps
${this.formFields.reproductionSteps}
#### Expected
${this.formFields.expected}
#### Actual
${this.formFields.actual}
${this.reproductionLink ? `
#### Reproduction link
${this.reproductionLink}` : ``}
#### Info
${this.repo.name} Version: ${this.formFields.version}
Build mode:${this.formFields.buildMode.map(mode => ` ${mode}`)}
${this.quasarInfo}
`
    },
    fetchVersions () {
      this.versions.list = []
      this.$axios.get(`https://api.github.com/repos/${this.repo.id}/releases?per_page=100`)
        .then(({data}) => {
          this.versions.list.push(
            // eslint-disable-next-line camelcase
            ...data.map(({tag_name}) => {
              let v = tag_name.substr(1)
              return {
                version: v,
                label: v
              }
            }))
        })
    },
    checkValidity (field) {
      this.$emit('validate', field)
    },
    showInfo(e) {
      const id = e.target.parentElement.id
      this.$emit('showInfo', id)
    }
  },
  watch: {
    repo: {
      immediate: true,
      handler () {
        this.version = ''
        this.fetchVersions()
      }
    }
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
