from flask import Flask, render_template
from flask_mysqldb import MySQL
app = Flask(__name__)

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

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
