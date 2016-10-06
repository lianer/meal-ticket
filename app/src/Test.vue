<template>
  <v-header :title="'Test'"></v-header>

  <div>
    <v-panel :title="'标题'" :summary="''"></v-panel>
    <v-panel :title="'标题'" :summary="''"></v-panel>
    <v-panel :title="'标题'" :summary="''"></v-panel>
  </div>
</template>

<script>
  import vHeader from 'components/v-header.vue'
  import vPanel from 'components/v-panel.vue'

  export default {
    components: {
      vHeader,
      vPanel
    }
  }
</script>