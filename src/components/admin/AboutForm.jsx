'use client'

import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import { fetchSiteDetails, updateSiteAbout } from "@/redux/slices/siteDeatilsSlice"
import toast from "react-hot-toast"

// ✅ Dynamically import ReactQuill (No SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

import "react-quill/dist/quill.snow.css"

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

  useEffect(() => {
    dispatch(fetchSiteDetails())
  }, [dispatch])

  useEffect(() => {
    if (siteDetails?.about) {
      setFormsiteDetails({
        aboutTitle: siteDetails.about.title || "",
        aboutContent: siteDetails.about.content || "",
        footerContent: siteDetails.about.footer_text || "",
      })
    }
  }, [siteDetails])

  const handleChange = (e) => {
    setFormsiteDetails({
      ...formsiteDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleContentChange = (value) => {
    setFormsiteDetails({ ...formsiteDetails, aboutContent: value })
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
          <ReactQuill
            value={formsiteDetails.aboutContent}
            onChange={handleContentChange}
            theme="snow"
            style={{ height: "400px" }}
          />
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
