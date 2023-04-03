import React from 'react';

const Dropdown = ({ names, onSelect }) => {
  const [selectedName, setSelectedName] = React.useState("");

  const handleSelect = (event) => {
    const selectedName = event.target.value;
    setSelectedName(selectedName);
    onSelect(selectedName);
  }

  const styles = {
    select: {
      width: '200px',
      height: '30px',
      padding: '5px',
      borderRadius: '3px',
      backgroundColor: '#f0f0f0',
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      color: '#333',
    },
    option: {
      backgroundColor: 'green',
      color: '#000',
    },
  };

  return (
    <select style={styles.select} value={selectedName} onChange={handleSelect}>
      <option style={styles.option} value="">Select a user</option>
      {names.map((name) => (
        <option style={styles.option} key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}



export default Dropdown;
