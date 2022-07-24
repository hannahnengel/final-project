import React from 'react';

export default function Years() {
  const currentYear = new Date().getFullYear();
  const OldestYear = (currentYear - 100);
  const years = [];
  for (let i = currentYear; i > OldestYear; i--) {
    years.push(i);
  }

  return (
    <select className="form-select form-font rounded p-2 border-0" id='year'>
      <option value='year'>Year</option>
      {years.map(index =>
        <option key={index} value={index}>{index}</option>)
    }
    </select>
  );
}
