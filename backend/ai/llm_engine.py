import os
from pydantic import BaseModel

class LLMResponse(BaseModel):
    question: str
    feedback: str
    relevance_score: float

import random

# Using a mock for now, can be replaced with real OpenAI or Anthropic calls
def generate_question(interview_type: str) -> str:
    questions = {
        "HR": [
            "Tell me about yourself and your background.",
            "Why do you want to work for our company?",
            "Where do you see yourself in five years?",
            "What are your greatest strengths and weaknesses?",
            "Tell me about a time you faced a conflict at work.",
            "How do you handle stress and pressure?",
            "What is your greatest professional achievement?",
            "Why did you leave your last job?"
        ],
        "Technical": [
            "Explain how a REST API works and how it differs from GraphQL.",
            "What happens when you type a URL into a web browser?",
            "Explain the concept of asynchronous programming.",
            "What is the difference between SQL and NoSQL databases?",
            "Can you explain the principles of Object-Oriented Programming (OOP)?",
            "What are Docker containers and why are they useful?",
            "How do you ensure your code is secure?",
            "Explain the difference between authentication and authorization."
        ],
        "DSA": [
            "How would you reverse a linked list?",
            "Can you explain the time and space complexity of QuickSort?",
            "How do you find the longest palindromic substring in a string?",
            "Explain how a Hash Map works under the hood.",
            "What is the difference between a Tree and a Graph?",
            "How would you detect a cycle in a directed graph?",
            "Write an algorithm to find the maximum depth of a binary tree.",
            "Explain Dynamic Programming with an example."
        ],
        "Behavioural": [
            "Describe a situation where you had to meet a tight deadline.",
            "Tell me about a time you failed and what you learned from it.",
            "Give an example of a time you showed leadership.",
            "Tell me about a time you had to learn something completely new for a project.",
            "Describe a time when you disagreed with your manager.",
            "Tell me about a time you went above and beyond for a customer or colleague.",
            "Describe a situation where you had to adapt to a sudden change.",
            "Give an example of how you handle prioritizing multiple tasks."
        ]
    }
    
    category_questions = questions.get(interview_type, ["Can you tell me about yourself?"])
    return random.choice(category_questions)

def evaluate_answer(question: str, answer: str) -> dict:
    # Mock evaluation logic
    word_count = len(answer.split())
    relevance_score = min(100.0, word_count * 2.0) # Dummy logic: more words = more relevant
    
    feedback = "Good attempt."
    if word_count < 10:
        feedback = "Your answer was too short. Try to elaborate more."
    elif relevance_score > 80:
        feedback = "Excellent response! You covered the key points well."
        
    return {
        "feedback": feedback,
        "relevance_score": relevance_score
    }
