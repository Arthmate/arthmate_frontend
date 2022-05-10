import React, { useState } from 'react'
import { Button,Divider } from '@mui/material';
import { Input } from '@mui/material';
import './Upload.css'

function Upload() {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [data, setData] = useState();

    const handleSubmit = event => {
        console.log(selectedFile,selectedFile.name,"===--")
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            'file',
            selectedFile,
            selectedFile.name
          );
        // await fetch('/', {
        //     method: 'POST',
        //     body: formData,
        // });
        // setSelectedFile('')
    };

    const handleReset = (e) =>{
    }

    const handleChange = event => {
        setSelectedFile(event.target.files[0])
    };

    const validateSize = (file) => {
        const requiredSize = 5242880;
        if (file) {
            let fileSize = file.size;

            if (fileSize <= requiredSize) {
                return true;
            }
            else {
                return false
            }
        }
        else {
            return false;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <strong className="upload-text">Upload a .xlsx file:</strong>
                <Input className="upload-input" type="file" placeholder='Select File' onChange={handleChange}>Choose</Input>
                <Divider></Divider>
                <Button type='submit'>
                    Upload a file
                </Button>
                <Button onClick={handleReset}>
                    Reset
                </Button>
            </form>
        </>
    );
}

export default Upload
