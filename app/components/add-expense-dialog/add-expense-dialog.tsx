'use client'

import { useState } from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { putData } from '@/api/add-expense/add-expense'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as currencies from '@/lib/all-currencies.json'

const AddExpenseDialog = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [values, setValues] = useState({
    date: dayjs().format(),
    item: '',
    amount: '',
    currency: '',
    // paymentMethod: {},
    note: '',
    category: '',
  })
  const [amountError, setAmountError] = useState(false)

  const handleDateChange = (val) => {
    setValues({ ...values, date: val.format() })
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
  }
  const handleCurrencyChange = (event: any, newVal) => {
    setValues({ ...values, currency: newVal })
  }
  const handleSubmit = () => {
    putData(values)
    handleClose()
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}>
        <DialogTitle>Create a New Expense</DialogTitle>
        <DialogContent>
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
            fullWidth
          />
          <TextField
            id="amount"
            label="Amount"
            variant="outlined"
            onChange={handleAmountChange}
            error={amountError}
            helperText={amountError ? 'Please provide a positive number' : ''}
            required
            fullWidth
          />
          <Autocomplete
            disablePortal
            options={currencies.catalog}
            onInputChange={handleCurrencyChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Currency" required />
            )}
          />
          <TextField
            id="note"
            label="Note"
            variant="outlined"
            onChange={handleChange('note')}
            fullWidth
          />
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            onChange={handleChange('category')}
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} >Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddExpenseDialog
