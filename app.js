require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')
const mongoose = require('mongoose')
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    if (req.method === 'OPTIONS') return res.status(200).json({ message: "OK" })
    next()
})
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code };
    }
}))
app.use((req, res, next) => {
    res.json({ message: "invalid action" })
})
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("starting server on the best port")
    app.listen(process.env.PORT)
})