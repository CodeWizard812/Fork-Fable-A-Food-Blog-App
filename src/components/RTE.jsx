import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// --- Import TinyMCE core ---
import 'tinymce/tinymce';

// --- Import themes, icons, and skins ---
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons';

// --- Import the plugins you use ---
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';


export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1'>
        {label}</label>}
    
    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) =>(
        <Editor
            initialValue={defaultValue}
            init={{
                // REMOVED: No API key needed for self-hosted
                height: 500,
                menubar: true,
                base_url: '/tinymce', // Tells the editor where to find its own files
                // --- ADD THIS LINE TO ENABLE THE EDITOR ---
                license_key: 'gpl',
                plugins: [ /* Your plugin list remains the same */
                    "image", "advlist", "autolink", "lists", "link",
                    "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                    "code", "fullscreen", "insertdatetime", "media", "table",
                    "help", "wordcount"
                ],
                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
               
                // --- THE FIX IS HERE ---
                // We tell the editor where to find the skin files you copied to `public`
                skin_url: '/tinymce/skins/ui/oxide',
                content_css: '/tinymce/skins/content/default/content.min.css'
            }}
            onEditorChange={onChange}
        />
    )}
    />
    </div>
  )
}