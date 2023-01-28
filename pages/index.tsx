import { pokeApi } from '@/api'
import { Layout } from '@/components/layout'
import PokemonCard from '@/components/pokemon/PokemonCard'
import {
  PokemonData,
  PokemonListResponse,
  PokemonResponse
} from '@/interfaces'
import { getPokemonResponse } from '@/utils'
import { Inter } from '@next/font/google'
import { Grid } from '@nextui-org/react'
import { GetStaticProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons: PokemonData[]
}

export default function Home({ pokemons }: Props) {
  return (
    <>
      <Grid.Container gap={5} justify='space-between'>
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid.Container>
    </>
  )
}

Home.getLayout = function getLayout(page: JSX.Element) {
  return (
    <>
      <Layout title='Listado de Pokémons'>{page}</Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=151'
  )
  const pokemons = await Promise.all(
    data.results.map(async ({ name }) => {
      const pokemon = await getPokemonResponse(name)
      return pokemon
    })
  )

  return {
    props: {
      pokemons
    }
  }
}
