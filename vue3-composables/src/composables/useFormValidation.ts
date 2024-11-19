// useFormValidation.ts
import { ref, computed } from 'vue';

interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
}

interface FormValidation {
  values: { [key: string]: string };
  errors: { [key: string]: string | null };
  rules: { [key: string]: ValidationRule[] };
  setValue: (key: string, value: string) => void;
  setError: (key: string, message: string | null) => void;
  isValid: boolean;
}

export function useFormValidation(): FormValidation {
  const values = ref<{ [key: string]: string }>({});
  const errors = ref<{ [key: string]: string | null }>({});
  const rules = ref<{ [key: string]: ValidationRule[] }>({
    username: [
      { validator: (value) => value.length > 0, message: '用户名不能为空' },
      { validator: (value) => value.length >= 3, message: '用户名至少3个字符' },
    ],
    password: [
      { validator: (value) => value.length > 0, message: '密码不能为空' },
      { validator: (value) => value.length >= 6, message: '密码至少6个字符' },
    ],
  });

  const isValid = computed<boolean>(() => {
    for (const key in errors.value) {
      if (errors.value[key]) return false;
    }
    return true;
  });

  function setValue(key: string, value: string): void {
    values.value[key] = value;
    errors.value[key] = validate(key, value) || null;
  }

  function setError(key: string, message: string | null): void {
    errors.value[key] = message;
  }

  function validate(key: string, value: string): string | null {
    const rulesForKey = rules.value[key];
    if (!rulesForKey) return null;
    for (const rule of rulesForKey) {
      if (!rule.validator(value)) return rule.message;
    }
    return null;
  }

  return { values: values.value, errors: errors.value, rules: rules.value, setValue, setError, isValid: isValid.value };
}