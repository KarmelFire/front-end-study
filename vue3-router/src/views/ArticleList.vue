<template>
    <div class="books-container">
      <h2>书籍列表</h2>
      <div class="book-grid">
        <div v-for="item in articles" :key="item.id" class="book-item">
          <router-link :to="`/articles/${item.id}`" class="book-link">
            <img :src="item.src" alt="封面" class="book-cover"> 
            <div class="book-info">
              <h3 class="book-title">{{ item.title }}</h3>
              <p class="book-price">{{ item.price }}元</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const articles = [
    { "id": 1, "title": "红楼梦", "src": "/红楼梦.jpg", "price": 40 },
    { "id": 2, "title": "西游记", "src": "/西游记.jpg", "price": 30 },
    { "id": 3, "title": "三国演义", "src": "/三国演义.jpg", "price": 45 },
    { "id": 4, "title": "水浒传", "src": "/水浒传.jpg", "price": 35 },
  ];
  </script>
  
  <style scoped>
  .books-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
  }
  
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .book-item {
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
  }
  
  .book-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
  }
  
  .book-cover {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  
  .book-info {
    padding: 10px;
  }
  
  .book-title {
    margin: 0;
    font-size: 1.2em;
  }
  
  .book-price {
    margin: 5px 0;
    color: #555;
  }
  </style>