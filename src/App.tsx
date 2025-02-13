import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecipeDialogForm from './containers/RecipeDialogForm';

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
    <Stack spacing={2} direction="row">
      <Button onClick={toggleOpenRecipeDialog}>Faire une contre-pesée/reprod</Button>

      <RecipeDialogForm
        onClose={toggleOpenRecipeDialog}
        open={isOpenRecipeDialog}
        onSubmit={handleSelectRecipe}
      />
    </Stack>
  );
}

export default App
