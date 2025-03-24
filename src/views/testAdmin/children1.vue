<script setup>
import webview from '@/components/webview.vue';
import getVersionApi from "@/api/getVersion";
import { ref, onMounted } from "vue";
const version = ref("");

onMounted(async () => {
  const res = await getVersionApi.getversion();
  version.value = res;
})
</script>
<template>
  <div>
    {{ version }}
    <webview url="http://www.bilibili.com"></webview>
  </div>
</template>