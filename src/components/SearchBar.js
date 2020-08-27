import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { search } from "../service/search";
import Typography from '@material-ui/core/Typography';
import { ProductCard } from "./ProductCard";
import { Button, Grid, MenuItem, Select, Slider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 50,
    direction: "row",
    justify: "center",
    alignItems: "center"
  },
  SearchBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  
  SearchBar_input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  SearchBar_iconButton: {
    padding: 10
  },
  SearchBar_slider: {
    width: 300,
  },
  SearchBar_component: {
    margin: 50,
  },
  SearchBar_form: {
    direction: "row"
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function SearchBar() {
  const [productName, setProductName] = useState();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [price, setPrice] = useState([1, 5000])
  const [brand, setBrand] = useState();
  const classes = useStyles();

  const submit = async (e) => {
    e.preventDefault();
    let query = {lowerPrice: price[0], upperPrice: price[1]};
    if(brand){
      query['brand'] = brand;
    }
    if(category){
      query['category'] = category;
    }
    if(productName){
      query['name'] = productName;
    }
    let response = await search(query);
    console.log(response.data);
    if(response.data){
        setProducts(response.data)
    }
  }

  const handleCategoryChange = async (e) => {
    setCategory(e.target.value);
  }
  
  const handleBrandChange = async (e) => {
    setBrand(e.target.value);
  }
  const handlePriceChange = async (e, newValue) => {
    setPrice(newValue);
  }
  const handleProductNameChange = async (e) => {
    setProductName(e.target.value);
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item container xs={6} sm={3}>
          <InputBase
                      className={classes.SearchBar_input}
                      placeholder="products search"
                      value={productName}
                      onChange={handleProductNameChange}
                      inputProps={{ "aria-label": "search google maps" }}
                      />
          </Grid>
          <Grid item xs={6} sm={3}>Category
            <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          onChange={handleCategoryChange}
                          >
                          <MenuItem value={""}>All</MenuItem> 
                          <MenuItem value={1}>Phone Accessories</MenuItem>
                          <MenuItem value={2}>Mobile Phones</MenuItem>
                          <MenuItem value={3}>Laptops</MenuItem>
              </Select>
          </Grid>
          <Grid item xs={6} sm={3}>Brand
          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={brand}
                          onChange={handleBrandChange}
                          >
                          <MenuItem value={""}>All</MenuItem>  
                          <MenuItem value={"SUPCASE"}>SUPCASE</MenuItem>
                          <MenuItem value={"OtterBox"}>OtterBox</MenuItem>
                          <MenuItem value={"Speck"}>Speck</MenuItem>
                          <MenuItem value={"Samsung"}>Samsung</MenuItem>
                          <MenuItem value={"Apple"}>Apple</MenuItem>
                          <MenuItem value={"Asus"}>Asus</MenuItem>
                          <MenuItem value={"HIDevolution"}>HIDevolution</MenuItem>
                          <MenuItem value={ "MSI"}>MSI</MenuItem>
                          <MenuItem value={"Alienware"}>Alienware</MenuItem>
                          <MenuItem value={"Razer"}>Razer</MenuItem>
                      </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
          <div className={classes.SearchBar_slider}>
                          <Typography id="range-slider" gutterBottom>
                          Price Range
                        </Typography>
                        <Slider
                          value={price}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                          min={1}
                          max={5000}
                        />
                      </div>
                      <Button variant="contained" color="primary" onClick={submit}>Search</Button>
          </Grid>
          <Grid item container xs={12}>
          {
                products.map(product => (
                  <Grid item xs={6} sm={3}>
                <ProductCard key={product._id} product={product} />
                </Grid>
                ))
            }
          </Grid>
        </Grid>
      </div>
    </>
  );
}