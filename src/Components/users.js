import React, { Component } from 'react'

/**
* @author: Mukesh P
* @class Users
**/

class Users extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      UserList: [],
      user: String,
      optionSelected: false,
      albums: [],
      photos: [],
      urls: []
    }

    this.handleChange = this.handleChange.bind(this);
   

  }

  componentDidMount() {

    /* fetching the data from all the urls */

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ UserList: data }))
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => this.setState({ albums: data }))
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => this.setState({ photos: data }))



  }

  
  handleChange(event) {
    let found=Number;
    this.setState({
      user: event.target.value,
      optionSelected: true
    })
    let urls = [];
    let albumsID = [];
    let photos1 = [];

    /* Get the album id's for Selected USER*/
   this.state.albums.map(x =>{
    if (x.userId == event.target.value) {
      
      albumsID.push(x.id)
    }

   })
  /* Get the urls of of Selected USER*/
   this.state.photos.map(x=>{

    if (albumsID.indexOf(x.albumId) != -1) {
      console.log(x.url)
      urls.push(x.url)
    }
   }
   )
  /*Updating the urls globally*/
   this.setState({
    urls:urls
  })

  }
  
  render() {

    return (
      
      <div class="App-header">
      <select id="user" onChange={this.handleChange} class="select-css">
          <option value="0"> Select a User </option>
        {this.state.UserList.map(x =>
          <option value={x.id}>{x.name}</option>

        )}
       
        </select>
      
        <div class="row">
        <p></p>
        <div class="col-sm-3">
         {
                this.state.urls.map(x =>
                
                    <img src={x}></img>
                
                )
         }
         </div>
        </div>


      </div>

    )
  }
}

export default Users