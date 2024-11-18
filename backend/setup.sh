#!/bin/bash

echo "DB接続実行中..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
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
npm run migrate || { echo "マイグレーション失敗"; exit 1; }

echo "シードデータを投入中..."
npm run seed

echo "サーバを起動中..."
npm run dev