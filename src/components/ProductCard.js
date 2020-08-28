import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { Box, CardActionArea } from '@material-ui/core';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles(() => ({
  ProductCard: {
    maxWidth: 343,
    descriptionArea: {
      direction: "row",
      justify: "flex-start",
      alignItems: "center"
    },
    borderRadius: 12,
    margin: 12
  },
  ProductCard_cardContent: {
    backgroundColor: "#F2F8FD"
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

export const ProductCard = React.memo(function ProductCard({product}) {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  return (
    <Card className={cx(classes.ProductCard, shadowStyles.root)}>
      <CardActionArea>
      <CardMedia
        className={cx(classes.ProductCard_media, mediaStyles.root)}
        image={product.image
        }
      />
      <CardContent className={classes.ProductCard_cardContent}>
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={classes.statLabel}>Brand</p>
          <p className={classes.statValue}>{product.brand}</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={classes.statLabel}>Price</p>
          <p className={classes.statValue}>{` ${product.price} EGP`}</p>
        </Box>
      </Box>
      </CardContent>   
    </CardActionArea>
    </Card>
  );
});
export default ProductCard