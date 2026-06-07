import { useState } from "react";
import { signup } from "../api/authApi";
import { useToast } from "../components/ToastProvider";

const initialForm = {
  loginId: "",
  password: "",
  passwordCheck: "",
  nickname: "",
  studentNumber: "",
  department: "",
};

const initialErrors = {
  loginId: "",
  password: "",
  passwordCheck: "",
  nickname: "",
  studentNumber: "",
  department: "",
};

function validateSignupForm(form) {
  const nextErrors = { ...initialErrors };

  if (!form.loginId.trim()) {
    nextErrors.loginId = "아이디를 입력해주세요.";
  }

  if (!form.password) {
    nextErrors.password = "비밀번호를 입력해주세요.";
  }

  if (!form.passwordCheck) {
    nextErrors.passwordCheck = "비밀번호 확인을 입력해주세요.";
  } else if (form.password !== form.passwordCheck) {
    nextErrors.passwordCheck = "비밀번호가 일치하지 않습니다.";
  }

  if (!form.nickname.trim()) {
    nextErrors.nickname = "닉네임을 입력해주세요.";
  }

  if (!/^\d{8}$/.test(form.studentNumber)) {
    nextErrors.studentNumber = "학번은 8자리 숫자여야 합니다.";
  }

  if (!form.department.trim()) {
    nextErrors.department = "학과를 입력해주세요.";
  }

  return nextErrors;
}

function inferSignupFieldErrors(message) {
  const nextErrors = { ...initialErrors };
  const lowerMessage = String(message ?? "").toLowerCase();

  if (lowerMessage.includes("아이디") || lowerMessage.includes("loginid")) {
    nextErrors.loginId = message;
  } else if (lowerMessage.includes("학번") || lowerMessage.includes("student")) {
    nextErrors.studentNumber = message;
  } else if (lowerMessage.includes("닉네임") || lowerMessage.includes("nickname")) {
    nextErrors.nickname = message;
  } else if (lowerMessage.includes("학과") || lowerMessage.includes("department")) {
    nextErrors.department = message;
  } else if (lowerMessage.includes("비밀번호") || lowerMessage.includes("password")) {
    nextErrors.passwordCheck = message;
  }

  return nextErrors;
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}

function SignupPage({ onMoveToLogin }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const nextErrors = { ...prev, [name]: "" };

      if (name === "password" || name === "passwordCheck") {
        if (
          (name === "password" ? value : form.password) &&
          (name === "passwordCheck" ? value : form.passwordCheck) &&
          (name === "password" ? value : form.password) !==
            (name === "passwordCheck" ? value : form.passwordCheck)
        ) {
          nextErrors.passwordCheck = "비밀번호가 일치하지 않습니다.";
        } else {
          nextErrors.passwordCheck = "";
        }
      }

      if (name === "studentNumber") {
        nextErrors.studentNumber =
          value && /^\d{8}$/.test(value)
            ? ""
            : prev.studentNumber === "학번은 8자리 숫자여야 합니다."
              ? "학번은 8자리 숫자여야 합니다."
              : "";
      }

      return nextErrors;
    });
  };

  const handleSignup = async () => {
    const validationErrors = validateSignupForm(form);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors(initialErrors);
      await signup({
        loginId: form.loginId,
        password: form.password,
        nickname: form.nickname,
        studentNumber: form.studentNumber,
        department: form.department,
      });
      showToast("회원가입이 완료되었습니다. 로그인해주세요.", "success");
      onMoveToLogin();
    } catch (error) {
      const fieldErrors = inferSignupFieldErrors(
        error.message || "회원가입에 실패했습니다."
      );

      if (hasErrors(fieldErrors)) {
        setErrors(fieldErrors);
      } else {
        showToast(error.message || "회원가입에 실패했습니다.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <h1>회원가입</h1>

      <div className="auth-field">
        <input
          name="loginId"
          placeholder="아이디"
          value={form.loginId}
          onChange={handleChange}
          className={errors.loginId ? "input-error" : ""}
        />
        {errors.loginId && <p className="field-error-text">{errors.loginId}</p>}
      </div>

      <div className="auth-field">
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <p className="field-error-text">{errors.password}</p>}
      </div>

      <div className="auth-field">
        <input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          value={form.passwordCheck}
          onChange={handleChange}
          className={errors.passwordCheck ? "input-error" : ""}
        />
        {errors.passwordCheck && (
          <p className="field-error-text">{errors.passwordCheck}</p>
        )}
      </div>

      <div className="auth-field">
        <input
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          className={errors.nickname ? "input-error" : ""}
        />
        {errors.nickname && <p className="field-error-text">{errors.nickname}</p>}
      </div>

      <div className="auth-field">
        <input
          name="studentNumber"
          placeholder="학번"
          value={form.studentNumber}
          onChange={handleChange}
          className={errors.studentNumber ? "input-error" : ""}
        />
        {errors.studentNumber && (
          <p className="field-error-text">{errors.studentNumber}</p>
        )}
      </div>

      <div className="auth-field">
        <input
          name="department"
          placeholder="학과"
          value={form.department}
          onChange={handleChange}
          className={errors.department ? "input-error" : ""}
        />
        {errors.department && (
          <p className="field-error-text">{errors.department}</p>
        )}
      </div>

      <button onClick={handleSignup} disabled={isSubmitting}>
        {isSubmitting ? "가입 중" : "회원가입"}
      </button>

      <p>
        이미 계정이 있나요?{" "}
        <button className="text-button" onClick={onMoveToLogin}>
          로그인
        </button>
      </p>
    </main>
  );
}

export default SignupPage;
