"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSiteDetails } from '@/redux/slices/siteDeatilsSlice';
import { Spinner } from 'react-bootstrap';

const SitePrivacyPolicySection = () => {

    
    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);


    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);


    if (siteDetailsLoading) return <Spinner variant='succss' style={{ margin: "auto" }} />;
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;


    return (
        <div className='container py-60 my-60'>
            <div className='row'>
                <div className='col-lg-12 col-xs-12 col-sm-12'>

                    <p>

                        <div className="page_content" dangerouslySetInnerHTML={{ __html: siteDetails?.privacyPolicy || "No content available" }} />

                    </p>


                </div>
            </div>
        </div>
    )
}

export default SitePrivacyPolicySection