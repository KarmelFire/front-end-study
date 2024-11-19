<template>
  <div class="article-container">
    <img :src="article?.src" alt="封面" class="article-image">
    <div class="article-info">
      <h2 class="article-title">{{ article?.title }}</h2>
      <p class="article-description">{{ article?.description }}</p>
      <p class="article-price">价格: {{ article?.price }}元</p>
      <button class="add-to-cart-button" @click="addToCart">添加到购物车</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";

interface Article {
  id: number;
  title: string;
  description: string;
  src: string;
  price: number;
}

interface CartItem extends Article {
  quantity: number;
}

const route = useRoute();
const articleId = route.params.id as string;

// 确保 articleId 不是 null 或 undefined
if (!articleId) {
  throw new Error('Article ID is required');
}

const articles = ref([
{
    id: 1,
    title: "红楼梦",
    description: "《红楼梦》是清代作家曹雪芹创作的一部长篇小说，被誉为中国古典小说的巅峰之作。",
    src: "/红楼梦.jpg",
    price: 40
  },
  {
    id: 2,
    title: "西游记",
    description: "《西游记》是明代作家吴承恩所著的一部长篇神话小说。",
    src: "/西游记.jpg",
    price: 30
  },
  {
    id: 3,
    title: "三国演义",
    description: "《三国演义》是明代小说家罗贯中创作的一部历史小说。",
    src: "/三国演义.jpg",
    price: 45
  },
  {
    id: 4,
    title: "水浒传",
    description: "《水浒传》是明代作家施耐庵所著的一部英雄传奇小说。",
    src: "/水浒传.jpg",
    price: 35
  }
]);

// 查找 id 为 articleId 的文章
const article = articles.value.find(a => a.id === Number(articleId));

// 购物车数据存储在 localStorage 中
let cart: CartItem[] = JSON.parse(localStorage.getItem('cart')!) || [];

// 添加到购物车的函数
const addToCart = (): void => {
  if (!article) return;

  const existingItem = cart.find(item => item.id === article.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...article, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("添加成功")
};
</script>

<style scoped>
.article-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
}

.article-info {
  padding: 0 20px;
}

.article-title {
  margin-bottom: 5px;
  font-size: 24px;
  color: #333;
}

.article-description {
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
}

.article-price {
  margin-bottom: 20px;
  font-size: 18px;
  color: #555;
}

.add-to-cart-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #3498db;
}
</style>