import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import LogoIcon from '../../../shared/components/atom/icons/LogoIcon';
import { postSignUpRequest } from '../api/signup';

import '../scss/signup.scss';

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
      useSignUpUsers.mutate(form);
      // 서버로 데이터 전송 로직 추가 가능
    }
  };

  return (
    <div className="background">
      <div className="background-cover"></div>
      <div className="form-wrapper">
        <div className="form-title">
          <LogoIcon />
          <h1>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content-wrapper">
            <div className="form-content">
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="oh@movie.com"
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </div>
            </div>
            <div className="form-content">
              <label htmlFor="fullName">닉네임</label>
              <br />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="한글 또는 영문 닉네임"
              />
              {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
            </div>

            <div className="form-content">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="8글자이상 특수문자포함"
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>
          </div>
          <div>
            <button className="submit-button" type="submit">
              가입하기
            </button>
          </div>
          <div className="link">
            <p>이미 가입하셨나요?</p>
            <Link to="/login">
              <span className="active">로그인</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
