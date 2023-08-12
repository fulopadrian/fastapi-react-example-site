# Imports
from fastapi import FastAPI
import DBConnection

app = FastAPI()

# API endpoints
#TODO:
# - create CRUD apis
# - create models

# Root API
@app.get("/")
async def root():
    try:
        res = await DBConnection.client.admin.command("ping")
    except Exception as e:
        res = e
        print(e)

    return {"message": res}

# Create note
@app.put("/create")
async def createNote():
    return {"message": "Create API"}

# Get note by id
@app.get("/get")
async def getNote():
    return {"message": "Get API"}

# Update note by id
@app.patch("/update")
async def updateNote():
    return {"message": "Update API"}

# Delete note by id
@app.delete("/delete")
async def deleteNote():
    return {"message": "Delete API"}