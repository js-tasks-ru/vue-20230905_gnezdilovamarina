<template >
  <div class="toasts">
  <UiToast v-for="item in items" :key="item.id" 
  :message="item.message" 
  :icon="item.icon" 
  :type="item.type" />
  </div>

  <!--
    <div  class="toasts">
    <div v-for="item in items" :key="item.id">
      <div v-if="item.message === 'success'" class="toast toast_success">
      <UiIcon class="toast__icon" icon="check-circle" />
      <span>Success Toast Example</span>
    </div>

    <div  v-if="item.message === 'error'" class="toast toast_error">
      <UiIcon class="toast__icon" icon="alert-circle" />
      <span>Error Toast Example</span>
    </div>
    </div>
    
  </div>
  -->
</template>

<script>
import UiToast from './UiToast.vue';

let id = 0;

export default {
  name: 'TheToaster',
  data() {
    return{
      items: [],
    }
  },

  components: { UiToast },
  methods: {
    error(message){
      id = id + 1;
      this.items.push({message: message, id: id, icon: 'alert-circle', type: 'error'});
      setTimeout((id) => this.items.splice(id - 1, 1), 5000);
      
    },
    success(message) {
      id = id + 1;
      this.items.push({message: message, id: id, icon: 'check-circle', type: 'success'});
      setTimeout((id) => this.items.splice(id - 1, 1), 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
