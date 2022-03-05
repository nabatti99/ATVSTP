from flask import Flask
from service import conn

app = Flask(__name__)
app.db = conn.atvstp


@app.route('/')
def home():
    return '<h1>This is website ATVSTP </h1>'


if __name__ == '__main__':
    app.run(debug=True)
