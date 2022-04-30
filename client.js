import fetch from "node-fetch";

const graphqlHost = 'http://localhost:4000/graphql';

//查詢
fetch(graphqlHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ cannotBeNull, canBeNull, hello, foo, count, user {name, hobbies, scores { name, score }}, articles {title}, article(id:\"2\") { title, body } }"})
})
.then(r => r.json())
.then(data => {
    console.log("查詢成功");
    console.log(data);
    console.log('data returned:', data.data.user.hobbies);
    console.log('data returned:', data.data.user.scores);
});

//新增
fetch(graphqlHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "mutation {createArticle(article: {title: \"hello\", body: \"world\"}){id, title, body}}"})
})
.then(r => r.json())
.then(data => {
    console.log("新增成功");
    console.log(data);
});


//更新
fetch(graphqlHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "mutation {updateArticle(id: 2, UpdateArticleInput: {title: \"hihihihihi\", body: \"hohohohoho\"}){id, title, body}}"})
})
.then(r => r.json())
.then(data => {
    console.log("更新成功");
    console.log(data);
});

//刪除
fetch(graphqlHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "mutation {deleteArticle(id: 3){success}}"})
})
.then(r => r.json())
.then(data => {
    console.log("刪除成功");
    console.log(data);
});

//查詢
fetch(graphqlHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ articles {id, title, body}}"})
})
.then(r => r.json())
.then(data => {
    console.log("查詢成功");
    console.log(data.data);
});