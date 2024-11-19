import { createRouter, createWebHistory } from "vue-router";

// 引入组件
import Layout from "../views/Layout.vue";

// 定义路由数组
const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect:'/home',
        children:[
            {
                path: '/home',
                name: 'Home',
                component: () => import("../views/Home.vue")
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import("../views/Login.vue")
            },
            {
                path: '/articles',
                name: 'ArticleList',
                component: () => import("../views/ArticleList.vue")
            },
            // 动态路由配置
            {
                path: '/articles/:id',
                name:' ArticleDetail',
                component: () => import("../views/ArticleDetail.vue"),
                children: [
                    {
                        path: 'comments',
                        name: 'ArticleComments',
                        component: () => import("../views/ArticleComments.vue")
                    }
                ]
            },
            // 嵌套路由
            {
                path:'/user',
                component: () => import("../views/UserDashboard.vue"),
                redirect: '/user/profile',
                children: [
                    {
                        path: 'profile',
                        name: 'UserProfile',
                        component: () => import("../views/UserProfile.vue")
                    },
                    {
                        path: 'setting',
                        name: 'UserSetting',
                        component: () => import("../views/UserSetting.vue")
                    },
                ]
            },
            {
                path: '/cart',
                name: 'ShoppingCart',
                component: () => import("../views/ShoppingCart.vue")
            },
        ]
    }
]

// 定义路由对象
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to,from,savedPositon) {
        if(savedPositon) {
            return savedPositon
        } else {
            return {top:0}
        }
    }
});

// 配置全局路由导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//       // 如果目标路由是登录页面
//       if (localStorage.getItem("token")) {
//         // 用户已经登录，重定向到首页或其他页面
//         next("/"); // 或者 next({ path: '/home' });
//       } else {
//         // 用户未登录，允许访问登录页面
//         next();
//       }
//     } else {
//       // 如果目标路由不是登录页面
//       if (localStorage.getItem("token")) {
//         // 用户已经登录，允许访问其他页面
//         next();
//       } else {
//         // 用户未登录，重定向到登录页面
//         next('/login');
//       }
//     }
//   });

export default router;