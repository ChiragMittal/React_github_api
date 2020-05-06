import React, { Component } from 'react';

import Single_Person from './Single_Person.react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component"


export default class App extends Component {

	constructor(props) {
        super(props);
        this.state = {
            data:[],
            page:1,
            error:null,
            loading : false,
            query:"",
            filter:"",
            filtered_char:[],
            hasMore: true,
            loading:true ,
            nextDataPage : 2
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
            data: result
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
                    <div className="hello" >
                        <Single_Person key={key} login= {user.login} image={user.avatar_url} id={user.id}/>
                    </div>
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

            const filteredCharacters =  this.state.data.filter((character) =>{
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
    
    fetchMoreData = () => {
      if (this.state.hasMore === true) {
          let num = this.state.nextDataPage;
          console.log(num)
          setTimeout(() => {
              fetch("https://api.github.com/users?since="+num)
                  .then(response => response.json())
                  .then(data => {
                      
                      if (data.length > 0) {
                          this.setState((prevState) => ({
                              hasMore: true,
                              nextDataPage: num + 1,
                              data: prevState.data.concat(data)
                          }))
                      } else {
                          this.setState({
                              hasMore: false,
                              

                          })
                      }

                      let uniqueObject = {}; 
                      let newArray = []; 
                        this.state.data.map((datas, index) =>{
                          //console.log(datas['login'])
                       let objTitle = datas['login']
                        uniqueObject[objTitle] = datas
                        })

                        for (let i in uniqueObject) { 
                          newArray.push(uniqueObject[i]); 
                      } 

                      console.log(newArray)

                      this.setState({
                        data : newArray
                      })
                      
                  })
          }, 500);
      }
  }
    

    render() {

    	

        return (
            <div className="App">
            	<div id='search-bar' style={{textAlign:"center"}}>
            <input type="text" placeholder='Enter UserName' onChange={this.onQueryChange.bind(this)}  style={{
                height:"50px",borderRadius:"20px",outline:"none",width:"25%",marginTop:"20px"
            }}
     />
            <button className='searchButton' onClick={this.getUser.bind(this)} style={{height:"50px",background:"#ffeb3b",borderRadius:"20px",outline:"none",padding:"10px",marginBottom:"10px"}}>
              Search
            </button>
          </div>

          {this.state.filter.length ? 

                    <div style={{display: "grid"}}>
                    
                            <p>{this.list_users(this.state.filtered_char)}</p>
                    </div>
                   :
              <InfiniteScroll
                    dataLength={this.state.data.length}
                    next={this.fetchMoreData.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="all_users" >
                        <p>{this.list_users(this.state.data)}</p>
                    </div> 
            </InfiniteScroll>            
            }

{/* { this.state.page > 1  ?
        <div>
            <Button onClick={this.moveForward.bind(this)} variant="outline-primary" style={{float:"right",marginTop:"20px",marginBottom:"20px",textAlign:"center"}}>Next</Button>
            <Button onClick={this.moveBackward.bind(this)} variant="outline-primary" style={{float:"left",marginTop:"20px",marginBottom:"20px",textAlign:"center"}}>Previous</Button>
        </div>:
  <Button onClick={this.moveForward.bind(this)} variant="outline-primary"style={{float:"right",marginTop:"20px",marginBottom:"20px",textAlign:"center"}} >Next</Button>
    } */}

            </div>
        );
    }
}
