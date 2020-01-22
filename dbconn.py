import pyodbc
import webbrowser

# NOTE: pyodbc does not look at the connection string. It's passed directly to the DB driver unmodified. 
# If a server name is not supplied, it will use the default instance. 
# If you do not specify DB name, it will default to master.
# If you do not specify BOTH user/pass, I believe it tries Windows auth.

sqlFile = open('loyalty.sql', 'r')
loyaltySQL = sqlFile.read()
sqlFile.close()


def createConnection(creds):
	conn = pyodbc.connect(('Driver={SQL Server};'
	                      'Server=%s;'
	                      'Database=%s;'
	                      'UID=%s;'
	                      'PWD=%s;')
	                      % (creds[0], creds[1], creds[2], creds[3]))
	return conn

def read(conn):
	cursor = conn.cursor()
	cursor.execute(loyaltySQL)
	x = open("main.js","w")
	x.truncate()
	x.write("var treedatastr = \'")
	for row in cursor:
		row = str(row)
		x.write(row[2:-4])
	x.write("\'")
	x.close()
	webbrowser.open("index.html")


# how to find instance for server_name field
# SQL config mgr --> right click properties of "SQL Server" service type
# go to service tab
# find Host name and name in parenthesis
# The server name field will be Host name/stuff in parenthesis
# 	if the instance name is the default (MSSQLSERVER), using it in the format
# 	will not work by design. In this case, simply hostname is sufficient
