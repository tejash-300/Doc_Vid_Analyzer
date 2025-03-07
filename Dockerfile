# Use the official Python base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Expose ports for FastAPI (8500) and Streamlit (8501)
EXPOSE 8500 8501

# Command to start both FastAPI and Streamlit concurrently
CMD uvicorn app:app --host 0.0.0.0 --port 8500 & streamlit run app_ui.py --server.port=8501 --server.address=0.0.0.0
