import React, { useState } from 'react';
import './style.scss';
import Select from 'react-select';
import cancelIcon from './assets/cancel.svg';
import { strictValidArray } from './utils/commonUtils';
const sports = [
    { id: '0', value: 'Archery', label: 'Archery', isSelected: false },
    { id: '1', value: 'Badminton', label: 'Badminton', isSelected: false },
    { id: '2', value: 'Bossaball', label: 'Bossaball', isSelected: false },
    { id: '3', value: 'Table tennis', label: 'Table tennis', isSelected: false },
    { id: '4', value: 'Football', label: 'Football', isSelected: false },
    { id: '5', value: 'Cycling', label: 'Cycling', isSelected: false },
    { id: '6', value: 'Golf', label: 'Golf', isSelected: false },
];
const App = () => {
    const [options, setOptions] = useState(sports);
    const [selectedvalue, setSelectedvalue] = useState([]);
    const [dropdowm, setdropdowm] = useState([]);
    const handleChange = (val) => {
        const { value: selectedOption } = val;
        console.log(val, "val");
        const isExist = selectedvalue.some(({ value }) => value === selectedOption);
        if (isExist) {
            alert("already exists")
        }
        else {
            setSelectedvalue((prev) => ([...prev, val]));
        }
        setdropdowm([val])
    }
    const handleCancel = (e) => {
        const newSelect = selectedvalue.filter(
            item => item.value !== e.value
        );
        setSelectedvalue(newSelect)
        setdropdowm([]);
    }
    const handleCheckbox = (ele, ind) => {
        const up = !ele.isSelected;
        selectedvalue[ind].isSelected = up;
        console.log(selectedvalue)
        setdropdowm([]);
    }
    const remove = () => {
        const updated = selectedvalue.filter(({ isSelected = false }) => !isSelected)
        setSelectedvalue(updated);
        setdropdowm([]);
    }

    console.log("selectedvalue", selectedvalue)
    return (
        <div className="app">
            <h1 >
                Sports Dropdown
            </h1>
            <div className="container">
                <Select
                    options={options}
                    onChange={handleChange}
                    closeMenuOnSelect={false}
                    isMulti={false}
                    className="select"
                    value={dropdowm}
                />
                <div className="list-container">
                    <ol className="list">
                        {strictValidArray(selectedvalue) && selectedvalue.map((v, index) => {
                            return (
                                <li key={index}>
                                    <span className="cancel-span">
                                        <input type="checkbox"
                                            key={v.id}
                                            name={v.label}
                                            value={v.label}
                                            onClick={() => handleCheckbox(v, index)} />
                                    </span>
                                    <p className="value-p">
                                        {v.label}
                                    </p>
                                    <span className="cancel-span">
                                        <img src={cancelIcon} alt="cancel"
                                            onClick={() => handleCancel(v)} />
                                    </span>
                                </li>
                            );
                        }
                        )}
                    </ol>
                    <button onClick={remove} className="remove">
                        Remove Selected
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;