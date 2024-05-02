'use client'

import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import { putData } from '@/api/add-expense/add-expense'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as currencies from '@/lib/all-currencies.json'

const AddExpense = () => {
  const [values, setValues] = useState({
    date: dayjs().format(),
    item: '',
    amount: '',
    currency: '',
    // paymentMethod: {},
    note: '',
    category: '',
  })
  const [canSubmit, setCanSubmit] = useState(false)
  const [amountError, setAmountError] = useState(false)

  const checkCanSubmit = () => {
    if (
      values.item !== '' &&
      values.amount !== '' &&
      values.currency !== '' &&
      values.category !== ''
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }
  // value changes
  const handleDateChange = (val) => {
    setValues({ ...values, date: val.format() })
    checkCanSubmit()
  }
  const handleAmountChange = (event) => {
    const val = event.target.value
    if (isNaN(Number(val)) || Number(val) <= 0) {
      setAmountError(true)
      return
    }
    setAmountError(false)
    setValues({ ...values, amount: val })
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    checkCanSubmit()
  }
  const handleCurrencyChange = (event: any, newVal) => {
    setValues({ ...values, currency: newVal })
    checkCanSubmit()
  }

  const handleSubmit = () => {
    putData(values)
  }
  return (
    <Box component="form">
      <h1>Add Expense Here</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          defaultValue={dayjs()}
          disableFuture
          onAccept={(val) => handleDateChange(val)}
        />
      </LocalizationProvider>
      <TextField
        id="item"
        label="Item"
        variant="outlined"
        onChange={handleChange('item')}
        required
      />
      <TextField
        id="amount"
        label="Amount"
        variant="outlined"
        onChange={handleAmountChange}
        error={amountError}
        helperText={amountError ? 'Please provide a positive number' : ''}
        required
      />
      <Autocomplete
        disablePortal
        options={currencies.catalog}
        onInputChange={handleCurrencyChange}
        renderInput={(params) => (
          <TextField {...params} label="Currency" required />
        )}
      />
      {/* <TextField
        id="currency"
        label="Currency"
        variant="outlined"
        onChange={handleCurrencyChange}
        required
      /> */}
      <TextField
        id="note"
        label="Note"
        variant="outlined"
        onChange={handleChange('note')}
      />
      <TextField
        id="category"
        label="Category"
        variant="outlined"
        onChange={handleChange('category')}
        required
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!canSubmit}>
        Submit
      </Button>
    </Box>
  )
}

export default AddExpense
