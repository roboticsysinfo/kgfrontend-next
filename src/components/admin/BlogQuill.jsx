import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

export default function BlogQuill({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;

    const handlePaste = async (event) => {
      const clipboardData = event.clipboardData;
      if (!clipboardData) return;

      // 1. Check for image files
      const items = clipboardData.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          event.preventDefault();

          const file = item.getAsFile();
          if (!file) return;

          // Read file as base64
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            editor.chain().focus().setImage({ src: base64 }).run();
          };
          reader.readAsDataURL(file);

          return; // Stop after first image
        }
      }

      // 2. Check for image URL
      const text = clipboardData.getData('text/plain');
      if (
        text &&
        text.startsWith('http') &&
        (text.endsWith('.png') ||
          text.endsWith('.jpg') ||
          text.endsWith('.jpeg') ||
          text.endsWith('.gif'))
      ) {
        event.preventDefault();
        editor.chain().focus().setImage({ src: text }).run();
      }

      // 3. Let Tiptap handle links from Word HTML by default now
    };

    const dom = editor.view.dom;
    dom.addEventListener('paste', handlePaste);

    return () => {
      dom.removeEventListener('paste', handlePaste);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded p-2" style={{ minHeight: '400px' }}>
      <EditorContent editor={editor} />
    </div>
  );
}
