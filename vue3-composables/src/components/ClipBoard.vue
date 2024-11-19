<template>
    <div class="clipboard-container">
      <input class="input-text" type="text" v-model="text" placeholder="输入文本"/>
      <button class="copy-button" @click="copyToClipboard">复制到剪贴板</button>
      <p v-if="copied" class="success-message">复制成功！</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useClipboard } from '@vueuse/core';
  
  const text = ref('');
  const { copied, copy } = useClipboard();
  
  async function copyToClipboard() {
    if (text.value.trim() !== '') {
      await copy(text.value);
    } else {
      alert('请输入一些文本再尝试复制。');
    }
  }
  </script>
  
  <style scoped>
  .clipboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    gap: 10px; /* Add spacing between elements */
  }
  
  .input-text {
    width: 300px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .input-text:focus {
    border-color: #007BFF;
    outline: none; /* Remove default focus outline */
  }
  
  .copy-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .copy-button:hover {
    background-color: #45a049;
  }
  
  .copy-button:active {
    background-color: #3e8e41;
  }
  
  .success-message {
    color: #4CAF50;
    font-size: 16px;
    margin-top: 5px;
  }
  </style>