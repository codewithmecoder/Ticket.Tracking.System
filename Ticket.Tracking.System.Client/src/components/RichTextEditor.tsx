import { EditorState } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then((module) => module.Editor),
//   { ssr: false }
// );

interface Props {
  width?: string;
  height?: string;
}
const RichTextEditor = ({ height, width }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  return (
    <div className={`bg-[#F8F9FA] p-5 rounded ${width} ${height}`}>
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        // wrapperClassName="wrapperClassName"
        editorClassName="mt-6 p-5 bg-white shadow-lg mx-w-5xl mx-auto mb-12 border"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default RichTextEditor;
