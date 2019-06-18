from flask import Flask, render_template, request, flash, redirect, url_for, session, logging
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
from functools import wraps
from User import User
import requests, datetime

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

@app.route('/index', methods=['GET', 'POST'])
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

    return render_template('index.html')

    
@app.route('/register', methods=['GET', 'POST'])
def register():   
    session.clear()
    if request.method == 'POST':
        email = request.form['email']
        password = sha256_crypt.hash((str(request.form['password'])))
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        age = request.form['age']
        country = request.form['country']
        user = User(email, password, datetime.datetime.now(), first_name, last_name, age, country)

        try:
            #create cursor
            cur = mysql.connection.cursor()
            query = "INSERT INTO users (email, password, date_joined, first_name, last_name, age, country) VALUES('{}', '{}', '{}', '{}', '{}', '{}','{}')".format(user.email, user.password, user.date_joined, user.first_name, user.last_name, user.age, user.country)
            cur.execute(query)

            #commit to DB
            mysql.connection.commit()

            #close connection
            cur.close()

            session['msg'] = "Success! You can now login."
            session['email'] = request.form['email']
        except:
            error = "Email already exists."
            return render_template('register.html', error=error)       

        return redirect(url_for('login'))

    return render_template('register.html')


# user login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # get form fields
        email = request.form['email']
        password_candidate = request.form['password']

        # create cursor
        cur = mysql.connection.cursor()

        # get user by email
        result = cur.execute("SELECT * FROM users WHERE email = '{}'".format(email))
        error = 'Invalid login'
        
        if result > 0:
            # 1st stored stored hash only
            data = cur.fetchone()
            password = data['password']

            # compare passwords
            if sha256_crypt.verify(password_candidate, password):
                session['logged_in'] = True
                session['first_name'] = data['first_name']
                session['email'] = email

                #flash('You are now logged in', 'success')
                
                session['msg'] = ""
                return redirect(url_for('index'))
                #app.logger.info('PASSWORD MATCHED')
            else:                
                #app.logger.info('PASSWORD NOT MATCHED')
                
                session['msg'] = ""
                error = "Incorrect password"
                return render_template('login.html', error=error)
            cur.close()
        else:
            error = 'Email not found'
            # app.logger.info('NO USER')
            session['msg'] = ""
            return render_template('login.html', error=error)
    
    return render_template('login.html')

# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))
    return wrap

@app.route('/logout')
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.secret_key = 'Sword099*'
    app.run(debug=True)
