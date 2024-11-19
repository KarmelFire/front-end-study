<template>
    <div class="sms-sender">
      <div class="input-group">
        <input class="input-field" v-model="phoneNumber" placeholder="请输入手机号码" />
        <textarea class="input-field" v-model="message" placeholder="请输入短信内容"></textarea>
      </div>
      <button class="send-button" :disabled="isSending" @click="sendMessage(phoneNumber, message)">
        发送短信
      </button>
    
      <div class="error-message" v-if="errorMessage">
        错误: {{ errorMessage }}
      </div>
      <div class="sending-indicator" v-if="isSending">
        发送中...
      </div>
      <div class="success-message" v-if="messageSent">
        短信发送成功
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useSmsSender } from '../composables/useSmsSender';
  
  const { sendMessage, isSending, messageSent, errorMessage } = useSmsSender();
  const phoneNumber = ref('19952585585');
  const message = ref('测试发送短信');
  </script>
  
  <style scoped>
  .sms-sender {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    background-color: #f9f9f9;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .send-button {
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .send-button:disabled {
    background-color: #ccc;
  }
  
  .send-button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .sending-indicator {
    color: #856404;
    background-color: #fff3cd;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .success-message {
    color: #155724;
    background-color: #d4edda;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  </style>