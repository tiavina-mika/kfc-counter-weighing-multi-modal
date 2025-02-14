import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { packagingExecutions } from '../utils/data';

const Recipes = () => {
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Typography variant="h6" component="h2" sx={{ p: 2 }}>
        Liste des recettes à rechercher pour la contre-pesée
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la recette</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packagingExecutions.map((packagingExecution: Record<string, any>, index: number) => (
              <TableRow key={packagingExecution.recipe.objectId + index}>
                <TableCell>{packagingExecution.recipe.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>       
      </TableContainer>

    </Paper>
  );
}

export default Recipes
