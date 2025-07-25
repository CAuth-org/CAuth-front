<template>
    <div class="webview-container">
      <!-- <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe> -->
       {{ url }}
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // 接收外部传入的 URL
  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .webview-container {
    width: 100%;
    position: relative;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>