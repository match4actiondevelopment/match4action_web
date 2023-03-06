"use client";

import { UserContext } from "@/modules/context/user-context";
import { useFetchProfile } from "@/modules/hooks/useGetProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import NextImage from "next/image";
import NextLink from "next/link";
import { ChangeEvent, useContext, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetGoals } from "../hooks/useGetGoals";
import { createOpportunity } from "../services";
import { lato, sourceSerifPro } from "../styles/fonts";

import {
  countries,
  servicesNeeded,
  whatMovesThisInitiatives,
  whichAreasAreCoveredByThisInitiatives,
} from "../utils/constants";

type IForm = {
  eventItemFrame: string;
  eventItemType: string;
  initiativeName: string;
  whatMovesThisInitiative: string[];
  whichAreasAreCoveredByThisInitiative: string[];
  servicesNeeded: string[];
  description: string;
  startDate: string;
  endDate: string;
  postalCode: string;
  website: string;
  location: {
    country: string;
    city: string;
  };
  startTime: string;
  endTime: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = yup
  .object({
    // eventItemFrame: yup.string().required(),
    // eventItemType: yup.string().required(),
    initiativeName: yup.string().required(),
    // whatMovesThisInitiative: yup.string().required(),
    // whichAreasAreCoveredByThisInitiative: yup.string().required(),
    servicesNeeded: yup.string().required(),
    // startDate: yup.string().required(),
    // endDate: yup.string().required(),
    // endTime: yup.string().required(),
    // startTime: yup.string().required(),
    description: yup.string().required(),
    // postalCode: yup.string().required(),
    // website: yup.string().required(),
    // location: yup.object({
    //   city: yup.string().required(),
    //   country: yup.string().required()
    // })
  })
  .required();

export default function CreateOpportunity() {
  const { user } = useContext(UserContext) ?? {};
  const { data: userProfile } = useFetchProfile(user?._id);
  const { data: goals } = useGetGoals();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      eventItemFrame: "oneTime",
      eventItemType: "In-Person",
      initiativeName: "",
      whatMovesThisInitiative: [],
      whichAreasAreCoveredByThisInitiative: [],
      servicesNeeded: [],
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      postalCode: "",
      website: "",
      location: {
        country: "",
        city: "",
      },
    },
  });

  const handleSustainableDevelopmentGoals = (data: string) => {
    const index = selectedGoals.find((item) => item === data);

    if (index) {
      const filtered = selectedGoals.filter((item) => item !== data);
      setSelectedGoals(filtered);
    } else {
      setSelectedGoals((prev) => [...prev, data]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const files = useMemo(() => (fileList ? [...fileList] : []), [fileList]);

  const {
    mutate: createOpportunityMutation,
    isLoading: isLoadingCreateOpportunity,
  } = useMutation({
    mutationFn: (payload: FormData) => createOpportunity(payload),
    onError: (err: { success: boolean; message: string }) => {
      const errorMessage = JSON.parse(err.message).message;
      alert(errorMessage);
    },
  });

  const onSubmit = async (data: IForm) => {
    // if (selectedGoals?.length <= 0) {
    //   setGoalsError(true);
    //   return;
    // }

    // if (files?.length <= 0) {
    //   setImageError(true);
    //   alert("Image field is required.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", fileList ? fileList[0] : "");
    formData.append("id", userProfile?._id!);
    formData.append("eventTimeFrame", data?.eventItemFrame);
    formData.append("eventType", data?.eventItemType);
    formData.append("initiativeName", data?.initiativeName);
    formData.append(
      "whatMovesThisInitiative`",
      JSON.stringify(data?.whatMovesThisInitiative)
    );
    formData.append(
      "whichAreasAreCoveredByThisInitiative",
      JSON.stringify(data?.whichAreasAreCoveredByThisInitiative)
    );
    formData.append("servicesNeeded", JSON.stringify(data?.servicesNeeded));
    formData.append("description", data?.description);
    formData.append("startDate", data?.startDate);
    formData.append("endDate", data?.endDate);
    formData.append("startTime", data?.startTime);
    formData.append("endTime", data?.endTime);
    formData.append("postalCode", data?.postalCode);
    formData.append("website", data?.website);
    formData.append("location", JSON.stringify(data?.location));
    formData.append("goals", JSON.stringify(selectedGoals));

    createOpportunityMutation(formData);
    reset();
    setSelectedGoals([]);
  };

  console.log({ goals });

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
        Create An Initiative
      </Typography>
      {files?.length > 0 ? (
        <Box marginBottom={"1rem"}>
          {files?.map((item, idx) => (
            <Box
              height="160px"
              width="auto"
              component="img"
              key={idx}
              src={URL.createObjectURL(item)}
            />
          ))}
        </Box>
      ) : (
        <Box
          height="160px"
          width="100%"
          sx={{
            background: "#E5E5E5",
            marginBottom: "1.5rem",
            border: "none",
          }}
        />
      )}
      <Box
        component="input"
        type="file"
        ref={inputRef}
        sx={{ marginTop: "1rem", display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        className={lato.className}
        onClick={handleUpload}
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
            textTransform: "capitalize",
            textDecoration: "none",
            borderRadius: "5px",
            marginBottom: "1rem",
            cursor: "pointer",
            width: "100%",
          },
        })}
      >
        Add An Image To The Initiative
      </Button>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sm={12}>
          <Controller
            name="eventItemFrame"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="eventItemFrame-label">
                  Event Time Frame
                </FormLabel>
                <RadioGroup
                  aria-labelledby="eventItemFrame-label"
                  sx={{ flexDirection: "row" }}
                  {...field}
                >
                  <FormControlLabel
                    value="oneTime"
                    control={<Radio />}
                    label="One time"
                  />
                  <FormControlLabel
                    value="ongoing"
                    control={<Radio />}
                    label="Ongoing"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="eventItemType"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="eventItemType-label">Event Type</FormLabel>
                <RadioGroup
                  aria-labelledby="eventItemType-label"
                  sx={{ flexDirection: "row" }}
                  {...field}
                >
                  <FormControlLabel
                    value="In-Person"
                    control={<Radio />}
                    label="In-Person"
                  />
                  <FormControlLabel
                    value="Remote"
                    control={<Radio />}
                    label="Remote"
                  />
                  <FormControlLabel
                    value="Both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="initiativeName"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth
                label="Initiative name"
                helperText={errors.initiativeName?.message}
                error={!!errors.initiativeName?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="whatMovesThisInitiative"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel htmlFor="whatMovesThisInitiative-label">
                  What moves this initiative?
                </InputLabel>
                <Select
                  {...field}
                  labelId="whatMovesThisInitiative-label"
                  label="whatMovesThisInitiative"
                  multiple
                  defaultValue={[]}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {whatMovesThisInitiatives.map((value, idx) => (
                    <MenuItem key={`${value}_${idx}`} value={value}>
                      <Checkbox
                        checked={
                          watch("whatMovesThisInitiative").indexOf(value) > -1
                        }
                      />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="whichAreasAreCoveredByThisInitiative"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel htmlFor="whichAreasAreCoveredByThisInitiative-label">
                  Which areas are covered by this initiative?
                </InputLabel>
                <Select
                  {...field}
                  labelId="whichAreasAreCoveredByThisInitiative-label"
                  label="Which areas are covered by this initiative?"
                  multiple
                  defaultValue={[]}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {whichAreasAreCoveredByThisInitiatives.map((value, idx) => (
                    <MenuItem key={`${value}_${idx}`} value={value}>
                      <Checkbox
                        checked={
                          watch("whichAreasAreCoveredByThisInitiative").indexOf(
                            value
                          ) > -1
                        }
                      />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="servicesNeeded"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                error={!!errors?.servicesNeeded?.message}
              >
                <InputLabel htmlFor="servicesNeeded-label">
                  Services needed
                </InputLabel>
                <Select
                  {...field}
                  labelId="servicesNeeded-label"
                  label="Services needed"
                  multiple
                  defaultValue={[]}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {servicesNeeded.map((value, idx) => (
                    <MenuItem key={`${value}_${idx}`} value={value}>
                      <Checkbox
                        checked={watch("servicesNeeded").indexOf(value) > -1}
                      />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors?.servicesNeeded?.message && (
                  <FormHelperText sx={{ color: "#ff1744" }}>
                    {errors?.servicesNeeded?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth
                multiline
                rows={2}
                maxRows={4}
                label="Description"
                helperText={errors.description?.message}
                error={!!errors.description?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField size="small" fullWidth label="Website" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                type="date"
                fullWidth
                label="Start date"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                type="time"
                fullWidth
                label="Start time"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                type="date"
                fullWidth
                label="End date"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                type="time"
                fullWidth
                label="End time"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth
                label="Postal Code"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Controller
            name="location.city"
            control={control}
            render={({ field }) => (
              <TextField size="small" fullWidth label="City" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="country-label">Country</InputLabel>
            <Controller
              name="location.country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  label="Country"
                  labelId="country-label"
                  MenuProps={MenuProps}
                >
                  {countries.map((item) => (
                    <MenuItem
                      key={`${item.name}_${item.code}`}
                      value={item.code}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} marginTop="1.5rem" marginBottom="0.5rem">
          <Typography
            className={lato.className}
            fontWeight={400}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
                textAlign: "center",
                maxWidth: "336px",
                margin: "0 auto",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
              },
            })}
          >
            Which Global Goals are attended by this Initiative? Click on
            relevant ones.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {goals &&
              goals?.length > 0 &&
              goals?.map((item) => (
                <Grid item xs={4} sm={2} key={item._id}>
                  <Button
                    onClick={() => handleSustainableDevelopmentGoals(item?._id)}
                    sx={{
                      background: "#ececec",
                      width: "100%",
                      cursor: "pointer",
                      height: "151px",
                      fontSize: "0.5rem",
                      borderRadius: "none",
                      border: selectedGoals?.includes(item?._id)
                        ? "2px solid #000"
                        : "none",
                    }}
                  >
                    {item.image ? (
                      <NextImage alt={item.name} src={item.image} fill />
                    ) : (
                      item.name
                    )}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} marginTop="1.5rem" marginBottom="0.5rem">
          <Typography
            className={sourceSerifPro.className}
            fontWeight={600}
            variant="h3"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.25rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
                textAlign: "center",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1.25rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
              },
            })}
          >
            The 17 Goals
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            className={lato.className}
            fontWeight={400}
            marginBottom="0.5rem"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
                textAlign: "center",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
              },
            })}
          >
            In 2015, world leaders agreed to 17 goals for a better world by
            2030. These goals have the power to end poverty, fight inequality
            and stop climate change. Guided by the goals, it is now up to all of
            us, governments, businesses, civil society and the general public to
            work together to build a better future for everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} textAlign="center">
          <NextLink href="#">More on 17 Goals</NextLink>
        </Grid>
        <Grid item xs={12} sm={12}>
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
                textTransform: "capitalize",
                textDecoration: "none",
                minWidth: "100%",
                borderRadius: "5px",
                marginBottom: "1rem",
                cursor: "pointer",
              },
              [theme.breakpoints.up("sm")]: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "14px 28px",
                height: "56px",
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
                textTransform: "capitalize",
                textDecoration: "none",
                borderRadius: "5px",
                marginBottom: "1rem",
                cursor: "pointer",
                width: "100%",
              },
            })}
          >
            {isLoadingCreateOpportunity ? (
              <CircularProgress size={20} />
            ) : (
              "Publish Initiative"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
