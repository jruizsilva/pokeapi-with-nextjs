function handleToggleFavorites(id: number): void {
  const favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  )
  if (favorites.includes(id)) {
    const newFavorites = favorites.filter((el) => el !== id)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  } else {
    const newFavorites = [...favorites, id]
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }
}

function existsInFavorites(id: number): boolean {
  if (typeof window === 'undefined') return false

  const favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  )

  return favorites.includes(id)
}

function getPokemonsInFavorites(): number[] {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const localFavorites = {
  handleToggleFavorites,
  existsInFavorites,
  getPokemonsInFavorites
}

export default localFavorites
