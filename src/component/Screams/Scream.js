import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DeleteScream from "./DeleteScream";
import Card from "@material-ui/core/Card";
import { IconBtn } from "../../utils/IconBtn";
import { likeScream, unlikeScream } from "../../actions/scream";

//MUI
import ChatIcon from "@material-ui/icons/Chat";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Moment from "react-moment";
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    position: "relative",
    marginBottom: theme.spacing(2),
    height: "180px"
  },

  image: {
    minWidth: 100,
    flex: 1
  },
  detail: {
    padding: "5px 0 0 10px",
    flex: 2.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));
const Scream = ({
  scream: { body, createdAt, userImage, userHandle, id, likeCount },
  user,
  likeScream,
  unlikeScream
}) => {
  const handleLikeScream = () => {
    console.log("cc");
    likeScream(id);
  };
  const HandleUnLikeScream = () => {
    console.log("unlike");
    unlikeScream(id);
  };
  const classes = useStyles();
  const likeButton = !user.isAuthenticated ? (
    <IconBtn tip="like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </IconBtn>
  ) : user.likes.length != 0 &&
    user.likes.find(like => like.screamId === id) ? (
    <IconBtn tip="UnLike" onClick={HandleUnLikeScream}>
      <FavoriteIcon color="primary" />
    </IconBtn>
  ) : (
    <IconBtn tip="like" onClick={handleLikeScream}>
      <FavoriteBorderIcon color="primary" />
    </IconBtn>
  );
  const deleteButton =
    user.isAuthenticated && userHandle === user.credentials.handle ? (
      <DeleteScream screamId={id} />
    ) : null;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={userImage}
          title="Contemplative Reptile"
          className={classes.image}
        ></CardMedia>
        <div className={classes.detail}>
          <div>
            <Typography
              component={Link}
              to={`/users/${userHandle}`}
              variant="subtitle1"
              gutterBottom
              color="primary"
            >
              {userHandle}
            </Typography>
            {deleteButton}
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              gutterBottom
              gutterBottom
            >
              <Moment fromNow>{createdAt}</Moment>
            </Typography>
            <Typography variant="body2">{body}</Typography>
          </div>
          <div style={{ margin: "32px 0 0 -12px" }}>
            <span>
              {likeButton}
              <span>{likeCount}</span>
            </span>
            <span>
              <IconBtn tip="comments">
                <ChatIcon color="primary" />
              </IconBtn>
              <span>{1} comments</span>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

Scream.propTypes = {};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);