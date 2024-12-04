import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api";


// Styled Components
const Container = styled.div`
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #495057;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #000000;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: #000000;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const Link = styled.a`
  color: #000000;
  text-decoration: underline;
`;

const Logo = styled.img`
  display: block; /* 가운데 정렬 */
  margin: 0 auto 1.5rem; /* 위, 아래 간격 설정 (중앙 정렬 포함) */
  width: 62x; /* 너비 */
  height: 58px; /* 높이 */
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      setMessage(response.data.message || "로그인 성공!");
      localStorage.setItem("token", response.data.token); // JWT 저장
      navigate("/loading"); // 메인 페이지로 이동
    } catch (error) {
      setMessage(error.response?.data?.error || "로그인 실패");
    }
  };
  

  return (
    <Container>
      <Card>
      <Logo src="/logo.png" alt="Logo" />
        {/* <Title>Login</Title> */}
        <Form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <Button type="submit">Login</Button>
        </Form>
        <Footer>
          <Link href="#" onClick={() => navigate("/Signup")}>
            Don't have an account? Sign up
          </Link>
        </Footer>
        {message && <p>{message}</p>}
      </Card>
    </Container>
  );
};

export default Login;