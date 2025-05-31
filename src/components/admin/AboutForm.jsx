'use client'

import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { fetchSiteDetails } from "@/redux/slices/siteDeatilsSlice"

const AboutForm = () => {
  const dispatch = useDispatch()
  const { data: siteDetails, siteDetailsLoading } = useSelector(
    (state) => state.siteDetails
  )

  const [formsiteDetails, setFormsiteDetails] = useState({
    aboutTitle: "",
    aboutContent: "",
    footerContent: "",
  })

  // Initialize tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: formsiteDetails.aboutContent || '',
    onUpdate: ({ editor }) => {
      setFormsiteDetails(prev => ({
        ...prev,
        aboutContent: editor.getHTML(),
      }))
    }
  })

  useEffect(() => {
    dispatch(fetchSiteDetails())
  }, [dispatch])

  // When siteDetails arrive, update form and editor content
  useEffect(() => {
    if (siteDetails?.about) {
      setFormsiteDetails({
        aboutTitle: siteDetails.about.title || "",
        aboutContent: siteDetails.about.content || "",
        footerContent: siteDetails.about.footer_text || "",
      })
      if (editor && siteDetails.about.content) {
        editor.commands.setContent(siteDetails.about.content)
      }
    }
  }, [siteDetails, editor])

  const handleChange = (e) => {
    setFormsiteDetails({
      ...formsiteDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleAboutSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateSiteAbout(formsiteDetails)).unwrap()
      toast.success("Site About updated successfully!")
    } catch (error) {
      console.error("Error updating site details:", error)
      toast.error("Failed to update site details.")
    }
  }

  return (
    <div className="p-40 border rounded">
      <h2 className="text-xl">About</h2>
      <hr />

      <Form onSubmit={handleAboutSubmit}>
        <Form.Group controlId="aboutTitle" className="mb-30">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="aboutTitle"
            value={formsiteDetails.aboutTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="aboutContent" className="mb-30">
          <Form.Label>Content</Form.Label>
          <div className="border rounded" style={{ minHeight: 400 }}>
            <EditorContent editor={editor} />
          </div>
        </Form.Group>

        <hr />

        <Form.Group controlId="footerContent" className="mb-30">
          <Form.Label>Footer Text</Form.Label>
          <Form.Control
            type="text"
            name="footerContent"
            value={formsiteDetails.footerContent}
            onChange={handleChange}
          />
        </Form.Group>

        <hr />

        <Form.Group>
          <Button
            variant="success"
            className="mt-20"
            type="submit"
            disabled={siteDetailsLoading}
          >
            {siteDetailsLoading ? "Updating..." : "Submit"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AboutForm
