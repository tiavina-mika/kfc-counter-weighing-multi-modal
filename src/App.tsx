import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecipeDialogForm from './containers/RecipeDialogForm';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import SectionsSelectionDialogForm from './containers/SectionsSelectionDialogForm';

const App = () => {
  const [isOpenRecipeDialog, setIsOpenRecipeDialog] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Record<string, any> | null>(null)

  const toggleOpenRecipeDialog = () => setIsOpenRecipeDialog(!isOpenRecipeDialog)

  const handleSelectRecipe = (recipe: Record<string, any>) => {
    setSelectedRecipe(recipe)
    toggleOpenRecipeDialog()
  }

  const handleSubmitSections = (values: Record<string, any>) => {
    console.log('values', values)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: "column", flexGrow: 1 }}>
      <CssBaseline />
      {/* app bar */}
      <AppBar position="static" component="nav" sx={{ bgcolor: '#000' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ width: '140px' }}>
            <img alt="foodcheri" src="/logo.svg" />
          </Box>
        </Toolbar>
      </AppBar>
      {/* page title */}
      <Typography
        variant="h6"
        sx={{ ml: 4, mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Ouvrir la série des modales de contre-pesée
      </Typography>
      {/* content */}
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={toggleOpenRecipeDialog} variant="contained">Faire une contre-pesée/reprod</Button>
      </Box>
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
    </Box>
  );
}

export default App
