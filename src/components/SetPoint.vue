<template lang="pug">
  g
    circle.point(
      v-for="point, i in points"
      :cx="point.x + 8"
      :cy="point.y + 8"
      r="8"
      @click="onClick(i)"
    )
</template>

<script>
export default {
  props: {
    points: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick (i) {
      this.$emit('emitPoint', i)
    }
  }
}
</script>

<style>
.point {
  cursor: pointer;
}
</style>
