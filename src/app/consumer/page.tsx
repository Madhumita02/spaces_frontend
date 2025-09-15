"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BLINKER_FONT_LINK = (
  <link
    href="https://fonts.googleapis.com/css2?family=Blinker:wght@400;700&display=swap"
    rel="stylesheet"
  />
);

const assetImages: { [key: string]: string[] } = {
  "Fanpit Beach house": ["/assets/bh1.jpg", "/assets/bh2.jpg", "/assets/bh3.jpg"],
  "Loft house": ["/assets/lh1.jpg", "/assets/lh2.jpg", "/assets/lh3.jpg"],
  "Stadium": ["/assets/s1.jpg", "/assets/s2.jpg", "/assets/s3.jpg"],
};

type Space = {
  _id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  mapsLink: string;
  city: string;
  state: string;
  postalCode: string;
  capacity: number;
  seating: string;
  areaSize: string;
  amenities: string[];
  images: string[];
  videos: string[];
  virtualTour: string;
  houseRules: string;
  availability: string;
  contact: string;
  tags: string;
  owner: string;
  hourlyRate: number;
  dailyRate: number;
  createdAt: string;
  updatedAt: string;
};

export default function BrandOwnerSpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    fetch("https://spaces-backend-wrmn.onrender.com/spaces")
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data);
        setLoading(false);
        const initialIndexes: { [id: string]: number } = {};
        data.forEach((space: Space) => {
          initialIndexes[space._id] = 0;
        });
        setImageIndexes(initialIndexes);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePrevImage = (spaceId: string, images: string[]) => {
    setImageIndexes((prev) => ({
      ...prev,
      [spaceId]: prev[spaceId] === 0 ? images.length - 1 : prev[spaceId] - 1,
    }));
  };

  const handleNextImage = (spaceId: string, images: string[]) => {
    setImageIndexes((prev) => ({
      ...prev,
      [spaceId]: prev[spaceId] === images.length - 1 ? 0 : prev[spaceId] + 1,
    }));
  };

  const getSpaceImages = (space: Space): string[] => {
    if (assetImages[space.name]) {
      return assetImages[space.name];
    }
    return space.images || [];
  };

  const getImageUrl = (img: string) => {
    if (!img) return "";
    if (img.startsWith("http") || img.startsWith("/assets/")) return img;
    return "https://spaces-backend-wrmn.onrender.com/uploads/" + img.replace(/^\/+/, "");
  };

  return (
    <>
      {BLINKER_FONT_LINK}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8f8ff 0%, #e9e3ff 100%)",
          fontFamily: "Blinker, sans-serif",
          py: 6,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img
            src="/assets/logo-transparent.png"
            alt="Spaces Logo"
            style={{
              width: "320px",
              maxWidth: "90vw",
              filter: "drop-shadow(0 2px 8px #8C52FF33)",
            }}
          />
        </Box>
        {loading ? (
          <Typography sx={{ textAlign: "center", color: "#8C52FF" }}>
            Loading spaces...
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {spaces.map((space) => {
              const images = getSpaceImages(space);
              return (
                <Box
                  key={space._id}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 370px" },
                    maxWidth: 370,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(140,82,255,0.10)",
                      fontFamily: "Blinker, sans-serif",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    {/* Image Slideshow */}
                    <Box
                      sx={{
                        position: "relative",
                        height: 220,
                        background: "#e9e3ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {images.length > 0 ? (
                        <>
                          <img
                            src={getImageUrl(images[imageIndexes[space._id] || 0])}
                            alt={space.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {images.length > 1 && (
                            <>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  left: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  background: "#fff",
                                  color: "#8C52FF",
                                  "&:hover": { background: "#e9e3ff" },
                                }}
                                onClick={() => handlePrevImage(space._id, images)}
                              >
                                <ArrowBackIosNewIcon />
                              </IconButton>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  right: 8,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  background: "#fff",
                                  color: "#8C52FF",
                                  "&:hover": { background: "#e9e3ff" },
                                }}
                                onClick={() => handleNextImage(space._id, images)}
                              >
                                <ArrowForwardIosIcon />
                              </IconButton>
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 8,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  display: "flex",
                                  gap: 1,
                                }}
                              >
                                {images.map((_, idx) => (
                                  <Box
                                    key={idx}
                                    sx={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      background:
                                        imageIndexes[space._id] === idx
                                          ? "#8C52FF"
                                          : "#fff",
                                      border: "1px solid #8C52FF",
                                    }}
                                  />
                                ))}
                              </Box>
                            </>
                          )}
                        </>
                      ) : (
                        <Typography
                          sx={{
                            color: "#8C52FF",
                            fontWeight: 600,
                            fontFamily: "Blinker, sans-serif",
                          }}
                        >
                          No photos available
                        </Typography>
                      )}
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#8C52FF",
                          fontWeight: 700,
                          fontFamily: "Blinker, sans-serif",
                          mb: 1,
                        }}
                      >
                        {space.name}
                      </Typography>
                      <Typography sx={{ color: "#555", mb: 1 }}>
                        {space.description}
                      </Typography>
                      <Chip
                        label={space.category}
                        sx={{
                          background: "#8C52FF",
                          color: "#fff",
                          fontWeight: 600,
                          fontFamily: "Blinker, sans-serif",
                          mb: 1,
                        }}
                      />
                      <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 1 }}>
                        <b>Location:</b> {space.address}, {space.city}, {space.state}
                      </Typography>
                      <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 1 }}>
                        <b>Capacity:</b> {space.capacity} | <b>Seating:</b> {space.seating}
                      </Typography>
                      <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 1 }}>
                        <b>Area:</b> {space.areaSize}
                      </Typography>
                      <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 1 }}>
                        <b>Hourly Rate:</b> ₹{space.hourlyRate} | <b>Daily Rate:</b> ₹{space.dailyRate}
                      </Typography>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        {space.amenities?.map((a, i) => (
                          <Chip
                            key={i}
                            label={a}
                            sx={{
                              background: "#e9e3ff",
                              color: "#8C52FF",
                              fontWeight: 500,
                              fontFamily: "Blinker, sans-serif",
                              mr: 0.5,
                              mb: 0.5,
                            }}
                          />
                        ))}
                      </Box>
                      <Typography sx={{ fontSize: "0.9rem", color: "#888", mb: 1 }}>
                        <b>Contact:</b> {space.contact}
                      </Typography>
                      <a
                        href={space.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#8C52FF",
                          textDecoration: "underline",
                          fontFamily: "Blinker, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        View on Maps
                      </a>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
