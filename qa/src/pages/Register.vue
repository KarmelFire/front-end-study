<template>
    <div class="register-container">
      <el-form :model="registerForm" @submit.native.prevent="handleRegister">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button @click="$router.push('/login')">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import api from '../utils/axios';
import { useRouter } from 'vue-router';
  
const router = useRouter();

const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
});
const formLabelWidth = '80px';
  
const handleRegister = async () => {
    try {
        const response = await api.post('/users/register', registerForm.value);
        alert(response.data); // 提示注册结果
        if(response.data === '注册成功') {
            router.push('/login')
        }
    } catch (error) {
        console.error(error);
    }
};


  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
  }
  </style>
  