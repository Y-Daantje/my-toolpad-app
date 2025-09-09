import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";

// simplified: no IconButtonProps
type ExpandMoreProps = {
  expand: boolean;
  children: React.ReactNode;
  ariaExpanded?: string;
  ariaLabel?: string;
  onClick: () => void;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props as any;
  return <IconButton {...other} />;
})<{ expand: boolean }>(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

// 👇 props for reuse
type RecipeReviewCardProps = {
  title: string;
  subheader: string;
  image: string;
  description: string;
};

export default function RecipeReviewCard({
  title,
  subheader,
  image,
  description,
}: RecipeReviewCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(0);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/** here you can add the styling to the card with sx */}
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{title[0]}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          sx={{ color: "#e72f70ff", "&:hover": { color: "red" } }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          sx={{ color: "#2f94e7ff", "&:hover": { color: "blue" } }}
        >
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component="legend">Rate {title}</Typography>
          <Rating
            name={`rating-${title}`}
            value={rating}
            onChange={(_event, newValue) => setRating(newValue)}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
