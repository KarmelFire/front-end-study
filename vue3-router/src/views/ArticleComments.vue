<template>
    <div>
      <h2>评论列表</h2>
      <div v-for="item in comment?.content">
        {{ item.c }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const articleId = Number(route.params.id);

  const comments = [
    {
        id:1,
        content:[
            {
            c:'我爱 Vue 学习111'
            },
            {
            c:'我爱 Vue 学习222'
            },
            {
            c:'我爱 Vue 学习333'
            },
        ]
    },
    {
        id:2,
        content:[
            {
            c:'我爱 Vue Router 111'
            },
            {
            c:'我爱 Vue Router 222'
            },
            {
            c:'我爱 Vue Router 333'
            },
        ]
    },
  ]
  
  const comment = comments.find(a => a.id == articleId)

  </script>
  
  <style scoped>
  </style>