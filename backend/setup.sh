#!/bin/bash

echo "DB接続実行中..."
until nc -z db 5432; do
    sleep 1
done
echo "DB接続完了"

cat <<EOL > .env.local
DB_USER=$POSTGRES_USER
DB_PASSWORD=$POSTGRES_PASSWORD
DB_NAME=$POSTGRES_DB
DB_PORT=$POSTGRES_PORT
DB_HOST=$POSTGRES_HOST
PORT=$EXPRESS_PORT
EOL
echo ".env.local file 作成完了！"

echo "マイグレーションを実行中..."
npm run migrate

echo "シードデータを投入中..."
npm run seed

echo "サーバを起動中..."
npm run dev