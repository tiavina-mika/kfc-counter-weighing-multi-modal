import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecipeDialogForm from './containers/RecipeDialogForm';
import { Container, Box } from '@mui/material';

const App = () => {
  const [isOpenRecipeDialog, setIsOpenRecipeDialog] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Record<string, any> | null>(null)

  const toggleOpenRecipeDialog = () => setIsOpenRecipeDialog(!isOpenRecipeDialog)

  const handleSelectRecipe = (recipe: Record<string, any>) => {
    console.log('recipe: ', recipe);
    return
    setSelectedRecipe(recipe)
    toggleOpenRecipeDialog()
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack spacing={2}>
        <Button onClick={toggleOpenRecipeDialog} variant="contained">Faire une contre-pesée/reprodx</Button>

        <RecipeDialogForm
          onClose={toggleOpenRecipeDialog}
          open={isOpenRecipeDialog}
          onSubmit={handleSelectRecipe}
        />
      </Stack>
    </Box>
  );
}

export default App
