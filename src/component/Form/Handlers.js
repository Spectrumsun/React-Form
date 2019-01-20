import React, { Component } from "react";
import ShowSuggestionsDropDown from "./showSuggestionsDropDown";

class Handlers extends Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    empty: this.props.validateField || {},
    disableSubmit: true,
    inputValues: {},
    submissionCount: 0,
    validateValues: this.props.validateField || {},
    index: 0,
    arrayName: this.props.arrayName || "",
    autoComplete: {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      inputName: "",
      userInput: ""
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const { arrayName } = this.state;
    e.persist();
    if (name.split("-")[1]) {
      const inputName = name.split("-")[0];
      const id = name.split("-")[1];
      let newArray = [...this.state.values[arrayName]];
      newArray[id][inputName] = value;
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            [arrayName]: newArray
          },
          inputValues: {
            ...prevState.inputValues,
            [name]: value
          },
          validateValues: {
            ...prevState.validateValues,
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
          },
          validateValues: {
            ...prevState.validateValues,
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
    const { validateValues } = this.state;
    const isDisabled = Object.keys(validateValues).map(
      (key, _) => validateValues[key].length === 0
    );
    this.setState({
      disableSubmit: isDisabled.includes(true)
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(
      prevState => ({
        submissionCount: prevState.submissionCount + 1
      }),
      console.log(JSON.stringify(this.state, null, 2)),
      this.props.onSubmit(this.state)
    );
  };

  addNewValues = () => {
    let { empty, index } = this.state;
    const removeItem = Object.keys(empty).filter(
      (values, _) => values.split("-")[1] !== undefined
    );
    const addValues = removeItem.map((values, _) => {
      return { [`${values.split("-")[0]}-${index + 1}`]: "" };
    });
    return Object.assign({}, ...addValues);
  };

  addForm = more => {
    let { values, empty, validateValues, arrayName } = this.state;
    const newValues = this.addNewValues();
    this.setState(
      prevState => ({
        index: prevState.index + 1,
        disableSubmit: true,
        values: {
          ...prevState.values,
          [arrayName]: [...values[arrayName], more]
        },
        empty: {
          ...empty,
          ...newValues
        },
        validateValues: {
          ...validateValues,
          ...newValues
        }
      }),
      this.canSubmit()
    );
  };

  handleAutocomplete = (e, suggestions) => {
    const { name, value, type, checked } = e.currentTarget;
    const typeValues = type === "checkbox" ? checked : value;
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: typeValues
      },
      autoComplete: {
        ...prevState.autoComplete,
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: typeValues,
        inputName: name
      }
    }));
  };

  handleSuggestionClick = e => {
    const { innerText } = e.currentTarget;
    const { inputName } = this.state.autoComplete;
    this.setState(prevState => ({
      autoComplete: {
        ...prevState.autoComplete,
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: innerText
      },
      values: {
        ...prevState.values,
        [inputName]: innerText
      }
    }));
  };

  ShowSuggestionsDropDown = () => {
    const {
      showSuggestions,
      filteredSuggestions,
      activeSuggestion,
      userInput
    } = this.state.autoComplete;
    return (
      <ShowSuggestionsDropDown
        filteredSuggestions={filteredSuggestions}
        activeSuggestion={activeSuggestion}
        handleSuggestionClick={this.handleSuggestionClick}
        userInput={userInput}
        showSuggestions={showSuggestions}
      />
    );
  };

  onKeyDown = e => {
    console.log('hello')
    const { inputName } = this.state.values;
    const { activeSuggestion, filteredSuggestions } = this.state.autoComplete;
    if (e.keyCode === 13) {
      this.setState(prevState => ({
        autoComplete: {
          ...prevState.autoComplete,
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        },
        values: {
          ...prevState.values,
          [inputName]: filteredSuggestions[activeSuggestion]
        }
      }));
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState(prevState => ({
        autoComplete: {
          ...prevState.autoComplete,
          activeSuggestion: activeSuggestion - 1
        }
      }));
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState(prevState => ({
        autoComplete: {
          ...prevState.autoComplete,
          activeSuggestion: activeSuggestion + 1
        }
      }));
    }
  };

  removeForm = (index, value) => {
    const { values, validateValues } = this.state;
    const removeForm = values[value].filter((_, id) => id !== index);
    Object.keys(validateValues).map((val, _) => {
      return delete validateValues[`${val.split("-")[0]}-${removeForm.length}`];
    });
    this.setState(
      prevState => ({
        index: prevState.index - 1,
        values: {
          ...prevState.values,
          [value]: removeForm
        },
        validateValues: {
          ...prevState.validateValues,
          ...validateValues
        }
      }),
      this.canSubmit()
    );
  };

  shouldMarkError = field => {
    const { empty, touched } = this.state;
    return empty[field] ? touched : false;
  };

  render() {
    return this.props.children({
      ...this.state,
      handleInputChange: this.handleInputChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit,
      addForm: this.addForm,
      removeForm: this.removeForm,
      shouldMarkError: this.shouldMarkError,
      handleAutocomplete: this.handleAutocomplete,
      onKeyDown: this.onKeyDown,
      ShowSuggestionsDropDown: this.ShowSuggestionsDropDown
    });
  }
}

export default Handlers;
