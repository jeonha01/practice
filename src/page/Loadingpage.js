import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Loadingpage.css';

const Loadingpage = () => {
  const [isRunning, setIsRunning] = useState(false); // 검사 시작/중지 상태
  const [progress, setProgress] = useState(0); // 진행률 (0 ~ 100)
  const navigate = useNavigate(); // 경로 이동을 위한 훅

  // 진행 상태가 변화하는 효과
  useEffect(() => {
    let interval;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100)); // 1씩 증가
      }, 100); // 6초마다 1% 증가
    } else if (!isRunning) {
      clearInterval(interval); // 검사 중지 시 진행 중지
    }

    // 진행률이 100%에 도달하면 메인 페이지로 이동
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
    <div className="loading-page">
      <h1>심박도 검사</h1>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{progress}%</span>
      </div>
      <div className="buttons">
        <button className="start-btn" onClick={handleStart} disabled={isRunning}>
          검사 시작
        </button>
        <button className="stop-btn" onClick={handleStop} disabled={!isRunning}>
          검사 중지
        </button>
      </div>
    </div>
  );
};

export default Loadingpage;

