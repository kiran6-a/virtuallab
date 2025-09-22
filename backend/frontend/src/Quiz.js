import React, { useState } from "react";
import "./Quiz.css";

export default function Quiz() {
  // Sample MCQs
  const questions = [
    {
      question: "What is the acceleration due to gravity (g) on Earth?",
      options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "7.5 m/s²"],
      answer: "9.8 m/s²",
    },
    {
      question: "At what angle does a projectile achieve maximum range?",
      options: ["30°", "45°", "60°", "90°"],
      answer: "45°",
    },
    {
      question: "Which law governs the motion of a pendulum?",
      options: [
        "Newton's First Law",
        "Hooke's Law",
        "Law of Simple Harmonic Motion",
        "Archimedes' Principle",
      ],
      answer: "Law of Simple Harmonic Motion",
    },
    {
      question: "What is the lens equation?",
      options: ["1/f = 1/u + 1/v", "F = ma", "E = mc²", "P = VI"],
      answer: "1/f = 1/u + 1/v",
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">📝 Quiz / Assessment</h2>

      {!showResult ? (
        <div className="quiz-card">
          <h3>
            Q{currentQ + 1}. {questions[currentQ].question}
          </h3>
          <div className="options">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${
                  selected
                    ? opt === questions[currentQ].answer
                      ? "correct"
                      : opt === selected
                      ? "incorrect"
                      : ""
                    : ""
                }`}
                onClick={() => !selected && handleAnswer(opt)}
                disabled={!!selected}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQ + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
        </div>
      ) : (
        <div className="result-card">
          <h3>✅ Quiz Completed!</h3>
          <p>
            You scored <b>{score}</b> out of <b>{questions.length}</b>
          </p>
          <button
            className="restart-btn"
            onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setShowResult(false);
              setSelected(null);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
