import React, { Component } from "react";
import { Button, Input, TextField } from "../../component/Form/Index";
import Handlers from "../../component/Form/Handlers";

class AddFriends extends Component {
  handleSubmit = state => {
    const { values } = state;
    alert(JSON.stringify(values, null, 2));
    console.log(JSON.stringify(values, null, 2));
  };
  render() {
    const validateField = {
      [`myName`]: "",
      [`friend-${0}`]: "",
      [`email-${0}`]: "",
      [`number-${0}`]: "",
      [`location-${0}`]: ""
    };

    const initialValues = {
      myName: "",
      others: '',
      addFriend: [
        {
          friend: "",
          email: "",
          number: "",
          location: ""
        }
      ]
    };

    const suggestions = [
      "Alligator",
      "Bask",
      "Crocodiles",
      "Death Roll",
      "Eggs",
      "Jaws",
      "Reptile",
      "Solitary",
      "Tail",
      "Wetlands"
    ];

    return (
      <Handlers
        initialValues={initialValues}
        validateField={validateField}
        arrayName="addFriend"
        onSubmit={state => this.handleSubmit(state)}
      >
        {({
          values,
          handleInputChange,
          handleBlur,
          handleSubmit,
          addForm,
          removeForm,
          shouldMarkError,
          disableSubmit,
          onKeyDown,
          handleAutocomplete,
          ShowSuggestionsDropDown,
        }) =>  (
            <div className="form_size">
              <h3>Welcome click to add friend</h3>
              <form onSubmit={handleSubmit}>
                <Input
                  label="My Name"
                  type="text"
                  name="myName"
                  value={values.myName}
                  divClass="form-group mb-2"
                  inputClass={`form-control ${
                    shouldMarkError("myName") ? "error" : ""
                  }`}
                  placeholder="Your Name"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  errorMessage={"Name is required"}
                />
                <Input
                  label="Others"
                  type="text"
                  name="others"
                  value={values.others}
                  divClass="form-group mb-2"
                  inputClass="form-control"
                  placeholder="Others"
                  onChange={e => handleAutocomplete(e, suggestions)}
                  onKeyDown={onKeyDown}
                />
                {ShowSuggestionsDropDown()}
                {values.addFriend.map((_, idx) => (
                  <div key={idx}>
                    <Input
                      label={`friend-${idx}`}
                      type="text"
                      name={`friend-${idx}`}
                      value={values.addFriend[idx].friend}
                      divClass="form-group mb-2"
                      inputClass={`form-control ${
                        shouldMarkError(`friend-${idx}`) ? "error" : ""
                      }`}
                      placeholder="Friend"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      errorMessage={"Friend name is required"}
                    />

                    <Input
                      label={`email-${idx}`}
                      type="text"
                      name={`email-${idx}`}
                      value={values.addFriend[idx].email}
                      divClass="form-group"
                      inputClass={`form-control ${
                        shouldMarkError(`email-${idx}`) ? "error" : ""
                      }`}
                      placeholder="Email address"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      errorMessage={"Email is needed here"}
                    />
                    <Input
                      label={`number-${idx}`}
                      type="text"
                      name={`number-${idx}`}
                      value={values.addFriend[idx].number}
                      divClass="form-group"
                      inputClass={`form-control ${
                        shouldMarkError(`number-${idx}`) ? "error" : ""
                      }`}
                      placeholder="Phone Number"
                      onChange={e => handleInputChange(e, "addFriend")}
                      onBlur={handleBlur}
                      errorMessage={"You have to input a value"}
                    />

                    <Input
                      label={`location-${idx}`}
                      type="text"
                      name={`location-${idx}`}
                      value={values.addFriend[idx].location}
                      divClass="form-group"
                      inputClass={`form-control ${
                        shouldMarkError(`location-${idx}`) ? "error" : ""
                      }`}
                      placeholder="location"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      errorMessage={"You have to input a value"}
                    />

                    <div className="radio_style">
                      <h4>Friend Type</h4>
                      <Input type="radio" name="Close" value="Close" />
                      <label>Close</label>
                      <Input type="radio" value="Unknown" />
                      <label>Unknown</label>
                      <Input type="radio" name="Family" />
                      <label>Family</label>
                    </div>

                    <Button
                      name="remove"
                      type="button"
                      disabled={false}
                      buttonClass="btn btn-primary"
                      onClick={() => removeForm(idx, "addFriend")}
                    />
                  </div>
                ))}
                <TextField
                  name="number"
                  placeholder="Add reason if any"
                  ivClass="form-group"
                  onChange={handleInputChange}
                  inputclass="form-control"
                />
                <br />
                <div className="radio_style">
                  <p>I accept the terms and conditions</p>
                  <Input
                    type="checkbox"
                    name="Close"
                    value="Close"
                    divClass=""
                    inputclass=""
                  />
                  <label>Yes</label>

                  <Input
                    type="checkbox"
                    name="Close"
                    value="Close"
                    divClass=""
                    inputclass=""
                  />
                  <label>No</label>
                </div>
                <Button
                  name="Add more Friends"
                  type="button"
                  disabled={false}
                  onClick={() =>
                    addForm({
                      friend: "",
                      email: "",
                      number: "",
                      location: ""
                    })
                  }
                  buttonClass="btn btn-info add_button_space"
                />
                <Button
                  name="Submit"
                  type="submit"
                  disabled={disableSubmit}
                  buttonClass="btn btn-primary"
                />
              </form>
            </div>
          )
        }
      </Handlers>
    );
  }
}

export default AddFriends;
