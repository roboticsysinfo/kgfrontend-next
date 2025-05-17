
"use client"
import React from 'react'

const HomeContent = () => {
    return (
        <>

            <section className="home-about-section my-90">

                <div className="container">
                    <div className="row justify-content-center mb-30">
                        <div className="col-lg-10">
                            <h1 className="sectionheading text-4xl" style={styles.homeheading}>Kissan Growth: India’s #1 Farm Online Marketplace!</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-xs-12 col-sm-12">

                            <p><strong>Kissan Growth</strong> is <strong>India’s #1 farm online marketplace</strong> that bridges <strong>Indian farmers</strong> with the end-consumers. <strong>India’s #1 farm online marketplace</strong> where you may <strong>buy fresh farm produce</strong>, such as <strong>organic fruits and vegetables, milk and dairy products, and crops directly from farmers</strong>. We aim to cut out the middlemen and encourage <strong>sustainable farming</strong>, making farm produce affordable while fostering <strong>Indian agriculture.</strong></p>

                            <h4 className='my-20'>Buy Fresh, Buy Local – Directly from Farmers!</h4>

                            <p>
                                Become a part of <strong>Kissan Growth</strong>, India's reliable platform that enables you to <strong>buy fresh fruits, vegetables, milk, and crops</strong> directly from <strong>local farmers</strong>. There are no middlemen, and you receive farm-fresh produce at the lowest prices, and you support <strong>local farming</strong> while being part of the farm-to-table movement.
                            </p>

                        </div>
                    </div>

                </div>

            </section>

        </>
    )
}

const styles = {
    homeheading: {
        fontSize: "36",
        textAlign: 'center'
    }
}

export default HomeContent