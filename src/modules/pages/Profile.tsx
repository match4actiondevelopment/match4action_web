"use client";

import { queryClient } from "@/modules/context/layout-context";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { fetchProfile, updateImage, updateUserProfile } from "../services";
import { lato, sourceSerifPro } from "../styles/fonts";
import {
  ProfileFormInterface,
  UpdateProfilePayload,
  UserI,
} from "../types/types";
import { formatEntryDate } from "../utils";

const schema = yup
  .object({
    name: yup.string().required(),
    role: yup.string().required(),
  })
  .required();

type ProfileInterface = {
  userId?: string;
};

export default function Profile({ userId }: ProfileInterface) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [bio, setBio] = useState("");

  const { data: userProfile, isLoading } = useQuery<
    string | UserI,
    unknown,
    UserI,
    (string | undefined)[]
  >({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });

  const { handleSubmit, control, reset } = useForm<ProfileFormInterface>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        birthDate: userProfile?.birthDate?.toString() ?? "",
        location: {
          city: userProfile?.location?.city,
          country: userProfile?.location?.country,
        },
        name: userProfile?.name,
        role: userProfile?.role?.toString(),
      };
    }, [userProfile]),
  });

  useEffect(() => {
    if (userProfile) {
      setBio(userProfile?.bio ?? "");
      reset({
        birthDate: userProfile?.birthDate
          ? formatEntryDate(userProfile?.birthDate?.toString())
          : "",
        location: {
          city: userProfile?.location?.city,
          country: userProfile?.location?.country,
        },
        name: userProfile?.name,

        role: userProfile?.role?.toString(),
      });
    }
  }, [userProfile, reset]);

  const { mutate: updateMutation, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateUserProfile(payload),
    onSuccess() {
      queryClient.invalidateQueries(["profile", userProfile?._id]).then(() => {
        setEditPersonalInfo(false);
      });
    },
  });

  const { mutate: updateImageMutation, isLoading: isLoadingImageUpdate } =
    useMutation({
      mutationFn: (payload: FormData) => updateImage(payload),
      onSuccess(data) {
        updateMutation({
          body: { image: data },
          id: userId as string,
        });
        queryClient
          .invalidateQueries(["profile", userProfile?._id])
          .then(() => {
            setFileList(null);
          });
      },
    });

  const files = useMemo(() => (fileList ? [...fileList] : []), [fileList]);

  const RichText = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  if (isLoading) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleUploadClick = async () => {
    if (!fileList) {
      return;
    }
    const formData = new FormData();
    formData.append("file", fileList[0]);
    formData.append("id", userId as string);
    updateImageMutation(formData);
  };

  return (
    <Box
      component="main"
      marginTop="2.75rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      padding="0 1rem"
      sx={(theme) => ({
        [theme.breakpoints.up("sm")]: {
          maxWidth: "600px",
          width: "100%",
          margin: "2.75rem auto",
        },
      })}
    >
      <Typography
        className={sourceSerifPro.className}
        variant="h2"
        fontWeight={600}
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
        My Profile
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="2rem"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column">
          <Box position="relative" margin="0 auto">
            {isLoadingImageUpdate ? (
              <Skeleton
                component="div"
                variant="circular"
                width={76}
                height={76}
                sx={{
                  position: "block",
                }}
              />
            ) : (
              <NextImage
                src={userProfile?.image ?? ""}
                alt={userProfile?.name ?? ""}
                width={76}
                height={76}
                style={{ borderRadius: "50%" }}
              />
            )}
            {files?.length === 0 ? (
              <Button
                sx={{
                  alignSelf: "end",
                  ":hover": {
                    background: "transparent",
                  },
                  minWidth: "fit-content",
                  position: "absolute",
                  top: 0,
                  left: 50,
                }}
                onClick={handleUpload}
              >
                <EditIcon
                  sx={{
                    fill: "#FFD15C",
                  }}
                />
              </Button>
            ) : (
              <Button
                sx={{
                  alignSelf: "end",
                  ":hover": {
                    background: "transparent",
                  },
                  minWidth: "fit-content",
                  position: "absolute",
                  top: 0,
                  left: 50,
                }}
                onClick={handleUploadClick}
              >
                <SaveIcon
                  sx={{
                    fill: "#FFD15C",
                  }}
                />
              </Button>
            )}
          </Box>
          <Box
            component="input"
            type="file"
            ref={inputRef}
            sx={{ marginTop: "1rem", display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </Box>
      {!editPersonalInfo ? (
        <Button
          sx={{
            alignSelf: "end",
            ":hover": {
              background: "transparent",
            },
            minWidth: "fit-content",
          }}
          onClick={() => setEditPersonalInfo(!editPersonalInfo)}
        >
          <EditIcon
            sx={{
              fill: "#FFD15C",
            }}
          />
        </Button>
      ) : (
        <Box display="flex" justifyContent="end" marginBottom=".5rem">
          <Button
            sx={{
              ":hover": {
                background: "transparent",
              },
              minWidth: "fit-content",
              padding: 0,
            }}
            onClick={() => setEditPersonalInfo(!editPersonalInfo)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit((data) =>
              updateMutation({
                body: { ...data, bio },
                id: userId as string,
              })
            )}
            sx={{
              ":hover": {
                background: "transparent",
              },
              minWidth: "fit-content",
              padding: 0,
              marginLeft: ".75rem",
            }}
          >
            {isLoadingUpdate ? <CircularProgress size={14} /> : "Save"}
          </Button>
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {!editPersonalInfo ? (
          <Box display="flex" flexDirection="column" justifyContent="center">
            {userProfile?.name && (
              <Typography
                className={lato.className}
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                })}
              >
                {userProfile?.name}
              </Typography>
            )}
            {userProfile?.birthDate && (
              <Typography
                className={lato.className}
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                })}
              >
                {userProfile?.birthDate
                  ? formatEntryDate(userProfile?.birthDate?.toString())
                  : ""}
              </Typography>
            )}
            {userProfile?.location?.city && userProfile?.location?.country && (
              <Typography
                textAlign="left"
                className={lato.className}
                display="flex"
                alignItems="center"
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                })}
              >
                <RoomIcon
                  sx={{
                    fill: "#7F8390",
                    marginRight: "3px",
                  }}
                />
                {userProfile?.location?.city} ({userProfile?.location?.country})
              </Typography>
            )}
            {userProfile?.role && (
              <Typography
                className={lato.className}
                textTransform="capitalize"
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    color: theme.palette.text.primary,
                    lineHeight: "40px",
                  },
                })}
              >
                {userProfile?.role}
              </Typography>
            )}
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    fullWidth
                    label="Full Name"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    type="date"
                    fullWidth
                    label="Birth Day"
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location.city"
                control={control}
                render={({ field }) => (
                  <TextField size="small" fullWidth label="City" {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location.country"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    fullWidth
                    label="Country"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField size="small" fullWidth label="Role" {...field} />
                )}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            fontSize: "1.5rem",
            lineHeight: "28px",
            marginTop: "2rem",
          },
          [theme.breakpoints.up("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            marginTop: "2rem",
          },
        })}
      >
        About
      </Typography>
      {!editPersonalInfo ? (
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
              lineHeight: "20px",
              marginTop: "-1rem",
            },
            [theme.breakpoints.up("sm")]: {
              color: theme.palette.text.primary,
              marginTop: "-1rem",
            },
          })}
          className={lato.className}
          fontWeight={400}
          dangerouslySetInnerHTML={{ __html: userProfile?.bio ?? "" }}
        />
      ) : (
        <RichText
          modules={modules}
          formats={formats}
          onChange={setBio}
          value={bio}
          theme="snow"
        />
      )}
      <Divider sx={{ marginTop: "2rem" }} />
      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            fontSize: "1.5rem",
            lineHeight: "28px",
            marginTop: "2rem",
          },
          [theme.breakpoints.up("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            marginTop: "2rem",
          },
        })}
      >
        My Test Results
      </Typography>
      <Divider sx={{ marginTop: "2rem" }} />
      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            fontSize: "1.5rem",
            lineHeight: "28px",
            marginTop: "2rem",
          },
          [theme.breakpoints.up("sm")]: {
            color: theme.palette.text.primary,
            marginBottom: "1rem",
            marginTop: "2rem",
          },
        })}
      >
        Owned Initiatives
      </Typography>
    </Box>
  );
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
