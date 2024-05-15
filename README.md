FastAPI の勉強用

#### 導入手順 バックエンド

```
docker-compose up -d

docker exec -it fastapi_task_app sh

alembic upgrade head
```

- swagger

```
http://localhost:8000/docs#/
```

- テスト

```
python -m pytest
```

#### 導入手順 フロントエンド

```
npm i
```

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
