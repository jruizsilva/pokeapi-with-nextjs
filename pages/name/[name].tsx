import { GetStaticPaths, GetStaticProps } from 'next'
import { Button, Grid, Image, Row, Text } from '@nextui-org/react'
import { Layout } from '@/components/layout'
import { pokeApi } from '@/api'
import {
  PokemonResponse,
  PokemonListResponse,
  PokemonData
} from '@/interfaces'
import { getPokemonResponse, localFavorites } from '@/utils'
import { useState } from 'react'
import confetti from 'canvas-confetti'

interface Props {
  pokemon: PokemonData
}

export default function PokemonByNamePage({ pokemon }: Props) {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existsInFavorites(pokemon.id)
  )

  const handleClick = () => {
    localFavorites.handleToggleFavorites(pokemon.id)
    setIsInFavorite(!isInFavorite)

    if (isInFavorite) return

    confetti({
      zIndex: 100,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 }
    })
  }

  return (
    <>
      <Grid.Container gap={5}>
        <Grid>
          <Image
            src={pokemon.img}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </Grid>
        <Grid css={{ flex: 1 }}>
          <Row
            justify='space-between'
            align='center'
            wrap='wrap'
            css={{ height: '48px' }}
          >
            <Text h1 transform='capitalize' css={{ margin: 0 }}>
              {pokemon.name}
            </Text>
            <Button
              ghost={!isInFavorite}
              size={'lg'}
              onClick={handleClick}
            >
              {isInFavorite ? 'En favoritos' : 'Guardar en favoritos'}
            </Button>
          </Row>
        </Grid>
      </Grid.Container>
    </>
  )
}

PokemonByNamePage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=151`
  )
  const pokemon151names: string[] = data.results.map(
    ({ name }) => name
  )

  return {
    paths: pokemon151names.map((name) => ({ params: { name } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  const pokemon = await getPokemonResponse(name)
  if (!pokemon) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }

  return {
    props: {
      pokemon
    }
  }
}
