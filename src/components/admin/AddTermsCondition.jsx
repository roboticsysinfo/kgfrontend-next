'use client'; // Next.js App Router में client component के लिए ज़रूरी

import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { fetchSiteDetails, updateTermsAndConditions } from '@/redux/slices/siteDeatilsSlice'; // path alias इस्तेमाल करें
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';

// Lazy load ReactQuill
const ReactQuill = React.lazy(() => import('react-quill'));

const AddTermsCondition = () => {
    const dispatch = useDispatch();

    const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails);

    const [termsContent, setTermsContent] = useState('');

    useEffect(() => {
        if (!siteDetails) {
            dispatch(fetchSiteDetails());
        } else if (siteDetails.termsAndConditions) {
            setTermsContent(siteDetails.termsAndConditions);
        }
    }, [dispatch, siteDetails]);

    const handleContentChange = (value) => {
        setTermsContent(value);
    };

    const handleTermsSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTermsAndConditions(termsContent)).unwrap();
            toast.success('Terms & Conditions updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update Terms & Conditions');
        }
    };

    return (
        <div className="p-5 border rounded">
            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
            <hr className="mb-4" />
            <Form onSubmit={handleTermsSubmit}>
                <Form.Group controlId="termsContent" className="mb-4">
                    <Form.Label>Content</Form.Label>
                    <Suspense fallback={<div>Loading Editor...</div>}>
                        <ReactQuill
                            value={termsContent}
                            onChange={handleContentChange}
                            theme="snow"
                            style={{ height: '400px', marginBottom: '50px' }}
                        />
                    </Suspense>
                </Form.Group>

                <Form.Group>
                    <Button variant="success" type="submit" disabled={siteDetailsLoading}>
                        {siteDetailsLoading ? 'Updating...' : 'Submit'}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddTermsCondition;
