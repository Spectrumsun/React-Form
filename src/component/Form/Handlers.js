import React, { Component } from "react";

class Handlers extends Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    empty: {},
    disableSubmit: true,
    inputValues: {}
  };

  handleInputChange = (e, myArray) => {
    const { name, value } = e.target;
    e.persist();
    if (name.split("-")[1]) {
      const inputName = name.split("-")[0];
      const id = name.split("-")[1];
      let newArray = [...this.state.values[myArray]];
      newArray[id][inputName] = value;
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [myArray]: newArray,
        },
        inputValues: {
          ...prevState.inputValues,
          [name]: value
        }
      }),this.canSubmit());
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name]: value
        },
        inputValues: {
          ...prevState.inputValues,
          [name]: value
        }
      }), this.canSubmit());
    }
  };

  canSubmit = () => {
   const { empty } = this.state; 
    const isDisabled = Object.keys(empty).some(x => empty[x]);
    console.log(isDisabled, 'isDisabled')
    this.setState({ disableSubmit: !isDisabled })
  }

  handleBlur = e => {
    const { name } = e.target;
    e.persist();
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true
      },
      empty: {
        ...prevState.empty,
        [name]: this.state.inputValues[name] === undefined || this.state.inputValues[name].length === 0 ? true : false,
      },
    }),this.canSubmit());
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.values);
    console.log(this.state)
  };

  addForm = (more, myArray) => {
    let { values } = this.state;
   const getDefaultTripStateValues =  ({
      [`friend-${0}`]: '',
      [`email-${0}`]: '',
      [`number-${0}`]: '',
      [`location-${0}`]: '',
    })
    this.setState(prevState => ({
      values: {
        ...values,
        [myArray]: [...prevState.values[myArray], more],
      }, inputValues: {
        ...prevState.inputValues,
        ...getDefaultTripStateValues
      }
    }));
  };

  removeForm = (index, value) => {
    const removeForm = this.state.values[value].filter((_, id) => id !== index);
    
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [value]: removeForm
      }
    }));
    console.log(removeForm);
  };


 shouldMarkError = field => {
    const errors = this.state.empty;
    const hasError = errors[field];
    const shouldShow = this.state.touched;
    return hasError ? shouldShow : false;
  };


  render() {
    return this.props.children({
      ...this.state,
      handleInputChange: this.handleInputChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit,
      addForm: this.addForm,
      removeForm: this.removeForm,
      shouldMarkError: this.shouldMarkError
    });
  }
}

export default Handlers;
