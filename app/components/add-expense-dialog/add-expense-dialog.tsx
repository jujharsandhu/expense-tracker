'use client'

import { useMemo, useState } from 'react'
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
import dayjs from 'dayjs'
import * as currencies from '@/lib/all-currencies.json'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = {
  date: yup.date(),
  item: yup.string(),
  amount: yup.string(),
  currency: yup.string(),
  // paymentMethod: {},
  note: yup.string().optional(),
  category: yup.string(),
}

const AddExpenseDialog = (props) => {
  const { buttonLabel = 'create new expense', form = {} } = props
  const formProps = useForm<typeof schema>({
    defaultValues: form,
    // resolver: yupResolver(
    //   schema,
    //   [
    //     formData.date,
    //     formData.item,
    //     formData.amount,
    //     formData.currency,
    //     formData.note,
    //     formData.category,
    //   ],
    //   schema,
    //   'Invalid Input',
    //   'type',
    //   formData
    // ),
  })

  const {
    control,
    register,
    handleSubmit,
    watch, // good for debugging
    formState: { errors },
  } = formProps

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
  const onSubmit: SubmitHandler<typeof schema> = (data) => {
    // putData(values)
    console.log(data)
    handleClose()
  }

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
                      onChange={(date) => field.onChange(date)}
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
                {...register('amount')}
                fullWidth
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
              />
            </form>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddExpenseDialog
