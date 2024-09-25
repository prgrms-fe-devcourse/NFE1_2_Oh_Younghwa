import React, { ChangeEvent, FormEvent, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { postSignUpRequest } from '../api/signup';

// 폼 타입 정의
interface FormState {
  email: string;
  fullName: string;
  password: string;
}

// 오류 메시지 타입 정의
interface ErrorState {
  email?: string;
  fullName?: string;
  password?: string;
}

const SignUpForm: React.FC = () => {
  const useSignUpUsers = useMutation({
    mutationFn: postSignUpRequest,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 폼 상태 관리
  const [form, setForm] = useState<FormState>({
    email: '',
    fullName: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  // 입력값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 이메일 형식 확인 정규식
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  // 폼 검증 로직
  const validateForm = (): ErrorState => {
    const newErrors: ErrorState = {};

    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters long.';
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters long and include a mix of uppercase, lowercase, number, and special character.';
    }

    return newErrors;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    //전송 누를 때 마다 오류 검증
    const validationErrors = validateForm();
    //검증 값으로 오류값 설정
    setErrors(validationErrors);
    //오류값의 프로퍼티가 하나라도 있으면 회원가입 불가
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', form);
      useSignUpUsers.mutate(form);
      // 서버로 데이터 전송 로직 추가 가능
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required />
        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
