import React from 'react'
import AppRoutes from "./pages"
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className='pt-3 md:pt-5'>
        <AppRoutes />
      </main>
    </>
  )
}

export default React.memo(App);