import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { packagingExecutions } from '../utils/data';

const Recipes = () => {
  return (
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
  );
}

export default Recipes
