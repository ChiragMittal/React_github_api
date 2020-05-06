import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"

export default class Followers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            error:null,
            hasMore: true,
            loading:true ,
            nextDataPage : 2
        }
    }

    componentDidMount() {

        fetch("https://api.github.com/users/"+this.props.login+"/followers")
        .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            data: result
          });
        console.log(this.state.data)

        },(error) => {
            this.setState({

              error
            });
          }
        )
        
    }

    list_followers(followers){
        console.log(followers)
        return followers.map(user =>
           
                <div className="item" style={{
                    padding: "5px",
    zIndex: "-2",
    boxSizing: "border-box",
    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.08)",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    marginLeft: "0",
                    
                    }}>

                    <img style=
                    {{width: "55px",
                        height: "55px", borderRadius:"50%"
                        }} 
    className='user-data-img' src={user.avatar_url} alt="" />
                    <h3><a className='user-data-login'
                    
                    style={{marginLeft: "12px",
                        color: "black",
                        textDecoration: "none"}}
                    
                    href={user.html_url}>{user.login}</a></h3>

                </div>
                     
                 );    
         
     }

    fetchMoreData = () => {
        if (this.state.hasMore === true) {
            let num = this.state.nextDataPage;
            console.log(num)
            setTimeout(() => {
                fetch("https://api.github.com/users/"+this.props.login+"/followers?page="+num)
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
                    })
            }, 500);
        }
    }

    

    render(){
        
        return(
            <div className='user-data-grid'>
                <InfiniteScroll
                    dataLength={this.state.data.length}
                    next={this.fetchMoreData.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <h2>Followers of {this.props.login}</h2>
                        <div className="data-wrapper">
                             <p>{this.list_followers(this.state.data)}</p>
                        </div>
                    
                </InfiniteScroll>
            </div>
        )
    }

}