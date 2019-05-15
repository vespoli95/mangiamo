from flask import Flask, render_template
import requests

#api key = dd2f8137

app = Flask(__name__)
url = "https://api.edamam.com/search?q=chicken&app_id=dd2f8137&app_key=8b0da9158df77edc612feef9e21d8b7f&from=0&to=10"
response = requests.get(url)
data = response.json()['hits']
for key in data:
    print(key['recipe']['label'])

#confin mySQL
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Sword099*'
# app.config['MYSQL_DB'] = 'myflaskapp'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# mysql = MySQL(app)

@app.route("/")
def hello():
    # cur = mysql.connection.cursor()
    # cur.execute("INSERT INTO users(username, password, email, date_joined, post_count) VALUES(" +
    # "antvespoli, sword099, antvespoli@gmail.com, 20/20/1999, 20")

    # mysql.connection.commit()

    # cur.close()

    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
