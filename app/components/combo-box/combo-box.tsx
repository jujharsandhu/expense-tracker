import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import * as currencies from '@/lib/all-currencies.json'

const ComboBox = (props) => {
  const { onChange, required } = props
  const withLabel = currencies.catalog.map((obj) => {
    return {
      ...obj,
      label: `${obj.symbol} ${obj.currency} ${obj.label}`,
    }
  })
  return (
    <Autocomplete
      disablePortal
      options={withLabel}
      renderInput={(params) => (
        <TextField {...params} label="Currency" required />
      )}
    />
  )
}

export default ComboBox
