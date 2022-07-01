<template>
  <div class="component {{name}}"
      v-bind:class="[{ 'animate-out': animateOut }, componentDesign]"
      v-bind:style="styles"
      v-if="module.settings.show">
      
    <header>
      <h4 v-show="module.settings.header">
        <i v-show="showHeaderIcon" class="header-icon" v-bind:class="module.icon"></i>{{module.settings.header}}</h4>
    </header>

    <section>
      <!-- widget content -->
      <p>Widget content...</p>
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
  },

  computed: {
    styles() {
      return {
        width: this.module.settings.widget_width + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/*
* Put your widget styling here.
*/
</style>
