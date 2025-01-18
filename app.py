from flask import Flask, render_template, jsonify
import json
import os

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
    # Usar el puerto de Render o el 5000 por defecto
    port = int(os.environ.get("PORT", 5000))
    # Configurar host como 0.0.0.0 para que sea accesible externamente
    app.run(host="0.0.0.0", port=port, debug=True)
