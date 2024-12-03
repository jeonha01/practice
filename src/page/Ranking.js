import React from "react";
import styled from "styled-components";

const RankingPage = () => {
  const mockData = [
    { rank: 1, name: "홍길동", score: 1200 },
    { rank: 2, name: "김철수", score: 1100 },
    { rank: 3, name: "이영희", score: 1050 },
  ];

  return (
    <Wrapper>
      <Header>
        <Title>🏆 랭킹</Title>
        <Subtitle>학습 성과를 확인하고 경쟁해보세요!</Subtitle>
      </Header>
      <RankingList>
        {mockData.map((user) => (
          <RankingItem key={user.rank}>
            <Rank>{user.rank}</Rank>
            <Name>{user.name}</Name>
            <Score>{user.score}점</Score>
          </RankingItem>
        ))}
      </RankingList>
    </Wrapper>
  );
};

export default RankingPage;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #000000, #333333);
  height: 100vh;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: #dcdcdc;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  width: 90%;
  max-width: 500px;
`;

const RankingItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Rank = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Name = styled.span`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Score = styled.span`
  font-size: 1rem;
  color: #00796b;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

