import React, { useState } from "react";

interface NumberFormatProps {
  decimal?: string;
  separator?: string;
  prefix?: string;
  precision?: number;
}

const NumberFormat: React.FC<NumberFormatProps> = ({
  decimal = ".",
  separator = ",",
  prefix = "$ ",
  precision = 2,
}) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/[^0-9.]/g, ""); // remove non-numeric characters

    if (inputValue === "") {
      setValue("");
      return;
    }

    // Remove prefix from input value
    const prefixRegex = new RegExp(
      `^${prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`
    );
    inputValue = inputValue.replace(prefixRegex, "");

    setValue(inputValue);
  };

  let formattedValue = "";

  if (value !== "") {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(Number(value));

    if (
      (precision === 0 && formattedNumber.includes(decimal)) ||
      (precision > 0 && !formattedNumber.includes(decimal))
    ) {
      formattedValue = formattedNumber.slice(
        0,
        formattedNumber.indexOf(decimal)
      );
    } else {
      formattedValue = formattedNumber;
    }
  }

  return (
    <div>
      <input
        type="text"
        value={`${prefix}${formattedValue
          .replace(".", decimal)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`)}`}
        onChange={handleChange}
      />
      <br />
      <span>
        {formattedValue !== ""
          ? `${prefix}${formattedValue
              .replace(".", decimal)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`)}`
          : ""}
      </span>
    </div>
  );
};

export default NumberFormat;
