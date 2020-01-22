from tkinter import *
from dbconn import *


root = Tk()
root.title("LoyaltyTool")
heading = Label(root, text="WELCOME").pack()

label1 = Label(root, text="Server Name: ").pack()
servername = StringVar()
entry1 = Entry(root, textvariable=servername).pack()

label2 = Label(root, text="DB Name: ").pack()
dbname = StringVar()
entry1 = Entry(root, textvariable=dbname).pack()

label3 = Label(root, text="Username: ").pack()
username = StringVar()
entry1 = Entry(root, textvariable=username).pack()

label4 = Label(root, text="Password: ").pack()
password = StringVar()
entry1 = Entry(root, textvariable=password).pack()


def connect():
    creds = getCreds()
    conn = createConnection(creds)
    if conn:  # connection_to_db
        root.destroy()
        read(conn)
        conn.close()
    else:
        root.mainloop()

def getCreds():
    creds = []
    creds.append(servername.get())
    creds.append(dbname.get())
    creds.append(username.get())
    creds.append(password.get())
    return creds


button = Button(root, text="START", command=connect)
button.pack()

root.geometry("300x300")
root.mainloop()
