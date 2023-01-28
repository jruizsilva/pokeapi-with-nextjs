import { Card, Grid, Image } from '@nextui-org/react'
import PokemonFavoriteCard from '../pokemon/PokemonFavoriteCard'
interface Props {
  pokemons: number[]
}

export default function FavoritesList({ pokemons }: Props) {
  return (
    <>
      <Grid.Container gap={3} justify='center'>
        {pokemons.map((id) => (
          <Grid key={id}>
            <PokemonFavoriteCard pokemonId={id} />
          </Grid>
        ))}
      </Grid.Container>
    </>
  )
}
