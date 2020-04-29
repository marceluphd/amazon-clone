import { AppProps } from 'next/app'
import { Page } from 'components'
import withApollo from 'next-with-apollo'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import '../styles/normalize.css'

const MyApp = ({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: any }) => (
  <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </ApolloProvider>
)

// TODO: uncomment if it turns out that withApollo does not pass query data
// to <MyApp />

// MyApp.getInitialProps = async (appContext: NextPageContext): Promise<any> => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await MyApp.getInitialProps(appContext)

//   return { ...appProps }
// }

export default withApollo(({ initialState, headers }) => {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === 'development'
          ? process.env.API_URL
          : process.env.API_URL,
      credentials: 'same-origin',
      headers,
    }),
  })
})(MyApp)
