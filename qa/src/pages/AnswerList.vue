<template>
    <div class="answer-list">
        <h2>回复列表</h2>
        <div v-for="answer in answers" :key="answer.id" class="answer-item">
            <img src="https://www.helloimg.com/i/2024/10/08/6705233b7f73f.jpg" alt="头像" class="avatar" />
            <div class="answer-content">
                <strong>{{ answer.username }}</strong>
                <p>{{ answer.content }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../utils/axios';

const route = useRoute();
const answers = ref([]);

const fetchUsernameById = async (userId: string) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data.username;
    } catch (error) {
        console.error(`获取用户 ${userId} 失败:`, error);
        return '';
    }
};

const fetchAnswers = async (questionId: string) => {
    try {
        const response = await api.get(`/answers?questionId=${questionId}`); 
        const answerData = response.data;
        for (const answer of answerData) {
            answer.username = await fetchUsernameById(answer.userId)
        }
        answers.value = answerData;
    } catch (error) {
        console.error('获取回复失败:', error);
    }
};

onMounted(() => {
    const questionId = route.params.id;
    fetchAnswers(questionId);
});
</script>

<style scoped>
.answer-list {
    margin: 20px 0;
}

h2 {
    font-size: 24px; /* 标题字体大小 */
    margin-bottom: 15px; /* 标题下方间距 */
}

.answer-item {
    display: flex;
    align-items: flex-start; /* 头像和内容的垂直对齐 */
    margin-bottom: 15px; /* 每个回复的间距 */
    padding: 10px;
    border: 1px solid #eaeaea; /* 边框样式 */
    border-radius: 8px; /* 圆角 */
    background-color: #f9f9f9; /* 背景颜色 */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 阴影 */
}

.avatar {
    width: 40px; /* 设置头像宽度 */
    height: 40px; /* 设置头像高度 */
    border-radius: 50%; /* 圆形头像 */
    margin-right: 10px; /* 头像和内容的间距 */
}

.answer-content {
    flex-grow: 1; /* 让内容区域扩展 */
}

strong {
    font-size: 16px; /* 用户名字体大小 */
    color: #333; /* 用户名颜色 */
}

p {
    margin: 5px 0 0; /* 内容上方间距 */
    font-size: 14px; /* 内容字体大小 */
    color: #666; /* 内容颜色 */
}
</style>
