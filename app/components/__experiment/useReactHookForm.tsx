'use client'

import { useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = {
  item: yup.string().optional(),
}
const formData = {
  item: '',
}

const UpdateExpense = (props) => {
  const { buttonLabel = 'edit', defaultItem = '' } = props
  const {
    register,
    handleSubmit,
    watch, // good for debugging
    formState: { errors },
  } = useForm<typeof schema>({
    defaultValues: useMemo(() => ({ item: defaultItem }), [defaultItem]),
    // resolver: yupResolver(
    //   schema,
    //   [formData.item],
    //   schema,
    //   'Invalid Input',
    //   'type',
    //   formData
    // ),
  })
  const submitFunction: SubmitHandler<typeof schema> = (data) => {
    console.log(data)
    handleClose()
  }
  const onInvalid = (error) => console.log(error)

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
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}>
        <DialogTitle>Edit This Expense</DialogTitle>
        <DialogContent>
          <TextField
            id="item"
            label="Item"
            variant="outlined"
            required
            {...register('item')}
            fullWidth
          />
          {errors.item && <span>this field is required</span>}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit(submitFunction, onInvalid)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateExpense
