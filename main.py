import os
import re
from collections import Counter
from datetime import datetime

from _decimal import Decimal
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from flask_mysqldb import MySQL

app = Flask(__name__)

app.secret_key = "flash_message"

app.config['MYSQL_USER'] = 'root'  # Default username for XAMPP MySQL
app.config['MYSQL_PASSWORD'] = ''  # Default password is empty for XAMPP
app.config['MYSQL_HOST'] = 'localhost'  # Host is localhost
app.config['MYSQL_DB'] = 'interaction_project'  # Your database name
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Optional for dictionary-style cursor

mysql = MySQL(app)


@app.route('/')
def index():
    return render_template('index.html', image_paths=image_paths('./static/images/index'))


@app.route('/insertContact', methods=['POST'])  # for dashboard.html contact part
def insertContact():
    if request.method == 'POST':
        flash("Your message has been delivered!")
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message = request.form['message']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO contact (name,email,subject,message) VALUES (%s,%s,%s,%s)",
                    (name, email, subject, message))
        mysql.connection.commit()
    return index()


def image_paths(directory):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']  # Add more image extensions if needed
    image_paths = []
    for root, _, files in os.walk(directory):
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in image_extensions:
                image_path = os.path.relpath(os.path.join(root, file), os.curdir)
                image_paths.append(image_path)
    return image_paths


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/loginpost', methods=['POST'])
def login_post():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM admin WHERE username = %s AND password = %s", (username, password))
        admin_record = cur.fetchone()
        if admin_record:
            session['adminId'] = admin_record['id']
            session['adminName'] = username
            return dashboard()
        cur.execute("SELECT * FROM user WHERE username = %s AND password = %s", (username, password))
        user_record = cur.fetchone()
        if user_record:
            session['username'] = username
            session['userId'] = user_record['userId']
            cur.execute("UPDATE user SET lastActive = %s WHERE userId = %s", (datetime.now(), user_record['userId']))
            mysql.connection.commit()
            flash('Welcome back, ' + username)
            return index()
        else:
            flash('Invalid username or password!', 'error')
            return login()


@app.route('/logout')
def logout():
    session.clear()
    return login()


@app.route('/register')
def register():
    cur = mysql.connection.cursor()
    cur.execute("SELECT username, phoneNo FROM user")
    validations = cur.fetchall()
    usernamesList = [user['username'] for user in validations]
    phoneNoList = [user['phoneNo'] for user in validations]
    return render_template('register.html', usernamesList=usernamesList, phoneNoList=phoneNoList)


@app.route('/addUser', methods=['POST'])
def addUser():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        phone = request.form['phone']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO user (username, password, phoneNo, createDate) VALUES (%s, %s, %s, %s)",
                    (username, password, phone, datetime.now()))
        mysql.connection.commit()
        flash('Register successful!', category='success')
        return login()


@app.route('/updateUser', methods=['POST'])
def updateUser():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        phone = request.form['phoneNo']
        userId = request.form['userId']
        cur = mysql.connection.cursor()
        cur.execute("UPDATE user SET username = %s, password = %s, phoneNo = %s WHERE userId = %s",
                    (username, password, phone, userId))
        mysql.connection.commit()
        return dashboard()


@app.route('/deleteUser', methods=['POST'])
def deleteUser():
    if request.method == "POST":
        userId = request.form['userId']
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM user WHERE userId = %s",
                    (userId,))
        mysql.connection.commit()
        return dashboard()


@app.route('/menu')
def menu():
    return render_template('menu.html', image_paths=image_paths('./static/images/menu'))


@app.route('/addToCart', methods=['POST'])
def addToCart():
    if request.method == 'POST':
        if 'username' not in session:
            return redirect(url_for('login'))
        curDateTime = datetime.now()
        userId = session['userId']
        note = request.form['note']
        totalPrice = request.form['totalPrice']
        time = request.form['time']
        productId = request.form['productId']
        quantity = request.form['quantity']
        cur = mysql.connection.cursor()

        if request.form['deliveryOption'] == 'delivery':
            deliveryFee = request.form['deliveryFee']
            location = request.form['location'].split(':')[0]
            if 'toppings' and 'sauce' in request.form:
                toppings = request.form.getlist('toppings')
                toppings = [topping.split(':')[0] for topping in toppings].__str__()
                sauce = request.form['sauce']
                cur.execute("""INSERT INTO purchaseOrder 
                            (productId, userId, orderDate, note, totalPrice, timeSlot, location, deliveryFee, quantity, toppings, sauce) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                            (productId, userId, curDateTime, note, totalPrice, time, location, deliveryFee, quantity,
                             toppings, sauce))
            else:
                cur.execute("""INSERT INTO purchaseOrder 
                            (productId, userId, orderDate, note, totalPrice, timeSlot, location, deliveryFee, quantity) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                            (productId, userId, curDateTime, note, totalPrice, time, location, deliveryFee, quantity))
        else:
            receiverName = request.form['name']
            receiverPhoneNo = request.form['phone']
            if 'toppings' and 'sauce' in request.form:
                toppings = request.form.getlist('toppings')
                toppings = [topping.split(':')[0] for topping in toppings].__str__()
                sauce = request.form['sauce']
                cur.execute("""INSERT INTO purchaseOrder 
                            (productId, userId, orderDate, note, totalPrice, timeSlot, receiverName, receiverPhoneNo, quantity, toppings, sauce) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                            (productId, userId, curDateTime, note, totalPrice, time, receiverName, receiverPhoneNo,
                             quantity, toppings, sauce))
            else:
                cur.execute("""INSERT INTO purchaseOrder 
                            (productId, userId, orderDate, note, totalPrice, timeSlot, receiverName, receiverPhoneNo, quantity) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                            (productId, userId, curDateTime, note, totalPrice, time, receiverName, receiverPhoneNo,
                             quantity))
        mysql.connection.commit()
        flash('Items have successfully added to cart!')
        return cart()


