
import { ref , Ref} from 'vue';

interface CountdownTimer {
  start: () => void;
  stop: () => void;
  reset: () => void;
  duration: number;
  remainingTime: Ref<number>;
}

export function useCountdownTimer(initialDuration = 60): CountdownTimer {
  const timerId = ref<number | null>(null);
  const remainingTime = ref(initialDuration);

  const start = () => {
    if (timerId.value) {
      clearInterval(timerId.value);
    }
    let remaining = remainingTime.value;
    timerId.value = setInterval(() => {
      if (remaining > 1) {
        remaining--;
      } else {
        stop();
      }
      remainingTime.value = remaining;
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerId.value as number);
    timerId.value = null;
  };

  const reset = () => {
    stop();
    remainingTime.value = initialDuration;
  };

  return { start, stop, reset, duration: initialDuration, remainingTime };
}