"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { UserContext } from "@/modules/context/user-context";
import { UserRole } from "@/modules/types/types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Need to dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AboutUsEditor() {
  const { user } = useContext(UserContext) ?? {};
  const [contentHtml, setContentHtml] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Default to empty so it doesn't show unless they edited it or want to
  const isAdmin = user?.role === UserRole.admin;

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const res = await fetch(`${baseURL}/about`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setContentHtml(data.data.contentHtml || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const res = await fetch(`${baseURL}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ contentHtml }),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
      } else {
        alert("Failed to save changes. Make sure you are an admin.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving context.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this custom block? This action cannot be undone.")) return;
    
    setDeleting(true);
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const res = await fetch(`${baseURL}/about`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setContentHtml("");
        setIsEditing(false);
      } else {
        alert("Failed to delete changes. Make sure you are an admin.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting context.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return null;
  }

  // If not admin and there's no content, don't show anything 
  // (allows Contentful to be the only thing shown by default)
  if (!isAdmin && !contentHtml) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {isAdmin && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {isEditing ? (
            <Box display="flex" gap={2}>
              <Button variant="outlined" onClick={() => setIsEditing(false)} disabled={saving}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                {contentHtml ? "Edit Custom Block" : "Add Custom Block"}
              </Button>
              {contentHtml && (
                <Button variant="outlined" color="error" onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete Custom Block"}
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}

      {isEditing ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box className="editor-container" sx={{ height: 400, mb: 6 }}>
            <ReactQuill
              theme="snow"
              value={contentHtml}
              onChange={setContentHtml}
              style={{ height: "100%" }}
            />
          </Box>
        </Paper>
      ) : contentHtml ? (
        <Paper elevation={0} sx={{ p: 4, background: "transparent" }}>
          <Box 
            className="ql-editor" 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
            sx={{
              "& h2, & h3": {
                fontFamily: "'__Source_Serif_4_0def0b', '__Source_Serif_4_Fallback_0def0b', Helvetica, Arial, sans-serif",
                color: "#2C3235",
                fontWeight: 400,
                textAlign: "center",
                mb: 2,
                mt: 4
              },
              "& p": {
                fontFamily: "'__Lato_7bbcb9', '__Lato_Fallback_7bbcb9', Helvetica, Arial, sans-serif",
                color: "#2C3235",
                fontSize: "1.125rem",
                lineHeight: "1.5rem",
                mb: 2
              }
            }}
          />
        </Paper>
      ) : null}
    </Container>
  );
}
