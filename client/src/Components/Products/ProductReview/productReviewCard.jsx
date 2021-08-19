import {
    makeStyles,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 500,
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    }
}));

export const ProductReviewCard = ({ reviews }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={4} style={{width:'90%',margin: "auto"}}>
            {reviews.length ? (
                reviews.map((review) => {
                    return (
                        <Grid item xs={12} sm={6} lg={4} key={review.id}>
                            <Paper className={classes.paper} >
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Rating
                                            readOnly
                                            name={`review ${review.userId}`}
                                            value={review?.stars}
                                            size="large"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    alignItems="center"
                                    style={{ maxWidth: "90%", margin: "auto" }}
                                >
                                    <h3 style={{
                                      fontFamily: "Heebo",
                                      letterSpacing: "-0.5px",
                                      width: "100%"
                                    }}>
                                        {review.anonymous ? "Anonymous" : review.user.username}
                                    </h3>
                                    <p style={{ display: "inline" }}>
                                        {review?.description}
                                    </p>
                                </Grid>
                            </Paper>
                        </Grid>
                    );
                })
            ) : (
                <h2 
                  style={{
                    fontFamily: `"Montserrat", sans-serif`, 
                    fontWeight: "300",
                    margin: "50px 0"
                  }}
                >
                  No reviews registered yet
                </h2>
            )}
            </Grid>
    );
};

export default ProductReviewCard;
