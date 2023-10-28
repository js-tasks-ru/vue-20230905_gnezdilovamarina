<template>
  <button
  type="button"
  @click="conCount"

  > {{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  emits: ['update:count'],
  
  data() {
    return {
      localCount: this.count,
    }
  },
  methods: { 
    conCount() {
      this.localCount++;
    }
  },
  watch: {
    localCount: {
      handler() {
        this.$emit('update:count', this.localCount)
      }
    },
    count: {
      handler() {
        this.localCount = this.count
      }
    }
  }
};
</script>
