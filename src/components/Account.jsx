"use client"
import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { toast } from 'react-hot-toast';
import MyOrder from '@/components/MyOrder';
import MyReviews from '@/components/MyReviews';
import ManageOrder from '@/components/ManageOrder';
import MyProfile from '@/components/MyProfile';
import { useRouter } from 'next/navigation';


const Account = () => {

    const router = useRouter()

    return (

        <div className='container-fluid py-60'>
            <div className='row'>
                <div className='col-lg-12 col-xs-12 col-sm-12'>

                    <ul>

                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column accountsidebar">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">My Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">My Order</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Manage Order</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth">My Reviews</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>

                                <Col sm={9}>
                                    <Tab.Content>

                                        {/* My Profile  */}
                                        <Tab.Pane eventKey="first">

                                            {/* My Profile Componenet   */}
                                            <MyProfile />

                                        </Tab.Pane>

                                        {/* My Order Section  */}
                                        <Tab.Pane eventKey="second">

                                            {/* My Order Table  */}
                                            <MyOrder />

                                        </Tab.Pane>

                                        {/* My Reviews Section  */}
                                        <Tab.Pane eventKey="third">

                                            {/* My Reviews Componenet   */}
                                            <ManageOrder />

                                        </Tab.Pane>

                                        {/* My Reviews Section  */}
                                        <Tab.Pane eventKey="fourth">

                                            {/* My Reviews Componenet   */}
                                            <MyReviews />

                                        </Tab.Pane>

                                    </Tab.Content>
                                </Col>
                            </Row>
                            
                        </Tab.Container>

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Account