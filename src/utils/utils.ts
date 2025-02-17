import { packagingExecutions } from "./data"

export const searchRecipesByUniqueCodeOrName = (search: string) => {
  const recipes = packagingExecutions.map((packagingExecution: Record<string, any>) => packagingExecution.recipe)
  return recipes.filter((recipe: Record<string, any>) => {
    return recipe.uniqueCode.toLowerCase().includes(search.toLowerCase()) || recipe.name.toLowerCase().includes(search.toLowerCase())
  })
}

export const formatPECounterWeighingSectionsInitialValues = (packagingExecution: Record<string, any> | null) => {
  const sections = packagingExecution?.sections || []
  return sections.map((section: Record<string, any>) => {
    if (section.counterWeighing) {
      return { ...section, reason: section.counterWeighing.reason, weight: section.counterWeighing.weight || 0 }
    }

    return section
  })
}
