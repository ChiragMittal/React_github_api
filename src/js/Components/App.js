import React, { Component } from 'react';
import '../../css/App.css';
import Single_Person from './Single_Person.react'


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
            filtered_char:[]
        }
    }

    componentDidMount() {

        //console.log(this.state.page)

        fetch("https://api.github.com/users?since="+this.state.page)
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
