"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { lato, sourceSerifPro } from "../styles/fonts";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
    message: yup.string().required(),
  })
  .required();

export default function ContactUs() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      // const res = await register({
      //   ...data,
      //   provider: {
      //     name: data?.providerName,
      //   },
      // });
      // if (res?.success) {
      //   window.location.href = window.location.origin;
      // }
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <Box
      component="main"
      marginTop="2.75rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 1rem"
      height="100%"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
          width: "100%",
          maxWidth: "600px",
          margin: "2.75rem auto",
        },
      })}
    >
      <Typography
        className={sourceSerifPro.className}
        variant="h2"
        fontWeight={700}
        marginBottom="2rem"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
            lineHeight: "1.75rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "2.5rem",
            lineHeight: "2.5rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
        })}
      >
        Get In Touch With Us
      </Typography>
      <Grid
        component="form"
        container
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sm={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Full Name"
                fullWidth
                size="small"
                InputLabelProps={{ required: true }}
                helperText={errors.name?.message}
                error={!!errors.name?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                size="small"
                InputLabelProps={{ required: true }}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                label="Message"
                fullWidth
                size="small"
                InputLabelProps={{ required: true }}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                minRows={4}
                multiline
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            className={lato.className}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "39px",
                background: "#FFD15C",
                color: theme.palette.text.primary,
                fontWeight: 600,
                fontSize: "1rem",
                ":focus": {
                  background: "#FFD15C",
                },
                ":active": {
                  background: "#FFD15C",
                },
                ":hover": {
                  background: "#FFD15C",
                },
                ":disabled": {
                  background: "#D3D3D3",
                  boxShadow: "none",
                },
                textTransform: "capitalize",
                textDecoration: "none",
                minWidth: "100%",
                borderRadius: "5px",
                marginBottom: "1rem",
                cursor: "pointer",
              },
              [theme.breakpoints.up("sm")]: {
                display: "inline-block",
                padding: "14px 28px",
                background: "#FFD15C",
                color: theme.palette.text.primary,
                fontWeight: 600,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                fontSize: "1rem",
                ":focus": {
                  background: "#FFD15C",
                },
                ":active": {
                  background: "#FFD15C",
                },
                ":hover": {
                  background: "#FFD15C",
                },
                ":disabled": {
                  background: "#D3D3D3",
                  boxShadow: "none",
                },
                textTransform: "capitalize",
                textDecoration: "none",
                borderRadius: "5px",
                marginBottom: "1rem",
                cursor: "pointer",
                width: "100%",
              },
            })}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
