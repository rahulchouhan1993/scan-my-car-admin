import React, { useEffect } from "react";
import Select, { components } from "react-select";

// Custom value container → shows "X item(s)" if multiple selected
const CustomValueContainer = ({ children, ...props }) => {
  const { getValue } = props;
  const selected = getValue();
  const count = selected.length;

  return (
    <components.ValueContainer {...props}>
      {count > 1 ? `${count} item(s)` : children}
      {children[1]} {/* keep search input */}
    </components.ValueContainer>
  );
};

const Select2Multi = ({
  multiple = false,
  name,
  label,
  value,
  onChange,
  options = [],
}) => {
  let valuesArray = [];
  
  if (value && typeof value === "string") {
    valuesArray = multiple
      ? value.split(",").map((v) => v.trim())
      : [value.trim()];
  } else if (Array.isArray(value)) {
    valuesArray = value;
  }
  
  let formattedValue = [];
  if (valuesArray.length > 0) {
    formattedValue = multiple
      ? options.filter((opt) => valuesArray.includes(opt.value))
      : options.find((opt) => opt.value === valuesArray[0]) || null;
  } else {
    formattedValue = multiple ? [options[0]] : options[0] || null;
  }

  // 👉 Ensure default value is synced to form state
  useEffect(() => {
    if (!value && options.length > 0) {
      const defaultVal = multiple
        ? [options[0].value]
        : options[0].value;

      onChange({
        target: { name, value: multiple ? defaultVal.join(",") : defaultVal },
      });
    }
  }, [value, options, multiple, name, onChange]);

  const handleChange = (selected) => {
    const newValue = multiple
      ? (selected || []).map((opt) => opt.value)
      : selected?.value || "";

    onChange({ target: { name, value: multiple ? newValue.join(",") : newValue } });
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <Select
        inputId={name}
        isMulti={multiple}
        name={name}
        options={options}
        value={formattedValue}
        onChange={handleChange}
        isSearchable={false}

        placeholder="-- Select --"
        closeMenuOnSelect={!multiple}
        hideSelectedOptions={false}
        components={multiple ? { ValueContainer: CustomValueContainer } : {}}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
};

export default Select2Multi;
