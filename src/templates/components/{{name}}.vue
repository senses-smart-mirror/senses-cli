<template>
  <div class="component" v-bind:class="[componentDesign]">
    <header>
      <h4 v-show="module.settings.header" class>
        {{ module.settings.header }}
      </h4>
    </header>
    
    <section>
      <!-- widget content -->
    </section>
  </div>
</template>
<script>
export default {
  name: "{{name}}",

  /*
   * Prop: `module` access the widget settings data
   */
  props: ["module"],

  data() {
    return {};
  },

  created() {},

  watch: {
    module: {
      immediate: true,
      handler(newVal) {
        // after receiving new configuration, update this module.
        this.module = newVal;
      },
    },
  }
};
</script>

<style lang="scss" scoped>
/*
* Put your widget styling here. 
*/
</style>
