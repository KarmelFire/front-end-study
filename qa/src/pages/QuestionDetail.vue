<template>
    <el-container>
      <el-header>
        <h1 style="margin: 0; font-size: 24px;">问题详情</h1>
      </el-header>
      <el-main>
        <el-card class="question-card">
            <div class="question-header">
                <img src="https://www.helloimg.com/i/2024/10/08/6705233b7f73f.jpg" alt="头像" class="avatar" />
                <strong class="username">{{ question.username }}</strong>
            </div>
            <h2 class="question-title">{{ question.title }}</h2>
            <p class="question-content">{{ question.content }}</p>
            <div class="button-group">
                <el-button type="primary" @click="goBack">返回问题列表</el-button>
                <el-button type="primary" @click="showAnswers">{{ showAnswersList ? '收起回复' : '查看回复' }}</el-button>
                <el-button type="primary" @click="showReplyForm">回复</el-button>
            </div>
            <router-view v-if="showAnswersList" :key="question.id" />
        </el-card>
      </el-main>
      <!-- 回复表单 -->
      <div v-if="showForm" class="overlay">
            <el-card class="reply-form">
                <h3>回复问题</h3>
                <el-input v-model="replyContent" type="textarea" placeholder="输入你的回复..." rows="4"></el-input>
                <div class="reply-button-group">
                    <el-button type="primary" @click="submitReply">提交回复</el-button>
                    <el-button @click="cancelReply">取消</el-button>
                </div>
            </el-card>
        </div>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import api from '../utils/axios';
import { useRoute, useRouter } from 'vue-router';

const question = ref({});
const route = useRoute();
const router = useRouter();
const showAnswersList = ref(false);
const showForm = ref(false); // 控制回复表单显示
const replyContent = ref(''); // 存储回复内容

const fetchUsernameById = async (userId: string) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data.username;
    } catch (error) {
        console.error(`获取用户 ${userId} 失败:`, error);
        return '';
    }
};

const fetchQuestionDetail = async (id: string) => {
    try {
        const response = await api.get(`/questions/${id}`);
        question.value = response.data;
        question.value.username = await fetchUsernameById(question.value.userId);
    } catch (error) {
        console.error('获取问题详情失败:', error);
    }
};

const showAnswers = () => {
    showAnswersList.value = !showAnswersList.value;
    router.push(`/questions/${question.value.id}/answers`); // 跳转到查看回复的路由
};

const goBack = () => {
    router.push('/');
};

// 显示回复表单
const showReplyForm = () => {
    showForm.value = true;
};

// 提交回复
const submitReply = async () => {
    if (!replyContent.value) {
        alert('回复内容不能为空！');
        return;
    }
    
    try {
        await api.post(`/answers/add`, {
            questionId: question.value.id,
            content: replyContent.value,
            userId: localStorage.getItem("userId"), // 假设你有用户ID
        });
        replyContent.value = ''; // 清空输入框
        showForm.value = false; // 隐藏表单
        showAnswersList.value = true;
        router.push(`/questions/${question.value.id}/answers`);
    } catch (error) {
        console.error('提交回复失败:', error);
    }
};

// 取消回复
const cancelReply = () => {
    showForm.value = false;
    replyContent.value = '';
};

onMounted(() => {
    fetchQuestionDetail(route.params.id);
});
</script>

<style scoped>
.avatar {
  width: 40px; /* 设置头像宽度 */
  height: 40px; /* 设置头像高度 */
  border-radius: 50%; /* 圆形头像 */
}

.question-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.question-header {
    display: flex;
    align-items: center;
}

.username {
    margin-left: 10px;
    font-size: 18px; /* 用户名字体大小 */
    font-weight: bold;
}

.question-title {
    font-size: 20px; /* 标题字体大小 */
    margin: 10px 0;
}

.question-content {
    font-size: 16px; /* 内容字体大小 */
    margin: 10px 0 20px;
}

.button-group {
    margin-top: 10px;
    display: flex;
    gap: 10px; /* 按钮间距 */
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.reply-form {
    padding: 20px;
    border-radius: 8px;
    background: white;
    width: 400px; /* 设置表单宽度 */
    max-width: 90%; /* 最大宽度 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.reply-button-group {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end; /* 右对齐 */
    gap: 10px; /* 按钮间距 */
}
</style>
