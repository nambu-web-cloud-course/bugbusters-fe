import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Dropzone from "react-dropzone";
import axios from "axios";

export default function ImageUpload({ setValue }) {
  const [Images, setImages] = useState([]);
  console.log(Images)
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    return axios
      .post("http://localhost:8080/image", formData, config)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setImages([...Images, res.data.filePath]);

          // Set the profile field value in the form
          setValue("profile", [...Images, res.data.filePath]);
        } else console.log("파일 저장 실패");
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "0.5rem",
                backgroundColor: "lightgray",
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <AddRoundedIcon style={{ alignSelf: "center" }} />
            </div>
          </section>
        )}
      </Dropzone>
      {/* Dropzone옆에 올린 파일 보여지는 곳 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "120px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div key={index}>
            <img
              style={{ minWidth: "100px", width: "100px", height: " 100px" }}
              src={`http://localhost:8080/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
