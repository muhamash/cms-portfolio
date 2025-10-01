"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { FC } from "react"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 border rounded flex items-center justify-center text-gray-500">
      Loading editor...
    </div>
  ),
})

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  modules?: any
  formats?: string[]
}

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["clean"],
  ],
}

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "indent",
  "link",
  "color",
  "background",
  "align",
  "blockquote",
  "code-block",
]

const TextEditor: FC<TextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write something...",
  className = "h-64",
  modules = defaultModules,
  formats = defaultFormats,
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default TextEditor
