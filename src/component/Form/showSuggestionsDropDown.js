import React from "react";
import "./Form.css";

const ShowSuggestionsDropDown = props => {
  let suggestionsListComponent;
  if (props.showSuggestions && props.userInput) {
    if (props.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {props.filteredSuggestions.map((suggestion, index) => {
            let className;
            if (index === props.activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li
                className={className}
                key={suggestion}
                onClick={props.handleSuggestionClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return <>{suggestionsListComponent}</>;
};

export default ShowSuggestionsDropDown;
