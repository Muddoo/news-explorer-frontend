import { useState, useCallback } from 'react'

export function useFormWithValidation(setServerError) {
    const [fields, setFields] = useState({})
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState()

    function handleChange(e) {
        setServerError()
        setFields({...fields, [e.target.name]: e.target.value.trim()});
        setErrors({...errors, [e.target.name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity())
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
          setFields(newValues);
          setErrors(newErrors);
          setIsValid(newIsValid);
          setServerError()
        },
        [setFields, setErrors, setIsValid]
    );

    return [fields, errors, isValid, handleChange, resetForm]
}