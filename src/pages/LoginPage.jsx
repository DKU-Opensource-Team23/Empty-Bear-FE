import { useState } from "react";
import { login } from "../api/authApi";

function LoginPage({ onMoveToSignup, onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await login({ loginId, password });
      onLogin(response.user);
    } catch (error) {
      alert(error.message || "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <h1>로그인</h1>

      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={isSubmitting}>
        {isSubmitting ? "로그인 중" : "로그인"}
      </button>

      <p>
        처음이신가요?{" "}
        <button className="text-button" onClick={onMoveToSignup}>
          회원가입
        </button>
      </p>
    </main>
  );
}

export default LoginPage;
