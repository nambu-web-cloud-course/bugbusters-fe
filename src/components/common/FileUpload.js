import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';

function FileUpload(){
    const [Images, setImages] = useState([]);

    const dropHandler = (files) => {
        let formData = new FormData();

        const config={
            header:{'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        axios.post('http://localhost:8080/request/image', formData,config)
        .then(response=>{
            if (response.data.success) {
                console.log(response.data);
                setImages([...Images, response.data.filePath]);
            }
            else
                alert('파일 저장 실패');
        })
    }
    return(

        <div style={{display:'flex', justifyContent:'space-between'}}>
           <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div style={{width:100, height:100, border: '1px solid lightgray', display:'flex', alignSelf:'center', justifyContent:'center'}} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <AiOutlinePlus style={{fontSize: '3rem', alignSelf:'center'}}/>
                    </div>
                    </section>
                )}
            </Dropzone>
            {/* Dropzone옆에 올린 파일 보여지는 곳 */}
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX:'scroll'}}>

                {Images.map((image, index) => (
                    <div key={index}>
                        <img style={{ minWidth: '300px', width:'300px', height: ' 240px'}}
                        src={`http://localhost:8080/${image}`}
                        />
                    </div>
                ))} 

            </div>

        </div>


    )
}

export default FileUpload