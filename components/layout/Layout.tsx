import { Container } from '@nextui-org/react'
import Head from 'next/head'
import { Navbar } from '../ui'

interface Props {
  children: JSX.Element
  title?: string
}

export function Layout({ children, title = 'Pokemon App' }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='author' content='Jonathan' />
        <meta name='description' content={`Pokemon xxx`} />
        <meta name='keywords' content={`xxx`} />
      </Head>
      <Navbar />
      <Container>{children}</Container>
    </>
  )
}
