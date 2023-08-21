"""
This file contains the DBMantic models for the mongodb
"""

# Imports
from odmantic import Model
from typing import Union
from enum import Enum
from datetime import datetime

# Enumerations
class TaskStates(str, Enum):
    todo = "To Do"
    in_progress = "In Progress"
    done = "Done"

class TaskPriorities(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"

# Tasks model
class Tasks(Model):
    description: Union[str, None] = None
    state: str = TaskStates.todo
    priority: str = TaskPriorities.medium
    due_date: Union[datetime, None] = None