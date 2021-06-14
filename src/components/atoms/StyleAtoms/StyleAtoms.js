import React from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import styled from "styled-components";

const buttonStyle = {
  background: "#34495e",
  color: "white",
};

const StyleButton = (props) => {
  return (
    <Button {...props} style={buttonStyle}>
      {props.children}
    </Button>
  );
};

const StyleLabel = (props) => {
  return (
    <label {...props} style={{ fontSize: "20px" }}>
      {props.children}
    </label>
  );
};

export { StyleButton, StyleLabel };
