import React from "react";
import {
  KeyboardBackspaceRounded,
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import {
  Typography,
  makeStyles,
  Grid,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { customIcons } from "./CustomIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    width: "80%",
    margin: "auto",
    paddingTop: "50px",
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
}));

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function DetailsPage(props) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const recipe = props.recipes.find((recipe) => recipe.id === parseInt(id));
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className={classes.root}>
        <Button
          size="small"
          onClick={() => history.push("/")}
          startIcon={<KeyboardBackspaceRounded />}
        >
          Go Back
        </Button>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <img
              src={recipe.image}
              className={classes.image}
              alt={recipe.name}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography align="right" color="textSecondary">
              {" "}
              Recipe
            </Typography>
            <Typography style={{ fontWeight: 600 }} align="right" variant="h3">
              {" "}
              {recipe.name}
            </Typography>
            <Box
              component="fieldset"
              borderColor="transparent"
              style={{ float: "right" }}
            >
              <Rating
                defaultValue={4}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
            </Box>
            <Grid container>
              <Grid item xs={11}>
                <Typography color="textSecondary" align="right">
                  Make this item as Your Favorite
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => props.changeFav(recipe.id)}
                >
                  {recipe.isFav ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography align="right" color="textSecondary">
                Desciption
              </Typography>
              <Typography align="right">{recipe.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
