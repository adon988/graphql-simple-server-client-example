### Description:

A simple example about GraphQL server and client .

### Getting Started

Install project with yarn

```cmd
yarn install
```

#### Start graphql server

```cmd
node app.js
```


#### Start client

Following are excute client CRUD:

```cmd
node client.js
```

#### Open browser - GraphQL IDE

After server is running, you can access GraphQL IDE on following link:

http://localhost:4000/graphql

Following are CRUD commands:

Query:

```graphql
query {
  foo
  hello
  count
  user {
    name
    age
    hobbies
    scores {
      name
      score
    }
  }
  articles {
    title
    body
    id
  }
  article(id:"2") {
    title
    body
    id
  }
}

```

Create data: 
```graphql
mutation {
  createArticle(article: {title: "aa", body:"bb"}) {
    title
    body
    id
  }
}
```

Update data: 
```graphql
mutation updateArticle {
  updateArticle(id: 2, UpdateArticleInput:{title:"i updated", body:"gogo"}){
    title
    body
  }
}
```

Delete data:
```graphql
mutation deleteArticle {
  deleteArticle(id: 1) {
    success
  }
}
```