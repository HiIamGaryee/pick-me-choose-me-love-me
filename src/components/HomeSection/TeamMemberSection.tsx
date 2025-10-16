import { Box, Typography } from "@mui/material";
import { ChromaGrid, ChromaItem } from "../ReactBits/ChromaGrid";

const TeamMemberSection = () => {
  const teamMembers: ChromaItem[] = [
    {
      image: "https://hiiamgaryee.vercel.app/assets/logo-a9f59115.png",
      title: "HiIamGaryee",
      subtitle: "Designer & Engineer",
      handle: "@HiIamGaryee",
      location: "Building playful productivity",
      borderColor: "#6C2BD9",
      gradient: "linear-gradient(145deg, #6C2BD9, #1B0B3A)",
      url: "https://hiiamgaryee.vercel.app/",
    },
  ];

  return (
    <Box sx={{ py: 10, background: "transparent" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={6}
        color="secondary.dark"
      >
        The Team
      </Typography>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ChromaGrid
          items={teamMembers}
          columns={1}
          rows={1}
          radius={400}
          damping={0.6}
          fadeOut={0.8}
          ease="power2.out"
        />
      </Box>
    </Box>
  );
};

export default TeamMemberSection;
