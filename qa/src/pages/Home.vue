<template>
    <el-container>
      <el-header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center;">
            <img src="https://www.helloimg.com/i/2024/10/08/6705233b7f73f.jpg" alt="头像" class="avatar" />
            <span style="margin-left: 10px; font-size: 16px;">{{ username }}</span>
          </div>
          <el-button type="danger" @click="logout">登出</el-button>
        </div>
      </el-header>
      <el-main>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h1 style="font-size: 24px;">问题列表</h1>
          <el-button type="primary" @click="showForm = true">发布提问</el-button>
        </div>
        <div class="question-list">
          <el-card v-for="question in questions" :key="question.id" class="question-card">
            <div class="question-header">
              <img src="https://www.helloimg.com/i/2024/10/08/6705233b7f73f.jpg" alt="头像" class="avatar" />
              <div class="question-user">
                <strong>{{ question.username }}</strong>
                <div class="question-title">{{ question.title }}</div>
              </div>
            </div>
            <p class="question-content">{{ question.content }}</p>
            <el-button type="primary" @click="viewDetails(question.id)">查看详情</el-button>
          </el-card>
        </div>

        <!-- 自定义弹出表单 -->
        <div v-if="showForm" class="overlay">
          <div class="modal">
            <h3>发布新问题</h3>
            <el-form :model="newQuestion" ref="form">
              <el-form-item label="标题" required>
                <el-input v-model="newQuestion.title" placeholder="请输入问题标题"></el-input>
              </el-form-item>
              <el-form-item label="内容" required>
                <el-input type="textarea" v-model="newQuestion.content" placeholder="请输入问题内容"></el-input>
              </el-form-item>
            </el-form>
            <div class="modal-footer">
              <el-button @click="showForm = false">取消</el-button>
              <el-button type="primary" @click="submitQuestion">确认</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import api from '../utils/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const questions = ref([]);
const username = ref('');
const showForm = ref(false);
const newQuestion = ref({
  title: '',
  content: ''
});

const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.username;
  } catch (error) {
    console.error(`获取用户 ${userId} 失败:`, error);
    return '';
  }
};

const fetchQuestions = async () => {
  try {
    const response = await api.get('/questions');
    const questionData = response.data;
    for (const question of questionData) {
      question.username = await fetchUserById(question.userId);
    }
    questions.value = questionData;
    username.value = await fetchUserById(localStorage.getItem('userId'));
  } catch (error) {
    console.error('获取问题列表失败:', error);
  }
};

const logout = () => {
  console.log('用户登出');
  router.push("/login");
};

const viewDetails = (id: string) => {
  router.push({ name: 'QuestionDetail', params: { id } });
};

const submitQuestion = async () => {
  try {
    await api.post('/questions/add', {
      title: newQuestion.value.title,
      content: newQuestion.value.content,
      userId: localStorage.getItem('userId'),
      answerCount: 0
    });
    newQuestion.value.title = '';
    newQuestion.value.content = '';
    showForm.value = false;
    await fetchQuestions(); // 刷新问题列表
  } catch (error) {
    console.error('发布问题失败:', error);
  }
};

onMounted(fetchQuestions);
</script>

<style scoped>
el-header {
  background-color: #f5f7fa;
}

.avatar {
  width: 40px; /* 设置头像宽度 */
  height: 40px; /* 设置头像高度 */
  border-radius: 50%; /* 圆形头像 */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 灰色滤镜 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 确保在其他元素之上 */
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px; /* 增大宽度 */
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.question-list {
  margin-top: 20px;
}

.question-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  align-items: center;
}

.question-user {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.question-title {
  font-size: 18px; /* 标题字体大小 */
  font-weight: bold;
}

.question-content {
  font-size: 16px; /* 内容字体大小 */
  margin: 10px 0;
}
</style>
