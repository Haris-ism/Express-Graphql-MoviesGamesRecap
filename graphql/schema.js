const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
    }
    type Auth{
        token:String!
        userId:String!
        user:String!
    }
    type games{
        name:String!
        genre:String!
        image_url:String!
        singlePlayer:Boolean!
        multiPlayer:Boolean!
        platform:String!
        release:Int!
        _id:ID!
        createdAt:String!
        updatedAt:String!
    }
    type movies{
        title:String!
        rating:Int!
        image_url:String!
        genre:String!
        duration:Int!
        year:Int!
        review:String!
        description:String!
        _id:ID!
        createdAt:String!
        updatedAt:String!
    }
    input gamesInput{
        name:String!
        genre:String!
        image_url:String!
        singlePlayer:Boolean!
        multiPlayer:Boolean!
        platform:String!
        release:Int!
    }
    input moviesInput{
        title:String!
        rating:Int!
        image_url:String!
        genre:String!
        duration:Int!
        year:Int!
        review:String!
        description:String!
    }
    input UserInputData {
        email: String!
        password: String!
    }
    type rootQuery{
        fetchGames:[games]!
        fetchMovies:[movies]!
        fetchOneGame(id:ID!):games!
        fetchOneMovie(id:ID!):movies!
        login(email:String!,password:String!):Auth!
    }
    type rootMutation{
        createGames(inputGames:gamesInput):games!
        deleteGames(id:ID!):games!
        editGames(id:ID!,inputGames:gamesInput):games!
        createMovies(inputMovies:moviesInput):movies!
        deleteMovies(id:ID!):movies!
        editMovies(id:ID!,inputMovies:moviesInput):movies!
        createUser(userInput: UserInputData): User!
        changePassword(email:String!,password:String!,confirmPassword:String!):User!
    }
    schema{
        query:rootQuery
        mutation:rootMutation
    }
`)