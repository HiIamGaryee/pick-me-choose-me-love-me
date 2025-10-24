import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const footerLinks = [
  {
    title: "SITEMAP",
    links: [
      { name: "About us", link: "#" },
      { name: "Services", link: "#" },
      // { name: "Blog", link: "/blog" },
      { name: "Upcoming Events", link: "/events" },
    ],
  },
  {
    title: "HELP",
    links: [
      // { name: "Getting started", link: "/getting-started" },
      { name: "Package", link: "/package" },
      { name: "FAQ", link: "/faq" },
      { name: "Referral", link: "/referral" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (t) => t.palette.secondary.main,
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
        gap: 4,
        color: (t) => t.palette.common.white,
      }}
    >
      {/* Scalloped top border */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: -24,
          left: 0,
          right: 0,
          height: 24,
          backgroundImage: (t) =>
            `radial-gradient(12px 12px at 12px 24px, ${t.palette.light.main} 12px, transparent 13px)`,
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top left",
          pointerEvents: "none",
        }}
      />
      {/* Scalloped bottom border */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: -24,
          left: 0,
          right: 0,
          height: 24,
          backgroundImage: (t) =>
            `radial-gradient(12px 12px at 12px 0px, ${t.palette.light.main} 12px, transparent 13px)`,
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom left",
          pointerEvents: "none",
        }}
      />
      {/* Left big message */}
      <Box>
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mb: 2,
            lineHeight: 1.1,
            background:
              "linear-gradient(90deg, #E40303 0%, #FF8C00 25%, #FFED00 50%, #008026 65%, #004DFF 80%, #750787 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Pick Me Choose Me Love Me
        </Typography>
        <Stack direction="row" spacing={1}>
          {[
            { key: "facebook", Icon: FacebookRoundedIcon, color: "#1877F2" },
            { key: "instagram", Icon: InstagramIcon, color: "#E1306C" },
            { key: "x", Icon: XIcon, color: "#111111" },
            { key: "youtube", Icon: YouTubeIcon, color: "#FF0000" },
            { key: "linkedin", Icon: LinkedInIcon, color: "#0A66C2" },
            { key: "pinterest", Icon: PinterestIcon, color: "#E60023" },
          ].map(({ key, Icon, color }) => (
            <IconButton key={key} size="small" aria-label={key} sx={{ color }}>
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Box>

      {/* Quick links */}
      {footerLinks.map((section) => (
        <Box key={section.title} sx={{ minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ color: "#fff", mb: 1 }}>
            {section.title}
          </Typography>
          <Stack spacing={0.75}>
            {section.links.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: (t) => t.palette.light.light,
                    "&:hover": { color: (t) => t.palette.info.light },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Box>
      ))}

      {/* <Box sx={{ flex: 1, minWidth: 200, mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: (t) => t.palette.common.white }}
        >
          SUBSCRIBE
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              variant="outlined"
              {...register("email")}
              helperText={errors.email?.message}
              size="small"
              placeholder="Enter email address"
              sx={{
                backgroundColor: (t) => t.palette.light.light,
                borderRadius: 999,
                flex: 1,
                marginRight: 1,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: (t) => t.palette.primary.main,
                color: (t) => t.palette.common.white,
                borderRadius: 999,
                px: 3,
              }}
            >
              SEND
            </Button>
          </Box>
        </form>
        {showSuccess && (
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              bottom: 120,
              right: 16,
              padding: 2,
              borderRadius: "12px",
            }}
          >
            🚀 Successfully submitted!
          </Paper>
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Facebook</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Twitter</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">LinkedIn</Typography>
          </Link>
        </Box>
      </Box> */}
      <Box
        sx={{ gridColumn: "1 / -1", mt: { xs: 4, md: 6 }, textAlign: "center" }}
      >
        <Typography
          variant="body2"
          sx={{ color: (t) => t.palette.common.white }}
        >
          © 2024 All rights reserved by Pick Me, Choose Me, Love Me Sdn Bhd.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
