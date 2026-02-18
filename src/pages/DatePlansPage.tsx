import { Box, Typography } from "@mui/material";
import Layout from "../Layout";

export default function DatePlansPage() {
  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Date Plans
        </Typography>
      </Box>
    </Layout>
  );
}

export {};

