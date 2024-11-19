<template>
  <div class="app-container">
    <nav class="navbar">
      <router-link to="/" class="nav-item">首页</router-link>
      <router-link to="/articles" class="nav-item">书籍列表</router-link>
      <router-link to="/user" class="nav-item">个人中心</router-link>
      <router-link to="/cart" class="nav-item">购物车</router-link>
    </nav>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.fullPath">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: #3843bb;
  padding: 10px 0;
}

.nav-item {
  margin: 0 10px;
  text-decoration: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: #3baee0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>