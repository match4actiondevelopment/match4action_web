import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import { lato } from "@/modules/styles/fonts";

export interface ModalInterface {
  modalTitle: string;
  firstButtonTitle: string;
  lastButtonTitle: string;
  firstButtonFunction: Function;
  lastButtonFunction: Function;
}

export default function Modal({
  modalTitle,
  firstButtonTitle,
  lastButtonTitle,
  firstButtonFunction,
  lastButtonFunction
}: ModalInterface) {
  return (
    <Typography
      className={lato.className}>
      <Box style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        <Box style={{
          background: "#ffffff",
          width: "70%",
          maxWidth: "20.4rem",
          height: "18rem"
        }}
          sx={(theme) => ({
            [theme.breakpoints.down(1130)]: {
              marginTop: "-290%"
            },
            [theme.breakpoints.up(1130)]: {
              marginTop: "-140%"
            },
          })}>

          <Button
            onClick={() => { lastButtonFunction() }}
            style={{
              background: "transparent",
              width: "20%",
              marginLeft: "17.2rem"
            }}
          >
            <CloseIcon style={{
              color: "#000000",
              width: "28px",
              height: "28px"
            }} />
          </Button>

          <Box style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center"
          }}
          >

            <h1
              style={{
                maxWidth: "283px",
                maxHeight: "20px",
                lineHeight: "1.18rem",
                marginBottom: "3.2rem",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "rgba(44, 50, 53, 1)"
              }}
            >
              {modalTitle}
            </h1>

            <Button
              onClick={() => { firstButtonFunction() }}
              style={{
                width: "9.75rem",
                height: "2.43rem",
                marginBottom: "0.7rem",
                boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
              }}
              sx={(theme) => ({
                [theme.breakpoints.down(1130)]: {
                  background: "#FFD15C",
                  color: "rgba(44, 50, 53, 0.9)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  ":focus": {
                    background: "#FFD15C",
                  },
                  ":active": {
                    background: "#FFD15C",
                  },
                  ":hover": {
                    background: "#FFD15C",
                  },
                  textTransform: "capitalize",
                },
                [theme.breakpoints.up(1130)]: {
                  background: "#FFD15C",
                  color: "rgba(44, 50, 53, 0.9)",
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
                  textTransform: "capitalize",
                },
              })}
            >
              {firstButtonTitle}
            </Button>

            <Button
              onClick={() => { lastButtonFunction() }}
              style={{
                background: "transparent",
                border: "none",
                width: "3rem",
                lineHeight: "1.18rem",
                fontWeight: 600,
                color: "linear-gradient(136.74deg, #B577E1 6.64%, #554BBD 69.76%)",
                textTransform: "capitalize"
              }}
              sx={(theme) => ({
                [theme.breakpoints.down(1130)]: {
                  fontSize: "0.75rem"

                },
                [theme.breakpoints.up(1130)]: {
                  fontSize: "1rem"
                },
              })}
            >
              {lastButtonTitle}
            </Button>
          </Box>
        </Box>
      </Box>
    </Typography>
  );
}