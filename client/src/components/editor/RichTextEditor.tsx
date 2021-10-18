import React, {
  Fragment,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

import api from "../../app/api";
import Spinner from "../spinner/Spinner";

export interface IEditorContext {
  content: string;
}

export const EditorContext = React.createContext<IEditorContext>({
  content: "",
});

const RichTextEditor: React.FC<{ content?: string }> = (props) => {
  const { content } = props;
  const editorContext = useContext(EditorContext);
  const [editorContent, setEditorContent] = useState<string>(content ?? "");
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => setEditorContent(content ?? ""), [content]);
  useEffect(() => {
    const getApiKey = async () => {
      const res = await api.get("/tmce/apikey");
      setApiKey(res.data.apiKey);
      return;
    };
    getApiKey();
  }, [apiKey]);

  const editorRef = useRef<any>(null);

  if (!apiKey) return <Spinner />;

  return (
    <Fragment>
      <div className="richtexteditor-main">
        <Editor
          initialValue={content}
          value={editorContent}
          apiKey={apiKey}
          onInit={(e, editor) => {
            return (editorRef.current = editor);
          }}
          onEditorChange={(newEditorState, editor) => {
            editorContext.content = newEditorState;
            setEditorContent(newEditorState);
            console.log(editorContext.content);
          }}
          init={{
            elementpath: false,
            urlconverter_callback: function (url, node, on_save, name) {
              return url;
            },
            codesample_global_prismjs: true,
            resize: false,
            height: "50rem",
            width: "100%",
            skin: "bootstrap",
            icons: "bootstrap",
            content_css: "material-outline",
            menubar: true,
            menu: {
              format: { title: "Format", items: "configurepermanentpen" },
            },
            placeholder: "Start typing here...",
            plugins: [
              "advlist advtable autosave anchor lists link image charmap codesample print preview anchor emoticons",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount tinydrive formatpainter tabfocus textpattern preview hr imagetools link",
              "media nonbreaking powerpaste print save searchreplace table casechange checklist export linkchecker mentions permanentpen tinymcespellchecker",
            ],
            external_plugins: {
              tiny_mce_wiris:
                "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js",
            },

            htmlAllowedTags: [".*"],
            htmlAllowedAttrs: [".*"],
            draggable_modal: true,

            mentions_fetch: async function (query: any, success: any) {
              //todo implement get users
              interface IExpectedUserObject {
                id: string;
                name: string;
              }
              const res = await api.get("/users");
              console.log(res);
              const users = res.data.userObjects
                .filter((user: IExpectedUserObject) => {
                  return user.name.indexOf(query.term.toLowerCase()) !== -1;
                })
                .slice(0, 5);
              console.log(users);
              success(users);
            },
            nonbreaking_force_tab: true,
            spellchecker_language: "en",
            tinydrive_token_provider: async function (
              success: any,
              failure: any
            ) {
              try {
                const res = await api.post("/tmce/jwt");
                console.log(res.data.token);
                success({ token: res.data.token });
              } catch (err) {
                console.log(err);
              }
            },
            table_toolbar:
              "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
            advlist_bullet_styles: "square circle disc",
            textpattern_pattern: [
              { start: "*", end: "*", format: "italic" },
              { start: "**", end: "**", format: "bold" },
              { start: "#", format: "h1" },
              { start: "##", format: "h2" },
              { start: "###", format: "h3" },
              { start: "####", format: "h4" },
              { start: "#####", format: "h5" },
              { start: "######", format: "h6" },
              { start: "1. ", cmd: "InsertOrderedList" },
              { start: "* ", cmd: "InsertUnorderedList" },
              { start: "- ", cmd: "InsertUnorderedList" },
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic underline casechange strikethrough backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat formatpainter permanentpen| " +
              "insertfile image media hr link unlink| " +
              "codesample table insertdatetime searchreplace | " +
              "tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | " +
              "checklist export save print restoredraft",
            content_style: "body { font-size:16px; font-family: Montserrat;}",
            branding: false,
          }}
        />
      </div>
    </Fragment>
  );
};

export default RichTextEditor;
