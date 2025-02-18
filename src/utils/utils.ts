/**
 * Mock database search for recipes by unique code or name
 * @param search 
 * @returns 
 */
export const searchRecipesByUniqueCodeOrName = (packagingExecutions: Record<string, any> = [], search: string) => {
  const recipes = packagingExecutions.map((packagingExecution: Record<string, any>) => packagingExecution.recipe)
  return recipes.filter((recipe: Record<string, any>) => {
    return recipe.uniqueCode.toLowerCase().includes(search.toLowerCase()) || recipe.name.toLowerCase().includes(search.toLowerCase())
  })
}
