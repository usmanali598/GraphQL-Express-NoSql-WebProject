import React, { Component } from 'react';
//import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'


// const getAuthorsQuery = gql`
//     {
//         authors{
//             name
//             id
//         }
//     }
// `


class AddBook extends Component
{
    constructor( props )
    {
        super( props );
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }
    displayAuthors()
    {
        var data = this.props.getAuthorsQuery;
        if ( data.loading )
        {
            return ( <option disabled>Loading Authors..</option> )
        } else
        {
            return data.authors.map( author =>
            {
                return (
                    <option key={ author.id } value={ author.id }>{ author.name }</option>
                )
            } )
        }
    }
    submitFrom( e )
    {
        e.preventDefault()
        // console.log( this.state )
        this.props.addBookMutation( {
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [ { query: getBooksQuery } ]
        } )
    }
    render()
    {

        // console.log( this.props )
        return (
            <form id="add-book" onSubmit={ this.submitFrom.bind( this ) }>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ ( e ) => this.setState( { name: e.target.value } ) } />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ ( e ) => this.setState( { genre: e.target.value } ) } />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select type="text" onChange={ ( e ) => this.setState( { authorId: e.target.value } ) } >
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>

                    <button>+</button>

                </div>

            </form>
        );
    }
}

// export default graphql( getAuthorsQuery )( AddBook );
export default compose(
    graphql( getAuthorsQuery, { name: "getAuthorsQuery" } ),
    graphql( addBookMutation, { name: "addBookMutation" } )
)( AddBook );
