import { Container } from '@nextui-org/react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function FavoritesLayout({ children }: Props) {
  return (
    <>
      <Container
        css={{
          height: 'calc(100vh - 70px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        {children}
      </Container>
    </>
  )
}
