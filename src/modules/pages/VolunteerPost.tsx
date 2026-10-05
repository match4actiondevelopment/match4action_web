"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  myApplicationsKey,
  useGetMyApplications,
} from "@/modules/hooks/useGetMyApplications";
import { UserContext } from "@/modules/context/user-context";
import { useGetInitiative } from "@/modules/hooks/useGetInitiative";
import { applyToInitiative } from "@/modules/services";
import { lato } from "@/modules/styles/fonts";
import { Goal, UserRole } from "@/modules/types/types";
import { formatEntryDate } from "@/modules/utils";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SafeImage from "@/modules/components/SafeImage";
import NextLink from "next/link";
import { http } from "@/modules/config/http";
import { sourcePath } from "@/modules/utils/listNavigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

export default function VolunteerPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);
  const roleQuery = useGetInitiative(params.id);
  const { data, isLoading } = roleQuery;
  const search = useSearchParams();
  const backPath = sourcePath(search?.get("from") || null);
  const volunteer = userContext?.user?.role === UserRole.volunteer;
  const matches = useQuery(
    ["role-match", userContext?.user?._id, params.id],
    async () => {
      const response = await http.get("/matching/recommendations", {
        withCredentials: true,
      });
      if (!response.data?.success)
        throw new Error("Could not load match explanation.");
      return (
        response.data.data.find(
          (item: { _id: string }) => item._id === params.id
        ) || null
      );
    },
    { enabled: !!userContext?.isLogged && volunteer }
  );

  const userId = userContext?.user?._id;
  const applicationQuery = useGetMyApplications(volunteer ? userId : undefined);

  const [submittedKey, setSubmittedKey] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("pending");

  const currentKey = `${userId}:${params.id}`;

  const alreadyApplied =
    submittedKey === currentKey ||
    !!applicationQuery.data?.some(
      (application) => application.initiativeId === params.id
    );

  const checkingApplication =
    volunteer && !!userId && applicationQuery.isLoading;

  const applicationCheckFailed =
    volunteer && !!userId && applicationQuery.isError;

  const isUnavailable =
    data?.status === "inactive" || data?.status === "closed";

  const isNonVolunteer =
    userContext?.isLogged && userContext.user?.role !== UserRole.volunteer;

  const handleApply = async () => {
    setApplyError("");

    if (!userContext?.isLogged) {
      router.push("/login");
      return;
    }

    if (userContext.user?.role !== UserRole.volunteer) {
      setApplyError("Only volunteer accounts can apply to opportunities.");
      return;
    }

    if (alreadyApplied || checkingApplication || applicationCheckFailed) {
      return;
    }

    if (isUnavailable) {
      setApplyError("This opportunity is not accepting applications.");
      return;
    }

    try {
      setIsApplying(true);

      const result = (await applyToInitiative(params.id)) as {
        applied: boolean;
        notificationStatus?: string;
      };

      setNotificationStatus(result.notificationStatus || "pending");

      setSubmittedKey(currentKey);

      void queryClient.invalidateQueries(myApplicationsKey(userId));

      setShowSuccess(true);
    } catch (error) {
      const failure = error as Error & {
        status?: number;
      };

      if (failure.status === 409) {
        void queryClient.invalidateQueries(myApplicationsKey(userId));
      }

      setApplyError(failure.message);
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress aria-label="Loading opportunity" />
      </Box>
    );
  if (roleQuery.isError || !data?._id)
    return (
      <Box sx={{ p: 4 }}>
        <Button component={NextLink} href={backPath}>
          Back to opportunities
        </Button>
        <Alert
          severity="error"
          action={<Button onClick={() => roleQuery.refetch()}>Retry</Button>}
        >
          This opportunity could not be loaded. It may no longer be available.
        </Alert>
      </Box>
    );
  const ownerName =
    typeof data.userId === "object" ? data.userId?.name : undefined;
  const eventDetails = [
    data.eventItemFrame || data.eventTimeFrame,
    data.eventItemType || data.eventType,
  ]
    .filter(Boolean)
    .join(" · ");
  const posted =
    data.createdAt && Number.isFinite(Date.parse(data.createdAt))
      ? formatEntryDate(data.createdAt)
      : null;
  return (
    <Box
      component="main"
      sx={{ maxWidth: 780, mx: "auto", p: { xs: 2, sm: 4 } }}
    >
      <Button component={NextLink} href={backPath} sx={{ mb: 2 }}>
        {backPath.startsWith("/recommended")
          ? "Back to recommendations"
          : backPath.startsWith("/profile")
          ? "Back to owned initiatives"
          : "Back to opportunities"}
      </Button>
      {data.image?.filter(Boolean).map((image, index) => (
        <Box key={`${image}-${index}`} sx={{ height: 240, mb: 2 }}>
          <SafeImage src={image} alt={data.initiativeName} />
        </Box>
      ))}
      <Typography variant="h4" component="h1" gutterBottom>
        {data.initiativeName}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        Organisation: {ownerName || "Organisation information unavailable"}
      </Typography>
      {posted && (
        <Typography variant="body2" color="text.secondary">
          Date posted: {posted}
        </Typography>
      )}
      <Typography sx={{ mt: 2 }}>{data.servicesNeeded?.join(", ")}</Typography>
      <Typography>
        Location:{" "}
        {[data.location?.city, data.location?.country]
          .filter(Boolean)
          .join(", ") || "Not provided"}
      </Typography>
      {eventDetails && <Typography sx={{ mt: 1 }}>{eventDetails}</Typography>}
      {data.startDate && Number.isFinite(Date.parse(data.startDate)) && (
        <Typography>Starts: {formatEntryDate(data.startDate)}</Typography>
      )}
      {data.endDate && Number.isFinite(Date.parse(data.endDate)) && (
        <Typography>Ends: {formatEntryDate(data.endDate)}</Typography>
      )}
      {data.startTime && Number.isFinite(Date.parse(data.startTime)) && (
        <Typography>
          Start time:{" "}
          {new Date(data.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </Typography>
      )}
      {data.endTime && Number.isFinite(Date.parse(data.endTime)) && (
        <Typography>
          End time:{" "}
          {new Date(data.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </Typography>
      )}
      <Typography sx={{ my: 3, whiteSpace: "pre-line" }}>
        {data.description}
      </Typography>
      {data.website && /^https?:\/\//i.test(data.website) && (
        <Button
          component="a"
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Organisation website
        </Button>
      )}
      {volunteer && matches.data && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6">Why this matches you</Typography>
          {(matches.data.matchingReasons?.length
            ? matches.data.matchingReasons
            : ["This opportunity may align with your Ikigai profile."]
          ).map((reason: string) => (
            <Typography key={reason}>{reason}</Typography>
          ))}
        </Box>
      )}
      {!!data.goals?.length && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            Global Goals supported by this cause
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {data.goals.map(
              (item) =>
                typeof item === "object" &&
                item && (
                  <Box key={item._id} sx={{ width: 100, height: 120 }}>
                    <SafeImage src={item.image} alt={item.name} />
                  </Box>
                )
            )}
          </Box>
        </Box>
      )}
      <Box sx={{ my: 3, display: "grid", gap: 2 }}>
        {!isNonVolunteer && (
          <Typography variant="body2">
            Applying shares your name and email with this organisation.
          </Typography>
        )}
        {alreadyApplied && (
          <Alert severity="info">
            You have already applied to this opportunity.
          </Alert>
        )}
        {isNonVolunteer && (
          <Alert severity="info">
            Only volunteer accounts can apply to opportunities.
          </Alert>
        )}
        {isUnavailable && (
          <Alert severity="info">
            This opportunity is not accepting applications.
          </Alert>
        )}
        {applicationCheckFailed && (
          <Alert
            severity="error"
            action={
              <Button onClick={() => applicationQuery.refetch()}>Retry</Button>
            }
          >
            Could not check your application status. Please retry before
            applying.
          </Alert>
        )}
        {applyError && <Alert severity="error">{applyError}</Alert>}
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={
            userContext?.isLoading ||
            isApplying ||
            isUnavailable ||
            !!isNonVolunteer ||
            alreadyApplied ||
            checkingApplication ||
            applicationCheckFailed
          }
        >
          {isApplying
            ? "Submitting…"
            : alreadyApplied
            ? "Already applied"
            : checkingApplication
            ? "Checking application…"
            : isUnavailable
            ? "Applications closed"
            : "Apply"}
        </Button>
      </Box>
      <Dialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Application sent</DialogTitle>

        <DialogContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            Your application was sent successfully.
          </Alert>

          <Typography>
            This role has been saved to your profile under Applied volunteer
            positions.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            {notificationStatus === "sent"
              ? "The organisation notification email has been sent."
              : notificationStatus === "test_sent"
              ? "A test notification was sent to the staging test inbox."
              : notificationStatus === "pending" ||
                notificationStatus === "processing"
              ? "The organisation notification is pending. Your application is saved."
              : "Your application is saved, but the organisation notification needs attention. You do not need to apply again."}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => router.push("/recommended-initiatives")}>
            Back to recommendations
          </Button>

          <Button
            variant="contained"
            onClick={() => router.push("/profile#applied-volunteer-positions")}
            sx={{
              background: "#FFD15C",
              color: "text.primary",
            }}
          >
            View profile
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}