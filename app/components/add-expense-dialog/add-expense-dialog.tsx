'use client'

import { useState } from 'react'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { putData } from '@/api/add-expense/add-expense'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as currencies from '@/lib/all-currencies.json'
import { dayjs } from '@/lib/index'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  date: yup.date().required(),
  item: yup.string().required(),
  amount: yup.string().required(),
  currency: yup.string().required(),
  note: yup.string().optional(),
  category: yup.string().required(),
})

const AddExpenseDialog = (props) => {
  const { buttonLabel = 'create new expense', form = {} } = props
  const formProps = useForm<typeof schema>({
    defaultValues: form,
    resolver: yupResolver(schema),
  })
  const {
    control,
    register,
    handleSubmit,
    watch, // good for debugging
    formState: { errors },
  } = formProps
  const { onChange: amountChange, ...amountRestMethods } = register('amount')

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [amountError, setAmountError] = useState(false)
  const handleAmountChange = (e) => {
    const numVal = Number(e.target.value)
    if (isNaN(numVal) || numVal <= 0) {
      setAmountError(true)
    } else {
      setAmountError(false)
      amountChange(e)
    }
  }
  const onSubmit: SubmitHandler<typeof schema> = (data) => {
    putData(data)
    // console.log(data)
    handleClose()
  }
  const onError = (error) => console.log(error)

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}>
        <DialogTitle>Create a New Expense</DialogTitle>
        <DialogContent>
          <FormProvider {...formProps}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="date"
                defaultValue={form.date ? dayjs(form.date) : dayjs()}
                rules={{ required: true }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      defaultValue={form.date ? dayjs(form.date) : dayjs()}
                      disableFuture
                      required
                      onChange={(date) => field.onChange(date.format())}
                    />
                  </LocalizationProvider>
                )}
              />
              <TextField
                id="item"
                label="Item"
                variant="outlined"
                required
                {...register('item')}
                fullWidth
                error={errors.item !== undefined}
                helperText={errors.item !== undefined && errors.item.message}
              />
              <TextField
                id="amount"
                label="Amount"
                variant="outlined"
                error={amountError}
                helperText={
                  amountError ? 'Please provide a positive number' : ''
                }
                required
                onChange={handleAmountChange}
                {...amountRestMethods}
                fullWidth
                error={amountError}
                helperText={amountError && 'Please enter a valid number'}
              />
              <Autocomplete
                disablePortal
                defaultValue={form.currency}
                options={currencies.catalog}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('currency')}
                    fullWidth
                    label="Currency"
                    required
                    error={errors.currency !== undefined}
                    helperText={
                      errors.currency !== undefined && errors.currency.message
                    }
                  />
                )}
              />
              <TextField
                id="note"
                label="Note"
                variant="outlined"
                {...register('note')}
                fullWidth
              />
              <TextField
                id="category"
                label="Category"
                variant="outlined"
                required
                {...register('category')}
                fullWidth
                error={errors.category !== undefined}
                helperText={
                  errors.category !== undefined && errors.category.message
                }
              />
            </form>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit(onSubmit, onError)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddExpenseDialog
