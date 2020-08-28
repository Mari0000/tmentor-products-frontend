import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { search } from "../service/search";
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Products from "./Products";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 50,
    direction: "row",
    justify: "center",
    alignItems: "center"
  },
  SearchBar_slider: {
    width: 300,
  },
  SearchBar_form: {
    direction: "row"
  },
  SearchBar_formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function SearchBar() {
  const [productName, setProductName] = useState();
  const [productNames, setProductNames] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [price, setPrice] = useState([1, 5000])
  const [brand, setBrand] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const response = await search();
      const productNames = response.data.map((product) => product.name)
      setProductNames(productNames);
    }
    fetchData();
  }, [products]); 

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
    console.log(query);
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
          <Grid item xs={6} sm={3}>
             <Autocomplete
                freeSolo
                style={{ width: 300 }}
                disableClearable
                options={productNames.map((productName) => productName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={productName}
                    onChange={handleProductNameChange}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
              <Button variant="contained" color="primary" onClick={submit}>Search</Button>
          </Grid>
          <Grid item xs={6} sm={3} >
          <FormControl className={classes.SearchBar_formControl}>
            <InputLabel id="category-simple-select-label">Category</InputLabel>
            <Select
                          labelId="category-simple-select-label"
                          id="category-simple-select"
                          value={category}
                          onChange={handleCategoryChange}
                          >
                          <MenuItem value={""}>All</MenuItem> 
                          <MenuItem value={1}>Phone Accessories</MenuItem>
                          <MenuItem value={2}>Mobile Phones</MenuItem>
                          <MenuItem value={3}>Laptops</MenuItem>
              </Select>
            </FormControl>  
            <FormControl className={classes.SearchBar_formControl}>
              <InputLabel id="brand-select-label">Brand</InputLabel>
              <Select
                              labelId="brand-select-label"
                              id="brand-simple-select"
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
          </FormControl>   
          <FormControl className={classes.SearchBar_formControl}>
          <div className={classes.SearchBar_slider}>
                          <Typography id="range-slider" gutterBottom>
                          Price Range
                        </Typography>
                        <Slider
                          value={price}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          min={1}
                          max={5000}
                        />
                      </div>
          </FormControl>  
          </Grid>
          <Grid item container xs={12}>
            <Products products={products} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}