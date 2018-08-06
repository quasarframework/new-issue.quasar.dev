<template>
  <q-list separator dense>
    <q-list-header>
      {{label}}
    </q-list-header>
    <q-item v-for="(doItem, i) in list" :key="'do' + i">
      <q-item-side v-if="positive" icon="check" color="positive"></q-item-side>
      <q-item-side v-else icon="clear" color="negative"></q-item-side>
      <q-item-main :sublabel="doItem">

      </q-item-main>
    </q-item>
  </q-list>
</template>
<script>
export default {
  name: 'hint-list',
  props: {
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    positive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
