from routes import app


@app.route('/')
def home():
    return '<h1>This is website ATVSTP</h1>'


if __name__ == '__main__':
    app.run(debug=True)
