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

# Expose port
EXPOSE 8000

CMD ["uvicorn", "Main:app", "--port", "8000"]