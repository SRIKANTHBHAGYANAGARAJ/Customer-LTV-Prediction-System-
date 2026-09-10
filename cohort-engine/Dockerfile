FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Seed the SQLite DB with one run at build time isn't necessary; app.py
# initializes the schema on first request/start automatically.
EXPOSE 5000

# Default: serve the dashboard + API. Override to run the scheduler instead:
#   docker run <image> python cli.py run-scheduler --interval 21600
CMD ["python", "app.py"]
