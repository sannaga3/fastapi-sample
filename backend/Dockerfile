FROM python:3.11.8-alpine

WORKDIR /app

COPY ./app /app

RUN apk update && \
    apk add --no-cache build-base libffi-dev

RUN pip install -r /app/requirements.txt

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]