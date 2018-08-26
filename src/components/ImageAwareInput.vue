<template>
  <q-input @paste.prevent="handlePaste" v-bind="$attrs" v-on="$listeners" :value="value" ref="input"/>
</template>

<script>
import isImageUrl from 'is-image-url'

export default {
  name: 'ImageAwareInput',
  props: {
    value: {}
  },
  methods: {
    handlePaste (event) {
      const pasted = event.clipboardData.getData('text/plain')

      if (!isImageUrl(pasted)) { return }

      let selectionStart = this.$refs.input.$refs.input.selectionStart
      let selectionEnd = this.$refs.input.$refs.input.selectionEnd

      let result = `${this.value.substring(0, selectionStart)}![pasted image](${pasted})${this.value.substring(
        selectionEnd)}`
      this.$emit('input', result)
    }
  }
}
</script>
