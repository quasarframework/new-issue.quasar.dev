<template>
  <q-page class="flex flex-center">
    <q-chips-input
        color="brown" chips-color="red"
        chips-bg-color="amber"
        float-label="Float Label"
        v-model="chips4"
        placeholder="Some placeholder"
        clearable
        :after="['close']"
    ></q-chips-input>
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      chips4: ['some']
    }
  }
}
</script>
