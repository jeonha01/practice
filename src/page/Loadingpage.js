import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoadingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 80%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  width: ${({ progress }) => `${progress}%`};
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  width: 45%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${({ isStart }) => (isStart ? '#4caf50' : '#f44336')};
  color: white;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Loadingpage = () => {
  const [isRunning, setIsRunning] = useState(false); // 검사 시작/중지 상태
  const [progress, setProgress] = useState(0); // 진행률 (0 ~ 100)
  const navigate = useNavigate(); // 경로 이동을 위한 훅

  useEffect(() => {
    let interval;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100)); // 1씩 증가
      }, 100); // 0.1초마다 1% 증가
    } else if (!isRunning) {
      clearInterval(interval); // 검사 중지 시 진행 중지
    }

    if (progress === 100) {
      setTimeout(() => navigate('/main'), 500); // 0.5초 후 이동
    }

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 클리어
  }, [isRunning, progress, navigate]);

  const handleStart = () => {
    setIsRunning(true);
    setProgress(0); // 검사 시작 시 0부터 시작
  };

  const handleStop = () => {
    setIsRunning(false); // 검사 중지
  };

  return (
    <LoadingPageContainer>
      <Title>심박도 검사</Title>
      <ProgressContainer>
        <ProgressBar progress={progress} />
        <ProgressText>{progress}%</ProgressText>
      </ProgressContainer>
      <ButtonGroup>
        <Button onClick={handleStart} disabled={isRunning} isStart>
          검사 시작
        </Button>
        <Button onClick={handleStop} disabled={!isRunning}>
          검사 중지
        </Button>
      </ButtonGroup>
    </LoadingPageContainer>
  );
};

export default Loadingpage;

