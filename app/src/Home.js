import React, { Component } from "react";

import AppNav from "./AppNav";
import { Form, Button, FormGroup, Container, Label } from "reactstrap";
import "antd/dist/antd.css";
import { Table, Input, Icon } from "antd";
import { withRouter } from "react-router-dom";
import Highlighter from "react-highlight-words";

class Home extends Component {

  emptyList = {
    item_id: null,
    name: "",
    created_date: new Date(),
    user: { user_id: 0 }
  };

  emptyItem = {
    item_id: null,
    name: "",
    description: "",
    status: false,
    deadline: null,
    created_date: null,
    list: { list_id: 0 }
  };


  constructor(props) {
    super(props);
    console.log(localStorage.getItem("userId"));
    this.emptyList.user.user_id = localStorage.getItem("userId");
    this.state = {
      lists: [],
      items: [],
      selectedValue: "0",
      item: this.emptyList,
      selectedEmptyItem: this.emptyItem,
      isLoading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  logout() {
    localStorage.clear();
    this.props.history.push({ pathname: "/" });
  }

  update(id) {
    if (id != null && id > 0) {
      fetch(`api/item/${id}`)
        .then(response => response.json())
        .then(body => {
          this.setState({ items: body, selectedValue: id });
        });
    }
  }

  async handleSelectedChange(event) {
    if (event != null) {
      const id = event.target.value;
      this.update(id);
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    const item = this.state.item;
    if (item.name !== "") {
      await fetch(`/api/list`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      event.peventDefault();
      window.location.reload();
    } else {
      alert("Please add a Name");
    }
  }

  async removeList(id) {
    if (id > 0) {
      await fetch(`/api/list/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(() => {
        let uptatedItems = [...this.state.items].filter(i => i.item_id !== id);
        this.setState({ items: uptatedItems });
      });
      window.location.reload();
    }
  }

  async remove(id) {
    if (id > 0) {
      await fetch(`/api/item/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) alert("Item Deleted !");
        })
        .then(() => {
          let uptatedItems = [...this.state.items].filter(
            i => i.item_id !== id
          );
          this.setState({ items: uptatedItems });
        });
    } else {
      alert("Please select a item !");
    }
  }

  async changeStatus(event) {
    const item = this.state.selectedEmptyItem;
    if (item.item_id > 0) {
      await fetch(`/api/item`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }).then(e => {
        this.update(this.state.selectedValue);
      });
    } else {
      alert("Please select a item !");
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };


  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };


  async componentDidMount() {
    if (localStorage.getItem("userId") == null) {
      this.props.history.push({ pathname: "/" });
    } else {
      const id = localStorage.getItem("userId");
      const response = await fetch(`/api/list/${id}`);
      const body = await response.json();

      console.log(body);
      this.setState({ lists: body, isLoading: false });
      console.log(body);
    }
  }

  
  render() {
    const title = <h3>Lists</h3>;
    const { lists, isLoading } = this.state;

    if (isLoading) return <div>Loading ...</div>;

    let optionList = lists.map(list => (
      <option value={list.list_id} key={list.list_id}>
        {list.name}
      </option>
    ));

    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        const selectedEmptyItem = this.state.selectedEmptyItem;
        selectedEmptyItem.item_id = selectedRows[0].item_id;
        selectedEmptyItem.name = selectedRows[0].name;
        selectedEmptyItem.description = selectedRows[0].description;
        selectedEmptyItem.created_date = selectedRows[0].created_date;
        selectedEmptyItem.deadline = selectedRows[0].deadline;
        selectedEmptyItem.status = selectedRows[0].status;
        selectedEmptyItem.list.list_id = selectedRows[0].list.list_id;

        this.setState({ selectedEmptyItem: this.state.selectedEmptyItem });
      }
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        sorter: (a, b) => a.name.length - b.name.length,
        ...this.getColumnSearchProps("name")
      },
      {
        title: "description",
        dataIndex: "description",
        key: "description",
        width: "20%",
        ...this.getColumnSearchProps("description")
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status - b.status,
        ...this.getColumnSearchProps("status")
      },
      {
        title: "created_date",
        dataIndex: "created_date",
        key: "created_date",
        sorter: (a, b) => a.created_date - b.created_date,
        ...this.getColumnSearchProps("created_date")
      },
      {
        title: "deadline",
        dataIndex: "deadline",
        key: "deadline",
        sorter: (a, b) => a.deadline.Date - b.deadline.Date,
        ...this.getColumnSearchProps("deadline")
      }
    ];

    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Type a List Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Add List
              </Button>
              <Button color="danger" onClick={() => this.logout()}>
                Logout
              </Button>
            </FormGroup>
          </Form>

          <Container>
            <Label for="list">List :</Label>
            <select
              value={this.state.selectedValue}
              onChange={this.handleSelectedChange}
            >
              <option value="0" key="0">
                Select a List
              </option>
              {optionList}
            </select>{" "}
            <Container>
              <Button
                color="danger"
                onClick={() => this.removeList(this.state.selectedValue)}
              >
                Delete Selected List
              </Button>
            </Container>
          </Container>
        </Container>{" "}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.items}
        />
        <Container>
          <Button color="success" onClick={() => this.changeStatus()}>
            Completed
          </Button>
          <Button
            color="danger"
            onClick={() => this.remove(this.state.selectedEmptyItem.item_id)}
          >
            {" "}
            Delete !
          </Button>
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);
