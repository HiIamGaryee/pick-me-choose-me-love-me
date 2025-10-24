import { SwipeLeft, SwipeRight } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: string;
  rightAction?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction = "Pass",
  rightAction = "Like",
}) => {
  const theme = useTheme();
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) return;

    const currentTouchX = e.touches[0].clientX;
    const deltaX = currentTouchX - startX;
    setCurrentX(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 100;

    if (currentX > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (currentX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }

    // Reset position
    setCurrentX(0);
    setIsDragging(false);
    setStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startX === null) return;

    const deltaX = e.clientX - startX;
    setCurrentX(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 100;

    if (currentX > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (currentX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }

    setCurrentX(0);
    setIsDragging(false);
    setStartX(null);
  };

  const rotation = currentX * 0.1;
  const opacity = Math.max(0.3, 1 - Math.abs(currentX) / 200);

  return (
    <Box
      ref={cardRef}
      sx={{
        position: "relative",
        transform: `translateX(${currentX}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging ? "none" : "all 0.3s ease",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "pan-y",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}

      {/* Swipe indicators */}
      {isDragging && (
        <>
          {currentX > 50 && (
            <Box
              sx={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                zIndex: 10,
              }}
            >
              <IconButton
                sx={{
                  bgcolor: theme.palette.success.main,
                  color: "white",
                  "&:hover": { bgcolor: theme.palette.success.dark },
                }}
              >
                <SwipeRight />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.success.main,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              >
                {rightAction}
              </Typography>
            </Box>
          )}

          {currentX < -50 && (
            <Box
              sx={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                zIndex: 10,
              }}
            >
              <IconButton
                sx={{
                  bgcolor: theme.palette.error.main,
                  color: "white",
                  "&:hover": { bgcolor: theme.palette.error.dark },
                }}
              >
                <SwipeLeft />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.error.main,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              >
                {leftAction}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SwipeableCard;