@app.route('/cart')
def cart():
    if 'username' not in session:
        return redirect(url_for('login'))
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM purchaseOrder WHERE userId = %s", (session['userId'],))
    orders = cur.fetchall()

    cur.execute("SELECT * FROM product")
    products = cur.fetchall()
    product_dict = {product['id']: [product['name'], product['imagePath']] for product in products}

    formattedOrders = []
    totalPrice = 0
    unitPrice = 0;
    preloader = []
    for order in orders:
        if order['paid'] == 0:
            totalPrice += Decimal(order['totalPrice'])
            productId = order['productId']
            productName = product_dict.get(productId, 'Unknown Product')[0]
            imagePath = str(product_dict.get(productId)[1])
            deliveryFee = deliveryFee = order['deliveryFee'] if order['deliveryFee'] is not None else 0
            unitPrice = (order['totalPrice'] - deliveryFee) / order['quantity']
            preloader.append('/static/' + imagePath)
            descriptions = []
            for key, value in order.items():
                if value is not None and value != '' and key not in ['productId', 'userId', 'orderId', 'paid',
                                                                     'totalPrice', 'quantity', 'status']:
                    subtitle = re.sub(r'([A-Z])', r' \1', key).strip().title()
                    descriptions.append(subtitle + ': ' + str(value))
            formattedOrders.append(
                {'productName': productName, 'description': descriptions, 'orderId': order['orderId'],
                 'quantity': order['quantity'], 'totalPrice': order['totalPrice'], 'imagePath': imagePath,
                 'unitPrice': unitPrice, 'deliveryFee': deliveryFee})
    return render_template('cart.html', orders=formattedOrders, totalPrice=totalPrice, preloader=preloader)


@app.route('/history')
def history():
    if 'username' not in session:
        return redirect(url_for('login'))
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM purchaseOrder WHERE userId = %s", (session['userId'],))
    orders = cur.fetchall()

    cur.execute("SELECT * FROM product")
    products = cur.fetchall()
    product_dict = {product['id']: [product['name'], product['imagePath']] for product in products}

    formattedOrders = []
    totalPrice = 0
    unitPrice = 0;
    preloader = []
    for order in orders:
        if order['paid'] == 1:
            totalPrice += Decimal(order['totalPrice'])
            productId = order['productId']
            productName = product_dict.get(productId, 'Unknown Product')[0]
            imagePath = str(product_dict.get(productId)[1])
            unitPrice = order['totalPrice'] / order['quantity']
            preloader.append('/static/' + imagePath)
            descriptions = []
            for key, value in order.items():
                if value is not None and value != '' and key not in ['productId', 'userId', 'orderId', 'paid',
                                                                     'totalPrice', 'quantity', 'status']:
                    subtitle = re.sub(r'([A-Z])', r' \1', key).strip().title()
                    descriptions.append(subtitle + ': ' + str(value))
            formattedOrders.append(
                {'productName': productName, 'description': descriptions, 'orderId': order['orderId'],
                 'quantity': order['quantity'], 'totalPrice': order['totalPrice'], 'imagePath': imagePath,
                 'unitPrice': unitPrice, 'status': order['status']})
    return render_template('history.html', orders=formattedOrders, totalPrice=totalPrice, preloader=preloader)


def deleteOrder(orderId):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM purchaseOrder WHERE orderId = %s", (orderId,))
    mysql.connection.commit()


@app.route('/deleteCart', methods=['POST'])
def deleteCartItem():
    if request.method == 'POST':
        deleteOrder(request.form['orderId'])
        return cart()


