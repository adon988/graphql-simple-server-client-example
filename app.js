import { graphql, buildSchema } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

const app = express();
app.use(cors());

// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
    type Score {
        name: String
        score: Float
    }
    type User {
        name: String
        age: Int
        hobbies: [String!]! #加上! 表示不能為 null，這裏表是陣列不能為空，裡面元素也不能為空
        scores: [Score]
    }
    type Article {
        id: ID!
        title: String!
        body: String!
        tagList: [String!]
    }
    # 查詢入口點
    type Query {
        cannotBeNull: String! #加上 ! 表示必需返回值，不能為空
        canBeNull: String
        hello: String
        foo: String
        count: Int
        user: User
        articles: [Article]
        article(id: ID!): Article #查詢單筆數據 by ID
    }

    # 參數對象，必須使用 Input 定義
    input CreateArticleInput {
        title: String!
        body: String!
    }
    input UpdateArticleInput {
        title: String!
        body: String!
    }

    type DeleteionStatus {
        success: Boolean!
    }
    # 新增修改入口點
    type Mutation {
        createArticle(article: CreateArticleInput): Article
        updateArticle(id: ID!, UpdateArticleInput: UpdateArticleInput): Article
        deleteArticle(id: ID!): DeleteionStatus
    }
`);

// The rootValue provides a resolver function for each API endpoint
const articles = [{
    id: '1',
    title: '文學作者',
    body: '擁有十年科學奇幻小說經驗'
}, {
    id: '2',
    title: 'title2', 
    body: 'body2'
}, {
    id: '3',
    title: 'title3', 
    body: 'body3'
}, {
    id: '4',
    title: 'title4', 
    body: 'body4'
}
];
var rootValue = {
    cannotBeNull() { 
        return "cannot be null"; 
    },
    hello() {
        return 'Hello world asdfasdf!';
    },
    foo() {
        return 'bar';
    },
    count() {
        return 1;
    },
    user() {
        return {
                name: 'Adam',
                age: 38,
                hobbies: ['basketball', 'watch movie'],
                scores: [{name:"English", score: 73}, {name:"Chinese", score: 83}]
        }
    },
    articles() {
        return articles 
    },
    article ({id}) {
        return articles.find(article => article.id === id);
    },
    createArticle({article}) {
        article.id = uuidv4();
        articles.push(article);
        return article;
    },
    updateArticle({id, UpdateArticleInput: UpdateArticleInput}) {
        const article = articles.find(article => article.id === id);
        article.title = UpdateArticleInput.title;
        article.body = UpdateArticleInput.body;
        return article;
    },
    deleteArticle({id}) {
        const index = articles.findIndex(article => article.id === id);
        console.log(index);
        articles.splice(index, 1);
        console.log(articles);
        return {
            success: true
        }
    }
};

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{ hello, foo, count }',
//   rootValue
// }).then((response) => {
//   console.log(response);
// });

app.use('/graphql', graphqlHTTP({
   schema,
   rootValue,
   graphiql: true //set browser enable Graphql IDE 
}));

app.listen(4000);
console.log("GraphQL server running in localhost:4000");