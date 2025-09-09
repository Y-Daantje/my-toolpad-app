import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';        
import RecipeReviewCard from '../data/RecipeReviewCards';
import cards from '../data/cardsinfo';

export default function CardsPages() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {cards.map((card, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}> 
            <RecipeReviewCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

