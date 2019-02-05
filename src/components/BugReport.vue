<template>

  <div>
    <image-aware-input
      refId="reproductionSteps"
      v-model="formFields.reproductionSteps"
      hintText="Describe the steps you took in order to reproduce your issue."
      label="Steps to Reproduce*"
      :placeholder="'1. ...\n2. ...'"
      @blur="checkValidity('reproductionSteps')"
      :error="this.v.bugForm.reproductionSteps.$error"
      error-message="You must explain some reproduction steps."
    />
    <div class="q-col-gutter-md q-my-sm">
      <image-aware-input
        refId="expected"
        class="col-sm-12 col-md-6 "
        v-model="formFields.expected"
        label="Expected Behaviour*"
        @blur="checkValidity('expected')"
        :error="this.v.bugForm.expected.$error"
        error-message="You must explain what you expected."
        hintText="What did you expect to happen after doing the steps above?"
      />
      <image-aware-input
        refId="actual"
        class="col-sm-12 col-md-6"
        v-model="formFields.actual"
        label="Actual Behaviour*"
        @blur="checkValidity('actual')"
        hintText="What actually happens?"
        :error="this.v.bugForm.actual.$error"
        error-message="You must explain what actually happened."
      />
    </div>
    <div class="row q-col-gutter-md">

      <div class="q-my-sm col-xs-12 col-sm-6 q-mt-lg">
        <q-select
          v-model="formFields.version"
          filled
          expand-besides
          :options="versions.list"
          option-value="version"
          :label="`${repo.name} Version*`"
          @blur="checkValidity('version')"
          @focus="fetchVersions"
          :error="this.v.bugForm.version.$error"
          error-message="You must select a version."
          hint="Make sure your issue hasn't already been resolved in the latest version or in dev branch."
        >
        </q-select>
      </div>

      <div class="col-xs-12 col-sm-6 q-mt-lg">
          <q-input
            v-model.trim="formFields.reproductionLink"
            filled
            type="url"
            label="Minimal Reproduction URL"
            placeholder="Url..."
            hint="JsFiddle, Codepen or minimal project repo."
            @blur="checkValidity('reproductionLink')"
            :error="this.v.bugForm.reproductionLink.$error"
            error-message="You must enter a proper URL."
          />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="formFields.buildMode"
          filled
          expand-besides
          emit-value
          :options="buildModeOptions"
          label="Build Mode*"
          multiple
          @blur="checkValidity('buildMode')"
          hint="Select the build modes you are using."
          :error="this.v.bugForm.buildMode.$error"
          error-message="You must select the build modes you are using."
        />
     </div>
     <div class="col-xs-12 col-sm-6 q-caption text-grey-6">
        <strong>You can fork and edit one of these.</strong>
        <ul>
          <li><a href="https://jsfiddle.net/rstoenescu/waugrryy" target="_blank" rel="noopener noreferrer">
            jsFiddle Material theme
          </a></li>
          <li><a href="https://codepen.io/rstoenescu/pen/KQRZJg" target="_blank" rel="noopener noreferrer">
            Codepen - Material theme
          </a></li>
        </ul>
      </div>
    </div>
    <q-input
      class="col-xs-12 col-sm-6"
      filled
      autogrow
      v-model="quasarInfo"
      type="textarea"
      label="System info"
      placeholder="Win 95, Firefox 11, ..."
      hint="Tip: In a Quasar-CLI based project you can run 'quasar info' and paste the result here"
    />
  </div>
</template>

<script>
import ImageAwareInput from './ImageAwareInput'
import { buildModes } from '../config'

const buildModeOptions = buildModes.map(mode => ({ label: mode, value: mode }))

export default {
  name: 'BugReport',
  components: { ImageAwareInput },
  props: {
    repo: {
      type: Object,
      default: () => ({ name: '' })
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
      buildModeOptions,
      versions: {
        // Property name that will be used by filter() to filter the array of objects below.
        field: 'version',
        list: []
      },
      versionsRequired: true
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
#### System Info
${this.repo.name} Version: ${this.formFields.version}
Build mode:${this.formFields.buildMode.map(mode => ` ${mode}`)}
${this.quasarInfo}
`
    },
    fetchVersions () {
      this.versions.list = []
      this.$axios.get(`https://api.github.com/repos/${this.repo.id}/releases?per_page=150`)
        .then(({ data }) => {
          if (data.length !== 0) {
            this.versionsRequired = true
            this.versions.list.push(
              // eslint-disable-next-line camelcase
              ...data.map(({ tag_name }) => {
                let v = tag_name.substr(1)
                return {
                  version: v,
                  label: v
                }
              })
            )
          }
          if (this.repo.dataFilter[0] !== 'all') {
            this.versions.list = this.versions.list.filter(item => {
              return this.repo.dataFilter.some(filter => item.version.startsWith(filter))
            })
          }
          if (data.length === 0 || this.versions.list.length === 0) {
            this.versionsRequired = false
            this.versions.list.push({
              version: 'Nothing to select!',
              label: 'Nothing to select!'
            })
          }
          this.$emit('setVersionsRequired', this.versionsRequired)
        })
    },
    checkValidity (field) {
      this.$emit('validate', field)
    }
  },
  watch: {
    repo: {
      immediate: true,
      handler () {
        this.version = ''
        this.versions.list = []
        this.fetchVersions()
      }
    }
  }

}
</script>
<style>
  .preview img {
    max-height: 100vh;
    max-width: 50vw;
  }
  .q-card h6 {
    line-height: 0 !important;
  }
</style>
