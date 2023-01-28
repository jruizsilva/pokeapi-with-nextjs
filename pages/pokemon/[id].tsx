import { GetStaticPaths, GetStaticProps } from 'next'
import { Button, Grid, Image, Row, Text } from '@nextui-org/react'
import { Layout } from '@/components/layout'
import { PokemonData } from '@/interfaces'
import { getPokemonResponse, localFavorites } from '@/utils'
import { useState } from 'react'
import confetti from 'canvas-confetti'

interface Props {
  pokemon: PokemonData
}

export default function PokemonByIdPage({ pokemon }: Props) {
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

PokemonByIdPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((_, i) => (i + 1).toString())

  return {
    paths: pokemon151.map((id) => ({ params: { id } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonResponse(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}
