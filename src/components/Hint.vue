<template>
  <div> {{ hintText }}
    <q-btn style="font-size: 12px" round flat icon="info_outline" @click="showInfo(refId)" />
    <q-dialog
      v-model="showInfoDialog"
    >
      <q-card>
        <q-card-section  class="row items-center">
          <div class="text-h6"> {{ infoDialogData.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-dialog />
        </q-card-section>
        <q-card-section  v-html="infoDialogData.message" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import formatMarkdown from '../utils/format-markdown'
import { dialogText } from '../config'

export default {
  name: 'Hint',
  props: {
    hintText: {
      type: String,
      required: true
    },
    refId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showInfoDialog: false,
      infoDialogData: {
        title: '',
        message: ''
      }
    }
  },
  methods: {
    showInfo (id) {
      this.infoDialogData.title = dialogText[id].title
      this.infoDialogData.message = formatMarkdown(dialogText[id].message)
      this.showInfoDialog = true
    }
  }
}
</script>
