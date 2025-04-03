import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Input = ({name, label, type, handleChange, handleShowPassword,autoFocus, autoComplete, value, half}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        variant='outlined'
        type={type}
        value={value}
        autoFocus={autoFocus}
        required
        onChange={handleChange}
        fullWidth
        autoComplete={autoComplete || 'off'}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} position="end">
                {type === 'password' ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        } : {}}
      />

    </Grid>
  )
}

export default Input