<template>
  <div class="panel">
    <div class="left">
      <slot name="left">
        
      </slot>
    </div>
    <div class="center">
      <slot name="center">
        <h3 v-show="title">{{title}}</h3>
        <p v-show="summary">{{summary}}</p>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <span class="arrow"></span>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'title': String,
      'summary': String
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .panel{
    position: relative;
    width: 100%;
    padding: 12px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    &:first-of-type{
      border-radius: 8px 8px 0 0;
    }
    &:last-of-type{
      border-bottom: none;
      border-radius: 0 0 8px 8px;
    }
    &:first-of-type:last-of-type{
      border-radius: 8px;
    }
  }
  .left{
    float: left;
  }
  .center{
    padding-right: 60px;
    h3{
      font-size: 14px;
      font-weight: normal;
    }
    p{
      font-size: 12px;
      color: #999;
    }
  }
  .right{
    position: absolute;
    right: 12px;
    top: 12px;
    bottom: 12px;
    .arrow{
      position: absolute;
      top: 50%;
      right: 0;
      width: 18px;
      height: 18px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .arrow:before{
      content: "";
      position: absolute;
      display: block;
      top: 2px;
      left: 0;
      width: 12px;
      height: 12px;
      border: 1px solid #666;
      border-width: 1px 0 0 1px;
      margin-left: 3px;
      margin-top: 1px;
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
    }
  }
</style>