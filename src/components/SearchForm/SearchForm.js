import './SearchForm.css'
import { useState } from 'react'

function SearchForm({ setKeyWord }) {
    const [value, setValue] = useState('');
    const [err, setErr] = useState('');

    function handleChange(e) {
        setErr('');
        setKeyWord('')
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(!value.trim()) setErr(true);
        else setKeyWord(value);
        return setValue('')
    }
    
    return (
        <form 
            className="search" 
            onSubmit={handleSubmit}
            noValidate >
            <fieldset className='search__group'>
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder="Enter topic" 
                    value={value}
                    onChange={handleChange}
                    required />
                <p className="search__error">{err && 'Please enter a keyword'}</p>
            </fieldset>
            <button className="search__btn">Search</button>
        </form>
    )
}

export default SearchForm