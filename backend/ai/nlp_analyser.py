import spacy

try:
    import language_tool_python
    _lt = language_tool_python.LanguageTool('en-US')
except Exception:
    _lt = None

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    import sys
    subprocess.run([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

FILLER_WORDS = ["um", "uh", "like", "you know", "so", "actually", "basically", "literally"]

def analyze_text(text: str):
    # Grammar check
    if _lt:
        try:
            matches = _lt.check(text)
            grammar_score = max(0, 100 - (len(matches) * 5))
        except Exception:
            matches = []
            grammar_score = 80.0
    else:
        matches = []
        grammar_score = 80.0

    # Filler words count
    doc = nlp(text.lower())
    filler_count = sum(1 for token in doc if token.text in FILLER_WORDS)
    confidence_score = max(0, 100 - (filler_count * 10))
    
    return {
        "grammar_score": float(grammar_score),
        "confidence_score": float(confidence_score),
        "grammar_mistakes": len(matches),
        "filler_count": filler_count
    }
