import { Layout } from '@/components/layout'
import FavoritesLayout from '@/components/layout/FavoritesLayout'
import FavoritesList from '@/components/ui/FavoritesList'
import { useState, useEffect } from 'react'
import NoFavorites from '../../components/ui/NoFavorites'
import localFavorites from '../../utils/localFavorites'

interface Props {}

export default function FavoritesPages(props: Props) {
  const [pokemonInFavorites, setPokemonInFavorites] = useState<
    number[]
  >([])

  useEffect(() => {
    setPokemonInFavorites(localFavorites.getPokemonsInFavorites())
  }, [])

  return (
    <>
      {pokemonInFavorites.length === 0 ? <NoFavorites /> : null}
      {pokemonInFavorites.length > 0 ? (
        <FavoritesList pokemons={pokemonInFavorites} />
      ) : null}
    </>
  )
}

FavoritesPages.getLayout = function getLayout(page: JSX.Element) {
  return (
    <>
      <Layout>
        <FavoritesLayout>{page}</FavoritesLayout>
      </Layout>
    </>
  )
}
