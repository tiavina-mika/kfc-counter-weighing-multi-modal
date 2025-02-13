import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecipeDialogForm from './containers/RecipeDialogForm';
import { Box } from '@mui/material';
import SectionsSelectionDialogForm from './containers/SectionsSelectionDialogForm';
import { packagingExecutions } from './utils/data';

const App = () => {
  const [isOpenRecipeDialog, setIsOpenRecipeDialog] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Record<string, any> | null>(packagingExecutions[0].recipe)
  // const [selectedRecipe, setSelectedRecipe] = useState<Record<string, any> | null>(null)

  const toggleOpenRecipeDialog = () => setIsOpenRecipeDialog(!isOpenRecipeDialog)

  const handleSelectRecipe = (recipe: Record<string, any>) => {
    setSelectedRecipe(recipe)
    toggleOpenRecipeDialog()
  }

  const handleSubmitSections = (values: Record<string, any>) => {
    console.log('values', values)
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
        <SectionsSelectionDialogForm
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onSubmit={handleSubmitSections}
        />
      </Stack>
    </Box>
  );
}

export default App
