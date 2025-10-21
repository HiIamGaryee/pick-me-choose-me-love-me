import { Box, Divider, Grid, Typography } from "@mui/material";
import { useSalesContext } from "../../context/sales-context";
import Layout from "../../Layout";
import DatePlanCard from "./components/DatePlanCard";
import { dateData } from "./data/dateData";

const SalesPage = () => {
  const { newlyAddedSales } = useSalesContext();

  // Combine existing data with newly added sales
  const allSales = [...newlyAddedSales, ...dateData];

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {newlyAddedSales.length > 0 && (
          <>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Your Newly Added Plans
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {newlyAddedSales.map((plan) => (
                <Grid item xs={12} md={6} lg={4} key={plan.plan_id}>
                  <DatePlanCard plan={plan} />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 3 }} />
          </>
        )}

        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          {newlyAddedSales.length > 0
            ? "All Available Plans"
            : "Available Date Plans"}
        </Typography>
        <Grid container spacing={3}>
          {allSales.map((plan) => (
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
