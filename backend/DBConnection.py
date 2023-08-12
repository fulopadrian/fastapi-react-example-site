#TODO: odmantic import throws an error. Need to fix it, otherwise can't use it

# Imports
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
#from odmantic import AIOEngine

# For testing only!
username = "afulop"
password = "afulop"

uri = "mongodb+srv://%s:%s@myatlasclusteredu.o8pxm9b.mongodb.net/?retryWrites=true&w=majority" %(username, password)

# Create a new client and connect to the server
client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
#engine = AIOEngine(client=client, database="sample_mflix")

if __name__ == "__main__":
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)