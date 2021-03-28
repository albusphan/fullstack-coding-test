import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/layout";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue,
  }));

  return (
    <Heading mb="4" overflowWrap="anywhere" as="h1">
      {value}
    </Heading>
  );
});

export default DynamicText;
