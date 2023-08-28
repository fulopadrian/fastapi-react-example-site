# Set base image
FROM python:3.10

# Set directory
ENV WORKDIR=/usr/src/app

WORKDIR $WORKDIR

# Upgrade pip
RUN pip install pip --upgrade
RUN pip install setuptools --upgrade

# Copy all files to the container
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the app
CMD ["uvicorn", "Main:app", "--host", "0.0.0.0", "--port", "8000"]