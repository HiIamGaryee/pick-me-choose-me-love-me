import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../Layout";
import { createReferral, listReferrals } from "../api/referrals";
import humanWithCoffee from "../assets/humanwithcoffee.png";

const referralStepList = [
  {
    title: "1. Coffee Points",
    description:
      "Earn 100 points for every friend you refer! Redeem points for coffee, supplies, or exclusive Pick Me, Choose Me, Love Me merchandise.",
    icon: (
      <img
        src={require("../assets/coffee-stamp.png")}
        alt="Coffee Points Icon"
        width={50}
        height={50}
      />
    ),
  },
  {
    title: "2. Tiered Rewards",
    description:
      "Unlock exciting rewards with each successful referral-10% off, free coffee, and exclusive discounts as you refer more friends.",
    icon: (
      <img
        src={require("../assets/coffeereward.png")}
        alt="Tiered Rewards Icon"
        width={50}
        height={50}
      />
    ),
  },
  {
    title: "3. VIP Referral",
    description:
      "VIP members enjoy double rewards for referrals and exclusive access to rare coffee blends- share the chaos and reap the benefits.",
    icon: (
      <img
        src={require("../assets/coffeeprize.png")}
        alt="VIP Referral Icon"
        width={50}
        height={50}
      />
    ),
  },
];

const ReferralPage = () => {
  const [referrerEmail, setReferrerEmail] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await listReferrals(20, 0);
      setReferrals(res.data || []);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await createReferral({
        referrer_email: referrerEmail,
        referee_email: refereeEmail,
        code: code || "GEN-REF",
      });
      setSuccess("Referral submitted");
      setRefereeEmail("");
      setCode("");
      load();
    } catch (e) {
      setError("Failed to submit referral");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "light.main",
          color: "white",
          p: 4,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" fontWeight="bold">
            Brew with Friends!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Get a 10% off for every successful referral you make. When your
            friend purchases coffee through your referral code, each of you will
            get a discount on your next order.
          </Typography>
        </Box>

        {/* Referral Card */}
        <Box sx={{ mt: 6 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={9}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: { xs: 2, md: 0 } }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                      Send Referral Code to Friends
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Invite your friends and earn rewards!
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Share your unique referral link:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        borderRadius: "4px",
                        mb: 2,
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        https://brewed-in-chaos.vercel.app/referral/1234
                      </Typography>
                      <Button variant="contained">Copy Link</Button>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#0077b5",
                          minWidth: 48,
                          minHeight: 48,
                        }}
                      >
                        <LinkedInIcon />
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1DA1F2",
                          minWidth: 48,
                          minHeight: 48,
                        }}
                      >
                        <TwitterIcon />
                      </Button>
                    </Box>

                    <Stack
                      spacing={1}
                      sx={{ mb: 2, maxWidth: 420, mx: "auto" }}
                    >
                      <TextField
                        label="Your Email"
                        value={referrerEmail}
                        onChange={(e) => setReferrerEmail(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Friend's Email"
                        value={refereeEmail}
                        onChange={(e) => setRefereeEmail(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Referral Code (optional)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        fullWidth
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading || !referrerEmail || !refereeEmail}
                      >
                        {loading ? "Sending..." : "Send Referral Invites"}
                      </Button>
                      {success && <Paper sx={{ p: 1.5 }}>✅ {success}</Paper>}
                      {error && <Paper sx={{ p: 1.5 }}>❌ {error}</Paper>}
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: "100%", md: "40%" },
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={humanWithCoffee}
                      alt="Referral Program"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Recent Referrals */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Recent Referrals
          </Typography>
          {referrals.length === 0 ? (
            <Typography color="text.secondary">No referrals yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {referrals.map((r) => (
                <Grid item xs={12} md={6} key={r.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <b>{r.referrer_email}</b> → {r.referee_email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Code: {r.code} • {new Date(r.created_at).toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Additional Perks Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Additional Perks
          </Typography>
          <Grid container spacing={4}>
            {referralStepList.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ h: 1, textAlign: "center" }}>
                  <CardContent>
                    {step.icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2">{step.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default ReferralPage;
