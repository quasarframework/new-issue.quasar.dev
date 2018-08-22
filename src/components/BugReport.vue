<template>

  <div>

    <q-field helper="Describe steps needed to make this bug happen. We need to reproduce the bug to fix it.">
      <q-input
          v-model.trim="reproductionSteps"
          type="textarea"
          float-label="Steps to reproduce"
          :placeholder="'1. ...\n2. ...'"
          rows="2"
          required
      />
    </q-field>
    <div class="row gutter-sm q-my-sm">

      <q-field helper="What should happen after steps above?" class="col-6">
        <q-input
            v-model.trim="expected"
            type="textarea"
            float-label="Expected behaviour"
            color="primary"
            required
        />
      </q-field>

      <q-field helper="What actually happens?" class="col-6">
        <q-input
            v-model.trim="actual"
            type="textarea"
            float-label="Actual behaviour"
            color="primary"
            required
        />
      </q-field>
    </div>
    <div class="q-my-md row q-caption text-grey-6">
      <div class="col-6">
        <ul>
          <li>Don't write generic phrases like 'It doesn't work'!</li>
          <li>Write EXACTLY what happens</li>
        </ul>
      </div>
      <div class="col-6">
        <ul>
          <li>Don't write generic phrases like 'It should work'</li>
          <li>Write EXACTLY what should happen</li>
        </ul>
      </div>
    </div>
    <div class="row gutter-sm q-my-sm">

      <div class="col-6">
        <q-field>
          <q-input
              @focus="fetchVersions"
              v-model.trim="version"
              type="text"
              :float-label="`${repo.name} Version`">

            <q-autocomplete :static-data="versions"
                            :min-characters="0"
                            :max-results="100"
                            max-height="15em"
                            value-field="version">

            </q-autocomplete>
          </q-input>
        </q-field>
        <div class="q-caption q-mt-sm text-grey-6">
          Check if the issue isn't already resolved in next version or in dev branch.
        </div>
      </div>

      <div class="col-6">
        <q-field helper="JsFiddle, Codepen or minimal project repo.">
          <q-input
              v-model.trim="reproductionLink"
              type="url"
              float-label="Minimal Reproduction"
              placeholder="Url..."
          />
        </q-field>
        <div class="q-mt-md q-caption text-grey-6">
          <strong>This is important!</strong>
          <ul>
            <li>Issues with no reproduction may not be fixed</li>
            <li>Reproduction speeds up the fix process a lot</li>
            <li>Be minimal - include ONLY what is needed to make bug happen</li>
          </ul>
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

    <q-field class="col-6" helper="Tip: In CLI based project you can run 'quasar info' and paste the result here">
      <q-input
          v-model.trim="quasarInfo"
          type="textarea"
          float-label="System info"
          placeholder="Win 95, Firefox 11, ..."
          required
          rows="2"
      />
    </q-field>

  </div>
</template>

<script>

export default {
  name: 'BugReport',
  props: {
    repo: {
      type: Object,
      default: () => ({name: ''})
    }
  },
  data () {
    return {
      title: '',
      reproductionSteps: '',
      expected: '',
      actual: '',
      version: '',
      quasarInfo: '',
      reproductionLink: '',
      versions: {
        // Property name that will be used by filter() to filter the array of objects below.
        field: 'version',

        list: []
      }
    }
  },
  methods: {
    buildTitle () {
      return `[Bug] ${this.title}`
    },
    buildBody () {
      return `#### Steps
${this.reproductionSteps}

#### Expected
${this.expected}

#### Actual
${this.actual}
${this.reproductionLink ? `
#### Reproduction link
${this.reproductionLink}` : ``}
#### Info
\`\`\`
${this.quasarInfo}
\`\`\`
`
    },
    fetchVersions () {
      this.$axios.get(`https://api.github.com/repos/${this.repo.id}/releases`)
        .then(({data}) => {
          // eslint-disable-next-line camelcase
          this.versions.list = data.map(({tag_name}) => {
            let v = tag_name.substr(1)
            return {
              version: v,
              label: v
            }
          })
        })
    }
  },
  watch: {
    repo: {
      immediate: true,
      handler () {
        this.versions.list = []
        this.version = ''
        this.fetchVersions()
      }
    }
  }

}
</script>
