<template>
  <div>
    <q-field class="q-mb-xl">
      <q-input
          v-model="api"
          type="textarea"
          stack-label="How to use it?"
          placeholder="<new-component :new-prop />"
          color="primary"
          requried
          :rows="3"
      />
    </q-field>
    <q-field helper="What problem does this feature solve?">
      <q-input
          v-model="problem"
          type="textarea"
          stack-label="Reason add it?"
          placeholder="Makes stuff easier."
          color="primary"
          requried
          :rows="3"
      />
    </q-field>
    <!--<hint-list class="q-my-xl" label="Good" positive :list="['']"></hint-list>-->
  </div>
</template>

<script>
import HintList from './HintList'
export default {
  name: 'RequestForm',
  components: {HintList},
  data () {
    return {
      problem: '',
      api: ''
    }
  }
}
</script>
