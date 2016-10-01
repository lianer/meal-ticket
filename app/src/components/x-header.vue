<template>
  <header :class="{'fixed': fixed}">
    <div class="header-wrap">
      <div class="left">
        <slot name="left">
          <span class="x-header-back" @click.preventDefault @click="onClickHeaderBack"></span>
        </slot>
      </div>
      <div class="center">
        <h1>{{title}}</h1>
      </div>
      <div class="right">
        <slot name="right">
          
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      'title': String,
      'fixed': Boolean
    },
    methods: {
      onClickHeaderBack: function () {
        window.history.back()
      }
    }
  }
</script>

<style lang='scss' scoped>
  $height: 40px;
  header{
    z-index: 100;
    position: relative;
    width: 100%;
    height: 56px;
    padding: 8px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .1);
  }
  .header-wrap{
    position: relative;
    height: $height;
    background: rgba(255, 255, 255, .9);
    border-radius: 8px;
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, .05);
  }
  .left{
    z-index: 2;
    position: absolute;
    left: 18px;
    top: 0;
    width: 82px;
    height: 100%;
    .x-header-back{
      position: relative;
      top: ($height - 18px) / 2;
      left: 0;
    }
    .x-header-back:before{
      content: "";
      position: absolute;
      display: block;
      top: 2px;
      left: 0;
      width: 12px;
      height: 12px;
      border: 1px solid #000;
      border-width: 1px 0 0 1px;
      margin-left: 3px;
      margin-top: 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
    }
  }
  .center{
    z-index: 1;
    position: relative;
    margin: 0 100px;
    height: 100%;
    line-height: $height;
    text-align: center;
    h1{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: normal;
    }
  }
  .right{
    z-index: 2;
    position: absolute;
    right: 18px;
    top: 0;
    width: 82px;
    height: 100%;
  }

  header.fixed{
    .header-wrap{
      position: fixed;
      top: 8px;
      left: 8px;
      right: 8px;
    }
  }
</style>