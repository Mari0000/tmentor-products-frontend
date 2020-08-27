import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { CardActionArea } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  ProductCard: {
    maxWidth: 343,
    descriptionArea: {
      direction: "row",
      justify: "flex-start",
      alignItems: "center"
    },
    borderRadius: 12,
    padding: 12,
  },
}));

export const ProductCard = React.memo(function ProductCard({product}) {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={cx(classes.ProductCard, shadowStyles.root)}>
      <CardActionArea>
      <CardMedia
        className={cx(classes.ProductCard_media, mediaStyles.root)}
        image={product.image
        }
      />
      <CardContent >
        <TextInfoContent
          heading={`${product.name}`}
          body={
            `Price: ${product.price} EGP`
          }
        />
         <TextInfoContent
          body={
            `Brand: ${product.brand}`
          }
        />
      </CardContent>   
    </CardActionArea>
    </Card>
  );
});
export default ProductCard