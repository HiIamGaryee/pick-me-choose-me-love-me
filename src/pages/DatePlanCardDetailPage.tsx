import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import {
  getAdminDatePlanCard,
  getPublicDatePlanCard,
} from "../api/datePlanCards";

export default function DatePlanCardDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        // try public first
        const pub = await getPublicDatePlanCard(parseInt(id));
        setCard(pub);
      } catch (_) {
        try {
          const adm = await getAdminDatePlanCard(parseInt(id));
          setCard(adm);
        } catch (e) {
          setError("Failed to load card");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <Layout>
      <Container sx={{ py: { xs: 2, md: 4 } }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error || !card ? (
          <Typography color="error">{error || "Card not found"}</Typography>
        ) : (
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight={800}>
                {card.title}
              </Typography>
              {card.thumbnail_url && (
                <Box
                  component="img"
                  src={card.thumbnail_url}
                  alt={card.title}
                  sx={{
                    width: 1,
                    maxHeight: 360,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              )}
              <Typography variant="body1" color="text.secondary">
                {(card as any).description || card.subtitle}
              </Typography>
              {card.tags && (
                <Typography variant="caption" color="text.secondary">
                  Tags: {card.tags}
                </Typography>
              )}
              <Typography variant="body2">
                Price: {card.price} {card.currency}
              </Typography>
              <Typography variant="body2">
                Status: {(card as any).status || "published"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(card.created_at).toLocaleString()}
              </Typography>
            </Stack>
          </Paper>
        )}
      </Container>
    </Layout>
  );
}
