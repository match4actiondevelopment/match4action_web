"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../services";
import { lato, sourceSerifPro } from "../styles/fonts";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      const res = await login(data);

      if (res?.success) {
        window.location.href = window.location.origin;
      }
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
          },
        })}
      >
        Welcome,
        <br /> Log In To Continue!
      </Typography>
      <Grid
        component="form"
        container
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                InputLabelProps={{ required: true }}
                size="small"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            className={lato.className}
            component="span"
            width="100%"
            fontWeight={700}
            marginTop="0.5rem"
            marginBottom="2rem"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.75rem",
                lineHeight: "0.875rem",
                color: theme.palette.text.primary,
                textAlign: "right",
              },
            })}
          >
            <NextLink
              href={"/forgot-password"}
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </NextLink>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="submit"
            disabled={!watch("email") || !watch("password")}
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
            Log In
          </Button>
        </Grid>
      </Grid>
      <NextLink
        href={`${process.env.NEXT_PUBLIC_API_PATH}/auth/google`}
        style={{ width: "100%", textDecoration: "none" }}
      >
        <Button
          className={lato.className}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              background: "#ffffff",
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: "1rem",
              border: "3px solid #FFD15C",
              ":focus": {
                background: "#ffffff",
                border: "3px solid #FFD15C",
              },
              ":active": {
                background: "#ffffff",
                border: "3px solid #FFD15C",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              minWidth: "100%",
              borderRadius: "5px",
              marginBottom: "1.5rem",
              cursor: "pointer",
            },
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              padding: "12px 28px",
              background: "#ffffff",
              color: theme.palette.text.primary,
              fontWeight: 600,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              fontSize: "1rem",
              border: "3px solid #FFD15C",
              ":focus": {
                background: "#ffffff",
                border: "3px solid #FFD15C",
              },
              ":active": {
                background: "#ffffff",
                border: "3px solid #FFD15C",
              },
              ":hover": {
                background: "#ffffff",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              borderRadius: "5px",
              marginBottom: "1rem",
              cursor: "pointer",
              width: "100%",
              marginRight: "0",
            },
          })}
        >
          <NextImage
            src="/google-logo.png"
            alt="Google Logo"
            width={24}
            height={24}
          />
          Continue With Google
        </Button>
      </NextLink>
      <Typography
        className={lato.className}
        width="100%"
        fontWeight={700}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.75rem",
            lineHeight: "0.875rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
        })}
      >
        I&apos;m a new user,{" "}
        <NextLink href={"register"} style={{ textDecoration: "none" }}>
          Sign Up
        </NextLink>
      </Typography>
    </Box>
  );
}
