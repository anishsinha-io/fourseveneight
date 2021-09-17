import React, { Fragment, useState } from "react";

import axios from "axios";

interface IFileData {
  image: any;
  alt: string;
}

const postImage = async (fileData: IFileData) => {
  const formData = new FormData();
  formData.append("image", fileData.image);
  formData.append("description", fileData.alt);
  //todo update
  const result = await axios.post("/posts/uploads/image", formData);
  return result.data;
};

const FileUploader: React.FC = () => {
  const [image, setImage] = useState<any>(null);
  const [alt, setAlt] = useState("");
  const [images, setImages] = useState([] as any[]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await postImage({ image, alt });
    setImages([result.image, ...images]);
  };
  const fileSelectedHandler = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const inputChangeHandler = (e: any) => {
    setAlt(e.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <input onChange={fileSelectedHandler} type="file" accept="image/*" />
        <input value={alt} onChange={inputChangeHandler} type="text" />
        <button type="submit">Submit</button>
      </form>
      {images.map((image) => (
        <div key={image}>
          <img src={image} alt="asdf"></img>
        </div>
      ))}
      <img
        src="api/posts/downloads/image/5e77858791234d23e5b36cf435c93b9a"
        alt="asdf"
      ></img>
    </Fragment>
  );
};

export default FileUploader;
