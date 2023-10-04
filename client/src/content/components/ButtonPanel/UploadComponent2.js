// Import the necessary modules.
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { UPLOAD } from "../../../routes";

// Create a new component that will handle the file upload.
export const UploadComponent2 = (props) => {

   
  // The state of the component will store the file that was selected by the user.
//   const [file, setFile] = useState(null);
const [file, setFile] = useState('');
const [filename, setFilename] = useState('Choose File');

console.log(`UC2.dir: ${props.dir}`) 
console.log(`UC2.filename: ${filename}`) 
console.log(`UC2.file: ${file}`) 

const onChange = e => {
    e.preventDefault()

    console.log(`e: ${e}`)
    console.log(`e.target: ${e.target}`)
    const etarget = e.target.file;
    console.log(`e.etarget: ${etarget}`)

    const etargetf = e.target.files;
    console.log(`e.etargetf: ${etargetf}`)

    const etarget1 = e.target.files[0];
    console.log(`e.etarget1: ${etarget1}`)

    const etargetname = e.target.files[0].name;
    console.log(`e.etargetname: ${etargetname}`)

    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // The useEffect hook will be called when the component mounts. It will set the initial value of the file state variable to the first file that is selected by the user.
//   useEffect(() => {
//     setFile(document.getElementById("fileInput").files[0]);
//   }, []);

  // The following function will be called when the user selects a new file. It will set the value of the file state variable to the new file.
//   const handleChange = (e) => {
//     setFile(e.target.files[0]);
//   };

  // The following function will be called when the user clicks the "Upload" button. It will send the selected file to the server using the Fetch API.
  const onSubmit = (e) => {

    e.preventDefault();
    //console.log(`uc2.file: ${JSON.stringify(file)}`)

    // Create a new FormData object and append the selected file to it.
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", props.dir);

    //you cannot inspect form data using this...
    //console.log(`client.formData: ${JSON.stringify(formData)}`);
    // formData.append("dir", "ccrma");

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    // Send the FormData object to the server using the Fetch API.
    fetch(UPLOAD, {
      method: "POST",
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "default",
      credentials: "same-origin",
      headers: {
        //"Content-Type": "application/json",
         //'Content-Type': 'multipart/form-data',
         //'Content-Type': 'text/plain',
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
      // body: {file, dir: props.dir}
      
      // body: {
      //   file: file,
      //   dir: props.dir,
      // }
    })

    // axios.post('/upload', formData, {
    //     mode: "no-cors",
    //     cache: "default",
    //     credentials: "same-origin",
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     }
    //   })

    //.then((res) => res.json())
    //.then((data) => console.log(data));
    .then((data) => console.log(`just testing`));
  };


// const onSubmit = async e => {
//     e.preventDefault();

//     console.log(`going thru onSubmit`)
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         // onUploadProgress: progressEvent => {
//         //   setUploadPercentage(
//         //     parseInt(
//         //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
//         //     )
//         //   );
//         // }
//       });
      
//       // Clear percentage
//       setTimeout(() => setUploadPercentage(0), 10000);

//       const { fileName, filePath } = res.data;

//       setUploadedFile({ fileName, filePath });

//     //   setMessage('File Uploaded');
//     } catch (err) {
//       if (err.response.status === 500) {
//         // setMessage('There was a problem with the server');
//       } else {
//         // setMessage(err.response.data.msg);
//       }
//       setUploadPercentage(0)
//     }
//   };



  return (



    <form onSubmit={onSubmit}>
        <div>
        <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
        />
        <label className='custom-file-label' htmlFor='customFile'>
            {filename}
        </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
        type='submit'
        value='Upload'
        //className='btn btn-primary btn-block mt-4'
        />
    </form>



    // <div>
    //   <input id="fileInput" type="file" onChange={handleChange} />
    //   <button onClick={handleSubmit}>Upload</button>
    // </div>
  );
};