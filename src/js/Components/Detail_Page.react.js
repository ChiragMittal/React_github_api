import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap';
import Followers from './Followers.react';

export default class Detail_Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            single:{},
            error:null
        }
    }

    componentDidMount() {

       

        fetch("https://api.github.com/users/"+this.props.match.params.id)
        .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            single: result
          });
       // console.log(result)

        },(error) => {
            this.setState({

              error
            });
          }
        )
        
    }

    render () {

        console.log(this.state.single)
        
        return (
          <div className="single_person-info">
             
          
          <Grid>
       
          <img  style=
                    {{width: "30%",
                        height: "30%", borderRadius:"50%",marginTop:"100px"
                        }} 
               
             src={this.state.single.avatar_url} />

            <p style={{fontSize:"40px",marginTop:"20px"}}>{this.state.single.name}</p>

          <Row className="show-grid" >
            <Col sm={3} className="text-center profile_part"  style = {{float:"right" , marginRight:"100px",marginTop:"-240px",fontSize:"20px",display:"flex"}}>

             
             
             

             <div className="flux-count" style={{display:"grid"}}>
                    <Col md={4} >
                    
                    <p className="follow"> FOLLOWERS</p>
                    <p>{this.state.single.followers}</p>   
               
                    </Col>
                    <Col md={4} mdOffset={4}>
                    <p className="following">FOLLOWING</p>
                    <p>{this.state.single.following}</p>
                    </Col>
                    <Col md={4} mdOffset={8}>
                    <p className="favourites">REPOSITORIES</p>
                    <p>{this.state.single.public_repos}</p>
                    </Col>

             </div>

            </Col>

            <Col sm={5} mdOffset={6}>
                <main>
              <Followers  login={this.props.match.params.id}/>
              </main>
            </Col>


          </Row>
        </Grid>
    
    
          </div>
        );
      }


}