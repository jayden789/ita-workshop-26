import React from 'react';
import { Input } from 'reactstrap';

/**
 * A wrapper around an `<Input type="select"/>`.
 *
 * Props:
 *  - name: the `name` prop of the `Input`
 *  - options: a list of `{ value, displayText }` objects. Each `value` is used
 *    as the key and value of an `option` element, and each `displayText` is
 *    used as the children of an `option` element.
 *  - value: the `value` prop of the `Input`
 *  - onChange: the `onChange` prop of the `Input`
 *  - disabled: whether the `Input` is disabled
 *  - emptyDisabled: whether the empty-option is disabled
 *  - emptyChildren: children of the empty-option
 */
const Select = React.memo(
  ({
    name,
    options,
    value,
    onChange,
    disabled,
    emptyDisabled = true,
    emptyChildren = "Please Select"
  }) => (
    <Input
      type="select"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="" disabled={emptyDisabled}>
        {emptyChildren}
      </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayText}
        </option>
      ))}
    </Input>
  )
);

export default Select;
