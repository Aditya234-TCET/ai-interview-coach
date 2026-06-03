from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models import pydantic_schemas as schemas, schemas as db_models
from ai.llm_engine import generate_question, evaluate_answer
from ai.nlp_analyser import analyze_text

router = APIRouter()

@router.post("/sessions/", response_model=schemas.Session)
def create_session(session: schemas.SessionCreate, db: Session = Depends(get_db)):
    # Assuming user_id=1 for mock
    db_session = db_models.Session(interview_type=session.interview_type, user_id=1)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.get("/sessions/{session_id}/question")
def get_next_question(session_id: int, db: Session = Depends(get_db)):
    db_session = db.query(db_models.Session).filter(db_models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    question = generate_question(db_session.interview_type)
    return {"question": question}

@router.post("/sessions/{session_id}/answer", response_model=schemas.Response)
def submit_answer(session_id: int, answer: str, question: str, db: Session = Depends(get_db)):
    db_session = db.query(db_models.Session).filter(db_models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    # Analyze text with NLP
    nlp_results = analyze_text(answer)
    
    # Evaluate with LLM
    llm_results = evaluate_answer(question, answer)
    
    db_response = db_models.Response(
        session_id=session_id,
        question=question,
        answer_transcript=answer,
        grammar_score=nlp_results['grammar_score'],
        confidence_score=nlp_results['confidence_score'],
        relevance_score=llm_results['relevance_score'],
        feedback=llm_results['feedback']
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response
