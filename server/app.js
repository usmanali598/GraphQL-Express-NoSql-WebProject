const express = require( 'express' );
const graphqlHTTP = require( 'express-graphql' );
const schema = require( './schema/schema' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

const app = express();

//alow cross-origin request
app.use( cors() )

//connection with mlab database
//make sure to replace your link and yourPassword, yourUserName with your actual username and password
mongoose.connect( 'mongodb://yourPassword:yourUserName:5923/gql-practice' );
mongoose.connection.once( 'open', () =>
{
    console.log( 'connected to database' );
} )

app.use( '/graphql', graphqlHTTP( {
    schema,
    graphiql: true
} ) );

app.listen( 4000, () => console.log( 'now listening request on 4000' ) )