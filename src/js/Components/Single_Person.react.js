import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../css/App.css';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Single_Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render () {

       // console.log(this.props.id)
        
        return (
          <div className="person-info">
            <img src={this.props.image} />
             <Link to={`/users/${this.props.login}`} >{this.props.login} </Link> 
        
            {/* <h3 className="username">{this.props.username} </h3> */}
            
    
    
    
          </div>
        );
      }


}