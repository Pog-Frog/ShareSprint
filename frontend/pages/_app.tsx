import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/redux/store'
import { useStore } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import ToastMessage from '@/hooks/Toast'


export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  const store: any = useStore();

  return (
    <>
      <PersistGate persistor={store.__persistor} loading={<div>Loading.........</div>}>
        <RegisterModal />
        <LoginModal />
        <ToastMessage />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </>
  )
})

// export default function MyApp({ Component, pageProps }: AppProps) {
//   const { store, props } = wrapper.useWrappedStore(pageProps)

//   return (
//     <>
//       <Provider store={store}>
//         <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
//           <RegisterModal />
//           <LoginModal />
//           <Layout>
//             <Component {...pageProps} />
//           </Layout>
//         </PersistGate>
//       </Provider>
//     </>
//   )
// }