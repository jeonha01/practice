import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../api";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  max-width: 400px;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DateSection = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ccc;
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
`;

const TodoLeft = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    color: #000000;
  }
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const TodoText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const TodoScore = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top:20px;

  &:hover {
    background-color: #000000;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => (props.error ? "#dc3545" : "#28a745")};
`;

const Scheduler = () => {
  const [formData, setFormData] = useState({
    // user_id: '',
    subject_name: '',
    subject_id:'',
    completed:'',
    duration:'',
  })

  const navigate = useNavigate();

  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/subjects", formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("과목을 추가할 수가 없습니다.");
      }
    }
  }

  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  // 오늘 날짜 설정
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubject("");
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      const newTodo = { id: Date.now(), text: newSubject, score: 0 };
      setTodos([...todos, newTodo]);
      closeModal();
    }
  };

  const handleSubjectClick = (id) => {
    navigate(`/study-room/${id}`);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <DateSection>오늘 날짜: {date}</DateSection>
      <Header>
        <span>과목</span>
        <span>집중력 점수</span>
      </Header>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} onClick={() => handleSubjectClick(todo.id)}>
            <TodoLeft>
              <DeleteButton onClick={() => handleDelete(todo.id)}>×</DeleteButton>
              <Checkbox type="checkbox" />
              <TodoText>{todo.text}</TodoText>
            </TodoLeft>
            <TodoScore>{todo.score}점</TodoScore>
          </TodoItem>
        ))
      ) : (
        <p>추가된 과목이 없습니다.</p>
      )}
      <AddButton onClick={openModal}>
        과목 추가
      </AddButton>
      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h2>과목 추가</h2>
            <Input
              type="text"
              name="subject_name"
              placeholder="과목명을 입력하세요"
              value={formData.subject_name} //api없이 newSubject
              onChange={handleInputChange} //api없이 (e) => setNewSubject(e.target.value)
              required
            />
            <div>
              <ModalButton onClick={handleSubmit}>추가</ModalButton> //api 없이 handleAddSubject
              <ModalButton onClick={closeModal}>취소</ModalButton>
            </div>
          </Modal>
        </ModalOverlay>
      )}
      {message && <Message error={message.includes("오류")}>{message}</Message>}
    </Container>
  );
};

export default Scheduler;