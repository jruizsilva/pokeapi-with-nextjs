import Image from 'next/image'
import NextLink from 'next/link'

import {
  Container,
  Grid,
  Link,
  Spacer,
  Text,
  useTheme
} from '@nextui-org/react'

interface Props {}

export function Navbar(props: Props) {
  const { theme } = useTheme()

  return (
    <>
      <div
        style={{
          backgroundColor: theme?.colors.gray100.value
        }}
      >
        <Container>
          <Grid.Container alignItems='center'>
            <Image
              src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
              alt='Icono de la app'
              width={70}
              height={70}
            />
            <Link href='/' as={NextLink}>
              <Text h2 css={{ m: '0' }}>
                P
              </Text>
              <Text h3 css={{ m: '0' }}>
                okémon
              </Text>
            </Link>
            <Spacer css={{ flex: 1 }} />
            <Link href='/favorites' as={NextLink}>
              <Text color='white'>Favoritos</Text>
            </Link>
          </Grid.Container>
        </Container>
      </div>
    </>
  )
}
