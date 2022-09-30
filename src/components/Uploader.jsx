import gdrones from '../logo.png';
import React from 'react';
import axios from 'axios';

const Uploader = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileName, setSelectedFileName] = React.useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    let client = document.querySelector(".client").value;
    let titleLayer = document.querySelector(".titleLayer").value;
    let nameLayer = selectedFileName;
    console.log(nameLayer)
   
    console.log("cliente", client)
    console.log("titleLayer", titleLayer)
    console.log("nameLayer", nameLayer)
    formData.append("file", selectedFile);
    try {
      let res =  await axios({
        method: "post",
        url: "http://18.232.179.164:8081/api/file",
        data: formData,
        headers: {
            'client': client,
            'title-layer': titleLayer,
            'name-layer': nameLayer, 
            "Content-Type": "multipart/form-data" 
        },
      });

      console.log("Status: ",res.status)
      if(res.status == "200" || res.status == "202"){
        alert("Dados enviados com sucesso!")
      }
    } catch(error) {
      console.log(error)
      alert("Houve um erro ao enviar a requisição")
    }
  } 
 
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    setSelectedFileName(event.target.files[0].name)
  }

  return (
    <>
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={gdrones}
            alt="gdrones"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-700">Upload de arquivo</h2>
         
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Cliente
                </label>
                <select
                  id="client"
                  name="client"
                  className="client mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  
                >
                  <option value="Cliente_X">Cliente_X</option>
                  <option value="Cliente_Y">Cliente_Y</option>
                  
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <div className="mt-1">
                  <input type="text" id='title' name="title" required className='titleLayer appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                </div>
              </div>
             
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Arquivo
                </label>
                <div className="mt-1">
                  <input type="file" onChange={handleFileSelect} id='title' name="file" required className='file appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                </div>
              </div>
              

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enviar
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Visualize o mapa clicando no botão abaixo</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div>
                  <a
                    href="http://18.232.179.164:8080/mapstore" target="_blank" rel="noreferrer"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-indigo-700 text-sm font-medium text-white hover:bg-indigo-900 hover:text-white"
                  >
                    <span className="sr-only">Visualizar mapa</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>

                  </a>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
   
    </>
  )
};

export default Uploader;    