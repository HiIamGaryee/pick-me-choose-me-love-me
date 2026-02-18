import {
  Box,
  Card,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Layout from "../../Layout";

import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAdminSales } from "../../api/admin/getAdminSales";

const SalesList = () => {
  const navigate = useNavigate();

  const { data: salesList } = useQuery({
    queryKey: ["getAdminSales", 100, 0],
    queryFn: () => getAdminSales(100, 0),
  });

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sales List
          </Typography>
          <Box gap={2}>
            <IconButton onClick={() => navigate(`/admin/product-list`)}>
              <InventoryRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/subscrible-list`)}>
              <MarkEmailReadRoundedIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/admin/contact-us-list`)}>
              <AddIcCallRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Shipping</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Product Code</TableCell>
                    <TableCell>Product Price</TableCell>
                    <TableCell>Product Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesList?.data?.flatMap((order: any, index: number) =>
                    order.items.map((product: any, productIndex: number) => (
                      <TableRow
                        key={`${order._id}-${productIndex}`}
                        sx={{ verticalAlign: "top" }}
                      >
                        {/* Display order details only on the first product row */}
                        {productIndex === 0 && (
                          <>
                            <TableCell rowSpan={order.items.length}>
                              {index + 1}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.user_email}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.shipping}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.total}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.address}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.mobile}
                            </TableCell>
                            <TableCell rowSpan={order.items.length}>
                              {order.status}
                            </TableCell>
                          </>
                        )}
                        {/* Product details for each row */}
                        <TableCell>{product.product_code}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SalesList;
