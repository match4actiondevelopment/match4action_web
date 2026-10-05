"use client";
import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordField(props: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="button"
              edge="end"
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}