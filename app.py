from flask import Flask, render_template, request
import requests

app = Flask(__name__)
app_key = '8b0da9158df77edc612feef9e21d8b7f'
app_id = 'dd2f8137'
result_count = '20'





#confin mySQL
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Sword099*'
# app.config['MYSQL_DB'] = 'myflaskapp'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# mysql = MySQL(app)
  # cur = mysql.connection.cursor()
    # cur.execute("INSERT INTO users(username, password, email, date_joined, post_count) VALUES(" +
    # "antvespoli, sword099, antvespoli@gmail.com, 20/20/1999, 20")

    # mysql.connection.commit()

    # cur.close()

@app.route("/", methods=['GET', 'POST'])
def index():
    
    if request.method == 'POST':
        q = request.form['searchBar']
        url = "https://api.edamam.com/search?q=" + q + "&app_id=" + app_id + "&app_key=" + app_key + "&from=0&to=" + result_count
        print(url)
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()['hits']
            for key in data:
                print(key['recipe']['label'])
            return render_template('index.html', data=data)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
