<template>
  <div id="tab-bar">
    <slot></slot>
   </div>
</template>

<script>
export default {
  name:"TabBar"
}
</script>

<style>
 #tab-bar{
    display: flex;
    /* 设置成flex布局 */
    background-color: #dadada;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);

  z-index: 10;
  }

 
</style>