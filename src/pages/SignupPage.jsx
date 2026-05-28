import { useState } from "react";
import { signup } from "../api/authApi";

function SignupPage({ onMoveToLogin }) {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    studentNumber: "",
    department: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    if (
      !form.loginId ||
      !form.password ||
      !form.nickname ||
      !form.studentNumber ||
      !form.department
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (form.password !== form.passwordCheck) {
      alert("비밀번호가 서로 다릅니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({
        loginId: form.loginId,
        password: form.password,
        nickname: form.nickname,
        studentNumber: form.studentNumber,
        department: form.department,
      });
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      onMoveToLogin();
    } catch (error) {
      alert(error.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <h1>회원가입</h1>

      <input
        name="loginId"
        placeholder="아이디"
        value={form.loginId}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인"
        value={form.passwordCheck}
        onChange={handleChange}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        value={form.nickname}
        onChange={handleChange}
      />
      <input
        name="studentNumber"
        placeholder="학번"
        value={form.studentNumber}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="학과"
        value={form.department}
        onChange={handleChange}
      />

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
