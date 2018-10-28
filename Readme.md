# GraphQL練習

1. 用`nodejs`的`json server`當做後端`restful api`來試包練習
2. 用`nodejs`的`apollo server`練習`GraphQL`

## 參考資料

1. graphQL [apollo server](https://www.apollographql.com/docs/apollo-server/getting-started.html)
2. restful [json server](https://github.com/typicode/json-server)
3. httpClient [axios](https://github.com/axios/axios)

## 安裝nodejs

```bash
brew install node
```

## 安裝json-server

用`npm`安裝

```bash
npm install -g json-server
```

## 初始化專案

在本專案目錄執行

```bash
npm init --yes
```

## 安裝dependencies

在本專案目錄執行

```bash
npm install --save apollo-server graphql axios
```

## 啟動json-server

在本專案目錄執行
```bash
json-server db.json
```

啟動後`url`

```host
http://localhost:3000
```

## 啟動apollo server

在本專案目錄執行

```bash
node index.js
```

啟動後`url`

```host
http://localhost:4000
```

### 查詢data request

![query](/img/query.png)

```js
{
  posts{
    id
    title
    author
  }
  comments{
    id
    body
    postId
  }
  profile{
    name
  }
}
```

### 更新data request

![mutation](/img/mutation.png)

```js
mutation UpdateData($post:PostIn,$comment:CommentIn,$profileName:String){
  addPost(data:$post){
    id
    title
    author
  }
  addComment(data:$comment){
    id
    body
    postId
  }
  editProfile(name:$profileName){
   	name 
  } 
}
```

```json
{
  "post": {"title": "test","author": "leo"},
  "comment": {"body": "this is test comment."},
  "profileName": "TestGraphQL"
}
```