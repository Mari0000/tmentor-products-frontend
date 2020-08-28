import { Grid } from '@material-ui/core';
import React from 'react';
import ProductCard from './ProductCard';

export const Products = React.memo(function Products({products}) {
  return (
      <>
    {
        products.map(product => (
        <Grid item xs={12} lg={3} sm={6}>
            <ProductCard key={product._id} product={product} />
        </Grid>
        ))
    }
    </>
  );
});
export default Products