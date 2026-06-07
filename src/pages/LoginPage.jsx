import { useEffect, useState } from "react";
import { login } from "../api/authApi";
import MessageModal from "../components/MessageModal";
import { useToast } from "../components/ToastProvider";

function LoginPage({ onMoveToSignup, onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (!loginErrorMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setLoginErrorMessage("");
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [loginErrorMessage]);

  const handleLogin = async () => {
    if (!loginId || !password) {
      showToast("아이디와 비밀번호를 입력해주세요.", "info");
      return;
    }

    try {
      setIsSubmitting(true);
      setLoginErrorMessage("");
      const response = await login({ loginId, password });
      onLogin(response.user);
    } catch (error) {
      setLoginErrorMessage(error.message || "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="auth-page">
        <h1>로그인</h1>

        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(event) => setLoginId(event.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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

      <MessageModal
        isOpen={Boolean(loginErrorMessage)}
        title="로그인 실패"
        message={loginErrorMessage}
        onClose={() => setLoginErrorMessage("")}
      />
    </>
  );
}

export default LoginPage;
