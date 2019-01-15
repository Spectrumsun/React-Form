import { Component } from "react";

class Handlers extends Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    empty: this.props.validateField || {},
    disableSubmit: true,
    inputValues: {},
    submissionCount: 0,
    index: 0
  };

  handleInputChange = (e, myArray) => {
    const { name, value } = e.target;
    e.persist();
    if (name.split("-")[1]) {
      const inputName = name.split("-")[0];
      const id = name.split("-")[1];
      let newArray = [...this.state.values[myArray]];
      newArray[id][inputName] = value;
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            [myArray]: newArray
          },
          inputValues: {
            ...prevState.inputValues,
            [name]: value
          }
        }),
        this.canSubmit()
      );
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            [name]: value
          },
          inputValues: {
            ...prevState.inputValues,
            [name]: value
          }
        }),
        this.canSubmit()
      );
    }
  };

  handleBlur = e => {
    const { name } = e.target;
    this.setState(
      prevState => ({
        touched: {
          ...prevState.touched,
          [name]: true
        },
        empty: {
          ...prevState.empty,
          [name]:
            this.state.inputValues[name] === undefined ||
            this.state.inputValues[name].length === 0
              ? true
              : false
        }
      }),
      this.canSubmit()
    );
  };

  canSubmit = () => {
    const { empty } = this.state;
    const keys = Object.keys(empty);
    const isDisabled = keys.map((x, y) => {
      const arr = empty[x] === '' || true ? true : null;
      return arr;
    });
    console.log(isDisabled)
    const checkArray = isDisabled.includes(true);
    console.log(checkArray)
    // if (checkArray === false) {
      this.setState({ disableSubmit: checkArray });
    // }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { submissionCount } = this.state;
    this.setState(
      {
        submissionCount: submissionCount + 1
      },
      () => {
        console.log(this.state, "submissionCount");
      },
      this.props.onSubmit(this.state)
    );
  };

  addNewValues = () => {
    let { empty, index } = this.state;
    const keys = Object.keys(empty);
    const removeItem = keys.filter(
      (values, _) => values.split("-")[1] !== undefined
    );
    const addValues = removeItem.map((values, id) => {
      const item = values.split("-")[0];
      const addIndex = { [`${item}-${index + 1}`]: "" };
      return addIndex;
    });
    const combine = Object.assign({}, ...addValues);
    return combine;
  };

  addForm = (more, myArray) => {
    let { values, index, empty } = this.state;
    const newValues = this.addNewValues();
    this.setState({
      index: index + 1,
      values: {
        ...values,
        [myArray]: [...values[myArray], more]
      },
      empty: {
        ...empty,
        ...newValues
      }
    });
  };

  removeForm = (index, value) => {
    const { values, empty } = this.state;
    const removeForm = values[value].filter((_, id) => id !== index);

    const keys = Object.keys(empty);
    const removeItem = keys.filter((value, _) => value.split("-")[1] != index);
    console.log(removeItem);
    this.setState({
      values: {
        ...values,
        [value]: removeForm
      }
    });
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
