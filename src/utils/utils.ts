import { packagingExecutions } from "./data"

export const searchRecipesByUniqueCodeOrName = (search: string) => {
  const recipes = packagingExecutions.map((packagingExecution: Record<string, any>) => packagingExecution.recipe)
  return recipes.filter((recipe: Record<string, any>) => {
    return recipe.uniqueCode.toLowerCase().includes(search.toLowerCase()) || recipe.name.toLowerCase().includes(search.toLowerCase())
  })
}