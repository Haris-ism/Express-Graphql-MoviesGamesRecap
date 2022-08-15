const Games = require('../model/gamesSchema')
const Movies = require('../model/moviesSchema')
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isJWT = require('../middleware/jwt')
module.exports = {
    createUser: async ({ userInput }, req) => {
        let user = await User.findOne({ email: userInput.email });
        if (user) {
            const error = new Error('Email Already Exists.');
            error.code = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12)
        user = new User({
            email: userInput.email,
            password: hashedPassword
        })
        try {
            await user.save()
        }
        catch (err) {
            throw err
        }
        return user
    },
    login: async function ({ email, password }) {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            'cryptoToTheMoon',
            { expiresIn: '12h' }
        );
        const response = {
            token: token,
            userId: user._id.toString(),
            user: user.email
        };
        return response
    },
    changePassword: async function ({ email, password, confirmPassword }, req) {
        isJWT(req)
        let response;
        if (password !== confirmPassword) {
            const error = new Error('Password Do Not Match.');
            error.code = 401;
            throw error;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            user.password = hashedPassword
            response = await user.save()
        }
        catch (err) {
            throw err;
        }
        return response
    },
    fetchGames: async (req) => {
        let getData;
        try {
            getData = await Games.find()
        }
        catch (err) {
            throw err
        }
        return getData
    },
    fetchOneGame: async ({ id }, req) => {
        let product;
        try {
            product = await Games.findById(id)
        }
        catch (err) {
            throw err
        }
        return product
    },
    fetchOneMovie: async ({ id }, req) => {
        let product;
        try {
            product = await Movies.findById(id)
        }
        catch (err) {
            throw err
        }
        return product
    },
    createGames: async ({ inputGames }, req) => {
        isJWT(req)
        const product = new Games(inputGames)
        try {
            await product.save()
        }
        catch (err) {
            throw err
        }
        return product
    },
    deleteGames: async ({ id }, req) => {
        isJWT(req)
        const product = await Games.findById(id)
        if (!product) {
            const error = new Error('id not found')
            error.code = 401;
            throw error;
        }
        try {
            const result = await Games.deleteOne({ _id: id })
        }
        catch (err) {
            throw err
        }
        return product
    },
    editGames: async ({ id, inputGames }, req) => {
        isJWT(req)
        let product = await Games.findById(id)
        if (!product) {
            const error = new Error('id not found')
            error.code = 401;
            throw error;
        }
        product.name = inputGames.name
        product.genre = inputGames.genre
        product.image_url = inputGames.image_url
        product.singlePlayer = inputGames.singlePlayer
        product.multiPlayer = inputGames.multiPlayer
        product.platform = inputGames.platform
        product.release = inputGames.release
        try {
            product.save()
        }
        catch (err) {
            throw err
        }
        return product
    },

    fetchMovies: async (req, res, next) => {
        let getData;
        try {
            getData = await Movies.find()
        }
        catch (err) {
            throw err
        }
        return getData
    },
    createMovies: async ({ inputMovies }, req) => {
        isJWT(req)
        const product = new Movies(inputMovies)
        try {
            await product.save()
        }
        catch (err) {
            throw err
        }
        return product
    },
    deleteMovies: async ({ id }, req) => {
        isJWT(req)
        const product = await Movies.findById(id)
        if (!product) {
            const error = new Error('id not found')
            error.code = 401;
            throw error;
        }
        try {
            const result = await Movies.deleteOne({ _id: id })
        }
        catch (err) {
            throw err
        }
        return product
    },
    editMovies: async ({ id, inputMovies }, req) => {
        isJWT(req)
        let product = await Movies.findById(id)
        if (!product) {
            const error = new Error('id not found')
            error.code = 401;
            throw error;
        }
        product.title = inputMovies.title
        product.rating = inputMovies.rating
        product.image_url = inputMovies.image_url
        product.genre = inputMovies.genre
        product.duration = inputMovies.duration
        product.year = inputMovies.year
        product.review = inputMovies.review
        product.description = inputMovies.description
        try {
            product.save()
        }
        catch (err) {
            throw err
        }
        return product
    }
}