from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Ruta para cargar las preguntas
@app.route('/get_questions')
def get_questions():
    try:
        with open('question.json', 'r') as f:
            questions = json.load(f)
        return jsonify(questions)
    except Exception as e:
        return jsonify({"error": str(e)})

# Ruta principal para la página del quiz
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
