<template>
    <div class="login-container">
      <h3>用户登录</h3>
      <form @submit.prevent="handleLogin">
        <div class="form-control">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-control">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = '';
  const password = '';
  
  const handleLogin = () => {
    // 在这里添加实际的登录逻辑
    // 例如，检查用户名和密码，然后设置token
    localStorage.setItem("token", "userLogin");
    router.push("/user/profile");
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-color: #f7f7f7;
  }
  
  h3 {
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
  
  .form-control {
    margin-bottom: 10px;
  }
  
  .form-control label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>