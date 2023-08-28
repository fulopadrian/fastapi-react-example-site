"""
This is the main entrypoint of the FasAPI application
"""

# Imports
from fastapi import FastAPI, HTTPException
from odmantic import ObjectId
from DBConnection import engine
from Models import Tasks
from typing import List
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Middleware to handle CORS
# Note: had to add origins, because otherwise the React fetch did not accepted data
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API endpoints
# Root API
@app.get("/")
async def root():
    """
    The root API is for testing.
    Return
        - the number of entries in the tasks table
    """
    try:
        res = await engine.count(Tasks)
    except Exception as e:
        res = e
        print(e)

    return {"message": res}

# Create task API
@app.put("/createTask", response_model=Tasks)
async def createNote(task: Tasks):
    """
    Stores a task in the database
    Return
        - the stored task's JSON object
    """
    await engine.save(task)

    return task

# Get all tasks API
@app.get("/getAllTasks", response_model=List[Tasks])
async def getAllTasks():
    """
    Gets all the tasks stored in the database
    Return
        - a list containing Tasks or empty list
    """
    tasks = await engine.find(Tasks)

    return tasks

# Get task by id API
@app.get("/getTask", response_model=Tasks)
async def getTask(id: ObjectId):
    """
    Get a single task by its id
    Return
        - the task or null
    """
    task = await engine.find_one(Tasks, Tasks.id == id)

    return task

# Update task by id API
@app.patch("/updateTask", response_model=Tasks)
async def updateTask(id: ObjectId, patch: Tasks):
    """
    Updates a single task
    Note: Model.update does not exists. I had to create the update process
    Return
        - updated task

    TODO:
        - add validation so defaults don't overwrite data if missing from patch
    """
    task = await engine.find_one(Tasks, Tasks.id == id)

    if task is None:
        raise HTTPException(404)

    # The Model.update does not exists in this version!
    #task.update(patch)
    
    task.description = patch.description
    task.state = patch.state
    task.priority = patch.priority
    task.due_date = patch.due_date

    await engine.save(task)
    
    return task

# Delete task by id API
@app.delete("/deleteTask", response_model=Tasks)
async def deleteNote(id: ObjectId):
    """
    Deletes a task from the database
    Return
        - deleted task
    """
    task = await engine.find_one(Tasks, Tasks.id == id)

    # Error handling
    if task is None:
        raise HTTPException(404)

    await engine.delete(task)

    return task