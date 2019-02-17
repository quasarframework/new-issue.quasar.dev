<template>
  <div>
    <q-input
      class="q-mt-lg"
      filled
      autogrow
      :rows="4"
      type="textarea"
      bottom-slots
      @paste="handlePaste"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      ref="refId"
    >
      <hint slot="hint" :hintText="hintText" :refId="refId" />
    </q-input>
  </div>
</template>

<script>
import isImageUrl from 'is-image-url'
import Hint from './Hint'

export default {
  name: 'ImageAwareInput',
  components: { Hint },
  props: {
    value: {},
    hintText: {
      type: String,
      required: true
    },
    refId: {
      type: String,
      required: true
    }
  },
  methods: {
    handlePaste (event) {
      const pasted = event.clipboardData.getData('text/plain')

      if (!isImageUrl(pasted)) { return }
      event.preventDefault()
      let selectionStart = this.$refs.input.$refs.input.selectionStart
      let selectionEnd = this.$refs.input.$refs.input.selectionEnd

      let result = `${this.value.substring(0, selectionStart)}![alt-text](${pasted})${this.value.substring(
        selectionEnd)}`
      this.$emit('input', result)
    }
  }
}
</script>

<style>

</style>
