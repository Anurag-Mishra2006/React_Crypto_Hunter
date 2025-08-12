import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const styles = {
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  };

  return (
    <span
      onClick={onClick}
      style={{
        ...styles,
        ...(selected && { backgroundColor: "gold", color: "black" }),
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
