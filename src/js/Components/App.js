import React, { Component } from 'react';
import '../../css/App.css';
import Single_Person from './Single_Person.react'
import {Button} from 'react-bootstrap'


export default class App extends Component {

	constructor(props) {
        super(props);
        this.state = {
            users:[],
            page:1,
            error:null,
            loading : false,
            query:"",
            filter:"",
            filtered_char:[],
            
        }
    }

    componentDidMount() {
        
        this.fetch(this.state.page)

       }
       
   async fetch(page){

        console.log(page)

      await  fetch("https://api.github.com/users?since="+page)
        .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
        

        },(error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        
    }

    componentWillUnmount() {
        
    }

    
    list_users (users){
        
       return users.map((user,key) =>
        //  console.log(user.id)
                    // <li className="item">{user.login}</li>
                    <Single_Person key={key} login= {user.login} image={user.avatar_url} id={user.id}/>
                );

             
        
    }

    onQueryChange (e) {
    
        const query = e.target.value;
        this.setState({ 
          query:query,
           error: "" 
          })
         
        //this.setState({ query, error: "" });
      }

    getUser(){
           

            this.setState({ 
                filter: this.state.query,
                 error: "" 
                })

            const filteredCharacters =  this.state.users.filter((character) =>{
                return(
                     character.login.includes(this.state.query)
                        
                    )
                
            })

        this.setState({
            filtered_char : filteredCharacters
        })

    }

  async  moveForward(){

        let inc = this.state.page+1

      await  this.setState({
            page: inc ,
            
        })

        
      return  this.fetch(this.state.page)
    }

    async  moveBackward(){

        let dec = this.state.page-1

      await  this.setState({
            page: dec ,
            
        })

      return  this.fetch(this.state.page)
    }
    
    

    render() {

    	

        return (
            <div className="App">
            	<div id='search-bar'>
            <input type="text" placeholder='Enter UserName' onChange={this.onQueryChange.bind(this)}
     />
            <button className='searchButton' onClick={this.getUser.bind(this)}>
              <i className="fas fa-search"></i>
            </button>
          </div>

        { this.state.page > 1  ?
        <div>
            <Button onClick={this.moveForward.bind(this)} variant="outline-primary">Next</Button>
            <Button onClick={this.moveBackward.bind(this)} variant="outline-primary">Previous</Button>
        </div>:
    <Button onClick={this.moveForward.bind(this)} variant="outline-primary">Next</Button>
    }

          {this.state.filter.length ? 

                    <div >
                    {/* <p>{this.getUser.bind(this)}</p> */}
          <p>{this.list_users(this.state.filtered_char)}</p>
                    </div>
                   :

                   <div className="all_users">
                 <p>{this.list_users(this.state.users)}</p>
          </div> 
                
            }

            
            
                    
        
        

                {/*  */}
            </div>
        );
    }
}
