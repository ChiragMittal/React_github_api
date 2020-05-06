import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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

        
            <div className="card person-info col-sm-6 col-md-8 col-lg-3" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                width: "20%",display:"flex" , margin:"auto"}}>
               <img src={this.props.image}  style={{width:"50%"}}/>
                <div class="container" style={{padding: "2px 16px"}}>
                    <Link to={`/users/${this.props.login}`} ><b style={{marginTop:"20px",display:"flex"}}>{this.props.login} </b></Link> 
            
                </div>
            </div>
       
          
        );
      }


}