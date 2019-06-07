from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import requests

app = Flask(__name__)

###hide this
app_key = '8b0da9158df77edc612feef9e21d8b7f'
app_id = 'dd2f8137'
###hide this

#confin mySQL
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Sword099'
app.config['MYSQL_DB'] = 'mangiamo'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    
    # if request.method == 'POST':
    #     q = "https://api.edamam.com/search?q=" + request.form['searchBar']
    #     num_results = "&from=0&to=" + '25'
    #     num_ingredients = "&ingr=" + request.form['numIngredients'] if request.form['numIngredients'] != "" else ""
        
    #     url =  q + "&app_id=" + app_id + "&app_key=" + app_key + num_results + num_ingredients
    #     print(url)
    #     response = requests.get(url)
    #     if response.status_code == 200:
    #         data = response.json()['hits']
    #         for key in data:
    #             print(key['recipe']['label'])
    #         return render_template('index.html', data=data)
   
    # cur = mysql.connection.cursor()
    # cur.execute("INSERT INTO users(username, password, email, date_joined, post_count) VALUES('antvespoli2', 'sword099', 'antvespoli@gmail.com', '20/20/1999', 20)")
    # mysql.connection.commit()

    cur.close()
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
