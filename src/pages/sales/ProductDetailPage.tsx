import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCode } from "../../api/admin/getProductByCode";
import Layout from "../../Layout";

const ProductDetailPage = () => {
  const location = useLocation();
  const initialProduct = (location.state as any)?.product;
  const { productCode } = useParams();

  const [product, setProduct] = useState<any>(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (product) return;
      if (!productCode) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getProductByCode(productCode);
        setProduct(data);
      } catch (e) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productCode]);

  // Functions to handle quantity changes
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Function to add product to local storage
  const handleAddToCart = () => {
    // Get the cart from local storage (or initialize an empty array)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = cart.find(
      (item: any) => item.code === product.code
    );

    if (existingProduct) {
      // Update the quantity of the existing product
      existingProduct.quantity += quantity;
    } else {
      // Add new product to the cart
      cart.push({
        name: product.name,
        code: product.code,
        price: product.price,
        quantity: quantity,
      });
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 4 }}>
          <Typography>Loading product...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <Box sx={{ p: 4 }}>
          <Typography color="error">{error || "Product not found"}</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container spacing={4} sx={{ p: 4 }}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              image={(() => {
                try {
                  return require(`../../assets/brewed-in-chaos/package-face/${product.code}.png`);
                } catch (error) {
                  return require(`../../assets/brewed-in-chaos/package-face/default.png`);
                }
              })()}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h5" color="primary">
                  ${product.price}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ maxWidth: 500 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">
                  {product.acidity ? `Acidity Level: ${product.acidity}` : null}
                </Typography>

                <Typography variant="caption">
                  {product.roast ? `Roast Level: ${product.roast}` : null}
                </Typography>

                <Typography variant="caption">
                  {product.processing
                    ? `Processing Method: ${product.processing}`
                    : null}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={handleDecrease}>
                    <RemoveRoundedIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton onClick={handleIncrease}>
                    <AddRoundedIcon />
                  </IconButton>
                </Box>

                <Box gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {showSuccess && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            bottom: 120,
            right: 16,
            padding: 2,
            zIndex: 1100,
            borderRadius: "8px",
          }}
        >
          🚀 Successfully add to Cart!
        </Paper>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
