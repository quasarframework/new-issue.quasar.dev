<template>
  <div>
    <q-field class="q-mb-xl" >
      <q-input stack-label="Title" placeholder="Add support for windows 95" v-model="title">

      </q-input>
    </q-field>
    Note:
    <ul>
      <li>Reader must understand the request without opening it</li>
    </ul>

    <hint-list class="q-my-lg" label="Good" :list="doList" positive/>
    <hint-list label="Bad" :list="dontList"/>
  </div>
</template>

<script>
import HintList from './HintList'

export default {
  name: 'TitleForm',
  components: {HintList},
  data () {
    return {
      title: '',
      doList: [
        'QInput add :random-color prop'
      ],
      dontList: [
        'Add new feature'
      ]
    }
  }
}
</script>
