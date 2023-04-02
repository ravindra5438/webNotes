import React from 'react';

const Dropdown = ({ names, onSelect }) => {
  const [selectedName, setSelectedName] = React.useState("");

  const handleSelect = (event) => {
    const selectedName = event.target.value;
    setSelectedName(selectedName);
    onSelect(selectedName);
  }

  return (
    <select value={selectedName} onChange={handleSelect}>
      <option value="">Select a name</option>
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}



export default Dropdown;
