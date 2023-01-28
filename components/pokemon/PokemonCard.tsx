import { PokemonData } from '@/interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface Props {
  pokemon: PokemonData
}

export default function PokemonCard({ pokemon }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/name/${pokemon.name}`)
  }

  return (
    <>
      <Card isPressable isHoverable onClick={handleClick}>
        <Card.Body>
          <Card.Image src={pokemon.img} height={150} width={150} />
        </Card.Body>
        <Card.Footer>
          <Row wrap='wrap' justify='space-between' align='center'>
            <Text transform='capitalize'>{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
