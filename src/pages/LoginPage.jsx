import { useState } from "react";
import { mockApi } from "../api/mockApi";

function LoginPage({ onMoveToSignup, onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const response = mockApi.login({ loginId, password });
    onLogin(response.user);
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

      <button onClick={handleLogin}>로그인</button>

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
