import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(props){
    super(props);

    this.state={
      profiles:[]
    }
  }

  componentDidMount(){
    this.retrieveProfiles();
  }

  retrieveProfiles(){
    axios.get("http://localhost:8000/profiles").then(res =>{
      if(res.data.success){
        this.setState({
          profiles:res.data.existingProfiles
        });       
      };

    });
  }

  onDelete =(id)=>{
  
    axios.delete(`http://localhost:8000/profile/delete/${id}`).then((res) =>{
    
      alert("Deleted Successfully");
    
      this.retrieveProfiles();
    })
    
  }

  render() {
    return (
      <div>
        {this.state.profiles.map(profiles => (
          <div className="container">
            
            <p>All Profile</p>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">FName</th>
                  <th scope="col">LName</th>
                  <th scope="col">UName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.profiles.map((profiles,index) => (
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <a href={`/profile/${profiles._id}`} style={{textDecoration:'none'}}>
                            {profiles.fName}
                        </a>
                    </td>
                    <td>{profiles.lName}</td>
                    <td>{profiles.uName}</td>
                    <td>{profiles.email}</td>
                    <td>{profiles.password}</td>                    
                    <td>
                        <a className="btn btn-warning" href={`/edit/${profiles._id}`}>
                            <i className="fas fa-edit"></i>&nbsp;Edit                        
                        </a>
                      &nbsp;
                        <a className="btn btn-danger" href="/#" onClick={() =>this.onDelete(profiles._id)}>
                            <i className="far fa-trash-alt"></i>&nbsp;Delete                        
                        </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  

            <button className="btn btn-success"><a href="/add" style={{textDecoration:'none', color:'white'}}>Create New Profile</a></button>
            <button className="btn btn-success"><a href="/login" style={{textDecoration:'none', color:'white'}}>Login</a></button>                 

          </div>
        ))}          
      </div>
    );
  }
  
}
export default Home;