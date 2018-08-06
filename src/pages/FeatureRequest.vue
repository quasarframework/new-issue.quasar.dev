<template>
  <q-page padding>
    <form @submit.prevent="create">

      <div class="q-headline q-ma-lg">Request a Feature</div>
      <hinted-field v-model="title"
                    :good="doList"
                    :bad="dontList"
                    placeholder="Add support for windows 95"
                    label="Title"
                    required
                    prefix="[Feature]"/>
      <hinted-field
          v-model="api"
          type="textarea"
          label="How to use it?"
          placeholder="<new-component :new-prop />"
          color="primary"
          required
          :rows="3"
      />
      <hinted-field
          helper="What problem does this feature solve?"
          v-model="problem"
          type="textarea"
          label="Reason add it?"
          placeholder="Makes stuff easier."
          color="primary"
          required
          :rows="3"
      />
      <q-btn color="primary" class="float-right q-ma-lg" @click="create" type="submit">Create</q-btn>
    </form>
  </q-page>
</template>

<script>
import RequestForm from '../components/forms/RequestForm'
import HintedField from '../components/forms/HintedField'

export default {
  name: 'FeatureRequest',
  components: {HintedField, RequestForm},
  data () {
    return {
      title: '',
      api: '',
      problem: '',
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
      const title = encodeURIComponent(this.buildTitle()).replace(/%2B/gi, '+')
      const body = encodeURIComponent(this.buildBody()).replace(/%2B/gi, '+')
      window.open(`https://github.com/${this.repo}/issues/new?title=${title}&body=${body}`)
    }
  }
}
</script>

<style>
</style>
