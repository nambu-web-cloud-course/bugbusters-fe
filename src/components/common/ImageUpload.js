import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Dropzone from "react-dropzone";
import api from "../../api";
import styled from "styled-components";
import GapItems from "./GapItems";

const AddImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 0.5rem;
  background-color: #f4f4f4;
  display: flex;
  align-self: center;
  justify-content: center;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.2rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.color.gray02};
  color: ${({ theme }) => theme.color.gray04};
  z-index: 1;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function ImageUpload({ id, userid, busterid, setValue }) {
  const [Images, setImages] = useState([]);
  const dropHandler = (files) => {
    if (Images.length >= 2) {
      alert("최대 2장까지 업로드할 수 있습니다.")
      return;
    }
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    return api.post(`/image?caller=${id}&userid=${userid}`, formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages([...Images, res.data.filePath]);

        // Set the profile field value in the form
        if(busterid) {
          setValue("profile", res.data.filePath);
        } else {
          setValue("images", [...Images, res.data.filePath]);
        }
      } else console.log("파일 저장 실패");
    });
  };
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    //이미지 스테이트에 들어있는 모든 이미지를 복사해서
    // newImages라는 배열에 넣는다.
    let newImages = [...Images];

    //newImages배열안에 있는 사진 중
    //클릭한 사진의 인덱스를 지워줌
    newImages.splice(currentIndex, 1);

    //새로운 이미지 배열인 newImages를
    //다시 setImages 해준다.
    return api.delete(`/image?caller=${id}&image=${image}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages(newImages);

        // Set the profile field value in the form
        setValue("images", newImages);
      } else console.log("파일 삭제 실패");
    });

    // setImages(newImages)
  };

  return (
    <GapItems>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <AddImage {...getRootProps()}>
              <input {...getInputProps()} />
              <AddRoundedIcon style={{ alignSelf: "center" }} />
            </AddImage>
          </section>
        )}
      </Dropzone>
      {/* Dropzone옆에 올린 파일 보여지는 곳 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "120px",
        }}
      >
        <GapItems>
          {Images.map((image, index) => (
            <ImageContainer key={index}>
              <StyledImage src={`${image}`} />
              <DeleteButton type="button" onClick={() => deleteHandler(image)}>
                <CloseRoundedIcon />
              </DeleteButton>
            </ImageContainer>
          ))}
        </GapItems>
      </div>
    </GapItems>
  );
}
