<template lang="pug">
  div
    NavHeader
    v-list.py-2(dense color="yellow darken-3" dark)
      template(v-for='item of pages')
        v-list-item(
          v-if='item.k === `link`'
          :href='item.t'
          )
          v-list-item-title {{ item.l }}
        v-divider(v-else-if='item.k === `divider`')
        v-subheader(v-else-if='item.k === `header`')
          template(v-if='item.l === `TroubleShooting`')
            span MineSweeper
          template(v-else)
            span {{ item.l }}
</template>

<script>
import { get, sync } from 'vuex-pathify'
import NavHeader from './nav-header'

export default {
  components: {
    NavHeader
  },
  data() {
    return {
    }
  },
  computed: {
    pages: sync('pages'),
    isAuthenticated: sync('isAuthenticated')
  },
  created () {
    this.initialize()
  },
  watch:{
    isAuthenticated(val) {
      if (val === false) {
        this.initialize()
      }
    }
  },
  methods: {
    async initialize () {
      await this.$http.get(this.$urls.admin_get, {
        params: {
            operate: 'get_common_pages',
        },
        })
        .then(response => {
          // console.log(response.data.groups)
          this.pages = response.data.content
          this.$store.set('groups', response.data.groups)
          if (typeof(response.data.username) !== "undefined") {
            this.$store.set('username', response.data.username)
            this.$store.set('isAuthenticated', true)
          }else{
            this.$store.set('username', 'visitor')
          }
        })
    },
  }
}
</script>
