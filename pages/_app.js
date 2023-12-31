import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { ShopProvider } from './ShopContext'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/BreadcrumbItem";


export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState();
  
    useEffect(() => {
      const pathWithoutQuery = router.asPath.split("?")[0];
      let pathArray = pathWithoutQuery.split("/");
      pathArray.shift();
  
      pathArray = pathArray.filter((path) => path !== "");
  
      const breadcrumbs = pathArray.map((path, index) => {
        const href = "/" + pathArray.slice(0, index + 1).join("/");
        return {
          href,
          label: path.charAt(0).toUpperCase() + path.slice(1),
        };
      });
  
      setBreadcrumbs(breadcrumbs);
    }, [router.asPath]);


  return (
    <>
      <ShopProvider>
      <Navbar/>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
              {breadcrumb.label}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
      <Component {...pageProps} />
      <Footer/>
      </ShopProvider>
    </>
  ) 
}
