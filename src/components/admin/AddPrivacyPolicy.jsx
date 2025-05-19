'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { fetchSiteDetails, updatePrivacyPolicy } from '@/redux/slices/siteDeatilsSlice'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'


// ✅ Dynamically import ReactQuill (Client-side only)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import 'react-quill/dist/quill.snow.css'

const AddPrivacyPolicy = () => {
  const dispatch = useDispatch()
  const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails)

  const [privacyContent, setPrivacyContent] = useState('')

  useEffect(() => {
    if (!siteDetails) {
      dispatch(fetchSiteDetails())
    } else if (siteDetails.privacyPolicy) {
      setPrivacyContent(siteDetails.privacyPolicy)
    }
  }, [dispatch, siteDetails])

  const handleContentChange = (value) => {
    setPrivacyContent(value)
  }

  const handlePrivacySubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updatePrivacyPolicy(privacyContent)).unwrap()
      toast.success('Privacy Policy updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Privacy Policy')
    }
  }

  return (
    <div className="p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
      <hr className="mb-4" />

      <Form onSubmit={handlePrivacySubmit}>
        <Form.Group controlId="privacyContent" className="mb-4">
          <Form.Label>Content</Form.Label>
          <ReactQuill
            value={privacyContent}
            onChange={handleContentChange}
            theme="snow"
            style={{ height: '400px', marginBottom: '50px' }}
          />
        </Form.Group>

        <Form.Group>
          <Button variant="success" type="submit" disabled={siteDetailsLoading}>
            {siteDetailsLoading ? 'Updating...' : 'Submit'}
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddPrivacyPolicy
