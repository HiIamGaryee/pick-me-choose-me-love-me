import { Box, Grid } from "@mui/material";
import Layout from "../../Layout";
import { DatePlanCard, dateData } from "./";

const SalesPage = () => {
  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {dateData.map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan.plan_id}>
              <DatePlanCard plan={plan} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default SalesPage;
