import './SearchForm.css'
import { useState, useEffect } from 'react'

function SearchForm({ setSpinner, setKeyWord }) {
    const [value, setValue] = useState('');
    const [err, setErr] = useState('');
    // const [submit, setSubmit] = useState(false)

    // useEffect(() => {
    //     if( value || submit ) setSpinner(true);
    //     if(!value && !submit) setSpinner(false)
    // }, [value, submit])

    function handleChange(e) {
        setErr('');
        setKeyWord('')
        setValue(e.target.value);
        // setSubmit(false)
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(!value.trim()) setErr(true);
        else {
            setKeyWord(value);
            setSpinner(true)
            // setSubmit(true)
        }
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