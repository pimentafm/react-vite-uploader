import React, { useCallback } from "react";
import axios from "axios";

import { useState } from "react";
import { toast } from "react-toastify";

export function FileUploader(onSuccess) {
  const [files, setFiles] = useState("");

  const onInputChange = useCallback(e => {
    setFiles(e.target.files);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      const data = new FormData();

      for (let i = 0; i <= files.length - 1; i++) {
        data.append("file", files[i]);
      }

      axios
        .post("http://3.235.193.240:8081/api/file", data)
        .then(response => {
          toast.success("Upload feito com sucesso");
          onSuccess(response.data);
        })
        .catch(e => {
          if (e.response!.status === 202) {
            console.log('error 202')
          } else {
            toast.error("Erro ao fazer upload");
          }
          
        });
    },
    [files, onSuccess],
  );

  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="flex justify-center mt-8">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              Upload de dados
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Clique aqui</span> ou
                    arraste o arquivo
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Shapefile zipado ou tif
                  </p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  onChange={onInputChange}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
