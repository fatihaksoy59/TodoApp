import React, { Component } from "react";

import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Input, Button, Label, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

class AddItem extends Component {

  emptyItem = {
    item_id: null,
    name: "",
    description: "",
    status: false,
    deadline: new Date(),
    created_date: new Date(),
    list: { list_id: 21 }
  };


  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: this.emptyItem,
      selectedValue: 21,
      lists: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }


  async handleSubmit(event) {
    const item = this.state.item;
    console.log(item.deadline);
    item.list.list_id = this.state.selectedValue;
    if (item.name !== "" && item.description !== "") {
      await fetch(`/api/item`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      alert("Item added !");
      window.location.reload();
    } else {
      alert("Please fill in fields");
    }
  }


  handleSelectedChange(event) {
    this.setState({ selectedValue: event.target.value });
    let item = { ...this.state.item };
    this.setState({ item });
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }


  handleDateChange(date) {
    let item = { ...this.state.item };
    item.deadline = date;
    this.setState({ item });
  }

  async componentDidMount() {
    if (localStorage.getItem("userId") == null) {
      this.props.history.push({ pathname: "/" });
    } else {
      const id = localStorage.getItem("userId");
      const response = await fetch(`/api/list/${id}`);
      const body = await response.json();
      this.setState({ lists: body });
      if (body.length > 0) this.setState({ selectedValue: body[0].list_id });
    }
  }

  
  render() {
    const title = <h3>Add Item</h3>;
    const { lists } = this.state;

    let optionList = lists.map(list => (
      <option value={list.list_id} key={list.list_id}>
        {list.name}
      </option>
    ));

    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form>
            <FormGroup>
              <Label for="name">Item Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="description"
                name="description"
                id="description"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="list">List :</Label>
              <select onChange={this.handleSelectedChange}>{optionList}</select>
            </FormGroup>

            <FormGroup>
              <Label for="itemDate">Deadline :</Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={this.state.item.deadline}
                onChange={this.handleDateChange}
              />
            </FormGroup>

            <FormGroup>
              <Button color="primary" onClick={this.handleSubmit}>
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>{" "}
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddItem;
