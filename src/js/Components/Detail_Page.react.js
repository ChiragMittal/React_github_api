import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../css/App.css';
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
          <Row className="show-grid">
            <Col md={3} className="text-center profile_part">

             <img src={this.state.single.avatar_url} />
             <p>{this.state.single.name}</p>

             <div className="flux-count">
                    <Col md={4}>
                    <p className="follow">FOLLOWERS</p>
                <p>{this.state.single.followers}</p>    
                    </Col>
                    <Col md={4} mdOffset={4}>
                    <p className="following">FOLLOWING</p>
                    <p>{this.state.single.following}</p>
                    </Col>
                    <Col md={4} mdOffset={4}>
                    <p className="favourites">REPOSITORIES</p>
                    <p>{this.state.single.public_repos}</p>
                    </Col>

             </div>

            </Col>

            <Col md={5} mdOffset={4}>
              <Followers  login={this.props.match.params.id}/>
            </Col>


          </Row>
        </Grid>
    
    
          </div>
        );
      }


}