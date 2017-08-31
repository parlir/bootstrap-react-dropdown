//@flow
import React, { Component } from "react";
import PropTypes from "prop-types";

const UpArrow = ({ style }: Object) => {
  return (
    <div
      style={{
        borderLeft: "1px solid lightgrey",
        borderTop: "1px solid lightgrey",
        backgroundColor: "white",
        height: "14px",
        margin: "auto",
        WebkitTransform: "rotate(45deg)",
        transform: "rotate(45deg)",
        width: "14px",
        top: "-8px",
        position: "absolute",
        ...style
      }}
    />
  );
};

UpArrow.proTypes = {
  style: PropTypes.object
};

class Switcher extends Component {
  constructor(props: object) {
    super(props);
    this.state = {
      activeOption: this.props.activeOption
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ activeOption: nextProps.activeOption });
  }
  getValue() {
    return this.state.activeOption;
  }
  render() {
    return (
      <span
        className={this.props.className}
        style={{
          ...styles.container,
          ...this.props.style
        }}
      >
        <ul style={styles.optionList}>
          <li>
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span style={{ textDecoration: "underline" }}>
                {this.state.activeOption}
              </span>
            </a>
            <ul
              className="dropdown-menu"
              style={{ minWidth: "0px", ...this.props.dropDownStyle }}
            >
              <UpArrow
                style={{
                  ...styles.arrowStyle,
                  ...this.props.arrowStyle
                }}
              />
              {this.props.options.map(option => (
                <li key={option} style={{ marginTop: "5px" }}>
                  <a
                    style={
                      this.state.activeOption === option
                        ? this.props.activeStyle
                        : this.props.inActiveStyle
                    }
                    onClick={() => {
                      this.setState({ activeOption: option });
                      if (this.props.onOptionClick)
                        this.props.onOptionClick(option);
                    }}
                  >
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </span>
    );
  }
}

const styles = {
  container: {
    position: "relative",
    color: "lightgrey",
    cursor: "pointer"
  },
  optionList: {
    listStyle: "none",
    padding: 0
  },
  arrowStyle: {
    top: "-8px",
    right: "80px",
    position: "absolute"
  }
};

Switcher.propTypes = {
  activeOption: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onOptionClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  arrowStyle: PropTypes.object,
  dropDownStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  inActiveStyle: PropTypes.object
};

Switcher.defaultProps = {
  className: "",
  style: {},
  dropDownStyle: {},
  arrowStyle: {},
  activeStyle: { textDecoration: "underline", color: "darkgrey" },
  inActiveStyle: {
    color: "darkgrey"
  }
};

export default Switcher;
