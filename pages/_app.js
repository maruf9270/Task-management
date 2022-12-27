import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component className='max-w-screen-xl mx-auto' {...pageProps} />
}
