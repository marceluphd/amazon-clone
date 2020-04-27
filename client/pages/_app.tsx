import { AppProps, Container } from 'next/app'
import Page from '../components/Page'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Container>
  )
}

export default MyApp
