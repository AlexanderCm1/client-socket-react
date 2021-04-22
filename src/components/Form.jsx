import React, { Component } from 'react';

class Form extends Component {
    state = {
        loading: false,
        error: null,
        username : '',
        email: '',
        password: ''
    }
    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async e =>{
        e.preventDefault();
        this.setState({ loading : true, error:null});



        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    "username": this.state.username,
                    "email": this.state.email,
                    "password": this.state.password
                }),
                headers: {"content-type": "application/json"}
                
            }

            const response = await fetch("http://localhost:4000/users",options);
            const data = await response.json();
            console.log(data);
            if(!response.ok){
                this.setState({
                    loading:false,
                    error: data.error
                })
            }

            this.setState({ loading : false})
        }catch(e){
            this.setState({ loading: false, error: e})
        }
        


        console.log(this.state);
    }




    render() {
        if (this.state.loading){
            return 'Loading...';
        }

        return (
            <>
                <form className="flex flex-col flex-wrap" onSubmit={this.handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input name="username" type="text" className="w-72 self-center  border border-purple-500" 
                    onChange={this.handleChange}
                    value={this.state.username}/>
                    <label htmlFor="">Email</label>
                    <input name="email" type="text"  className="w-72 self-center border border-purple-500"
                    onChange={this.handleChange}
                    value={this.state.email}/>
                    <label htmlFor="">Password</label>
                    <input name="password" type="password"  className="w-72 self-center border border-purple-500" 
                    onChange={this.handleChange}
                    value={this.state.password}/>


                    <input type="submit" className="w-72 self-center my-3 bg-red-300 cursor-pointer"/>
                    {this.state.error &&(
                        <p>{this.state.error.message || this.state.error}</p>
                    )}
                </form>

                
            </>
        )
    }
};

export default Form;
