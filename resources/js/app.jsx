import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import 'toastr/build/toastr.min.css'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page = pages[`./Pages/${name}.jsx`]
    page.default.layout = page.default.layout || ((page) => page)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
