// SmsSender.ts
import { ref,Ref } from 'vue';

interface SmsSender {
  sendMessage: (phoneNumber: string, message: string) => void;
  isSending: Ref<boolean>;
  messageSent: Ref<boolean>;
  errorMessage: Ref<string | null>;
}

export function useSmsSender(): SmsSender {
  const isSending = ref(false);
  const messageSent = ref(false);
  const errorMessage = ref<string | null>(null);

  const sendMessage = (phoneNumber: string, message: string): void => {
    if (!phoneNumber || !message) {
      errorMessage.value = '电话号码和消息不能为空';
      return;
    }

    isSending.value = true;
    messageSent.value = false;
    errorMessage.value = null;

    // 模拟网络请求延迟
    setTimeout(() => {
      // 模拟短信发送
      console.log(`模拟发送短信到: ${phoneNumber}，内容: ${message}`);
      isSending.value = false;
      messageSent.value = true;
    }, 2000); // 假设发送短信需要2秒钟
  }

  return { sendMessage, isSending, messageSent, errorMessage };
}