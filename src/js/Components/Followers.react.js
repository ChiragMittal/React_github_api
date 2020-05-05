import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"

export default class Followers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            error:null,
            hasMore: true,
            loading:true
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
           
                       <li className="item" >{user.login}</li>
                     
                 );    
         
     }

    fetchMoreData = () => {
        if (this.state.hasMore === true) {
            let num = this.state.nextDataPage;
            setTimeout(() => {
                fetch("https://api.github.com/users/"+this.props.login+"/followers?page="+num)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.length > 0) {
                            this.setState((prevState) => ({
                                hasMore: true,
                                nextDataPage: num + 1,
                                data: prevState.data.concat(this.state.data)
                            }))
                        } else {
                            this.setState({
                                hasMore: false,
                                nextDataPage: 2,

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
                    
                        <div className="data-wrapper">
                             <p>{this.list_followers(this.state.data)}</p>
                        </div>
                    
                </InfiniteScroll>
            </div>
        )
    }

}