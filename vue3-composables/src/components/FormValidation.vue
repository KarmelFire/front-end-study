<template>
    <div class="login-container">
      <div class="login-form">
        <input
          type="text"
          placeholder="请输入用户名"
          class="input-field"
          v-model="username"
          @input="setValue('username', ($event.target as HTMLInputElement).value)"
        />
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        <input
          type="password"
          placeholder="请输入密码"
          class="input-field"
          v-model="password"
          @input="setValue('password', ($event.target as HTMLInputElement).value)"
        />
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        <button :disabled="!isValid" class="login-button" @click="login">登录</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useFormValidation } from '../composables/useFormValidation';
  
  const { setValue, errors, isValid } = useFormValidation();
  const username = ref('');
  const password = ref('');
  
  // 使用watch来自动更新表单值和验证错误
  watch(username, (newValue) => setValue('username', newValue));
  watch(password, (newValue) => setValue('password', newValue));
  
  // Dummy login function
  function login() {
    if (isValid) {
      console.log('登录', username.value, password.value);
      // Perform login logic here
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
  }
  
  .login-form {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 320px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .error-message {
    color: red;
    background-color: #ffe0e0;
    padding: 5px;
    border-radius: 3px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #0056b3;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #003366;
  }
  
  .login-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>