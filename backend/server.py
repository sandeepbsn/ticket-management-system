from flask import Flask
from flask import request
import json
from flask_mysqldb import MySQL
import jwt
from datetime import datetime
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['MYSQL_HOST'] = "database-1.cqxrv898tj74.ap-south-1.rds.amazonaws.com"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "Password_123"
app.config['MYSQL_DB'] = "tms"

CORS(app)
mysql = MySQL(app)


# function to read get the table content
def readTables(tablename):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM %s;'''%(tablename))

    result = cur.fetchall()
    
    table = []

    for row in result:
        table.append(row)

    return table


#function to register user
@app.route('/register', methods = ['POST'])
def register():
    data = request.get_json()   

    regData = readTables('users')
    dupFlag = False
    for info in regData:
        if(data['email'] == info[2]):
            dupFlag = True
            break

    if(dupFlag):
        return {"message":"Username already exists","registered":"false"}
    else:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO users (name, email, password, role) VALUES ('%s','%s','%s','%s');'''%(data['name'], data['email'], data['password'], data['role']))

        mysql.connection.commit()
        cur.close()
        return {"message":"User registration successfull", "registered":"true"}


# # function to login user
# @app.route('/login', methods = ['POST'])
# def login():
#     data = request.get_json()

#     logData = readTables('users')

#     loggedIn = False
#     for info in logData:
#         if(data['email'] == info[2]):
#             if(data['password'] == info[3]):
#                 data['id'] = info[0]
#                 data['role'] = info[4]
#                 loggedIn = True
#                 break

#     if(loggedIn):
#         payload = {"id":data['id'],"email":data['email'], "password":data['password'],"role":data['role'], "loggedIn":"true"}
#         key = 'secret'

#         encoded_jwt = jwt.encode(payload, key)
#         return json.dumps({"token":encoded_jwt.decode(), "loggedIn":"true"})
#     else:
#         return{"message":"Username or password invalid","loggedIn":"false"}

# #function to check token
# @app.route('/<token>', methods = ['GET'])
# def tokenValidation(token):
    
#     key = "secret"

#     decoded = jwt.decode(token, key)

#     return json.dumps(decoded)



#function to fetch companies
@app.route('/companies', methods = ['GET'])
def fetchCompanies():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT id, name FROM users WHERE role = 'company';''')

    result = cur.fetchall()

    companies = []

    for row in result:
        companies.append(row)

    return json.dumps(companies)


#function to add requests
@app.route('/addrequest', methods = ['POST'])
def addRequest():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO requests (subject,content,date,time,company_id,user_id) VALUES ('%s','%s','%s','%s','%s','%s');'''
    %(data['subject'], data['content'], data['date'], data['time'], data['company_id'], data['user_id']))

    mysql.connection.commit()
    cur.close()

    return "Request has been raised successfully"

#function to fetch requests
@app.route('/getrequests', methods = ['POST'])
def getRequests():
    data = request.get_json()
    cur = mysql.connection.cursor()

    cur.execute('''SELECT requests.id,subject,content,date,time,users.name 
    FROM requests JOIN users ON requests.company_id = users.id WHERE requests.user_id = %d;'''
    %(int(data['id'])))

    result = cur.fetchall()

    requests = []
    for row in result:
        row_info = {}
        row_list = list(row)
        row_info['id'] = row_list[0]
        row_info['subject'] = row_list[1]
        row_info['content'] = row_list[2]
        row_info['date'] = row_list[3].strftime("%m/%d/%y")
        row_info['time'] = str(row_list[4])
        row_info['company'] = row_list[5]
        requests.append(row_info)

    return json.dumps(requests)

#function to fetch complaints
@app.route('/getcomplaints', methods = ['POST'])
def getComplaints():
    data = request.get_json()

    cur = mysql.connection.cursor()
    cur.execute('''SELECT requests.id,subject,content,date,time,status,users.name 
    FROM requests JOIN users on requests.user_id = users.id WHERE requests.company_id = %d;'''%(int(data['id'])))

    results = cur.fetchall()

    data = []
    for result in results:
        temp_dict = {}
        temp_dict['id'] = result[0]
        temp_dict['subject'] = result[1]
        temp_dict['content'] = result[2]
        temp_dict['date'] = result[3].strftime('%d/%m/%y')
        temp_dict['time'] = str(result[4])
        temp_dict['status'] = result[5]
        temp_dict['username'] = result[6]
        data.append(temp_dict)

    return json.dumps(data)

@app.route('/getresponses/<ticket_id>', methods = ['GET','POST'])
def getrepsonses(ticket_id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT message,date,time,person FROM responses WHERE ticket_id = %d ORDER BY date,time;'''%(int(ticket_id)))
    results = cur.fetchall()

    responses = []

    for result in results:
        temp_dict = {}
        temp_dict['message'] = result[0]
        temp_dict['date'] = result[1].strftime("%m/%d/%y")
        temp_dict['time'] = str(result[2])
        temp_dict['person'] = result[3]
        responses.append(temp_dict)

    return json.dumps(responses)

@app.route('/addresponse', methods =['POST'])
def addresponse():
    data = request.get_json()

    cur = mysql.connection.cursor()
    
    cur.execute('''INSERT INTO responses (message, date,time,ticket_id,person) VALUES ('%s','%s','%s',%d,'%s');'''%(data['message'], data['date'], data['time'],int(data['ticket_id']),data['person']))

    mysql.connection.commit()
    cur.close()

    return {
        "message":"response added successfully"
    }

@app.route('/changestatus', methods = ['POST'])
def changestatus():
    data = request.get_json()
    print("data is *************", data)
    cur = mysql.connection.cursor()
    cur.execute('''UPDATE requests SET status = '%s' WHERE id = %d;'''%(data['status'], int(data['ticket_id'])))
    
    mysql.connection.commit()
    cur.close()

    return {"message":"status updated successfully"}

@app.route('/getdatetickets/<company_id>', methods = ['GET'])
def getdatetickets(company_id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT date, count(*) FROM requests WHERE company_id = %d GROUP BY date;'''%(int(company_id)))

    results = cur.fetchall()

    data = []

    for result in results:
        temp_dict = {}
        temp_dict['date'] = result[0].strftime('%d-%m-%Y')
        temp_dict['tickets'] = result[1]

        data.append(temp_dict)

    return json.dumps(data)

@app.route('/getstatus/<company_id>', methods = ['GET'])
def getstatus(company_id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT status, COUNT(*) FROM requests WHERE company_id = %d GROUP BY status ORDER BY status DESC;'''%(int(company_id)))

    results = cur.fetchall()

    data = []

    for result in results:
        temp_dict = {}
        temp_dict['status'] = result[0]
        temp_dict['count'] = result[1]
        data.append(temp_dict)

    return json.dumps(data)

        


    
    
    
