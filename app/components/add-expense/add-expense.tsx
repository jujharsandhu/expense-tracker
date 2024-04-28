'use client'

import { TextField, Box, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react'
import { putData } from '@/api/add-expense/add-expense'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

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

  // value changes
  const handleDateChange = (val) => {
    setValues({ ...values, date: val.format() })
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleCurrencyChange = (event) => setValues({ ...values, currency: event.target.value.toUpperCase() })

  const handleSubmit = () => {
    setSubmit(true)
    if (submitted) {
      putData(values)
    }
  }
  return (
    <Box component="form">
      <h1>Add Expense Here</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" defaultValue={dayjs()} disableFuture onAccept={(val) => handleDateChange(val)} />
      </LocalizationProvider>
      <TextField
        id="item"
        label="Item"
        variant="standard"
        onChange={handleChange('item')}
        required
      />
      <TextField
        id="total"
        label="Total"
        variant="standard"
        onChange={handleChange('total')}
        required
      />
      <TextField
        id="currency"
        label="Currency"
        variant="standard"
        onChange={handleCurrencyChange}
        required
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
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  )
}

export default AddExpense
