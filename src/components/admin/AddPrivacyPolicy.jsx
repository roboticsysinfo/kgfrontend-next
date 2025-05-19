'use client'; // ✅ Important for Next.js client component

import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { fetchSiteDetails, updatePrivacyPolicy } from '@/redux/slices/siteDeatilsSlice'; // ✅ Use alias path
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css'; // ✅ Quill styles

const ReactQuill = React.lazy(() => import('react-quill')); // ✅ Lazy load editor

const AddPrivacyPolicy = () => {
    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails);

    const [privacyContent, setPrivacyContent] = useState('');

    useEffect(() => {
        if (!siteDetails) {
            dispatch(fetchSiteDetails());
        } else if (siteDetails.privacyPolicy) {
            setPrivacyContent(siteDetails.privacyPolicy);
        }
    }, [dispatch, siteDetails]);

    const handleContentChange = (value) => {
        setPrivacyContent(value);
    };

    const handlePrivacySubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updatePrivacyPolicy(privacyContent)).unwrap();
            toast.success('Privacy Policy updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update Privacy Policy');
        }
    };

    return (
        <div className="p-5 border rounded">
            <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
            <hr className="mb-4" />
            <Form onSubmit={handlePrivacySubmit}>
                <Form.Group controlId="privacyContent" className="mb-4">
                    <Form.Label>Content</Form.Label>
                    <Suspense fallback={<div>Loading Editor...</div>}>
                        <ReactQuill
                            value={privacyContent}
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

export default AddPrivacyPolicy;
