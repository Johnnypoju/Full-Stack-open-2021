import { gql } from "@apollo/client";

const BOOK_DETAILS = gql `
    fragment BookDetails on Book {
        title
        published
        id
        author {
            name
            born
            bookCount
            id
        }
        genres
    }
`

export const ALL_AUTHORS = gql `
query {
    allAuthors {
        name
        born
        bookCount
        id
    }
}
`

export const ALL_BOOKS = gql `
    query Books($genre: String){
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ADD_BOOK = gql `
    mutation bookAddition($title: String!, $author: String!, $published: String,  $genres: [String]) {
        addBook
        (
            title: $title, 
            author: $author, 
            published: $published,  
            genres: $genres){
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const BOOK_ADDED = gql `
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql `
    mutation authorEdit($name: String!, $born: String!){
        editAuthor(
            name: $name,
            born: $born
        ){
            name
            born
        }
    }

`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password){
            value
        }
    }
`

export const ME = gql `
    query {
        me {
            favouriteGenre
        }
    }
`