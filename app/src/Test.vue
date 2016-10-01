<template>
  <x-header :title="'Test'"></x-header>

  <div>
    <x-panel :title="'标题'" :summary="''"></x-panel>
    <x-panel :title="'标题'" :summary="''"></x-panel>
    <x-panel :title="'标题'" :summary="''"></x-panel>
  </div>
</template>

<script>
  import xHeader from 'components/x-header.vue'
  import xPanel from 'components/x-panel.vue'

  export default {
    components: {
      xHeader,
      xPanel
    }
  }
</script>