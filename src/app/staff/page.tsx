"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function HahaPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f8ff 0%, #e9e3ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Blinker, sans-serif",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          borderRadius: 5,
          boxShadow: "0 8px 32px rgba(140,82,255,0.12)",
          p: 5,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <SentimentVeryDissatisfiedIcon
          sx={{ fontSize: 60, color: "#8C52FF", mb: 2 }}
        />
        <Typography
          variant="h5"
          sx={{
            color: "#8C52FF",
            fontWeight: 700,
            fontFamily: "Blinker, sans-serif",
            mb: 2,
          }}
        >
          Sorry, I didn&apos;t have time 😢
        </Typography>
        <Typography
          sx={{
            color: "#555",
            fontFamily: "Blinker, sans-serif",
            mb: 3,
            fontSize: "1.1rem",
          }}
        >
          (Ps.m Why be a staff when you can be a consumer?) 
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            background: "#8C52FF",
            color: "#fff",
            fontWeight: 700,
            fontFamily: "Blinker, sans-serif",
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: "0 2px 8px #8C52FF33",
            "&:hover": { background: "#7a3ee6" },
          }}
          onClick={() => router.push("/")}
        >
          Back to Dashboard
          </Button>
      </Box>
    </Box>
  );
}