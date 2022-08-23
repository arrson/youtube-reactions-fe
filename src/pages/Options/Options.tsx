import React, { useState } from 'react';
import './Options.css';

interface ICreator {
  value: string;
}

interface CreatorProps {
  value: string;
  onChange: Function;
}

interface OptionsProps {
  title: string; 
}

const Creator = ({ value, onChange } : CreatorProps) =>  
  <div className="OptionsContainer">
    <input 
      value={value} 
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }} 
    />
  </div>;

const Options = ({ title }: OptionsProps) => {
  const [creators, setCreators] = useState<ICreator[]>([]);

  return <div>
    {creators.map((d, i) => 
      <Creator 
        value={d.value} 
        onChange={(newValue: string) => {
          const newArr = [...creators];
          newArr[i] = { value: newValue };
          setCreators(newArr);
        }}
      />
    )}
    <button onClick={() => {
      setCreators([...creators, { value: '' }])
    }}>Add</button>
  </div>
};

export default Options;
