<template>
    <div class="countdown-timer">
      <div class="timer-display">剩余时间：{{ remainingTime }}秒</div>
      <div class="button-group">
        <button class="btn" @click="start">开始</button>
        <button class="btn" @click="stop">停止</button>
        <button class="btn" @click="reset">重置</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCountdownTimer } from '../composables/useCountDownTimer'; 
  
  const { start, stop, reset, remainingTime } = useCountdownTimer();
  </script>
  
  <style scoped>
  .countdown-timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 50px;
  }
  
  .timer-display {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  
  .btn {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .btn:active {
    background-color: #003366;
  }
  </style>