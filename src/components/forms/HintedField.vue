<template>
  <div class="row gutter-sm shadow-2 q-ma-lg q-pa-md">
    <q-field class="col-xs-12 col-md-6" :helper="helper">
      <q-input
          @focus="focused = true"
          :float-label="label"
          :prefix="prefix"
          :type="type"
          :rows="rows"
          :placeholder="placeholder"
          v-model="computedValue">

      </q-input>
    </q-field>
    <div class="col-xs-12 col-md-6 q-pa-xs">

      <q-slide-transition appear>
        <div v-show="focused">
          <hint-list v-if="good.length>0" label="Good" :list="good" positive/>
          <hint-list v-if="bad.length>0" label="Bad" :list="bad"/>
        </div>
      </q-slide-transition>

    </div>
  </div>
</template>

<script>
import HintList from './HintList'

export default {
  name: 'HintedField',
  components: {HintList},
  props: {
    good: {
      type: Array,
      default: () => []
    },
    bad: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    },
    helper: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      focused: false
    }
  }
}
</script>
