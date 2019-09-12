import React, { Component } from 'react';  

import {Container,Input,Button,Label,Form,FormGroup} from 'reactstrap'
class Register extends Component {


    emptyUser = {
        user_id:null,
        name:'',
        surname: '',
        created_date :new Date(),
        email:'',
        password:''

    }
    
    constructor(props){
        super(props)
        this.state={
            item:this.emptyUser,

        };
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit()
    {
        const item=this.state.item;
        if(item.name !== '' && item.surname !=='' && item.email !== '' && item.password !==''){
        const response = await fetch(`/api/user/${item.email}`)
        .then(response => response.json()).then(userId=>{
            if(userId === 0){
                
                fetch(`/api/user`,{
                    method :'POST',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body :JSON.stringify(item),
                  
                });

                this.props.history.push({pathname: '/'});
            }else{
                alert("Email already taken !");
            }
        });
    } else{
        alert("Please fill in fields")
    }
}
    
    render() { 
        return ( 
            <div>
            <Container>
                        <Form >
                            <FormGroup>

                            <Label for="name">Name</Label>
                            <Input type="name" name="name" id="name" onChange={this.handleChange}/>

                            </FormGroup>

                            <FormGroup>
                                <Label for="surname">Surname</Label>
                                <Input type="surname" name="surname" id="surname" onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input type="email" name="email" id="email" onChange={this.handleChange}/>

                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" onClick={() => this.handleSubmit()}>Save</Button>{' '}
                            </FormGroup>

                        </Form>
                </Container>
            </div>
         );
    }
}
 
export default  (Register);