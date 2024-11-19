<template>
    <div class="login-container">
      <el-form :model="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button @click="router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import api from '../utils/axios';
import { useRouter } from 'vue-router';
  
const router = useRouter();

const loginForm = ref({
        username: '',
        password: '',
      });
const formLabelWidth = '80px';
  
const handleLogin = async () => {
    try {
        const response = await api.post('/users/login', loginForm.value);
        if (response.data) {
            console.log(response.data)
            alert('登录成功');
            localStorage.setItem('userId', response.data.id);
          router.push('/');
        } else{
          alert('用户名或密码错误');
        }
    } catch (error) {
        console.error(error);
    }
};


  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
  }
  </style>
  