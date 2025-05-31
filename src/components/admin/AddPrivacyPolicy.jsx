'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { fetchSiteDetails, updatePrivacyPolicy } from '@/redux/slices/siteDeatilsSlice'
import toast from 'react-hot-toast'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const AddPrivacyPolicy = () => {
  const dispatch = useDispatch()
  const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails)

  const [privacyContent, setPrivacyContent] = useState('')

  // Initialize tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: privacyContent || '',
    onUpdate: ({ editor }) => {
      setPrivacyContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!siteDetails) {
      dispatch(fetchSiteDetails())
    } else if (siteDetails.privacyPolicy) {
      setPrivacyContent(siteDetails.privacyPolicy)
      if (editor) {
        editor.commands.setContent(siteDetails.privacyPolicy)
      }
    }
  }, [dispatch, siteDetails, editor])

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
          <div style={{ border: '1px solid #ced4da', borderRadius: '0.25rem', minHeight: 400, marginBottom: 50 }}>
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

export default AddPrivacyPolicy
