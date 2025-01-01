import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaBold, FaItalic, FaTrash, FaPlus,FaLink, FaCode, FaQuoteRight, FaImage, FaListUl, FaListOl } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import './editor.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const addNote = () => {
    const newNote = { title: `New Note ${notes.length + 1}`, content: "" };
    setNotes([...notes, newNote]);
    setActiveNote(notes.length); // Set the new note as active
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setActiveNote(0); // Reset to the first note or no note
  };

  const updateNoteContent = (content) => {
    const updatedNotes = [...notes];
    updatedNotes[activeNote].content = content;
    setNotes(updatedNotes);
  };

   


    // for all header functionality

    const handleFormatting = (formatType) => {
      const textarea = document.getElementById("markdown-editor");
      
      

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
  
      let formattedText = "";
      if (formatType === "bold") {
        formattedText = `**${selectedText || "bold text"}**`;
      } else if (formatType === "italic") {
        formattedText = `*${selectedText || "italic text"}*`;
      } else if (formatType === "link") {
        formattedText = `[${selectedText || "link text"}](url)`;
      } else if (formatType === "code") {
        formattedText = `\`${selectedText || "inline code"}\``;
      } else if (formatType === "blockquote") {
        formattedText = `> ${selectedText || "blockquote text"}`;
      } else if (formatType === "image") {
        formattedText = `![${selectedText || "alt text"}](image-url)`;
      } else if (formatType === "unordered-list") {
        formattedText = selectedText
        .split("\n")
        .map((line) => `- ${line}`)
        .join("\n");
      } else if (formatType === "ordered-list") {
        formattedText = selectedText
        .split("\n")
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");;
      }
  
      const updatedContent =
        textarea.value.substring(0, start) +
        formattedText +
        textarea.value.substring(end);
  
      const updatedNotes = [...notes];
      updatedNotes[activeNote].content = updatedContent;
      setNotes(updatedNotes);
  
      // Restore focus and update selection range
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + formattedText.length - 2);
    };
  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Conditional Rendering for No Notes */}
      {notes.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#183e64",
            
          }}
        >
          <h2
            style={{
              color: "#fff",
              textTransform: "uppercase",
              marginBottom: "30px",
            
            }}
          >
            You have no notes
          </h2>
          <button
            onClick={addNote}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create one now
          </button>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div style={{ width: "20%", background: "#f4f4f4", padding: "10px" }}>
            <h2 className="text">
              NOTES{" "}
              <FaPlus  className="add"
                onClick={addNote}
              />
            </h2>
            {notes.map((note, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  background: index === activeNote ? "#007BFF" : "#fff",
                  color: index === activeNote ? "#fff" : "#000",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                   border: "1px solid gray",
                   borderRadius: "5px"
                }}
                onClick={() => setActiveNote(index)}
              >
                <span className="newNote">{note.title}</span>
                <FaTrash className="delete" onClick={() => deleteNote(index)} />
              </div>
            ))}
          </div>

          {/* Main Editor Area */}
          <div style={{ width: "80%", padding: "10px" }}>
            {/* Toolbar */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px", marginTop:"10px" }}>
              <button style={{padding: "10px 20px", cursor:"pointer"}} onClick={() => setIsPreview(false)}>Write</button>
              <button style={{padding: "10px 20px", cursor:"pointer"}} onClick={() => setIsPreview(true)}>Preview</button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("bold")}   disabled={isPreview}>
                <FaBold />
              </button>
              <button style={{padding: "10px 5px",border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("italic")}  disabled={isPreview}>
                <FaItalic />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("link")} disabled={isPreview}>
                <FaLink />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("code")} disabled={isPreview}>
                <FaCode />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("blockquote")} disabled={isPreview}>
                <FaQuoteRight />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("image")} disabled={isPreview}>
                <FaImage />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("unordered-list")} disabled={isPreview}>
                <FaListUl />
              </button>
              <button style={{padding: "10px 5px", border:"none", background: "#ffffff", cursor:"pointer" }} onClick={() => handleFormatting("ordered-list")} disabled={isPreview}>
                <FaListOl />
              </button>
            </div>

            {/* Editor or Preview */}
            {!isPreview ? (
              <textarea
              id="markdown-editor"
                style={{
                  width: "100%",
                  height: "80vh",
                  padding: "10px",
                  fontSize: "16px",
                }}
                value={notes[activeNote]?.content || ""}
                onChange={(e) => updateNoteContent(e.target.value)}
                placeholder="Start typing your Markdown..."
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  padding: "30px",
                  background: "#f9f9f9",
                  overflowY: "scroll",
                  border: "1px solid #ccc",
                }}
              >
                <ReactMarkdown
                  children={notes[activeNote]?.content || ""}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
