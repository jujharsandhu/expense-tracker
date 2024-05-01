'use client'

import { useState } from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = {
  item: yup.string(),
}
const formData = {
  item: '',
}

const UpdateExpense = () => {
  const {
    register,
    handleSubmit,
    watch, // good for debugging
    formState: { errors },
  } = useForm<typeof schema>({
    defaultValues: {
      item: 'clothes',
    },
    resolver: yupResolver(
      schema,
      [formData.item],
      schema,
      'Invalid Input',
      'type',
      formData
    ),
  })
  const onSubmit: SubmitHandler<typeof schema> = (data) => console.log(data)

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update an Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}>
        <DialogTitle>Create a New Expense</DialogTitle>
        <DialogContent>
          <TextField
            id="item"
            label="Item"
            variant="outlined"
            required
            {...register('item', { required: true })}
            fullWidth
          />
          {errors.item && <span>this field is required</span>}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onSubmit={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateExpense
