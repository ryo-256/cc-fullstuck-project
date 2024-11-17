# Tsundoku Mission

Tsundoku Mission は、楽しく積読本を消化することができるアプリです。


## 事前準備

Dockerがインストールされていることを確認してください。
- ` docker --version `

インストールされていない場合は、[こちら](https://docs.docker.com/get-docker/)からインストールしてください。


## セットアップ方法

以下の順でセットアップを行ってください。

1. リポジトリをクローンする
- ` git clone https://github.com/ryo-256/cc-fullstuck-project.git `
2. プロジェクトのディレクトリに移動する
- ` cd cc-fullstuck-project `
3. ディレクトリに docker-compose.yml が存在することを確認する
4. ディレクトリに .env ファイルを作成する
    **`.env` の例**:
    ```.env
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    ```
5. セットアップコマンドを実行する
- ` docker-compose up --build `
6. 下記にアクセスできることを確認する
- frontend: http://localhost:5173
- (backend: http://localhost:3000)
