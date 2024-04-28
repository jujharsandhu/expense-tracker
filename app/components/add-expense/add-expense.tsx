'use client'

import { TextField, Box, Button } from '@mui/material'
import { useState } from 'react'
import { putData } from 'app/api/add-expense/add-expense'

const AddExpense = () => {
    const [values, setValues] = useState({
        date: '',
        item: '',
        total: '',
        currency: '',
        // paymentMethod: {},
        note: '',
        category: '',
    })
    const [submitted, setSubmit] = useState(false)
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleSubmit = () => {
        setSubmit(true)
        if (submitted) {
            putData(values)
        }
    }
    return (
        <Box component="form">
            <h1>Add Expense Here</h1>
            <TextField id="date" label="Date" variant="standard" />
            <TextField
                id="item"
                label="Item"
                variant="standard"
                onChange={handleChange('item')}
            />
            <TextField
                id="total"
                label="Total"
                variant="standard"
                onChange={handleChange('total')}
            />
            <TextField
                id="currency"
                label="Currency"
                variant="standard"
                onChange={handleChange('currency')}
            />
            <TextField
                id="note"
                label="Note"
                variant="standard"
                onChange={handleChange('note')}
            />
            <TextField
                id="category"
                label="Category"
                variant="standard"
                onChange={handleChange('category')}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    )
}

export default AddExpense
