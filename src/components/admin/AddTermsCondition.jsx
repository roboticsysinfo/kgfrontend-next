'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { fetchSiteDetails, updateTermsAndConditions } from '@/redux/slices/siteDeatilsSlice'
import toast from 'react-hot-toast'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const AddTermsCondition = () => {
  const dispatch = useDispatch()
  const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails)

  const [termsContent, setTermsContent] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: termsContent || '',
    onUpdate: ({ editor }) => {
      setTermsContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!siteDetails) {
      dispatch(fetchSiteDetails())
    } else if (siteDetails.termsAndConditions) {
      setTermsContent(siteDetails.termsAndConditions)
      if (editor) {
        editor.commands.setContent(siteDetails.termsAndConditions)
      }
    }
  }, [dispatch, siteDetails, editor])

  const handleTermsSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateTermsAndConditions(termsContent)).unwrap()
      toast.success('Terms & Conditions updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Terms & Conditions')
    }
  }

  return (
    <div className="p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
      <hr className="mb-4" />
      <Form onSubmit={handleTermsSubmit}>
        <Form.Group controlId="termsContent" className="mb-4">
          <Form.Label>Content</Form.Label>
          <div
            style={{
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              minHeight: 400,
              marginBottom: 50,
            }}
          >
            <EditorContent editor={editor} />
          </div>
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

export default AddTermsCondition
