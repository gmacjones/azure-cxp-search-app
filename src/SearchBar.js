import React from 'react'

class SearchBar extends React.Component {

    constructor() {
        //Calling super() within that method lets us access this.state within the constructor
        super();
        //initializing state and settinit to an empty string
        this.state = { term: ''}
    }

    //will be fired every time the input is changed
    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }
    render() {
        return (
            <div className="search">

                {/*  onChange property automatically fires, everytime the user's input is updated*/}
                <input
                    type="text"
                    placeholder="Type a keyword to search" 
                    onChange={event => this.onInputChange(event.target.value)} />
                
            </div>

        );
    }
}

// makes our SearchBar available to import by other pieces of our application
//The default means that this module is only exporting one value which ia the SearchBar class.
export default SearchBar;