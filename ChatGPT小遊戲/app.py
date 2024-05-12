from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

class Card:
    def __init__(self, name):
        self.name = name

cards_data = [Card("Cat"), Card("Dog"), Card("Fish"), Card("Bird")]
cards = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/start", methods=["POST"])
def start_game():
    global cards
    cards = [card.name for card in cards_data] * 2
    random.shuffle(cards)
    return jsonify({"message": "Game started", "cards_count": len(cards)})

@app.route("/api/check", methods=["POST"])
def check_match():
    data = request.json
    index1, index2 = data["index1"], data["index2"]
    if index1 == index2 or index1 < 0 or index2 < 0 or index1 >= len(cards) or index2 >= len(cards):
        return jsonify({"message": "Invalid indexes", "match": False}), 400

    match = cards[index1] == cards[index2]
    if match:
        cards[index1] = None
        cards[index2] = None
    return jsonify({"message": "Match found!" if match else "No match!", "match": match, "cards": cards})

if __name__ == "__main__":
    app.run(debug=True)

