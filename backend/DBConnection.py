"""
This code defines the connection to the cloud mongodb server
"""

# Imports
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from odmantic import AIOEngine

# Credentials
# For testing only!
username = "afulop"
password = "afulop"
db_name = "todo_app"

# DB uri
uri = "mongodb+srv://%s:%s@test.i5oypyn.mongodb.net/?retryWrites=true&w=majority" %(username, password)

# Create a new client and connect to the server
client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
# Create async engine
engine = AIOEngine(client, database=db_name)

if __name__ == "__main__":
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)