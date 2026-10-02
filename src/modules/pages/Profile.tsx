"use client";

import AppliedVolunteerPositions from "@/modules/components/AppliedVolunteerPositions";
import { UserContext } from "@/modules/context/user-context";
import { useGetProfile } from "@/modules/hooks/useGetProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { updateImage } from "../services";
import { saveAccountProfile } from "../services/account";
import {
  lato,
  sourceSerifPro,
} from "../styles/fonts";
import { ProfileFormInterface } from "../types/types";
import { formatEntryDate } from "../utils";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function Profile({
  userId,
}: {
  userId?: string;
}) {
  const context = useContext(UserContext);
  const accountId =
    context?.user?._id || userId;

  const queryClient = useQueryClient();
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [fileList, setFileList] =
    useState<FileList | null>(null);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const {
    data: profile,
    isLoading,
  } = useGetProfile(accountId);

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<ProfileFormInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      birthDate: "",
      location: {
        city: "",
        country: "",
      },
    },
  });

  const RichText = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    if (
      !profile ||
      typeof profile !== "object"
    ) {
      return;
    }

    setBio(profile.bio || "");

    reset({
      name: profile.name,
      birthDate: profile.birthDate
        ? formatEntryDate(
            profile.birthDate.toString()
          )
        : "",
      location: {
        city: profile.location?.city || "",
        country: profile.location?.country || "",
      },
    });
  }, [profile, reset]);

  const update = useMutation({
    mutationFn: (
      body: ProfileFormInterface
    ) => {
      if (!accountId) {
        throw new Error(
          "Please log in again."
        );
      }

      return saveAccountProfile(
        accountId,
        body
      );
    },

    onSuccess(user) {
      queryClient.setQueryData(
        ["profile", user._id],
        user
      );

      context?.setUser(user);
      setEditing(false);
      setFileList(null);
      setError("");
    },

    onError(failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Could not save your profile."
      );
    },
  });

  const upload = useMutation({
    mutationFn: (data: FormData) =>
      updateImage(data),

    onSuccess(image) {
      update.mutate({ image });
    },

    onError() {
      setError(
        "Could not upload your image."
      );
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (
    !profile ||
    typeof profile !== "object"
  ) {
    return (
      <Alert severity="error">
        Could not load your profile. Please
        reload the page.
      </Alert>
    );
  }

  const uploading =
    upload.isLoading ||
    (update.isLoading && !!fileList);

  const busy =
    upload.isLoading || update.isLoading;

  const roleLabel =
    profile.role === "organization"
      ? "Organisation"
      : profile.role;

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setFileList(event.target.files);
  }

  function uploadImage() {
    if (!fileList?.[0] || !accountId) {
      return;
    }

    const data = new FormData();
    data.append("file", fileList[0]);
    data.append("id", accountId);

    setError("");
    upload.mutate(data);
  }

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        my: "2.75rem",
        px: 2,
      }}
    >
      <Typography
        variant="h2"
        className={sourceSerifPro.className}
        sx={{
          fontWeight: 600,
          mb: 4,
          fontSize: {
            xs: "1.5rem",
            sm: "2.5rem",
          },
        }}
      >
        My Profile
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {uploading ? (
            <Skeleton
              variant="circular"
              width={76}
              height={76}
            />
          ) : (
            <NextImage
              src={
                profile.image ||
                "/default-user.svg"
              }
              alt={
                profile.name || "Profile"
              }
              width={76}
              height={76}
              style={{
                borderRadius: "50%",
              }}
            />
          )}

          <Button
            aria-label={
              fileList?.length
                ? "Save profile image"
                : "Change profile image"
            }
            disabled={busy}
            onClick={
              fileList?.length
                ? uploadImage
                : () =>
                    inputRef.current?.click()
            }
            sx={{
              position: "absolute",
              top: 0,
              left: 50,
              minWidth: "fit-content",
            }}
          >
            {fileList?.length ? (
              <SaveIcon
                sx={{ color: "#FFD15C" }}
              />
            ) : (
              <EditIcon
                sx={{ color: "#FFD15C" }}
              />
            )}
          </Button>

          <input
            type="file"
            ref={inputRef}
            hidden
            onChange={handleFileChange}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        {editing ? (
          <>
            <Button
              disabled={busy}
              onClick={() => {
                setEditing(false);
                setError("");
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={busy}
              onClick={handleSubmit(
                (data) => {
                  setError("");
                  update.mutate({
                    ...data,
                    bio,
                  });
                }
              )}
            >
              {update.isLoading ? (
                <CircularProgress
                  size={14}
                />
              ) : (
                "Save"
              )}
            </Button>
          </>
        ) : (
          <Button
            aria-label="Edit profile"
            onClick={() => {
              setEditing(true);
              setError("");
            }}
          >
            <EditIcon
              sx={{ color: "#FFD15C" }}
            />
          </Button>
        )}
      </Box>

      {editing ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  label="Full Name"
                  error={
                    !!fieldState.error
                  }
                  helperText={
                    fieldState.error?.message
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  type="date"
                  fullWidth
                  label="Birth Day"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="location.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  label="City"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="location.country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  label="Country"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Role"
              value={roleLabel || ""}
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              helperText="Use Choose account role to change this."
            />
          </Grid>
        </Grid>
      ) : (
        <Box className={lato.className}>
          <Typography
            sx={{ lineHeight: "40px" }}
          >
            {profile.name}
          </Typography>

          {profile.birthDate && (
            <Typography
              sx={{
                lineHeight: "40px",
              }}
            >
              {formatEntryDate(
                profile.birthDate.toString()
              )}
            </Typography>
          )}

          {profile.location?.city &&
            profile.location?.country && (
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  lineHeight: "40px",
                }}
              >
                <RoomIcon
                  sx={{
                    color: "#7F8390",
                    mr: 0.5,
                  }}
                />

                {profile.location.city} (
                {profile.location.country})
              </Typography>
            )}

          <Typography
            sx={{
              textTransform: "capitalize",
              lineHeight: "40px",
            }}
          >
            {roleLabel}
          </Typography>
        </Box>
      )}

      {!editing &&
        (profile.role === "volunteer" ||
          profile.role ===
            "organization") && (
          <Button
            component={NextLink}
            href="/role-selection"
            sx={{ mt: 1 }}
          >
            Choose account role
          </Button>
        )}

      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        sx={{ mt: 4, mb: 2 }}
      >
        About
      </Typography>

      {editing ? (
        <RichText
          modules={modules}
          formats={formats}
          onChange={setBio}
          value={bio}
          theme="snow"
        />
      ) : (
        <Box
          className={lato.className}
          dangerouslySetInnerHTML={{
            __html: profile.bio || "",
          }}
        />
      )}

      <AppliedVolunteerPositions
        userId={accountId}
      />

      <Divider sx={{ mt: 4 }} />

      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        sx={{ mt: 4, mb: 2 }}
      >
        My Test Results
      </Typography>

      <Divider sx={{ mt: 4 }} />

      <Typography
        className={sourceSerifPro.className}
        fontWeight={600}
        sx={{ mt: 4, mb: 2 }}
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