@app.route('/updateQuantity', methods=['POST'])
def update_quantity():
    try:
        orderId = request.form.get('orderId')
        quantity = request.form.get('quantity')
        totalPrice = request.form.get('totalPrice')

        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE purchaseOrder SET quantity = %s, totalPrice = %s WHERE orderId = %s",
                       (quantity, totalPrice, orderId))
        mysql.connection.commit()

        return jsonify({'success': True, 'message': 'Quantity updated successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route('/checkout', methods=['POST'])
def checkout():
    orderIds = request.form['orderIds'].rstrip(",")
    if (orderIds != ''):
        orderIds = [int(order_id) for order_id in orderIds.split(",")]
        cur = mysql.connection.cursor()
        placeholders = ','.join(['%s'] * len(orderIds))
        query = f"UPDATE purchaseOrder SET paid = 1 WHERE orderId IN ({placeholders})"
        cur.execute(query, orderIds)
        mysql.connection.commit()
        flash('Checkout successfully!')
        return history()


@app.route('/blog')
def blog():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM comment")
    data = cur.fetchall()
    if session.get('username') is None:
        return render_template('blog.html', comment=data, user=None)
    else:
        cur.execute("SELECT * FROM user where userId = %s", (session['userId'],))
        user = cur.fetchone()
        print(user)
        return render_template('blog.html', comment=data, user=user)


@app.route('/comment', methods=['POST'])
def comment():
    if request.method == 'POST':
        flash("Data Inserted Successfully")
        name = request.form['name']
        comment = request.form['comment']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO comment (name,comment) VALUES (%s,%s)", (name, comment))
        mysql.connection.commit()
    return redirect(url_for('blog'))


def get_days_difference(date_str):
    if date_str is not None:
        last_active_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        current_date = datetime.now()
        difference = current_date - last_active_date
        return difference.days


@app.route('/dashboard', methods=['POST'])
def dashboard():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM purchaseOrder")
    orders = cur.fetchall()

    cur.execute("SELECT * FROM product")
    products = cur.fetchall()
    product_dict = {product['id']: [product['name'], product['imagePath']] for product in products}

    deliveryOrders = []
    takeawayOrders = []

    for order in orders:
        if order['paid'] == 1:
            order_dict = {'productId': order['productId'],
                          'productName': product_dict.get(order['productId'], 'Unknown Product')[0],
                          'totalPrice': order['totalPrice'],
                          'note': order['note'],
                          'userId': order['userId'],
                          'timeSlot': order['timeSlot'],
                          'orderDate': order['orderDate'],
                          'quantity': order['quantity'],
                          'orderId': order['orderId'],
                          'toppings': order['toppings'],
                          'sauce': order['sauce'],
                          'status': order['status']
                          }
            deliveryFee = order['deliveryFee']
            if deliveryFee != None:
                order_dict['deliveryFee'] = deliveryFee
                order_dict['location'] = order['location']
                deliveryOrders.append(order_dict)
            else:
                order_dict['receiverName'] = order['receiverName']
                order_dict['receiverPhoneNo'] = order['receiverPhoneNo']
                takeawayOrders.append(order_dict)

    cur.execute("SELECT * FROM user")
    userRecords = cur.fetchall()
    user_counts_by_last_active = {}

    for user in userRecords:
        last_active_date_str = str(user["lastActive"])
        last_active_days = get_days_difference(last_active_date_str)
        group_key = (last_active_days // 2) * 2  # Grouping in increments of 2 days
        user_counts_by_last_active[group_key] = user_counts_by_last_active.get(group_key, 0) + 1

    cur.execute("SELECT * FROM contact")
    messages = cur.fetchall()
    word_counts = count_words_in_subjects_and_messages(messages)

    cur.execute("SELECT * FROM comment")
    comments = cur.fetchall()
    return render_template('dashboard.html', takeawayOrders=takeawayOrders, deliveryOrders=deliveryOrders,
                           allOrders=takeawayOrders + deliveryOrders, userRecords=userRecords,
                           userActivity=user_counts_by_last_active, messages=messages, wordData=dict(word_counts),
                           adminName=session['adminName'], comments=comments)


@app.route('/processOrder', methods=['POST'])
def processOrder():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        cur.execute("UPDATE purchaseOrder SET status = 1 WHERE orderId = %s",
                    (request.form['orderId'],))
        mysql.connection.commit()
        return dashboard()


def count_words_in_subjects_and_messages(data):
    # Combine subjects and messages into a single string
    combined_text = ""
    for item in data:
        subject = item["subject"]
        message = item["message"]
        combined_text += subject + " " + message + " "

    # Tokenize the combined text into individual words
    words = re.findall(r'\w+', combined_text.lower())

    # Count the occurrences of each word
    word_counts = Counter(words)
    return word_counts


@app.route('/deletePaidOrder', methods=['POST'])
def deletePaidOrder():
    if request.method == 'POST':
        deleteOrder(request.form['orderId'])
        return dashboard()


@app.route('/updateOrderNote', methods=['POST'])
def updateOrderNote():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        cur.execute("UPDATE purchaseOrder SET note = %s WHERE orderId = %s",
                    (request.form['note'], request.form['orderId']))
        mysql.connection.commit()
        return dashboard()


@app.route('/processContact', methods=['POST'])
def processContact():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        cur.execute("update contact SET status = 1 WHERE id = %s",
                    (request.form['contactId']))
        mysql.connection.commit()
        return dashboard()


@app.route('/deleteContact', methods=['POST'])
def deleteContact():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM contact WHERE id = %s",
                    (request.form['contactId']))
        mysql.connection.commit()
        return dashboard()

@app.route('/deleteComment', methods=['POST'])
def deleteComment():
    if request.method == 'POST':
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM comment WHERE id = %s",
                    (request.form['commentId'],))
        mysql.connection.commit()
        return dashboard()


if __name__ == '__main__':
    app.run(port=5001)
