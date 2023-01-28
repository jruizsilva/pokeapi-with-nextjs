import { Card, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface Props {
  pokemonId: number
}

export default function PokemonFavoriteCard({ pokemonId }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <>
      <Card isHoverable isPressable onClick={handleClick}>
        <Card.Body>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            alt={`pokemon ${pokemonId}`}
            height={200}
            width={200}
          />
        </Card.Body>
      </Card>
    </>
  )
}
