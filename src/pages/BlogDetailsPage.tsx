import {
  Avatar,
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";

type Social = { id: string; name: string; icon: string; url: string };
type Article = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  author: { name: string; avatar: string; bio?: string };
  cover: string;
  tags: string[];
  html: string; // full HTML content string
};

// Mock socials (icon URLs can be your own assets later)
const socials: Social[] = [
  {
    id: "tw",
    name: "Twitter/X",
    icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg",
    url: "https://twitter.com/share",
  },
  {
    id: "fb",
    name: "Facebook",
    icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f464.svg",
    url: "https://facebook.com/sharer.php",
  },
  {
    id: "ln",
    name: "LinkedIn",
    icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f465.svg",
    url: "https://www.linkedin.com/sharing/share-offsite/",
  },
];

// Mock article list with HTML body
const articles: Article[] = [
  {
    id: "kota-kemuning-south",
    title: "Kota Kemuning South Is Booming—Here’s Everything You Need to Know",
    date: "13 Oct 2025",
    readTime: "4 min read",
    author: {
      name: "Andrea William",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      bio: "Urban lifestyle writer and researcher.",
    },
    cover:
      "https://images.unsplash.com/photo-1526403226128-1fcd4f2a66b3?q=80&w=1600&auto=format&fit=crop",
    tags: ["City", "Guides", "Trends"],
    html: `
      <p><em>From green walkways to a commercial hub with sport courts, here’s why everyone’s suddenly talking about this rising lifestyle hotspot.</em></p>
      <p>Green, peaceful, and well‑planned, Kota Kemuning South has long been the go‑to suburban haven for families craving serenity without straying too far from the city. But just a little further south, something new is stirring.</p>
      <h3>What’s changing?</h3>
      <p>It’s no longer the quiet sibling. With new mixed‑use developments, bicycle lanes, and vibrant F&amp;B pockets, the area is evolving into a destination in its own right — not just a stop along the way.</p>
      <blockquote>“Think of it as the younger, more energetic version of the original — brimming with possibilities.”</blockquote>
      <p>For early movers, this is a rare opportunity. Getting in at the ground floor of a township that’s set to transform the southern Klang Valley landscape means becoming part of something bigger than just a purchase.</p>
      <ul>
        <li>Improved connectivity to key highways</li>
        <li>Community‑first amenities and parks</li>
        <li>Commercial clusters designed for walkability</li>
      </ul>
      <p><strong>Disclaimer:</strong> This article is for general information only and should not be considered financial advice.</p>
    `,
  },
];

export default function BlogDetailsPage() {
  const { id } = useParams();

  const article = useMemo<Article>(() => {
    return articles.find((a) => a.id === id) || articles[0];
  }, [id]);

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        <Grid container spacing={3}>
          {/* Content column */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
              {article.title}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Avatar
                src={article.author.avatar}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2" color="text.secondary">
                {article.author.name} • {article.date} • {article.readTime}
              </Typography>
            </Stack>

            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: (t) => `1px solid ${t.palette.divider}`,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  pt: "56.25%",
                  backgroundImage: `url(${article.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                }}
              />
            </Box>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {article.tags.map((t) => (
                <Chip key={t} size="small" label={t} />
              ))}
            </Stack>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: 1.8,
                  "& h3": { mt: 3, mb: 1 },
                  "& blockquote": {
                    m: 0,
                    px: 2,
                    py: 1,
                    borderLeft: (t) => `4px solid ${t.palette.primary.main}`,
                    color: "text.secondary",
                    bgcolor: "light.light",
                    borderRadius: 1,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Share
              </Typography>
              <Stack direction="row" spacing={1}>
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      src={s.icon}
                      alt={s.name}
                    />
                  </a>
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                About the author
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src={article.author.avatar} />
                <Box>
                  <Typography fontWeight={600}>
                    {article.author.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.author.bio || "Contributor"}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
