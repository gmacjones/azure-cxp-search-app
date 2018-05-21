import React from 'react';
import ReactDOM from 'react-dom';
import GifModal from './GifModal';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import './index.css';
import logo from './Azure-logo.png';


//creating an App component that will serve as the parent
// for the rest of our application.
class App extends React.Component {

    constructor(){
        super();

        this.state = {
            gifs: [],

            selectedGif: null,
            modalIsOpen: false

        };
    }
        //this.handleTermChange = this.handleTermChange.bind(this);}


        //methods to open and close our modal for us
        openModal(gif) {
            this.setState({
                modalIsOpen: true,
                selectedGif: gif
            });
        }
    
        closeModal() {
            this.setState({
                modalIsOpen: false,
                selectedGif: null
            });
        }
    
    handleTermChange(term){
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
       // const url = 'https://api.github.com/search/repositories?q=${term.replace(/\s/g, '+')}';

        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data })
        });   
    
    }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Azure CXP Search</h1>
        </header>
        {/*
        - setting a new property called onTermChange  
        -using the onTermChange property to pass the handleTermChange()
         callback from our App to SearchBar.
        */}
                <SearchBar onTermChange={term => this.handleTermChange(term)}/>

                <GifList  gifs={this.state.gifs}
                  onGifSelect={selectedGif => this.openModal(selectedGif) } /> 

                 <GifModal modalIsOpen={this.state.modalIsOpen}
                          selectedGif={this.state.selectedGif}
                          onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));


