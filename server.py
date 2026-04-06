from flask import Flask, request, send_file, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('./frontend/index.html')

@app.route('/script.js')
def script():
    return send_file('./frontend/script.js')

@app.route('/style.css')
def style():
    return send_file('./frontend/style.css')

@app.route('/compute')
def compute():
    try:
        first_capacity = int(request.args['first_capacity'])
        second_capacity = int(request.args['second_capacity'])
        board_length = int(request.args['board_length'])
        
        subprocess.run(
            ["./main", str(first_capacity), str(second_capacity), str(board_length)],
            check=True
        )
        with open('./output.txt', 'r', encoding='utf-8') as f:
            output = f.read()

        output = output.split("T")

        if os.path.exists('./output.txt'):
            os.remove('./output.txt')

        return jsonify(output)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 4321))
    app.run(host="0.0.0.0", port=port)