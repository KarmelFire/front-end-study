<template>
    <div class="cart-container">
      <h2>购物车</h2>
      <ul class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.src" alt="封面" class="item-image" />
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p>数量: {{ item.quantity }}</p>
            <p>单价: {{ item.price }}元</p>
            <p>总价: {{ item.price * item.quantity }}元</p>
          </div>
          <button @click="removeFromCart(item.id)">删除</button>
        </li>
      </ul>
      <div v-if="totalPrice" class="total-price">
        <strong>累计金额: {{ totalPrice }}元</strong>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    src: string; // 假设每本书都有一个封面图片的路径
  }
  
  // 确保在使用之前，localStorage中的数据格式是正确的
  const storedCart = localStorage.getItem('cart');
  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  const cart = ref<CartItem[]>(initialCart);
  
  // 计算总金额的计算属性
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });
  
  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };
  </script>

<script lang="ts">
export default {
    beforeRouteEnter: (to, from, next) => {
        // 确保只在导航到 /cart 路由时执行逻辑
        if (to.path === '/cart') {
            if (localStorage.getItem("token")) {
                next(); // 用户已登录，允许导航继续
            } else {
                next("/login"); // 用户未登录，重定向到登录页面
            }
        } else {
            // 如果不是导航到 /cart，直接调用 next() 放行
            next();
        }
    }
}
</script>
  
  <style scoped>
  .cart-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .cart-list {
    list-style: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .cart-item:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .item-image {
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 3px;
    margin-right: 15px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .total-price {
    text-align: right;
    margin-top: 10px;
    padding: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
  }
  </style>