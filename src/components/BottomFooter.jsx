"use client"
import React from 'react'
import Link from 'next/link'

const BottomFooter = () => {

  return (

    <div className="bottom-footer bg-color-one py-8">
      <div className="container container-lg">
        <div className="bottom-footer__inner flex-center flex-wrap gap-16 py-16">
          <p className="bottom-footer__text texxt-center ">
            Kissan Growth © 2025. All Rights Reserved,  <Link href="https://roboticsysinfo.com">Robotic SysInfo</Link>{" "}
          </p>
        </div>
      </div>
    </div>

  )

}


export default BottomFooter